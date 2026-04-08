"use client";
import React, { useState } from 'react';

// Define what a Tournament looks like (TypeScript)
interface Tournament {
  id: number;
  title: string;
  game: string;
  date: string;
  prize: string;
  status: 'Draft' | 'Live' | 'Cancelled';
}

export default function DiscoveryPage() {
  // Simulated Database using State
  const [tournaments, setTournaments] = useState<Tournament[]>([
    { id: 1, title: "Kajang Valorant Cup", game: "Valorant", date: "2026-05-10", prize: "RM 500", status: 'Live' },
    { id: 2, title: "Apex Legends Pro-Am", game: "Apex Legends", date: "2026-06-15", prize: "RM 1000", status: 'Live' },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // DELETE Function
  const cancelTournament = (id: number) => {
    setTournaments(tournaments.map(t => 
      t.id === id ? { ...t, status: 'Cancelled' } : t
    ));
  };

  // SEARCH/FILTER Logic
  const filteredTournaments = tournaments.filter(t => 
    t.game.toLowerCase().includes(searchQuery.toLowerCase()) && t.status !== 'Cancelled'
  );

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      {/* Header section inspired by your photo */}
      <header className="text-center my-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Discovery</h1>
        <p className="text-gray-400">Bridging the gap between players and glory.</p>
      </header>

      {/* SEARCH BAR (The Rounded Box) */}
      <div className="mb-12">
        <label className="block text-sm font-medium mb-2 text-gray-400">Search by Game</label>
        <input 
          type="text"
          placeholder="e.g. Valorant, Apex..."
          className="w-full p-4 rounded-full bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* READ: Tournament List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTournaments.map((t) => (
          <div key={t.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl hover:border-zinc-500 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{t.game}</span>
              <span className="text-xs bg-white text-black px-2 py-1 rounded-md font-bold">{t.status}</span>
            </div>
            <h2 className="text-2xl font-bold mt-2">{t.title}</h2>
            <p className="text-gray-400 mt-1">{t.date} • {t.prize}</p>
            
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition">
                View Details
              </button>
              {/* DELETE: Cancel Button */}
              <button 
                onClick={() => cancelTournament(t.id)}
                className="px-4 py-3 rounded-full border border-zinc-800 text-red-500 hover:bg-red-500/10 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}