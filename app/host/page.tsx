"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HostPage() {
  const router = useRouter();
  
  // CREATE: Form State
  const [formData, setFormData] = useState({
    title: '',
    game: 'Valorant',
    date: '',
    prize: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving to Database:", formData);
    alert("Tournament Created as Draft!");
    router.push('/'); // Go back to discovery
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Host Tournament</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Tournament Title</label>
            <input 
              required
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white outline-none"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Select Game</label>
            <select 
              className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white outline-none"
              onChange={(e) => setFormData({...formData, game: e.target.value})}
            >
              <option>Valorant</option>
              <option>CS:GO</option>
              <option>Fortnite</option>
              <option>Apex Legends</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-400">Date</label>
              <input 
                type="date"
                className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white outline-none text-sm"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-400">Prize Pool</label>
              <input 
                placeholder="RM 0.00"
                className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-white outline-none"
                onChange={(e) => setFormData({...formData, prize: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-8 bg-white text-black py-4 rounded-full font-bold hover:scale-[1.02] transition-transform"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
}