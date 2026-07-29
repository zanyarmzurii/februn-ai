import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { embedding } = await req.json()
  const supabase = createClient()
  const { data, error } = await supabase.rpc('match_sentences', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 20,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ results: data })
}
