'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '../action'

export default function RegisterPage() {
  const router = useRouter()

  //state Management
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !email || !password) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)

    const result = await signup(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // handle clientside transition
    if (result?.success) {
      router.push('/auth/login')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">
    
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#4a0006]/20 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        
        <div className="p-8 rounded-3xl space-y-6 bg-gradient-to-b from-zinc-900/40 to-black/60 border border-white/5 backdrop-blur-xl shadow-[0_0_80px_rgba(74,0,6,0.15)]">

          {/* Header*/}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-white">
              Victors<span className="font-medium" style={{ color: '#4a0006' }}>Only</span>
            </h1>
            <p className="text-zinc-500 text-xs tracking-wider uppercase">Forge your profile</p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="text-center text-xs text-red-500 bg-red-500/10 border border-red-500/20 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Username Field */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Name" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-5 py-3 pr-12 rounded-full text-white text-sm bg-white/5 border border-white/10 placeholder-white/20 focus:border-[#4a0006] focus:outline-none transition duration-200"
              />
              
            </div>

            {/* Email Field */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 pr-12 rounded-full text-white text-sm bg-white/5 border border-white/10 placeholder-white/20 focus:border-[#4a0006] focus:outline-none transition duration-200"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 text-sm">✉</span>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 pr-12 rounded-full text-white text-sm bg-white/5 border border-white/10 placeholder-white/20 focus:border-[#4a0006] focus:outline-none transition duration-200"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition text-sm focus:outline-none"
              >
                {showPassword ? 'hide' : 'show'}
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#4a0006]/10"
              style={{ background: '#4a0006' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#610009')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4a0006')}
            >
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-zinc-500 pt-2">
            Already have an account?{' '}
            <a href="/auth/login" className="text-white underline hover:text-zinc-300 transition">Login</a>
          </p>

        </div>
      </div>
    </main>
  )
}