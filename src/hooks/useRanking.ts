import { supabase } from "@/lib/supabase"
import type { Ranking } from "@/types/database"
import { useEffect, useState } from "react"

export function useRankings(gameId?: string) {
  const [rankings, setRankings] = useState<Ranking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRankings() {
      try {
        setLoading(true)
        setError(null)

        let query = supabase
          .from('rankings')
          .select('*')
          .order('rank')

        if (gameId) {
          query = query.eq('game_id', gameId)
        }

        const { data, error } = await query

        if (error) {
          console.error('Erro ao buscar rankings:', error)
          setError(error.message)
        } else {
          setRankings(data || [])
        }
      } catch (err) {
        console.error('Erro inesperado:', err)
        setError('Erro inesperado ao carregar rankings')
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()

    const subscription = supabase
      .channel('rankings-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'game_sessions' },
        () => {

          fetchRankings()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [gameId])

  return { rankings, loading, error, refetch: () => setLoading(true) }
}