"use client";
import { useState } from "react";

interface MatchData {
  tournamentName: string;
  player1: string;
  player2: string;
  winner: string;
  score: string;
  game: string;
}

interface AICommentaryProps {
  matchData: MatchData;
}

export default function AICommentary({ matchData }: AICommentaryProps) {
  const [commentary, setCommentary] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const generateCommentary = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch("/api/commentary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchData }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setCommentary(data.commentary);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate commentary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
      <button
        onClick={generateCommentary}
        disabled={loading}
        className="px-4 py-2 text-white rounded-lg hover:brightness-125 disabled:opacity-50 transition"
        style={{ backgroundColor: '#4a0006' }}
      >
        {loading ? "Generating..." : "Generate AI Commentary"}
      </button>

      {/* Error Output */}
      {errorMsg && (
        <div className="p-3 bg-red-950/50 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono">
          ⚠️ {errorMsg}
        </div>
      )}

      {commentary && (
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-sm leading-relaxed space-y-2">
          <p className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">AI Match Highlights</p>
          <div className="whitespace-pre-line">{commentary}</div>
        </div>
      )}
    </div>
  );
}