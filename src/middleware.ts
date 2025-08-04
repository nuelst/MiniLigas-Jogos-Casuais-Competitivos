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

  // Se está tentando acessar rotas de auth estando logado, redireciona baseado no role
  if (authRoutes.some(route => pathname.startsWith(route)) && session) {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!error && user) {
      // Salva informações básicas do usuário nos cookies
      res.cookies.set('user-role', user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })

      // Redireciona baseado no role
      if (user.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } else {
        return NextResponse.redirect(new URL('/games', req.url))
      }
    }

    // Fallback se houver erro ao buscar usuário
    return NextResponse.redirect(new URL('/games', req.url))
  }

  // Se está tentando acessar rota protegida sem estar logado
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Verificação específica para rotas de admin
  if (adminRoutes.some(route => pathname.startsWith(route)) && session) {
    // Primeiro verifica se já temos o role no cookie
    const userRole = req.cookies.get('user-role')?.value

    if (userRole === 'admin') {
      // Se já sabemos que é admin, permite o acesso
      return res
    }

    // Se não temos o role no cookie ou não é admin, consulta o banco
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (error || !user || user.role !== 'admin') {
      // Remove cookie incorreto se existir
      res.cookies.delete('user-role')
      return NextResponse.redirect(new URL('/games', req.url))
    }

    // Atualiza o cookie com a informação correta
    res.cookies.set('user-role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })
  }

  // Limpa cookies de role se não há sessão ativa
  if (!session && req.cookies.get('user-role')) {
    res.cookies.delete('user-role')
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