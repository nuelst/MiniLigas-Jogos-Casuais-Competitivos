import { gameRankings } from "@/shared/mocks/ranking";
import { DashboardStats, GameStats, PlayerSummary } from "@/types/dashboard";

const GAME_CONFIG = {
  'car-racing': { name: 'Car Racing', emoji: '🚗' },
  'flip-bird': { name: 'Flip Bird', emoji: '🐦' },
  'uno-game': { name: 'Uno Game', emoji: '🃏' },
  'rock-paper-scissors': { name: 'Pedra, Papel, Tesoura', emoji: '✊' }
};

export function getGameStats(): GameStats[] {
  return Object.entries(gameRankings).map(([gameId, rankings]) => {
    const totalGames = rankings.reduce((sum, player) => sum + player.gamesPlayed, 0);
    const averageScore = rankings.reduce((sum, player) => sum + player.score, 0) / rankings.length;
    const gameConfig = GAME_CONFIG[gameId as keyof typeof GAME_CONFIG];

    return {
      id: gameId,
      name: gameConfig?.name || gameId,
      emoji: gameConfig?.emoji || '🎮',
      totalPlayers: rankings.length,
      totalGames,
      averageScore: Math.round(averageScore),
      topPlayer: rankings[0]
    };
  });
}

export function getDashboardStats(): DashboardStats {
  const allPlayers = new Set<string>();
  let totalGames = 0;
  const playerStats: Record<string, { score: number; games: number; avatar: string }> = {};

  Object.values(gameRankings).forEach(rankings => {
    rankings.forEach(player => {
      allPlayers.add(player.name);
      totalGames += player.gamesPlayed;

      if (!playerStats[player.name]) {
        playerStats[player.name] = { score: 0, games: 0, avatar: player.avatar };
      }
      playerStats[player.name].score += player.score;
      playerStats[player.name].games += player.gamesPlayed;
    });
  });

  const topPlayer = Object.entries(playerStats).reduce((top, [name, stats]) => {
    return stats.score > top.totalScore ? {
      name,
      avatar: stats.avatar,
      totalScore: stats.score,
      gamesPlayed: stats.games
    } : top;
  }, { name: '', avatar: '', totalScore: 0, gamesPlayed: 0 });

  return {
    totalPlayers: allPlayers.size,
    totalGames,
    activeGames: Object.keys(gameRankings).length,
    topPlayerOverall: topPlayer
  };
}

export function getPlayersSummary(): PlayerSummary[] {
  const playerStats: Record<string, {
    totalScore: number;
    gamesPlayed: number;
    avatar: string;
    gameScores: Record<string, number>;
  }> = {};


  Object.entries(gameRankings).forEach(([gameId, rankings]) => {
    rankings.forEach(player => {
      if (!playerStats[player.name]) {
        playerStats[player.name] = {
          totalScore: 0,
          gamesPlayed: 0,
          avatar: player.avatar,
          gameScores: {}
        };
      }
      playerStats[player.name].totalScore += player.score;
      playerStats[player.name].gamesPlayed += player.gamesPlayed;
      playerStats[player.name].gameScores[gameId] = player.score;
    });
  });

  const playersSummary = Object.entries(playerStats).map(([name, stats]) => {

    const favoriteGame = Object.entries(stats.gameScores).reduce((fav, [gameId, score]) => {
      return score > (stats.gameScores[fav] || 0) ? gameId : fav;
    }, Object.keys(stats.gameScores)[0] || '');

    return {
      name,
      avatar: stats.avatar,
      totalScore: stats.totalScore,
      gamesPlayed: stats.gamesPlayed,
      favoriteGame: GAME_CONFIG[favoriteGame as keyof typeof GAME_CONFIG]?.name || favoriteGame,
      rank: 0
    };
  }).sort((a, b) => b.totalScore - a.totalScore);

  return playersSummary.map((player, index) => ({
    ...player,
    rank: index + 1
  }));
}