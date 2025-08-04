import { supabase } from "@/lib/supabase"
import { submitScoreSchema } from "@/lib/validations"

export async function submitScore(gameId: string, score: number, duration: number) {
  // Validar dados de entrada
  const validation = submitScoreSchema.safeParse({ gameId, score, duration })
  if (!validation.success) {
    throw new Error(`Dados inválidos: ${validation.error.issues.map(e => e.message).join(', ')}`)
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Validar duração mínima baseada no jogo e score
  const minDuration = getMinDurationForScore(gameId, score)
  if (duration < minDuration) {
    throw new Error('Invalid score submission - duration too short for this score')
  }

  const { data, error } = await supabase
    .from('game_sessions')
    .insert({
      user_id: user.id,
      game_id: gameId,
      score,
      duration
    })

  if (error) throw error
  return data
}

/**
 * Calcula a duração mínima necessária para alcançar determinado score em um jogo específico
 * Previne cheating ao validar se o tempo é realista para o score alcançado
 */
export function getMinDurationForScore(gameId: string, score: number): number {
  const gameValidations: Record<string, (score: number) => number> = {
    'flip-bird': (score) => {
      // Flip Bird: cada ponto = ~2-3 segundos mínimo (tempo para passar um obstáculo)
      return Math.max(score * 2, 5) // Mínimo 5 segundos
    },
    'car-racing': (score) => {
      // Car Racing: score baseado em distância, ~1 ponto por segundo
      return Math.max(score * 0.8, 3) // Mínimo 3 segundos
    },
    'jokenpo-game': (score) => {
      // Jokenpo: cada vitória ~3-5 segundos mínimo
      return Math.max(score * 3, 2) // Mínimo 2 segundos
    },
    'uno-game': (score) => {
      // Uno: partida mais longa, score baseado em cartas/rounds
      return Math.max(score * 10, 30) // Mínimo 30 segundos
    },
    'dino-game': (score) => {
      // Dino Game: similar ao car racing
      return Math.max(score * 1, 5) // Mínimo 5 segundos
    }
  }

  const validator = gameValidations[gameId]
  if (!validator) {
    // Jogo não reconhecido, usar validação genérica
    return Math.max(score * 1, 1)
  }

  return validator(score)
}

/**
 * Busca rankings de um jogo específico ou geral
 */
export async function getRankings(gameId?: string, limit: number = 10) {
  let query = supabase
    .from('rankings')
    .select('*')
    .order('rank')
    .limit(limit)

  if (gameId) {
    query = query.eq('game_id', gameId)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

/**
 * Busca estatísticas de um usuário
 */
export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('game_sessions')
    .select(`
      *,
      games (name)
    `)
    .eq('user_id', userId)

  if (error) throw error
  return data || []
}