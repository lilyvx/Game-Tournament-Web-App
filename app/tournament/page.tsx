import { createServerSideClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { createTournament } from '../auth/actions'

export const dynamic = 'force-dynamic'

interface Tournament {
  id: number
  title: string
  game: string
  date: string
  prize_pool: number
  status: string
}

export default async function TournamentHubPage() {
  const supabase = await createServerSideClient()

  // 1. Check user login status
  const { data: { user } } = await supabase.auth.getUser()
  const userAlias = user?.user_metadata?.username || user?.email?.split('@')[0]
  const isLoggedIn = user !== null

  // 2. Fetch all tournaments to display on the grid
  const { data: tournaments, error } = await supabase
    .from('tournaments')
    .select('id, title, game, date, prize_pool, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tournaments:', error.message)
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 relative overflow-hidden">
      {/* Visual Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4a0006]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center pb-6 border-b border-white/5">
          <Link href="/" className="text-xl font-light tracking-[0.3em] uppercase">
            Victors<span className="font-medium" style={{ color: '#4a0006' }}>Only</span>
          </Link>
          <Link href="/" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition">
            ← Back to Home
          </Link>
        </div>

        {/* Introduction */}
        <div className="space-y-2">
          <h2 className="text-3xl font-light tracking-wider uppercase">
            Battle <span style={{ color: '#4a0006' }} className="font-medium">Arenas</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light max-w-xl">
            Manage your deployments and explore live brackets across active gaming systems.
          </p>
        </div>

        {/* UNIFIED CREATION PANEL: Displays right here on the same page */}
        <div className="max-w-4xl mx-auto">
          {isLoggedIn ? (
            <div className="p-8 rounded-2xl border border-[#4a0006]/30 bg-gradient-to-r from-zinc-950 to-black">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4a0006] animate-ping" />
                Deploy New Tournament Arena
              </h3>
              
              <form action ={createTournament} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Tournament Title</label>
                  <input required type="text" name="title" placeholder="e.g., Summer Clash" className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white placeholder-zinc-600" />
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
                  <input required type="number" name="prize_pool" placeholder="5000" className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4a0006] text-white placeholder-zinc-600" />
                </div>

                <div className="md:col-span-4 flex justify-between items-center pt-4">
                  <p className="text-zinc-500 text-[11px] font-light italic">
                    Logged in as <span className="text-white font-medium">@{userAlias}</span>
                  </p>
                  <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white transition-all hover:brightness-125" style={{ backgroundColor: '#4a0006' }}>
                    Publish Arena
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md text-center space-y-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-300">
                Want to Host your own Arena?
              </h3>
              <p className="text-zinc-500 text-xs font-light max-w-sm mx-auto">
                Only authenticated organizers can deploy new tournament brackets.
              </p>
              <div>
                <Link href="/auth/login" className="inline-block px-6 py-2.5 rounded-full border border-white/20 hover:border-white text-xs uppercase tracking-widest transition">
                  Sign In to Create Arenas
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Brackets Listing Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {tournaments && tournaments.length > 0 ? (
            tournaments.map((tournament: Tournament) => (
              <div key={tournament.id} className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/40 to-black/60 border border-white/5 flex flex-col justify-between min-h-[220px] hover:border-[#4a0006]/40 transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] tracking-widest uppercase">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                      {tournament.game}
                    </span>
                    <span className="text-emerald-500 font-medium">
                      • REGISTRATION OPEN
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100 pt-2">{tournament.title}</h3>
                  <p className="text-zinc-500 text-xs font-light">
                    Scheduled: {new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <div>
                    <p className="text-[9px] text-zinc-500 uppercase">Prize Pool</p>
                    <p className="text-base font-semibold text-white">RM {Number(tournament.prize_pool).toLocaleString()}</p>
                  </div>
                  <button className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white" style={{ backgroundColor: '#4a0006' }}>
                    View Arena
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-12 text-zinc-500 text-sm font-light border border-dashed border-white/10 rounded-2xl">
              No active arenas found. Add a tournament to see it appear live!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}