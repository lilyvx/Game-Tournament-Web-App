import { createServerSideClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { logout } from './auth/actions'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createServerSideClient()

  const { data: { user } } = await supabase.auth.getUser()
  const userAlias = user?.user_metadata?.username || user?.email?.split('@')[0]
  const isAdmin = user !== null && user?.app_metadata?.role === 'admin'

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 relative overflow-hidden flex flex-col justify-between">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4a0006]/10 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full space-y-24 relative z-10 flex-grow flex flex-col justify-between">
        
        {/* Top Navigator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-white/5 w-full">
          {/* Brand Logo */}
          <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase group">
            Victors<span className="font-medium group-hover:brightness-125 transition" style={{ color: '#4a0006' }}>Only</span>
          </Link>
          
          {/* navigation link */}
          <div className="flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-light text-zinc-400">
            <Link href="/" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200 text-white">
              Home
            </Link>
            <Link href="/arena" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              Arena
            </Link>
            <Link href="/news" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              News
            </Link>
            <Link href="/contact" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              Contact Us
            </Link>
          </div>

          {/*user auth*/}
          <div className="flex items-center space-x-6 text-xs tracking-widest uppercase">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <span className="px-3 py-1 rounded-full border border-[#4a0006] text-[#4a0006] text-[10px] font-bold tracking-widest uppercase bg-[#4a0006]/10">
                    Admin Mode
                  </span>
                )}
                <span className="text-zinc-500 font-light lowercase">@{userAlias}</span>
                <form action={logout}>
                  <button type="submit" className="px-5 py-2 rounded-full border border-[#4a0006]/40 hover:bg-[#4a0006]/20 transition text-zinc-300 hover:text-white">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/auth/login" className="px-5 py-2 rounded-full border border-white/20 hover:border-white transition">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Hero */}
        <div className="text-center py-12 my-auto space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-light tracking-wider uppercase leading-tight">
              CLAIM YOUR <span style={{ color: '#4a0006' }} className="font-medium animate-pulse">DOMINANCE</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              Step into the proving grounds. VictorsOnly connects local elite competitors with premium organized tournaments. Join us! No fear. Just competitive integrity and massive pools.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <Link 
              href="/arena" 
              className="px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-white transition-all hover:brightness-125 hover:scale-[1.02]" 
              style={{ backgroundColor: '#4a0006' }}
            >
              Enter The Arena
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Temp footer */}
        <div className="text-center text-[10px] tracking-[0.3em] text-zinc-600 uppercase pt-6 border-t border-white/5">
          © {new Date().getFullYear()} VictorsOnly. All rights reserved.
        </div>

      </div>
    </main>
  )
}