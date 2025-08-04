export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          name: string
          role: 'player' | 'admin'
          avatar: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          name: string
          role?: 'player' | 'admin'
          avatar?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          name?: string
          role?: 'player' | 'admin'
          avatar?: string | null
          created_at?: string
        }
      }
      games: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      game_sessions: {
        Row: {
          id: string
          user_id: string
          game_id: string
          score: number
          duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          game_id: string
          score: number
          duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          game_id?: string
          score?: number
          duration?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      rankings: {
        Row: {
          game_id: string
          user_id: string
          name: string
          avatar: string | null
          best_score: number
          games_played: number
          rank: number
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


export type User = Database['public']['Tables']['users']['Row']
export type CreateUser = Database['public']['Tables']['users']['Insert']
export type UpdateUser = Database['public']['Tables']['users']['Update']

export type Game = Database['public']['Tables']['games']['Row']
export type CreateGame = Database['public']['Tables']['games']['Insert']
export type UpdateGame = Database['public']['Tables']['games']['Update']

export type GameSession = Database['public']['Tables']['game_sessions']['Row']
export type CreateGameSession = Database['public']['Tables']['game_sessions']['Insert']
export type UpdateGameSession = Database['public']['Tables']['game_sessions']['Update']

export type Ranking = Database['public']['Views']['rankings']['Row']