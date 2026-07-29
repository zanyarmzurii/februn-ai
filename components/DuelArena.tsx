'use client'

import { useState, useEffect } from 'react'
import { useDuel } from '@/hooks/useDuel'
import { Sword, Clock } from 'lucide-react'

export function DuelArena({ duelId }: { duelId: string }) {
  const { question, scores, answer } = useDuel(duelId)
  const [selected, setSelected] = useState<number | null>(null)
  const [timer, setTimer] = useState(10)

  useEffect(() => {
    if (!question) return
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          // time's up
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [question])

  const handleAnswer = (idx: number) => {
    setSelected(idx)
    answer(String(idx))
  }

  if (!question) return <div className="text-center py-20">Waiting for opponent...</div>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-black text-amber-400">Duel</h2>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-5 h-5" /> {timer}s
        </div>
      </div>
      <div className="card-glow p-6 mb-4">
        <p className="text-xl font-bold mb-4">{question.prompt}</p>
        <div className="grid grid-cols-2 gap-3">
          {question.options?.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className={`btn-3d text-sm p-4 ${
                selected === idx ? 'bg-amber-500' : ''
              } ${selected !== null && idx === question.correct ? 'bg-emerald-500' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(scores).map(([userId, score]) => (
          <div key={userId} className="card-glow p-3 text-center">
            <Sword className="w-6 h-6 mx-auto text-amber-400" />
            <p className="font-bold">{score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
