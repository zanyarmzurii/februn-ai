import { SocialFeed } from '@/components/SocialFeed'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-amber-400 mb-8 text-center">Community</h1>
        <SocialFeed />
      </div>
    </div>
  )
}
