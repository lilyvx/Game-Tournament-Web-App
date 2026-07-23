import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { matchData } = await req.json();

    const prompt = `Provide an energetic 2-paragraph esports commentary for this match:
    Tournament: ${matchData?.tournamentName || 'Tournament'}
    Game: ${matchData?.game || 'Esports'}
    Matchup: ${matchData?.player1 || 'Player A'} vs ${matchData?.player2 || 'Player B'}
    Winner: ${matchData?.winner || 'Winner'} (${matchData?.score || 'N/A'})`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
    });

    return NextResponse.json({ commentary: response.text });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate commentary' },
      { status: 500 }
    );
  }
}