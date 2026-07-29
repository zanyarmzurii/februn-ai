import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.json({ valid: false }, { status: 400 })
  const supabase = createClient()
  const { data } = await supabase.from('certificates').select('*, profiles(full_name), teacher_courses(title)').eq('verification_code', code).single()
  if (!data) return NextResponse.json({ valid: false }, { status: 404 })
  return NextResponse.json({ valid: true, certificate: data })
}
