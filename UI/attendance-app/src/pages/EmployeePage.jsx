import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import { checkIn, checkOut, getMyAttendanceToday } from '../api'

function EmployeePage() {
  const [status, setStatus] = useState('idle')
  const [checkinTime, setCheckinTime] = useState(null)
  const [checkoutTime, setCheckoutTime] = useState(null)
  const [logs, setLogs] = useState([])
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    async function loadTodayStatus() {
      const record = await getMyAttendanceToday(user?.id)
      if (record?.checkinTime && !record?.checkoutTime) {
        setCheckinTime(record.checkinTime)
        setStatus('checkedin')
      } else if (record?.checkinTime && record?.checkoutTime) {
        setCheckinTime(record.checkinTime)
        setCheckoutTime(record.checkoutTime)
        setStatus('checkedout')
      }
    }

    async function loadHistory() {
      try {
        const data = await getAttendanceByEmployee(user?.id)
        const arr = Array.isArray(data) ? data : (data?.content ?? [])
        setLogs(arr)
      } catch {
        setLogs([])
      }
    }

    loadTodayStatus()
    loadHistory()
  }, [])

  async function handleCheckIn() {
    const data = await checkIn(user?.id)
    setCheckinTime(data.checkinTime)
    setStatus('checkedin')
  }

  async function handleCheckOut() {
    const data = await checkOut(user?.id)
    setCheckoutTime(data.checkoutTime)
    setStatus('checkedout')
  }

  function getTotalHours() {
    const diff = Math.floor((new Date(checkoutTime) - new Date(checkinTime)) / 1000)
    return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`
  }

  function getHours(cin, cout) {
    if (!cin || !cout) return null
    return (new Date(cout) - new Date(cin)) / 3600000
  }

  function fmtHours(h) {
    if (h === null || h === undefined) return '—'
    return `${Math.floor(h)}h ${Math.round((h % 1) * 60)}m`
  }

  const now = new Date()
  const last7 = logs.filter((r) => {
    if (!r.checkinTime || !r.checkoutTime) return false
    return (now - new Date(r.checkinTime)) / 86400000 <= 7
  })
  const total7 = last7.reduce((s, r) => s + getHours(r.checkinTime, r.checkoutTime), 0)
  const avg7 = last7.length > 0 ? total7 / last7.length : null

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>

      {status === 'idle' && (
        <div>
          <h2>00 : 00 : 00</h2>
          <p>You haven't checked in yet</p>
          <button onClick={handleCheckIn}>Check In</button>
        </div>
      )}

      {status === 'checkedin' && (
        <div>
          <Timer checkinTime={checkinTime} />
          <button onClick={handleCheckOut}>Check Out</button>
        </div>
      )}

      {status === 'checkedout' && (
        <div>
          <h2>Total: {getTotalHours()}</h2>
          <p>You're done for today. Great work!</p>
        </div>
      )}

      <hr />
      <h2>Last 7 Days</h2>
      {last7.length < 3 ? (
        <p>Need more data ({last7.length} completed day{last7.length !== 1 ? 's' : ''} recorded, need at least 3)</p>
      ) : (
        <div>
          <p>Total: {fmtHours(total7)}</p>
          <p>Daily average: {fmtHours(avg7)}</p>
          <p>Days recorded: {last7.length}</p>
        </div>
      )}

      <hr />
      <h2>History</h2>
      {logs.length === 0 ? (
        <p>No records yet</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 10).map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.checkinTime).toLocaleDateString()}</td>
                <td>{new Date(r.checkinTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{r.checkoutTime ? new Date(r.checkoutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                <td>{fmtHours(getHours(r.checkinTime, r.checkoutTime))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => { localStorage.clear(); navigate('/login') }}>Logout</button>
    </div>
  )
}

export default EmployeePage