import { createServerSideClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { logout, createTournament } from './auth/action' 

export const dynamic = 'force-dynamic'

interface Tournament {
  id: number
  title: string
  game: string
  date: string
  prize_pool: number
  status: string
}

export default async function HomePage() {
  const supabase = await createServerSideClient()

  const { data: { user } } = await supabase.auth.getUser()
  const userAlias = user?.user_metadata?.username || user?.email?.split('@')[0]

  const isAdmin = user !== null && user?.app_metadata?.role === 'admin'

  const { data: tournaments, error } = await supabase
    .from('tournament')
    .select('id, title, game, date, prize_pool, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tournaments:', error.message)
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4a0006]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-light tracking-[0.3em] uppercase">
            Victors<span className="font-medium" style={{ color: '#4a0006' }}>Only</span>
          </h1>
          <div className="flex items-center space-x-6 text-xs tracking-widest uppercase">
            <a href="#arenas" className="hover:text-zinc-400 transition">Arenas</a>
            
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
        <div className="text-center py-6 space-y-4">
          <h2 className="text-4xl md:text-6xl font-light tracking-wider uppercase">
            CLAIM YOUR <span style={{ color: '#4a0006' }} className="font-medium animate-pulse">DOMINANCE</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto font-light leading-relaxed">
            Browse active community tournaments, secure your team allocation, and compete for massive local prize pools.
          </p>
        </div>

        {/* ADMIN CREATION INTERFACE */}
        {isAdmin && (
          <div className="p-8 rounded-2xl border border-[#4a0006]/30 bg-gradient-to-r from-zinc-950 to-black max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-300 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4a0006] animate-ping" />
              Deploy New Tournament Arena
            </h3>
            
            <form action={createTournament} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Tournament Title</label>
                <input required type="text" name="title" placeholder="e.g., Tournament " className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white placeholder-zinc-600" />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Game Title</label>
                <input required type="text" name="game" placeholder="e.g., Valorant" className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white placeholder-zinc-600" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Event Date</label>
                <input required type="date" name="date" className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white text-zinc-400" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Prize Pool (RM)</label>
                <div className="relative">
                  <input required type="number" name="prize_pool" placeholder="5000" className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white placeholder-zinc-600" />
                </div>
              </div>

              <div className="md:col-span-4 flex justify-end pt-2">
                <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white transition-all hover:brightness-125" style={{ backgroundColor: '#4a0006' }}>
                  Publish Arena
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tournament Grid */}
        <div id="arenas" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {tournaments && tournaments.length > 0 ? (
            tournaments.map((tournament: Tournament) => (
              <div 
                key={tournament.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/40 to-black/60 border border-white/5 backdrop-blur-md flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-[#4a0006]/40"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] tracking-widest uppercase">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                      {tournament.game}
                    </span>
                    <span className={`font-medium ${tournament.status === 'active' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      • {tournament.status === 'active' ? 'REGISTRATION OPEN' : 'CLOSED'}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium tracking-wide text-zinc-100 pt-2">
                    {tournament.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-light">
                    Scheduled: {new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <div>
                    <p className="text-[9px] text-zinc-500 tracking-wider uppercase">Prize Pool</p>
                    <p className="text-base font-semibold text-white">
                      RM {Number(tournament.prize_pool).toLocaleString()}
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors" style={{ backgroundColor: '#4a0006' }}>
                    View Arena
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-12 text-zinc-500 text-sm font-light border border-dashed border-white/10 rounded-2xl">
              No active arenas found. Add a tournament row to your `tournament` table to see it appear live!
            </div>
          )}
        </div>

      </div>
    </main>
  )
}