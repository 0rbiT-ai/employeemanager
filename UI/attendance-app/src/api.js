const BASE_URL = import.meta.env.VITE_API_BASE_URL 

// ─── token helpers ────────────────────────────────────────────
function getToken() {
  return localStorage.getItem('token')
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}

// ─── AUTH ─────────────────────────────────────────────────────
export async function loginUser(loginData) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json() // returns { token }
}

// ─── DEPARTMENTS ──────────────────────────────────────────────
export async function getAllDepartments() {
  const res = await fetch(`${BASE_URL}/api/departments`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch departments')
  return res.json()
}

export async function createDepartment(departmentName, location) {
  const res = await fetch(`${BASE_URL}/api/departments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ departmentName, location })
  })
  if (!res.ok) throw new Error('Failed to create department')
  return res.json()
}

export async function deleteDepartment(id) {
  const res = await fetch(`${BASE_URL}/api/departments/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to delete department')
}

// ─── EMPLOYEES ────────────────────────────────────────────────
export async function getAllEmployees() {
  const res = await fetch(`${BASE_URL}/api/employees`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function createEmployee({ name, email, phone, role, password, departmentId }) {
  const res = await fetch(`${BASE_URL}/api/employees`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, email, phone, role, password, authRole: 'EMPLOYEE', department: { id: departmentId } })
  })
  if (!res.ok) throw new Error('Failed to create employee')
  return res.json()
}

export async function deleteEmployee(id) {
  const res = await fetch(`${BASE_URL}/api/employees/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to delete employee')
}

// ─── ATTENDANCE (employee) ────────────────────────────────────
export async function checkIn() {
  const res = await fetch(`${BASE_URL}/api/attendances/checkin`, {
    method: 'POST',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Check-in failed')
  return res.json()
}

export async function checkOut() {
  const res = await fetch(`${BASE_URL}/api/attendances/checkout`, {
    method: 'POST',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Check-out failed')
  return res.json()
}

export async function getMyAttendanceToday() {
  const res = await fetch(`${BASE_URL}/api/attendances/today`, {
    headers: authHeaders()
  })
  if (!res.ok) return null
  return res.json()
}

export async function getAttendanceHistory() {
  const res = await fetch(`${BASE_URL}/api/attendances/history`, {
    headers: authHeaders()
  })
  if (!res.ok) return []
  return res.json()
}

// ─── ATTENDANCE (admin) ───────────────────────────────────────
export async function getAllAttendanceLogs() {
  const res = await fetch(`${BASE_URL}/api/admin/attendances/all`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch logs')
  return res.json()
}