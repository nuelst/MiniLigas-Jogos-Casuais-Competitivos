import { clearAuthCookiesClient, setAuthCookiesClient } from '@/lib/auth-cookies'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types/database'
import type { AuthError, Session } from '@supabase/supabase-js'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  isAdmin: boolean
  isPlayer: boolean

  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string; user?: User | null }>
  signUp: (data: {
    email: string
    password: string
    username: string
    name: string
  }) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
  clearError: () => void
  getUserRole: () => 'admin' | 'player' | null
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  isAdmin: false,
  isPlayer: false,

  signIn: async (emailOrUsername: string, password: string) => {
    set({ loading: true, error: null })

    try {
      let email: string


      if (emailOrUsername.includes('@')) {
        email = emailOrUsername
      } else {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .eq('username', emailOrUsername)
          .single()

        if (userError || !userData) {
          set({ loading: false, error: 'Usuário não encontrado' })
          return { success: false, error: 'Usuário não encontrado' }
        }

        email = userData.email
      }


      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      console.log("data-auth", data)
      if (error) {
        set({ loading: false, error: getAuthErrorMessage(error) })
        return { success: false, error: getAuthErrorMessage(error) }
      }

      if (data.user) {

        const { data: fullUser, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          set({ loading: false, error: 'Erro ao carregar perfil do usuário' })
          return { success: false, error: 'Erro ao carregar perfil do usuário' }
        }

        // Salva dados nos cookies para uso no middleware
        setAuthCookiesClient({
          userId: fullUser.id,
          role: fullUser.role,
          email: fullUser.email,
          username: fullUser.username,
          name: fullUser.name
        })

        set({
          user: fullUser,
          session: data.session,
          loading: false,
          error: null,
          isAdmin: fullUser.role === 'admin',
          isPlayer: fullUser.role === 'player'
        })
        return { success: true, user: fullUser }
      }

      set({ loading: false, error: 'Erro desconhecido ao fazer login' })
      return { success: false, error: 'Erro desconhecido ao fazer login' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado'
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  signUp: async (data) => {
    set({ loading: true, error: null })

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (error) {
        set({ loading: false, error: getAuthErrorMessage(error) })
        return { success: false, error: getAuthErrorMessage(error) }
      }

      if (authData.user) {

        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            username: data.username,
            name: data.name,
            role: 'player' as const,
          })

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
          set({ loading: false, error: 'Erro ao criar perfil do usuário' })
          return { success: false, error: 'Erro ao criar perfil do usuário' }
        }

        set({ loading: false, error: null })
        return { success: true }
      }

      set({ loading: false, error: 'Erro desconhecido ao criar conta' })
      return { success: false, error: 'Erro desconhecido ao criar conta' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado'
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  signOut: async () => {
    set({ loading: true })
    await supabase.auth.signOut()

    // Limpa todos os cookies de autenticação
    clearAuthCookiesClient()

    set({
      user: null,
      session: null,
      loading: false,
      error: null,
      isAdmin: false,
      isPlayer: false
    })
  },

  initialize: async () => {
    set({ loading: true })

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (!error && user) {
          // Salva dados nos cookies para uso no middleware
          setAuthCookiesClient({
            userId: user.id,
            role: user.role,
            email: user.email,
            username: user.username,
            name: user.name
          })

          set({
            user,
            session,
            loading: false,
            error: null,
            isAdmin: user.role === 'admin',
            isPlayer: user.role === 'player'
          })
        } else {
          set({
            user: null,
            session: null,
            loading: false,
            error: null,
            isAdmin: false,
            isPlayer: false
          })
        }
      } else {
        set({
          user: null,
          session: null,
          loading: false,
          error: null,
          isAdmin: false,
          isPlayer: false
        })
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          set({
            user: null,
            session: null,
            loading: false,
            isAdmin: false,
            isPlayer: false
          })
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (!error && user) {
            // Atualiza cookies no onAuthStateChange
            setAuthCookiesClient({
              userId: user.id,
              role: user.role,
              email: user.email,
              username: user.username,
              name: user.name
            })

            set({
              user,
              session,
              loading: false,
              error: null,
              isAdmin: user.role === 'admin',
              isPlayer: user.role === 'player'
            })
          }
        }
      })
    } catch (err) {
      console.error('Erro ao inicializar auth:', err)
      set({
        user: null,
        session: null,
        loading: false,
        error: null,
        isAdmin: false,
        isPlayer: false
      })
    }
  },

  clearError: () => set({ error: null }),

  getUserRole: () => {
    const { user } = get()
    return user?.role || null
  },
}))


function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Credenciais inválidas'
    case 'Email not confirmed':
      return 'Email não confirmado. Verifique sua caixa de entrada.'
    case 'User already registered':
      return 'Usuário já cadastrado'
    case 'Password should be at least 6 characters':
      return 'Senha deve ter pelo menos 6 caracteres'
    default:
      return error.message || 'Erro de autenticação'
  }
}