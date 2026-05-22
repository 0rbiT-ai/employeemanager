import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AttendanceTable from '../components/AttendanceTable'
import { getAllAttendanceLogs, createDepartment, createEmployee, getAllDepartmentsReal } from '../api'

// ── Tab button ──────────────────────────────────────────────
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 18px',
        borderRadius: '8px',
        border: active ? 'none' : '1px solid #d0d0ca',
        background: active ? '#1a1a1a' : 'white',
        color: active ? 'white' : '#555',
        fontWeight: active ? 600 : 400,
        fontSize: '14px',
        cursor: 'pointer',
        marginRight: '8px',
      }}
    >
      {label}
    </button>
  )
}

// ── Create Department Form ──────────────────────────────────
function CreateDeptForm() {
  const [deptName, setDeptName] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!deptName.trim()) return
    setStatus('loading')
    try {
      const dept = await createDepartment(deptName.trim(), location.trim())
      setStatus('success')
      setDeptName('')
      setLocation('')
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '6px' }}>
        Create Department
      </h2>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>
        Add a new department before adding employees.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name *</label>
          <input
            type="text"
            placeholder="e.g. Engineering"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. Chennai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {status === 'success' && (
          <div style={{ color: '#1d9e75', fontSize: '14px', marginBottom: '12px' }}>
            ✓ Department created successfully!
          </div>
        )}
        {status === 'error' && (
          <div style={{ color: '#c0392b', fontSize: '14px', marginBottom: '12px' }}>
            ✗ {errorMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn-login"
          disabled={status === 'loading'}
          style={{ marginTop: '4px' }}
        >
          {status === 'loading' ? 'Creating...' : 'Create Department'}
        </button>
      </form>
    </div>
  )
}

// ── Create Employee Form ────────────────────────────────────
function CreateEmployeeForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', departmentId: '' })
  const [departments, setDepartments] = useState([])
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getAllDepartmentsReal()
      .then(setDepartments)
      .catch(() => {})
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.departmentId) {
      setStatus('error')
      setErrorMsg('Please select a department. Create one first if needed.')
      return
    }
    setStatus('loading')
    try {
      await createEmployee(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', role: '', departmentId: '' })
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMsg('Failed to create employee. Check if email is unique.')
    }
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '6px' }}>
        Add Employee
      </h2>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px' }}>
        You must create a department first before adding employees.
      </p>

      {departments.length === 0 && (
        <div style={{
          background: '#fff8e1',
          border: '1px solid #ffe082',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#795548',
          marginBottom: '20px'
        }}>
          ⚠ No departments found. Go to the "Create Department" tab and add one first.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Rohan Das"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="e.g. rohan.das@company.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="e.g. 9876543210"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Role *</label>
          <input
            type="text"
            name="role"
            placeholder="e.g. Data Analyst"
            value={form.role}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department *</label>
          <select
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d0d0ca',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              color: form.departmentId ? '#1a1a1a' : '#999',
              outline: 'none'
            }}
          >
            <option value="">Select a department...</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.departmentName} {d.location ? `(${d.location})` : ''}
              </option>
            ))}
          </select>
        </div>

        {status === 'success' && (
          <div style={{ color: '#1d9e75', fontSize: '14px', marginBottom: '12px' }}>
            ✓ Employee added successfully!
          </div>
        )}
        {status === 'error' && (
          <div style={{ color: '#c0392b', fontSize: '14px', marginBottom: '12px' }}>
            ✗ {errorMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn-login"
          disabled={status === 'loading' || departments.length === 0}
          style={{ marginTop: '4px' }}
        >
          {status === 'loading' ? 'Adding...' : 'Add Employee'}
        </button>
      </form>
    </div>
  )
}

// ── Admin Page ──────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState('logs') // 'logs' | 'create-dept' | 'create-employee'
  const [allLogs, setAllLogs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getAllAttendanceLogs().then((data) => {
      setAllLogs(data)
      setFiltered(data)
    })
  }, [])

  useEffect(() => {
    let results = allLogs
    if (nameFilter.trim()) {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    }
    if (dateFilter) {
      results = results.filter((r) => r.date === dateFilter)
    }
    setFiltered(results)
  }, [nameFilter, dateFilter, allLogs])

  function getTotalHours(checkinTime, checkoutTime) {
    if (!checkoutTime) return '—'
    const diff = Math.floor((new Date(checkoutTime) - new Date(checkinTime)) / 1000)
    return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`
  }
  function formatTime(ts) {
    if (!ts) return '—'
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <>
      <div className="topbar">
        <span className="topbar-name">⚙️ Admin Dashboard</span>
        <button className="topbar-logout" onClick={() => { localStorage.clear(); navigate('/login') }}>
          Logout
        </button>
      </div>

      <div className="admin-page">
        {/* Tab nav */}
        <div style={{ marginBottom: '24px' }}>
          <Tab label="Attendance Logs" active={tab === 'logs'} onClick={() => setTab('logs')} />
          <Tab label="Create Department" active={tab === 'create-dept'} onClick={() => setTab('create-dept')} />
          <Tab label="Add Employee" active={tab === 'create-employee'} onClick={() => setTab('create-employee')} />
        </div>

        {/* ── Attendance Logs tab ── */}
        {tab === 'logs' && (
          <>
            <h1>Attendance logs</h1>
            <p className="admin-subtitle">All employee check-in and check-out records</p>

            <div className="filter-bar">
              <input
                type="text"
                placeholder="Search by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              <button className="btn-clear" onClick={() => { setNameFilter(''); setDateFilter('') }}>
                Clear
              </button>
            </div>

            <p className="record-count">
              {filtered.length} record{filtered.length !== 1 ? 's' : ''} found
            </p>

            <div className="table-wrap">
              <table className="att-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Check in</th>
                    <th>Check out</th>
                    <th>Total hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="6" className="empty-row">No records found</td></tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 500 }}>{r.name}</td>
                        <td>{formatDate(r.date)}</td>
                        <td>{formatTime(r.checkinTime)}</td>
                        <td>{formatTime(r.checkoutTime)}</td>
                        <td>{getTotalHours(r.checkinTime, r.checkoutTime)}</td>
                        <td>
                          {r.checkoutTime
                            ? <span className="pill-done">Done</span>
                            : <span className="pill-active">● Active</span>
                          }
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── Create Dept tab ── */}
        {tab === 'create-dept' && <CreateDeptForm />}

        {/* ── Add Employee tab ── */}
        {tab === 'create-employee' && <CreateEmployeeForm />}
      </div>
    </>
  )
}