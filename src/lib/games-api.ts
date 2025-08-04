import { supabase } from '@/lib/supabase'
import type { Ranking } from '@/types/database'

export interface GameInfo {
  id: string
  name: string
  description: string | null
  emoji: string
  difficulty: string
  players: number
  color: string
  created_at: string
}

export interface WeeklyHighlight {
  name: string
  game: string
  score: number
  avatar: string
}

export interface GlobalStats {
  totalPlayers: number
  totalGames: number
  totalSessions: number
}

export async function getGamesFromDB(): Promise<GameInfo[]> {
  try {
    const { data: games, error } = await supabase
      .from('games')
      .select(`
        id,
        name,
        description,
        created_at
      `)

    if (error) throw error

    if (!games) return []

    const gamesWithStats = await Promise.all(
      games.map(async (game) => {
        const { count: playersCount } = await supabase
          .from('game_sessions')
          .select('user_id', { count: 'exact', head: true })
          .eq('game_id', game.id)

        return {
          id: game.id,
          name: getGameDisplayName(game.id),
          description: game.description || getGameDescription(game.id),
          emoji: getGameEmoji(game.id),
          difficulty: getGameDifficulty(game.id),
          players: playersCount || 0,
          color: getGameColor(game.id),
          created_at: game.created_at
        }
      })
    )

    return gamesWithStats
  } catch (error) {
    console.error('Erro ao buscar jogos:', error)
    return []
  }
}

export async function getWeeklyHighlights(): Promise<WeeklyHighlight[]> {
  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { data: recentSessions, error } = await supabase
      .from('game_sessions')
      .select(`
        user_id,
        game_id,
        score,
        created_at,
        users!inner (
          name
        ),
        games!inner (
          name
        )
      `)
      .gte('created_at', oneWeekAgo.toISOString())
      .order('score', { ascending: false })
      .limit(3)

    if (error) throw error
    if (!recentSessions) return []

    return recentSessions.map((session, index) => ({
      name: (session.users as unknown as { name: string })?.name || 'Jogador Anônimo',
      game: getGameDisplayName(session.game_id),
      score: session.score,
      avatar: getAvatarForRank(index + 1)
    }))
  } catch (error) {
    console.error('Erro ao buscar destaques da semana:', error)
    return []
  }
}

export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    const [
      { count: totalPlayers },
      { count: totalGames },
      { count: totalSessions }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('games').select('*', { count: 'exact', head: true }),
      supabase.from('game_sessions').select('*', { count: 'exact', head: true })
    ])

    return {
      totalPlayers: totalPlayers || 0,
      totalGames: totalGames || 0,
      totalSessions: totalSessions || 0
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas globais:', error)
    return {
      totalPlayers: 0,
      totalGames: 0,
      totalSessions: 0
    }
  }
}

export async function getGlobalRankings(): Promise<Record<string, Ranking[]>> {
  try {
    const { data: games } = await supabase
      .from('games')
      .select('id')

    if (!games) return {}

    const rankingsPromises = games.map(async (game) => {
      const { data: rankings } = await supabase
        .from('rankings')
        .select('*')
        .eq('game_id', game.id)
        .order('rank')
        .limit(10)

      return {
        gameId: game.id,
        rankings: rankings || []
      }
    })

    const results = await Promise.all(rankingsPromises)

    const rankingsMap: Record<string, Ranking[]> = {}
    results.forEach(({ gameId, rankings }) => {
      rankingsMap[gameId] = rankings
    })

    return rankingsMap
  } catch (error) {
    console.error('Erro ao buscar rankings globais:', error)
    return {}
  }
}

function getGameDisplayName(gameId: string): string {
  const nameMap: Record<string, string> = {
    'flip-bird': '🐦 Flip Bird',
    'car-racing': '🚗 Car Racing',
    'jokenpo-game': '✊ Pedra, Papel, Tesoura',
    'uno-game': '🃏 Uno Game',
    'dino-game': '🦕 Dino Game',
  }
  return nameMap[gameId] || `🎮 ${gameId}`
}

function getGameDescription(gameId: string): string {
  const descriptionMap: Record<string, string> = {
    'flip-bird': 'Mantenha o pássaro no ar desviando de obstáculos',
    'car-racing': 'Controle um carro e desvie de obstáculos em uma pista infinita',
    'jokenpo-game': 'O clássico jogo de estratégia rápida',
    'uno-game': 'Jogo de cartas clássico contra o computador',
    'dino-game': 'Pule sobre obstáculos neste clássico jogo do dinossauro',
  }
  return descriptionMap[gameId] || 'Jogo divertido para toda família'
}

function getGameEmoji(gameId: string): string {
  const emojiMap: Record<string, string> = {
    'flip-bird': '🐦',
    'car-racing': '🚗',
    'jokenpo-game': '✊',
    'uno-game': '🃏',
    'dino-game': '🦕',
  }
  return emojiMap[gameId] || '🎮'
}

function getGameDifficulty(gameId: string): string {
  const difficultyMap: Record<string, string> = {
    'flip-bird': 'Fácil',
    'car-racing': 'Médio',
    'jokenpo-game': 'Fácil',
    'uno-game': 'Médio',
    'dino-game': 'Fácil',
  }
  return difficultyMap[gameId] || 'Médio'
}

function getGameColor(gameId: string): string {
  const colorMap: Record<string, string> = {
    'flip-bird': 'bg-green-500',
    'car-racing': 'bg-blue-500',
    'jokenpo-game': 'bg-purple-500',
    'uno-game': 'bg-red-500',
    'dino-game': 'bg-yellow-500',
  }
  return colorMap[gameId] || 'bg-gray-500'
}

function getAvatarForRank(rank: number): string {
  const avatarMap: Record<number, string> = {
    1: '🏆',
    2: '🥈',
    3: '🥉'
  }
  return avatarMap[rank] || '🎮'
}