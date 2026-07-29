'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'

export function SocialFeed() {
  const supabase = createClient()
  const [posts, setPosts] = useState<any[]>([])
  const [content, setContent] = useState('')

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*, profiles!posts_user_id_fkey(full_name)').order('created_at', { ascending: false }).limit(20)
    setPosts(data || [])
  }

  useEffect(() => {
    fetchPosts()
    const channel = supabase
      .channel('public-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => fetchPosts())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const handlePost = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !content.trim()) return
    await supabase.from('posts').insert({ user_id: user.id, content })
    setContent('')
  }

  return (
    <div className="space-y-6">
      <div className="card-glow p-4">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="پەیامێک بنووسە..."
          className="w-full bg-slate-800 rounded-xl p-3 text-sm"
          rows={3}
        />
        <button onClick={handlePost} className="btn-3d mt-2">بڵاوکردنەوە</button>
      </div>

      {posts.map(post => (
        <div key={post.id} className="card-glow p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
              {post.profiles?.full_name?.[0] || '?'}
            </div>
            <div>
              <span className="font-bold text-sm">{post.profiles?.full_name}</span>
              <span className="text-xs text-slate-400 block">{new Date(post.created_at).toLocaleDateString('ku')}</span>
            </div>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{post.content}</p>
          <div className="flex gap-4 mt-3 text-slate-400 text-sm">
            <button className="flex items-center gap-1 hover:text-red-400"><Heart className="w-4 h-4" /> Like</button>
            <button className="flex items-center gap-1 hover:text-amber-400"><MessageCircle className="w-4 h-4" /> Comment</button>
          </div>
        </div>
      ))}
    </div>
  )
}
