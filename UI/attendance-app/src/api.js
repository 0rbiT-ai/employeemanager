const BASE_URL = import.meta.env.VITE_API_BASE_URL

// ─── Token helpers ─────────────────────────────────────────────
function getToken() {
  return localStorage.getItem('token')
}

function saveToken(newToken) {
  localStorage.setItem('token', newToken)
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error('No refresh token')

  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  })

  if (!res.ok) throw new Error('Refresh failed')
  const data = await res.json()
  saveToken(data.token)
  return data.token
}

async function fetchWithAuth(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
      ...options.headers,
    }
  })

  if (res.status === 401 || res.status === 403) {
    try {
      await refreshAccessToken()
      return fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
          ...options.headers,
        }
      })
    } catch (err) {
      localStorage.clear()
      window.location.href = '/login'
      throw new Error('Session expired. Please log in again.')
    }
  }

  return res
}

// ─── AUTH ─────────────────────────────────────────────────────
export async function loginUser(loginData) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

// ─── DEPARTMENTS ──────────────────────────────────────────────
export async function getAllDepartments(page = 0, size = 5) {

  const res = await fetchWithAuth(
    `${BASE_URL}/api/departments?page=${page}&size=${size}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch departments')
  }

  return res.json()
}

export async function createDepartment(departmentName, location) {
  const res = await fetchWithAuth(`${BASE_URL}/api/departments`, {
    method: 'POST',
    body: JSON.stringify({ departmentName, location })
  })
  if (!res.ok) throw new Error('Failed to create department')
  return res.json()
}

export async function deleteDepartment(id) {
  const res = await fetchWithAuth(`${BASE_URL}/api/departments/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete department')
}

// ─── EMPLOYEES ────────────────────────────────────────────────
export async function getAllEmployees(page = 0, size = 5) {
  const res = await fetchWithAuth(`${BASE_URL}/api/employees?page=${page}&size=${size}`)
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function createEmployee({ name, email, phone, role, password, departmentId }) {
  const res = await fetchWithAuth(`${BASE_URL}/api/employees`, {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, role, password, authRole: 'EMPLOYEE', department: { id: departmentId } })
  })
  if (!res.ok) throw new Error('Failed to create employee')
  return res.json()
}

export async function deleteEmployee(id) {
  const res = await fetchWithAuth(`${BASE_URL}/api/employees/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete employee')
}

export async function updateEmployee(id, { name, email, phone, role, password, departmentId }) {
  const res = await fetchWithAuth(`${BASE_URL}/api/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, email, phone, role, password, authRole: 'EMPLOYEE', department: { id: departmentId } })
  })
  if (!res.ok) throw new Error('Failed to update employee')
  return res.json()
}

// ─── ATTENDANCE (employee) ────────────────────────────────────
export async function checkIn() {
  const res = await fetchWithAuth(`${BASE_URL}/api/attendances/checkin`, {
    method: 'POST'
  })
  if (!res.ok) throw new Error('Check-in failed')
  return res.json()
}

export async function checkOut() {
  const res = await fetchWithAuth(`${BASE_URL}/api/attendances/checkout`, {
    method: 'POST'
  })
  if (!res.ok) throw new Error('Check-out failed')
  return res.json()
}

export async function getMyAttendanceToday() {
  const res = await fetchWithAuth(`${BASE_URL}/api/attendances/today`)
  if (!res.ok) return null
  return res.json()
}

export async function getAttendanceHistory() {
  const res = await fetchWithAuth(`${BASE_URL}/api/attendances/history`)
  if (!res.ok) return []
  return res.json()
}

// ─── ATTENDANCE (admin) ───────────────────────────────────────
export async function getAllAttendanceLogs() {
  const res = await fetchWithAuth(`${BASE_URL}/api/admin/attendances/all`)
  if (!res.ok) throw new Error('Failed to fetch logs')
  return res.json()
}