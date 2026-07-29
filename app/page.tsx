import Link from 'next/link'
import { Flag } from '@/components/Flag'
import { SponsorshipBanner } from '@/components/SponsorshipBanner'
import { LicenseKeySystem } from '@/components/LicenseKeySystem'
import { DeveloperProfile } from '@/components/DeveloperProfile'
import { Flame, Coins, Heart, Star, Lock, Gift, Sword, Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <header className="sticky top-0 z-50 glass border-b border-amber-400/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag className="w-8 h-8" />
          <span className="font-black text-xl text-amber-400">Fêrbûn AI</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1"><Flame className="w-5 h-5 text-orange-400" /> 12</div>
          <div className="flex items-center gap-1"><Coins className="w-5 h-5 text-yellow-400" /> 340</div>
          <div className="flex items-center gap-1"><Heart className="w-5 h-5 text-red-400" /> 5</div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pricing" className="btn-3d text-sm px-4 py-2">Abone</Link>
          <Link href="/developer" className="text-sm text-amber-400 hover:underline">پەرەپێدەر</Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-16 px-4 text-center">
        <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')] bg-repeat"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-4"><Flag className="w-24 h-24" /></div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">Fêrbûn AI</h1>
          <p className="text-slate-300 mt-3 text-xl">فێری زمانەکان بە بە هاوکاری AI – تەواو خۆرایی</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/community" className="px-4 py-2 glass rounded-full text-sm flex items-center gap-1 hover:bg-amber-400/20"><Users className="w-4 h-4" /> کۆمەڵگە</Link>
            <Link href="/duels" className="px-4 py-2 glass rounded-full text-sm flex items-center gap-1 hover:bg-red-400/20"><Sword className="w-4 h-4" /> یاری دووانە</Link>
          </div>
        </div>
      </section>

      <SponsorshipBanner position="top" />

      <section className="max-w-2xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">ڕێڕەوی فێربوونت</h2>
        {/* Roadmap same as before */}
      </section>

      <SponsorshipBanner position="middle" />

      <section className="max-w-4xl mx-auto px-4 mt-16"><LicenseKeySystem /></section>
      <SponsorshipBanner position="bottom" />

      <section className="max-w-4xl mx-auto px-4 mt-16"><DeveloperProfile /></section>

      <footer className="mt-16 border-t border-slate-800 py-6 text-center text-slate-500 text-sm">
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/about">دەربارە</Link>
          <Link href="/privacy">تایبەتمەندی</Link>
          <Link href="/terms">مەرجەکان</Link>
          <Link href="/admin">ئەدمین</Link>
          <Link href="/teacher">مامۆستایان</Link>
          <Link href="/community">کۆمەڵگە</Link>
          <Link href="/duels">دووەڵ</Link>
        </div>
        <p className="mt-2">© 2026 Fêrbûn AI. هەموو مافێک پارێزراوە.</p>
      </footer>
    </main>
  )
}
