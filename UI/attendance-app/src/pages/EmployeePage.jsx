import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Timer from '../components/Timer'
import { checkIn, checkOut, getMyAttendanceToday } from '../api'

function EmployeePage() {
  const [status, setStatus] = useState('idle')
  const [checkinTime, setCheckinTime] = useState(null)
  const [checkoutTime, setCheckoutTime] = useState(null)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  // When the page loads, check if they're already clocked in today
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
    loadTodayStatus()
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
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

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

      <button onClick={() => { localStorage.clear(); navigate('/login') }}>
        Logout
      </button>
    </div>
  )
}

export default EmployeePage