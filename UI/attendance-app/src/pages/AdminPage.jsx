import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  getAllAttendanceLogs,
} from '../api'

// ─── Helpers ──────────────────────────────────────────────────
function toArray(data) {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.content)) return data.content
  return []
}
function formatTime(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })
}
function getTotalHours(checkinTime, checkoutTime) {
  if (!checkoutTime) return '—'
  const diff = Math.floor((new Date(checkoutTime) - new Date(checkinTime)) / 1000)
  return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`
}

// ─── Tab Button ───────────────────────────────────────────────
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
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}

function StatusMsg({ status, errorMsg }) {
  if (status === 'success')
    return <div style={{ color: '#1d9e75', fontSize: '14px', marginBottom: '12px' }}>✓ Done!</div>
  if (status === 'error')
    return <div style={{ color: '#c0392b', fontSize: '14px', marginBottom: '12px' }}>✗ {errorMsg}</div>
  return null
}

function DeleteBtn({ onClick, deleting }) {
  return (
    <button
      onClick={onClick}
      disabled={deleting}
      style={{
        padding: '4px 10px',
        borderRadius: '6px',
        border: '1px solid #f5c6cb',
        background: deleting ? '#f8f8f8' : '#fff5f5',
        color: deleting ? '#aaa' : '#c0392b',
        fontSize: '12px',
        cursor: deleting ? 'not-allowed' : 'pointer',
        fontWeight: 500,
      }}
    >
      {deleting ? '...' : 'Delete'}
    </button>
  )
}

// ─── Departments Tab ──────────────────────────────────────────
function DepartmentsTab() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [deptName, setDeptName] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  function load() {
    setLoading(true)
    getAllDepartments()
      .then((data) => setDepartments(toArray(data)))
      .catch(() => setDepartments([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!deptName.trim()) return
    setStatus('loading')
    try {
      await createDepartment(deptName.trim(), location.trim())
      setStatus('success')
      setDeptName('')
      setLocation('')
      load()
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete department "${name}"? This may affect employees in this department.`)) return
    setDeletingId(id)
    try {
      await deleteDepartment(id)
      load()
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px' }}>All Departments</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
          {loading ? 'Loading...' : `${departments.length} department${departments.length !== 1 ? 's' : ''}`}
        </p>
        <div className="table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Department Name</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="empty-row">Loading...</td></tr>
              ) : departments.length === 0 ? (
                <tr><td colSpan="4" className="empty-row">No departments yet</td></tr>
              ) : (
                departments.map((d, i) => (
                  <tr key={d.id}>
                    <td style={{ color: '#888', fontSize: '13px' }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{d.departmentName}</td>
                    <td>{d.location || '—'}</td>
                    <td>
                      <DeleteBtn
                        onClick={() => handleDelete(d.id, d.departmentName)}
                        deleting={deletingId === d.id}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ width: '300px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px' }}>Create Department</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
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
          <StatusMsg status={status} errorMsg={errorMsg} />
          <button type="submit" className="btn-login" disabled={status === 'loading'} style={{ marginTop: '4px' }}>
            {status === 'loading' ? 'Creating...' : 'Create Department'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Employees Tab ────────────────────────────────────────────
function EmployeesTab() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', departmentId: '' })
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  function load() {
    setLoading(true)
    Promise.all([
      getAllEmployees().catch(() => []),
      getAllDepartments().catch(() => []),
    ])
      .then(([emps, depts]) => {
        setEmployees(toArray(emps))
        setDepartments(toArray(depts))
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.departmentId) {
      setStatus('error')
      setErrorMsg('Please select a department.')
      return
    }
    setStatus('loading')
    try {
      await createEmployee(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', role: '', departmentId: '' })
      load()
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMsg('Failed. Check if email is already used.')
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete employee "${name}"?`)) return
    setDeletingId(id)
    try {
      await deleteEmployee(id)
      load()
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase()) ||
      e.role?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '320px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '2px' }}>All Employees</h2>
            <p style={{ fontSize: '13px', color: '#888' }}>
              {loading ? 'Loading...' : `${filtered.length} employee${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginLeft: 'auto',
              padding: '8px 12px',
              border: '1px solid #d0d0ca',
              borderRadius: '8px',
              fontSize: '13px',
              width: '220px',
              outline: 'none',
            }}
          />
        </div>
        <div className="table-wrap">
          <table className="att-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="empty-row">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="7" className="empty-row">No employees found</td></tr>
              ) : (
                filtered.map((emp, i) => (
                  <tr key={emp.id}>
                    <td style={{ color: '#888', fontSize: '13px' }}>{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{emp.name}</td>
                    <td style={{ fontSize: '13px', color: '#555' }}>{emp.email}</td>
                    <td>{emp.role}</td>
                    <td>{emp.department?.departmentName || '—'}</td>
                    <td style={{ fontSize: '13px', color: '#888' }}>{emp.phone || '—'}</td>
                    <td>
                      <DeleteBtn
                        onClick={() => handleDelete(emp.id, emp.name)}
                        deleting={deletingId === emp.id}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ width: '300px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px' }}>Add Employee</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
          Create a department first before adding employees.
        </p>
        {departments.length === 0 && !loading && (
          <div style={{
            background: '#fff8e1', border: '1px solid #ffe082',
            borderRadius: '8px', padding: '12px 16px',
            fontSize: '13px', color: '#795548', marginBottom: '16px',
          }}>
            ⚠ No departments found. Go to the Departments tab first.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" placeholder="e.g. Rohan Das"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" name="email" placeholder="e.g. rohan@company.com"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" placeholder="e.g. 9876543210"
              value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Role *</label>
            <input type="text" name="role" placeholder="e.g. Data Analyst"
              value={form.role} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department *</label>
            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              style={{
                width: '100%', padding: '10px 12px',
                border: '1px solid #d0d0ca', borderRadius: '8px',
                fontSize: '14px', background: 'white',
                color: form.departmentId ? '#1a1a1a' : '#999', outline: 'none',
              }}
            >
              <option value="">Select a department...</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.departmentName}{d.location ? ` (${d.location})` : ''}
                </option>
              ))}
            </select>
          </div>
          <StatusMsg status={status} errorMsg={errorMsg} />
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
    </div>
  )
}

// ─── Attendance Tab ───────────────────────────────────────────
function AttendanceTab() {
  const [allLogs, setAllLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [nameFilter, setNameFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    getAllAttendanceLogs()
      .then((data) => setAllLogs(toArray(data)))
      .catch(() => setAllLogs([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = allLogs.filter((r) => {
    const matchName = !nameFilter.trim() || r.name?.toLowerCase().includes(nameFilter.toLowerCase())
    const matchDate = !dateFilter || r.date === dateFilter
    return matchName && matchDate
  })

  return (
    <>
      <h2 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '4px' }}>Attendance Logs</h2>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
        All employee check-in and check-out records
      </p>
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
        {loading ? 'Loading...' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''} found`}
      </p>
      <div className="table-wrap">
        <table className="att-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="empty-row">Loading...</td></tr>
            ) : filtered.length === 0 ? (
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
  )
}

// ─── Admin Page ───────────────────────────────────────────────
export default function AdminPage() {
  const [tab, setTab] = useState('departments')
  const navigate = useNavigate()

  return (
    <>
      <div className="topbar">
        <span className="topbar-name">⚙️ Admin Dashboard</span>
        <button className="topbar-logout" onClick={() => { localStorage.clear(); navigate('/login') }}>
          Logout
        </button>
      </div>

      <div className="admin-page">
        <div style={{ marginBottom: '28px' }}>
          <Tab label="🏢 Departments" active={tab === 'departments'} onClick={() => setTab('departments')} />
          <Tab label="👥 Employees"   active={tab === 'employees'}   onClick={() => setTab('employees')} />
          <Tab label="🕐 Attendance"  active={tab === 'attendance'}  onClick={() => setTab('attendance')} />
        </div>

        {tab === 'departments' && <DepartmentsTab />}
        {tab === 'employees'   && <EmployeesTab />}
        {tab === 'attendance'  && <AttendanceTab />}
      </div>
    </>
  )
}