// src/api.js

// This is the base URL of your friend's backend
// When his server is running locally it'll be this address
const BASE_URL = 'http://localhost:8080'

// ─── AUTH ───────────────────────────────────────────

export async function login(email, password) {
  // MOCK: fake login until your friend builds the auth endpoint
  // Remove this block and uncomment the fetch below when ready
  if (email === 'admin@company.com') {
    return { role: 'admin', id: '1', name: 'Admin User' }
  } else {
    return { role: 'employee', id: '2', name: 'John Doe' }
  }

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // })
  // return res.json()
}

// ─── ATTENDANCE ──────────────────────────────────────

export async function checkIn(employeeId) {
  // MOCK
  return { checkinTime: new Date().toISOString() }

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/attendance/checkin`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ employeeId })
  // })
  // return res.json()
}

export async function checkOut(employeeId) {
  // MOCK
  return { checkoutTime: new Date().toISOString() }

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/attendance/checkout`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ employeeId })
  // })
  // return res.json()
}

export async function getMyAttendanceToday(employeeId) {
  // MOCK: returns null meaning not checked in yet
  return null

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/attendance/me/today?employeeId=${employeeId}`)
  // return res.json()
}

// ─── ADMIN ───────────────────────────────────────────

export async function getAllAttendanceToday() {
  // MOCK: fake records until attendance endpoints are built
  return [
    {
      id: 1,
      name: 'Sarah Johnson',
      checkinTime: '2026-05-22T08:15:00.000Z',
      checkoutTime: '2026-05-22T16:45:00.000Z',
    },
    {
      id: 2,
      name: 'James Lee',
      checkinTime: '2026-05-22T09:00:00.000Z',
      checkoutTime: '2026-05-22T17:30:00.000Z',
    },
    {
      id: 3,
      name: 'Priya Menon',
      checkinTime: '2026-05-22T08:45:00.000Z',
      checkoutTime: null,
    },
  ]

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/attendance/all/today`)
  // return res.json()
}

// ─── EMPLOYEES (already built by your friend!) ───────

export async function getAllEmployees() {
  // This one is REAL — your friend already built this endpoint
  const res = await fetch(`${BASE_URL}/api/employees`)
  return res.json()
}

export async function getEmployeeByEmail(email) {
  const res = await fetch(`${BASE_URL}/api/employees/email/${email}`)
  return res.json()
}
export async function getAllAttendanceLogs() {
  // MOCK
  return [
    {
      id: 1,
      name: 'Sarah Johnson',
      date: '2026-05-20',
      checkinTime: '2026-05-20T08:10:00.000Z',
      checkoutTime: '2026-05-20T17:00:00.000Z',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      date: '2026-05-21',
      checkinTime: '2026-05-21T08:30:00.000Z',
      checkoutTime: '2026-05-21T16:45:00.000Z',
    },
    {
      id: 3,
      name: 'James Lee',
      date: '2026-05-20',
      checkinTime: '2026-05-20T09:00:00.000Z',
      checkoutTime: '2026-05-20T18:00:00.000Z',
    },
    {
      id: 4,
      name: 'Priya Menon',
      date: '2026-05-21',
      checkinTime: '2026-05-21T08:45:00.000Z',
      checkoutTime: null,
    },
    {
      id: 5,
      name: 'James Lee',
      date: '2026-05-22',
      checkinTime: '2026-05-22T09:15:00.000Z',
      checkoutTime: '2026-05-22T17:30:00.000Z',
    },
  ]

  // REAL (uncomment later):
  // const res = await fetch(`${BASE_URL}/api/attendance/all`)
  // return res.json()
}
// ─── REAL ENDPOINTS (already built) ─────────────────────────

export async function createDepartment(departmentName, location) {
  const res = await fetch(`${BASE_URL}/api/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departmentName, location })
  })
  if (!res.ok) throw new Error('Failed to create department')
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
      department: { id: departmentId }
    })
  })
  if (!res.ok) throw new Error('Failed to create employee')
  return res.json()
}

export async function getAllDepartmentsReal() {
  const res = await fetch(`${BASE_URL}/api/departments?size=100`)
  return res.json()
}