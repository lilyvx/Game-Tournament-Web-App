import { createServerSideClient } from '@/lib/supabase-server'
import AICommentary from '@/app/components/AICommentary'
import Link from 'next/link'

export default async function SingleArenaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSideClient()

  // Fetch the specific tournament
  const { data: tournament, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', id)
    .single()

  if (error ||!tournament) {
    return <div className="text-white p-12">Tournament not found.</div>
  }

  // Fetch the real matches for this tournament
  const { data: matches, error: matchesError } = await supabase
    .from('matches')
    .select('id, player1, player2, winner, score')
    .eq('tournament_id', id)
    .order('created_at', { ascending: true })

  if (matchesError) {
    console.error('Matches Fetch Error:', matchesError.message)
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/arena" className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest">
          ← Back to Arenas
        </Link>

        <div>
          <span className="text-xs px-2 py-1 bg-white/10 rounded uppercase text-zinc-300">
            {tournament.game}
          </span>
          <h1 className="text-3xl font-bold mt-2">{tournament.title}</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Prize Pool: RM {Number(tournament.prize_pool).toLocaleString()}
          </p>
        </div>

        {/* AI Commentary Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-2">Match Commentary & Highlights</h2>

          {matches && matches.length > 0 ? (
            matches.map((match) => (
              <div key={match.id} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                <p className="text-sm text-zinc-400 mb-3">
                  {match.player1} vs {match.player2} — winner: {match.winner} ({match.score})
                </p>
                <AICommentary
                  matchData={{
                    tournamentName: tournament.title,
                    player1: match.player1,
                    player2: match.player2,
                    winner: match.winner,
                    score: match.score,
                    game: tournament.game,
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-zinc-500">No matches available for this tournament.</p>
          )}
        </div>
      </div>
    </main>
  )
}