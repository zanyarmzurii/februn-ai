'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function useDuel(duelId: string) {
  const supabase = createClient()
  const [question, setQuestion] = useState<any>(null)
  const [scores, setScores] = useState<Record<string, number>>({})

  useEffect(() => {
    const channel = supabase
      .channel(`duel-${duelId}`)
      .on('broadcast', { event: 'new_question' }, ({ payload }) => setQuestion(payload))
      .on('broadcast', { event: 'score_update' }, ({ payload }) => setScores(payload))
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [duelId, supabase])

  const answer = (answer: string) => {
    channel.send({
      type: 'broadcast',
      event: 'answer',
      payload: { userId: (await supabase.auth.getUser()).data.user?.id, answer },
    })
  }

  return { question, scores, answer }
}
