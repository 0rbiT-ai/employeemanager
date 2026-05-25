import { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import {loginUser} from '../api'
import { useAuth } from '../context/Authcontext'



function Login() {
  const {login,logout} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('payload:', JSON.parse(atob(data.token.split('.')[1])))

      login(data)

      const payload = JSON.parse(atob(data.token.split('.')[1]))
      const role = payload.role

      if (role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/employee')
      }
    },
    onError: (error) => {
      console.error('Login failed:', error.message)
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    mutation.mutate({email, password})
  }

  return(
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

      <button type="button" onClick={logout}>Logout</button>
    </form>
  )

  import { useNavigate } from 'react-router-dom'

  const navigate = useNavigate()

  onSuccess: (data) => {
    login(data)  // stores token in context + localStorage

    // decode JWT to get role
    const payload = JSON.parse(atob(data.token.split('.')[1]))
    const role = payload.role  // check what this prints first

    console.log('payload:', payload)  // add this to see what fields exist

    if (role === 'ADMIN') {
      navigate('/admin')
    } else {
      navigate('/employee')
    }
  }


}

export default Login