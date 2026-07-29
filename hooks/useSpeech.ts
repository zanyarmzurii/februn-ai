'use client'

import { useState } from 'react'

export function useSpeech() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'ku'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript
      setTranscript(spoken)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.start()
    setIsListening(true)
  }

  const speak = (text: string, lang = 'ku') => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    window.speechSynthesis.speak(utterance)
  }

  return { transcript, isListening, startListening, speak }
}
