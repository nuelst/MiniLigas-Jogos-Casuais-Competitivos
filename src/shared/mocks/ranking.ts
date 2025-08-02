import { GameRanking } from "@/types/game";

export const gameRankings: Record<string, GameRanking[]> = {
  'car-racing': [
    { rank: 1, name: 'João Silva', score: 15420, gamesPlayed: 45, avatar: '🏆' },
    { rank: 2, name: 'Maria Santos', score: 14850, gamesPlayed: 38, avatar: '🥈' },
    { rank: 3, name: 'Pedro Costa', score: 13920, gamesPlayed: 52, avatar: '🥉' },
    { rank: 4, name: 'Ana Oliveira', score: 12750, gamesPlayed: 34, avatar: '🎯' },
    { rank: 5, name: 'Carlos Pereira', score: 11890, gamesPlayed: 41, avatar: '🎮' },
    { rank: 6, name: 'Luiza Silva', score: 11420, gamesPlayed: 29, avatar: '⭐' },
    { rank: 7, name: 'Roberto Santos', score: 10980, gamesPlayed: 47, avatar: '🔥' },
    { rank: 8, name: 'Fernanda Lima', score: 10560, gamesPlayed: 36, avatar: '💎' },
    { rank: 9, name: 'Diego Martins', score: 10230, gamesPlayed: 43, avatar: '🎪' },
    { rank: 10, name: 'Camila Rocha', score: 9850, gamesPlayed: 31, avatar: '🌟' }
  ],
  'flip-bird': [
    { rank: 1, name: 'Maria Santos', score: 287, gamesPlayed: 156, avatar: '🏆' },
    { rank: 2, name: 'Pedro Costa', score: 245, gamesPlayed: 143, avatar: '🥈' },
    { rank: 3, name: 'Ana Oliveira', score: 198, gamesPlayed: 98, avatar: '🥉' },
    { rank: 4, name: 'João Silva', score: 176, gamesPlayed: 87, avatar: '🎯' },
    { rank: 5, name: 'Carlos Pereira', score: 154, gamesPlayed: 112, avatar: '🎮' },
    { rank: 6, name: 'Luiza Silva', score: 142, gamesPlayed: 76, avatar: '⭐' },
    { rank: 7, name: 'Roberto Santos', score: 129, gamesPlayed: 91, avatar: '🔥' },
    { rank: 8, name: 'Fernanda Lima', score: 118, gamesPlayed: 65, avatar: '💎' },
    { rank: 9, name: 'Diego Martins', score: 105, gamesPlayed: 83, avatar: '🎪' },
    { rank: 10, name: 'Camila Rocha', score: 94, gamesPlayed: 58, avatar: '🌟' }
  ],
  'uno-game': [
    { rank: 1, name: 'Pedro Costa', score: 45, gamesPlayed: 23, avatar: '🏆' },
    { rank: 2, name: 'Ana Oliveira', score: 38, gamesPlayed: 19, avatar: '🥈' },
    { rank: 3, name: 'Carlos Pereira', score: 34, gamesPlayed: 25, avatar: '🥉' },
    { rank: 4, name: 'João Silva', score: 31, gamesPlayed: 18, avatar: '🎯' },
    { rank: 5, name: 'Maria Santos', score: 28, gamesPlayed: 21, avatar: '🎮' },
    { rank: 6, name: 'Luiza Silva', score: 26, gamesPlayed: 16, avatar: '⭐' },
    { rank: 7, name: 'Roberto Santos', score: 23, gamesPlayed: 20, avatar: '🔥' },
    { rank: 8, name: 'Fernanda Lima', score: 21, gamesPlayed: 14, avatar: '💎' },
    { rank: 9, name: 'Diego Martins', score: 19, gamesPlayed: 17, avatar: '🎪' },
    { rank: 10, name: 'Camila Rocha', score: 16, gamesPlayed: 13, avatar: '🌟' }
  ],
  'rock-paper-scissors': [
    { rank: 1, name: 'Carlos Pereira', score: 89, gamesPlayed: 134, avatar: '🏆' },
    { rank: 2, name: 'João Silva', score: 82, gamesPlayed: 123, avatar: '🥈' },
    { rank: 3, name: 'Maria Santos', score: 76, gamesPlayed: 98, avatar: '🥉' },
    { rank: 4, name: 'Ana Oliveira', score: 71, gamesPlayed: 87, avatar: '🎯' },
    { rank: 5, name: 'Pedro Costa', score: 67, gamesPlayed: 109, avatar: '🎮' },
    { rank: 6, name: 'Luiza Silva', score: 63, gamesPlayed: 76, avatar: '⭐' },
    { rank: 7, name: 'Roberto Santos', score: 58, gamesPlayed: 91, avatar: '🔥' },
    { rank: 8, name: 'Fernanda Lima', score: 54, gamesPlayed: 65, avatar: '💎' },
    { rank: 9, name: 'Diego Martins', score: 49, gamesPlayed: 73, avatar: '🎪' },
    { rank: 10, name: 'Camila Rocha', score: 45, gamesPlayed: 58, avatar: '🌟' }
  ]
};
