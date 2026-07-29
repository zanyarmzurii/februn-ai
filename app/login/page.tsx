'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Eye, EyeOff, Chrome, Apple, Facebook, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const supabase = createClient()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleOAuth = async (provider: 'google' | 'apple' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="glass w-full max-w-md p-8 rounded-3xl border border-amber-400/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-amber-400">Fêrbûn AI</h1>
          <p className="text-slate-400 mt-1">{mode === 'login' ? 'بەخێربێیتەوە' : 'هەژمارێکی نوێ دروست بکە'}</p>
        </div>
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">ئیمەیڵ</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-800/50 rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:border-amber-400 outline-none"
                placeholder="you@example.com"
                required
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">تێپەڕوشە</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 rounded-xl pl-10 pr-12 py-3 border border-slate-700 focus:border-amber-400 outline-none"
                placeholder="••••••••"
                required
                dir="ltr"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-slate-400">
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-3d w-full">
            {loading ? 'چاوەڕێ...' : mode === 'login' ? 'چوونەژوورەوە' : 'تۆماربوون'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-900 text-slate-400">یان</span></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => handleOAuth('google')} className="flex justify-center bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition"><Chrome className="w-5 h-5" /></button>
          <button onClick={() => handleOAuth('apple')} className="flex justify-center bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition"><Apple className="w-5 h-5" /></button>
          <button onClick={() => handleOAuth('facebook')} className="flex justify-center bg-slate-800 hover:bg-slate-700 py-3 rounded-xl transition"><Facebook className="w-5 h-5" /></button>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          {mode === 'login' ? 'هەژمارت نییە؟ ' : 'پێشتر هەژمارت هەیە؟ '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-amber-400 hover:underline">
            {mode === 'login' ? 'تۆماربوون' : 'چوونەژوورەوە'}
          </button>
        </p>
        <div className="mt-4 text-center text-sm"><Link href="/verify-otp" className="text-slate-500 hover:text-amber-400">پشتڕاستکردنەوە بە OTP</Link></div>
      </div>
    </div>
  )
}
