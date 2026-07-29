'use client'

import { useAI } from '@/hooks/useAI'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function AIQuizGenerator({ onQuestionsGenerated }: { onQuestionsGenerated: (q: any[]) => void }) {
  const { generate, isReady, loading } = useAI()
  const [topic, setTopic] = useState('')
  const [quiz, setQuiz] = useState<any[]>([])

  const handleGenerate = () => {
    if (!isReady) return
    generate(
      `Generate 5 multiple choice questions about ${topic}. Return only JSON array with fields: question, options, correct.`,
      (text) => {
        try {
          const jsonStart = text.indexOf('[')
          const jsonEnd = text.lastIndexOf(']') + 1
          const jsonStr = text.substring(jsonStart, jsonEnd)
          const questions = JSON.parse(jsonStr)
          setQuiz(questions)
          onQuestionsGenerated(questions)
        } catch (e) {
          alert('Failed to parse AI response. Try again.')
        }
      }
    )
  }

  return (
    <div className="space-y-4">
      <textarea
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="بابەت بنووسە..."
        className="w-full bg-slate-800 rounded-xl p-3 text-sm"
        rows={2}
      />
      <button
        onClick={handleGenerate}
        disabled={!isReady || loading}
        className="btn-3d w-full"
      >
        {loading ? <Loader2 className="animate-spin inline w-5 h-5 ml-2" /> : 'Generate Quiz'}
      </button>
      {quiz.length > 0 && (
        <div className="mt-4 space-y-2">
          {quiz.map((q, i) => (
            <div key={i} className="bg-slate-800/50 p-3 rounded-lg">
              <p className="font-bold">{q.question}</p>
              <ul className="list-disc list-inside text-sm text-slate-300">
                {q.options.map((opt: string, j: number) => (
                  <li key={j} className={j === q.correct ? 'text-emerald-400 font-medium' : ''}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
