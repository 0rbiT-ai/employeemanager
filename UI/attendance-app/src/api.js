const BASE_URL = 'http://localhost:8080'

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
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Invalid credentials')
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

export async function createEmployee({ name, email, phone, role, departmentId }) {
  const res = await fetch(`${BASE_URL}/api/employees`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name, email, phone, role, department: { id: departmentId } })
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

// ─── ATTENDANCE (employee - no body needed, token does the work) ──
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