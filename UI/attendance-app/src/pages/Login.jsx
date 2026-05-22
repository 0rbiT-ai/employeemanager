import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const user = await login(email, password)

    // Save the user info so other pages can access it
    localStorage.setItem('user', JSON.stringify(user))

    if (user.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/employee')
    }
  }

  return (
    <div>
      <h1>Attendance App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login