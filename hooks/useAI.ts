'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useAI() {
  const workerRef = useRef<Worker>()
  const [isReady, setIsReady] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const worker = new Worker('/workers/ai.worker.js')
    workerRef.current = worker

    worker.onmessage = (e) => {
      if (e.data.type === 'ready') setIsReady(true)
      else if (e.data.type === 'progress') setLoading(true)
      else if (e.data.type === 'result') {
        // handle result via callback
        if (workerRef.current?.onResult) workerRef.current.onResult(e.data.text)
        setLoading(false)
      }
    }

    worker.postMessage({ type: 'load' })
    return () => worker.terminate()
  }, [])

  const generate = useCallback((prompt: string, callback: (text: string) => void) => {
    if (!workerRef.current) return
    (workerRef.current as any).onResult = callback
    workerRef.current.postMessage({ type: 'generate', prompt })
  }, [])

  return { generate, isReady, loading }
}
