'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { login } from '../actions'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  // State Management
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    setError('')

    // Prepare data for action format
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    if (result?.success) {
      router.push('/')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#4a0006]/20 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        
        <div className="p-8 rounded-3xl space-y-6 bg-gradient-to-b from-zinc-900/40 to-black/60 border border-white/5 backdrop-blur-xl shadow-[0_0_80px_rgba(74,0,6,0.15)]">

          {/* Header Section */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-white">
              Victors<span className="font-medium" style={{ color: '#4a0006' }}>Only</span>
            </h1>
            <p className="text-zinc-500 text-xs tracking-wider uppercase">Sign in to arena</p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="text-center text-xs text-red-500 bg-red-500/10 border border-red-500/20 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
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

            {/* Remember Options Row */}
            <div className="flex justify-between items-center text-xs px-2 pt-1">
              <label className="flex items-center gap-2 text-zinc-500 cursor-pointer select-none hover:text-zinc-300 transition">
                <input 
                  type="checkbox" 
                  className="accent-[#4a0006] w-3 h-3 bg-zinc-900 border-zinc-700 rounded" 
                />
                Remember me
              </label>
              <a href="#" className="text-zinc-500 hover:text-[#4a0006] transition">Forgot Password?</a>
            </div>

            {/*Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 mt-2 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#4a0006]/10"
              style={{ background: '#4a0006' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#610009')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4a0006')}
            >
              {loading ? 'Verifying...' : 'Enter Arena'}
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="text-center text-xs text-zinc-500 pt-2">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-white underline hover:text-zinc-300 transition">Register</a>
          </p>

        </div>
      </div>
    </main>
  )
}