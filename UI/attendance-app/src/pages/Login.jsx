import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api'
import { useAuth } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Decode JWT to get role
      const role = data.role
      console.log(data.token) // Debug log
      login(data) // Save to context & localStorage
      if (role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/employee')
      }
    },
    onError: (err) => {
      setErrorMsg(err.message || 'Login failed')
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    mutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background neon blobs */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-4"
      >
        <Card className="border-zinc-800 bg-black/50 backdrop-blur-xl text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">Sign In</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email and password to access the Attendance System
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-zinc-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:ring-zinc-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:ring-zinc-700"
                />
              </div>
              {errorMsg && (
                <div className="text-sm font-medium text-red-500">
                  {errorMsg}
                </div>
              )}
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-white text-black hover:bg-zinc-200 mt-2 font-medium"
              >
                {mutation.isPending ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login