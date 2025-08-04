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

// Remover configuração de runtime - usar Edge Runtime padrão com fallbacks

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Verificar se as variáveis de ambiente estão disponíveis
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Durante o build, apenas prosseguir sem autenticação
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
  const authRoutes = ['/login', '/register']
  const { pathname } = req.nextUrl

  // Primeira verificação: cookies de autenticação
  const authCookies = getAuthCookies(req)
  const hasValidCookies = authCookies !== null
  const isAuthenticatedViaCookies = isAuthenticatedFromCookies(req)
  const isAdminViaCookies = isAdminFromCookies(req)

  // Se está tentando acessar rotas de auth estando logado (via cookies ou sessão)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (hasValidCookies && authCookies) {
      // Usa dados dos cookies para redirecionamento rápido
      if (authCookies.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/games', req.url))
      }
    } else if (session) {
      // Fallback: consulta banco se não há cookies válidos mas há sessão
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!error && user) {
        // Salva dados nos cookies para próximas requisições
        setAuthCookies(res, {
          userId: user.id,
          role: user.role,
          email: user.email,
          username: user.username,
          name: user.name
        })

        // Redireciona baseado no role
        if (user.role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        } else {
          return NextResponse.redirect(new URL('/games', req.url))
        }
      }
    }
  }

  // Se está tentando acessar rota protegida
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Verifica primeiro pelos cookies (mais rápido)
    if (!isAuthenticatedViaCookies && !session) {
      clearAuthCookies(res)
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Se há cookies válidos, permite acesso direto
    if (hasValidCookies) {
      // Para rotas de admin, verifica se tem permissão
      if (adminRoutes.some(route => pathname.startsWith(route))) {
        if (!isAdminViaCookies) {
          return NextResponse.redirect(new URL('/games', req.url))
        }
      }
      return res
    }

    // Fallback: se não há cookies válidos mas há sessão, revalida
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

      // Salva dados nos cookies para próximas requisições
      setAuthCookies(res, {
        userId: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        name: user.name
      })

      // Verifica permissões de admin
      if (adminRoutes.some(route => pathname.startsWith(route)) && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/games', req.url))
      }
    }
  }

  // Limpa cookies se não há sessão ativa
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