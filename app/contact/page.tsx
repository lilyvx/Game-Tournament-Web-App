import { createServerSideClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { logout } from '../auth/actions'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const supabase = await createServerSideClient()

  const { data: { user } } = await supabase.auth.getUser()
  const userAlias = user?.user_metadata?.username || user?.email?.split('@')[0]

  const isAdmin = user !== null && user?.app_metadata?.role === 'admin'

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4a0006]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Modern Top Navigator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-white/5">
          {/* Brand Logo */}
          <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase group">
            Victors<span className="font-medium group-hover:brightness-125 transition" style={{ color: '#4a0006' }}>Only</span>
          </Link>

          {/* Main Navigation Links */}
          <div className="flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-light text-zinc-400">
            <Link href="/" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              Home
            </Link>
            <Link href="/arena" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              Arena
            </Link>
            <Link href="/news" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200">
              News
            </Link>
            <Link href="/contact" className="hover:text-white border-b border-transparent hover:border-[#4a0006] pb-1 transition-all duration-200 text-white">
              Contact Us
            </Link>
          </div>

          {/* User Auth Portal */}
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

        {/* Contact Content */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-6 space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider uppercase"> 
            CONTACT <span style={{ color: '#4a0006' }} className="font-medium">US</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light leading-relaxed">
            For any questions, concerns, or compliments, you can reach out via the Victors Contact page, call our hotline, or send us an email.
          </p>

          <div className="mt-8 space-y-4 text-center">
            <h2 className="text-sm tracking-widest uppercase font-light text-zinc-300">
              Hotline: <a href="tel:+60321671234" className="text-white hover:text-[#75040d] transition">+603 2167 1234</a>
            </h2>

            <p className="text-sm tracking-widest uppercase font-light text-zinc-300">
              Email: <a href="mailto:contact@victorsonly.com" className="text-white hover:text-[#75040d] transition">contact@victorsonly.com</a>
            </p>

            <div className="text-sm tracking-widest uppercase font-light text-zinc-300 space-y-2">
              <p>Follow us on Social Media</p>
              <div className="flex justify-center gap-6">
                <a href="https://facebook.com/victorsonly" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#75040d] transition">
                  Facebook
                </a>
                <a href="https://instagram.com/victorsonly" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#75040d] transition">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}