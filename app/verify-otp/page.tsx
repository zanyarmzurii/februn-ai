'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Clock } from 'lucide-react'

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const supabase = createClient()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
  }
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '')
    const newOtp = [...otp]
    pasted.split('').forEach((digit, i) => { if (i < 6) newOtp[i] = digit })
    setOtp(newOtp)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length < 6) { setError('تکایە هەموو ٦ ژمارە بنووسە'); return }
    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'signup' })
    if (error) setError(error.message)
    else router.push('/')
    setLoading(false)
  }

  const resendCode = () => {
    setCountdown(60)
    supabase.auth.signUp({ email })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="glass w-full max-w-md p-8 rounded-3xl border border-amber-400/20">
        <h1 className="text-2xl font-black text-amber-400 text-center mb-2">پشتڕاستکردنەوە</h1>
        <p className="text-center text-slate-400 mb-6">کۆدی ٦ ژمارەیی نێردراو بۆ {email}</p>
        <div className="flex justify-center gap-3 mb-6" dir="ltr">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { inputRefs.current[idx] = el }}
              type="text" inputMode="numeric" maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-bold bg-slate-800/50 border border-slate-700 rounded-xl focus:border-amber-400 outline-none"
              autoFocus={idx === 0}
            />
          ))}
        </div>
        {error && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl mb-4"><AlertCircle className="w-4 h-4" />{error}</div>}
        <button onClick={handleSubmit} disabled={loading} className="btn-3d w-full">{loading ? 'چاوەڕێ...' : 'پشتڕاستکردنەوە'}</button>
        <div className="flex justify-between mt-4 text-sm">
          <span className="flex items-center gap-1 text-slate-400"><Clock className="w-4 h-4" /> {countdown > 0 ? `${countdown}s` : 'بەسەرچوو'}</span>
          <button onClick={resendCode} disabled={countdown > 0} className="text-amber-400 disabled:opacity-50">ناردنەوە</button>
        </div>
      </div>
    </div>
  )
}
