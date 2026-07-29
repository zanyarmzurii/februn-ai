'use client'

import { useSpeech } from '@/hooks/useSpeech'
import { Mic, Volume2, Check } from 'lucide-react'
import { useState } from 'react'

export function PronunciationCoach({ targetWord }: { targetWord: string }) {
  const { transcript, isListening, startListening, speak } = useSpeech()
  const [score, setScore] = useState<number | null>(null)

  const handleCheck = () => {
    // Simple Levenshtein distance for scoring
    const distance = levenshtein(transcript.toLowerCase(), targetWord.toLowerCase())
    const maxLen = Math.max(targetWord.length, transcript.length)
    const similarity = ((maxLen - distance) / maxLen) * 100
    setScore(Math.round(similarity))
  }

  const handleSpeakTarget = () => speak(targetWord)

  const handleListen = () => {
    setScore(null)
    startListening()
  }

  return (
    <div className="card-glow p-6 text-center">
      <h3 className="text-xl font-bold mb-4">Pronunciation Coach</h3>
      <p className="text-2xl font-mono text-amber-400 mb-6">{targetWord}</p>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={handleListen} disabled={isListening} className="btn-3d flex items-center gap-2">
          <Mic className="w-5 h-5" /> {isListening ? 'Listening...' : 'Speak'}
        </button>
        <button onClick={handleSpeakTarget} className="btn-3d-emerald flex items-center gap-2">
          <Volume2 className="w-5 h-5" /> Listen
        </button>
      </div>
      {transcript && (
        <div className="mt-4">
          <p className="text-slate-300">You said: <span className="font-bold text-white">{transcript}</span></p>
          <button onClick={handleCheck} className="btn-3d mt-2">Check Pronunciation</button>
          {score !== null && (
            <div className={`mt-2 text-2xl font-black ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              {score}% accurate
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Helper: Levenshtein distance
function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return matrix[a.length][b.length];
}
