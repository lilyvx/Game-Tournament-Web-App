import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { tournamentData } = await request.json();

    if (!tournamentData) {
      return NextResponse.json(
        { error: 'Missing tournament data' },
        { status: 400 }
      );
    }

    const matchResults = tournamentData.matches
      ? tournamentData.matches
          .map((m: any) => `${m.player1} vs ${m.player2}: Winner — ${m.winner} (${m.score})`)
          .join('\n')
      : 'No matches recorded.';

    const prompt = `You are an esports analyst writing a recap for competitive gaming fans.

Using ONLY the tournament results provided below, write an engaging summary covering:
- The champion and their final result
- The standout match of the tournament — based on scoreline only, either the closest/most competitive match or the most one-sided sweep
- One observation about how the tournament played out overall (e.g. dominant run, tightly contested field, upsets)

Formatting rules:
- 4-5 sentences, written as flowing prose (not bullet points or a list)
- Open with the champion's name and the tournament name
- Reference specific scores from the results below — do not invent players, stats, or moments not present in the data
- Tone: energetic and dramatic, like a post-tournament broadcast recap, but stay factual and grounded only in the scores given

Tournament: ${tournamentData.name || 'Tournament'}
Game: ${tournamentData.game || 'Esports Title'}
Total Matches: ${tournamentData.matches?.length || 0}

Results:
${matchResults}

Write the summary now:`;

    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
    });

    const summary = response.text || 'Unable to generate summary.';

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error('Gemini Summary Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate tournament summary' },
      { status: 500 }
    );
  }
}