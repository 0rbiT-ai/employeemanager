import { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import {loginUser} from '../api'
import { useAuth } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import {Button} from '@components/ui/button'
import {Input} from '@components/ui/input'

import {Card, CardContent,} from '@components/ui/card'
import { Label } from '@components/ui/label'


function Login() {
  const {login} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) =>{
      console.log(data.token)
      console.log(data.role)
      if(data.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/employee')
      }
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
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <div className="abosolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]"/>
      <div className='absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]'/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6}}
        className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      </motion.div>
    </div>
  )



}

export default Login