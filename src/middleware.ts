import {
  clearAuthCookies,
  getAuthCookies,
  isAdminFromCookies,
  isAuthenticatedFromCookies,
  setAuthCookies
} from '@/lib/auth-cookies'
import type { Database } from '@/types/database'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'



export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next()
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: Record<string, unknown>) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const protectedRoutes = ['/dashboard', '/games', '/you']
  const adminRoutes = ['/dashboard']
  const playerRoutes = ['/games', '/you']
  const authRoutes = ['/login', '/register']
  const { pathname } = req.nextUrl

  const authCookies = getAuthCookies(req)
  const hasValidCookies = authCookies !== null
  const isAuthenticatedViaCookies = isAuthenticatedFromCookies(req)
  const isAdminViaCookies = isAdminFromCookies(req)

  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (hasValidCookies && authCookies) {
      if (authCookies.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/games', req.url))
      }
    } else if (session) {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!error && user) {
        setAuthCookies(res, {
          userId: user.id,
          role: user.role,
          email: user.email,
          username: user.username,
          name: user.name
        })

        if (user.role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        } else {
          return NextResponse.redirect(new URL('/games', req.url))
        }
      }
    }
  }

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticatedViaCookies && !session) {
      clearAuthCookies(res)
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (hasValidCookies) {
      // Admin não pode acessar rotas de player
      if (playerRoutes.some(route => pathname.startsWith(route)) && isAdminViaCookies) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      // Player não pode acessar rotas de admin
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (!isAdminViaCookies) {
          return NextResponse.redirect(new URL('/games', req.url))
        }
      }
      return res
    }

    if (session) {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error || !user) {
        clearAuthCookies(res)
        return NextResponse.redirect(new URL('/login', req.url))
      }

      setAuthCookies(res, {
        userId: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        name: user.name
      })

      if (playerRoutes.some(route => pathname.startsWith(route)) && user.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      if (adminRoutes.some(route => pathname.startsWith(route)) && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/games', req.url))
      }
    }
  }


  if (!session && (req.cookies.has('auth-data') || req.cookies.has('user-role'))) {
    clearAuthCookies(res)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}