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
    onSuccess: (data) =>{
      console.log(data.token)
      console.log(data.role)

      login(data)
      console.log("logged in!")
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



}

export default Login