import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" 
        element={<ProtectedRoute requiredRole="EMPLOYEE"><EmployeePage /></ProtectedRoute>} 
        />
        <Route path="/admin" 
        element={<ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App