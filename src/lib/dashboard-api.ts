import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { DashboardStats, GameStats, PlayerSummary } from '@/types/dashboard'


export async function getDashboardStatsFromDB(): Promise<DashboardStats> {
  // Retornar stats vazias durante build se Supabase não estiver configurado
  if (!isSupabaseConfigured()) {
    return {
      totalPlayers: 0,
      totalGames: 0,
      activeGames: 0,
      topPlayerOverall: {
        name: 'N/A',
        avatar: '👤',
        totalScore: 0,
        gamesPlayed: 0,
      }
    }
  }

  try {

    const { count: totalPlayers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })


    const { count: totalGames } = await supabase
      .from('game_sessions')
      .select('*', { count: 'exact', head: true })


    const { count: activeGames } = await supabase
      .from('games')
      .select('*', { count: 'exact', head: true })


    const { data: topPlayerData } = await supabase
      .from('rankings')
      .select('name, avatar, best_score, games_played')
      .order('best_score', { ascending: false })
      .limit(1)

    const topPlayer = topPlayerData?.[0]

    return {
      totalPlayers: totalPlayers || 0,
      totalGames: totalGames || 0,
      activeGames: activeGames || 0,
      topPlayerOverall: {
        name: topPlayer?.name || 'N/A',
        avatar: topPlayer?.avatar || '👤',
        totalScore: topPlayer?.best_score || 0,
        gamesPlayed: topPlayer?.games_played || 0,
      }
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error)

    return {
      totalPlayers: 0,
      totalGames: 0,
      activeGames: 0,
      topPlayerOverall: {
        name: 'N/A',
        avatar: '👤',
        totalScore: 0,
        gamesPlayed: 0,
      }
    }
  }
}


export async function getGameStatsFromDB(): Promise<GameStats[]> {
  // Retornar array vazio durante build se Supabase não estiver configurado
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data: games } = await supabase
      .from('games')
      .select('*')

    if (!games) return []

    const gameStats: GameStats[] = []

    for (const game of games) {

      const { data: rankings } = await supabase
        .from('rankings')
        .select('*')
        .eq('game_id', game.id)

      const { data: sessions } = await supabase
        .from('game_sessions')
        .select('score')
        .eq('game_id', game.id)

      const totalPlayers = rankings?.length || 0
      const totalGames = sessions?.length || 0
      const averageScore = sessions && sessions.length > 0
        ? sessions.reduce((sum, s) => sum + s.score, 0) / sessions.length
        : 0

      const topPlayer = rankings?.[0]

      gameStats.push({
        id: game.id,
        name: game.name,
        emoji: getGameEmoji(game.id),
        totalPlayers,
        totalGames,
        averageScore: Math.round(averageScore),
        topPlayer: topPlayer ? {
          rank: topPlayer.rank,
          name: topPlayer.name,
          score: topPlayer.best_score,
          gamesPlayed: topPlayer.games_played,
          avatar: topPlayer.avatar || '👤',
        } : {
          rank: 0,
          name: 'N/A',
          score: 0,
          gamesPlayed: 0,
          avatar: '👤',
        }
      })
    }

    return gameStats
  } catch (error) {
    console.error('Erro ao buscar estatísticas dos jogos:', error)
    return []
  }
}


export async function getPlayersSummaryFromDB(): Promise<PlayerSummary[]> {
  // Retornar array vazio durante build se Supabase não estiver configurado
  if (!isSupabaseConfigured()) {
    return []
  }

  try {
    const { data: rankings } = await supabase
      .from('rankings')
      .select('*')
      .order('rank')

    if (!rankings) return []


    const playerMap = new Map<string, PlayerSummary>()

    for (const ranking of rankings) {
      const existingPlayer = playerMap.get(ranking.user_id)

      if (existingPlayer) {
        existingPlayer.totalScore += ranking.best_score
        existingPlayer.gamesPlayed += ranking.games_played
      } else {
        playerMap.set(ranking.user_id, {
          name: ranking.name,
          avatar: ranking.avatar || '👤',
          totalScore: ranking.best_score,
          gamesPlayed: ranking.games_played,
          favoriteGame: ranking.game_id,
          rank: ranking.rank
        })
      }
    }


    const players = Array.from(playerMap.values())
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((player, index) => ({
        ...player,
        rank: index + 1
      }))

    return players
  } catch (error) {
    console.error('Erro ao buscar resumo dos jogadores:', error)
    return []
  }
}


function getGameEmoji(gameId: string): string {
  const emojiMap: Record<string, string> = {
    'flip-bird': '🐦',
    'car-racing': '🏎️',
    'jokenpo-game': '✊',
    'uno-game': '🃏',
    'dino-game': '🦕',
  }

  return emojiMap[gameId] || '🎮'
}