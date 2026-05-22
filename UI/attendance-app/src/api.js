const BASE_URL = 'http://localhost:8080'

// ─── AUTH (mock until backend builds it) ─────────────────────
export async function login(email, password) {
  if (email === 'admin@company.com') {
    return { role: 'admin', id: '1', name: 'Admin User' }
  }
  return { role: 'employee', id: '2', name: email.split('@')[0] }
}

// ─── DEPARTMENTS ──────────────────────────────────────────────
export async function getAllDepartments() {
  const res = await fetch(`${BASE_URL}/api/departments?size=100`)
  if (!res.ok) throw new Error('Failed to fetch departments')
  return res.json()
}

export async function createDepartment(departmentName, location) {
  const res = await fetch(`${BASE_URL}/api/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departmentName, location }),
  })
  if (!res.ok) throw new Error('Failed to create department')
  return res.json()
}

// ─── EMPLOYEES ────────────────────────────────────────────────
export async function getAllEmployees() {
  const res = await fetch(`${BASE_URL}/api/employees?size=100`)
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function getEmployeeByEmail(email) {
  const res = await fetch(`${BASE_URL}/api/employees/email/${email}`)
  if (!res.ok) throw new Error('Employee not found')
  return res.json()
}

export async function createEmployee({ name, email, phone, role, departmentId }) {
  const res = await fetch(`${BASE_URL}/api/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      phone,
      role,
      department: { id: departmentId },
    }),
  })
  if (!res.ok) throw new Error('Failed to create employee')
  return res.json()
}

// ─── ATTENDANCE ───────────────────────────────────────────────
export async function getAllAttendanceLogs() {
  const res = await fetch(`${BASE_URL}/api/attendance?size=200`)
  if (!res.ok) throw new Error('Failed to fetch attendance logs')
  return res.json()
}

export async function getMyAttendanceToday(employeeId) {
  const res = await fetch(`${BASE_URL}/api/attendance/me/today?employeeId=${employeeId}`)
  if (!res.ok) return null
  return res.json()
}

export async function checkIn(employeeId) {
  const res = await fetch(`${BASE_URL}/api/attendance/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeId }),
  })
  if (!res.ok) throw new Error('Check-in failed')
  return res.json()
}

export async function checkOut(attendanceId) {
  const res = await fetch(`${BASE_URL}/api/attendance/checkout/${attendanceId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Check-out failed')
  return res.json()
}
export async function deleteEmployee(id) {
  const res = await fetch(`http://localhost:8080/api/employees/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete employee')
}

export async function deleteDepartment(id) {
  const res = await fetch(`http://localhost:8080/api/departments/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete department')
}
export async function getAttendanceByEmployee(employeeId) {
  const res = await fetch(`http://localhost:8080/api/attendance/employee/${employeeId}`)
  if (!res.ok) return []
  return res.json()
}