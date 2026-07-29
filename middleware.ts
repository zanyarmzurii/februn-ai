import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, '60 s'),
})

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()

  if (req.nextUrl.pathname.startsWith('/api') && !req.nextUrl.pathname.startsWith('/api/webhooks')) {
    const ip = req.ip ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return new NextResponse('Too many requests', { status: 429 })
    }
  }

  return res
}

export const config = {
  matcher: [
    '/api/:path*',
    '/teacher/dashboard/:path*',
    '/admin/:path*',
  ],
}
