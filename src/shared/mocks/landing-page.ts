export const games = [
  {
    id: 'car-racing',
    name: '🚗 Car Racing',
    description: 'Controle um carro e desvie de obstáculos em uma pista infinita',
    difficulty: 'Médio',
    players: 1247,
    color: 'bg-blue-500'
  },
  {
    id: 'flip-bird',
    name: '🐦 Flip Bird',
    description: 'Mantenha o pássaro no ar desviando de obstáculos',
    difficulty: 'Fácil',
    players: 2341,
    color: 'bg-green-500'
  },
  {
    id: 'uno-game',
    name: '🃏 Uno Game',
    description: 'Jogo de cartas clássico contra o computador',
    difficulty: 'Médio',
    players: 856,
    color: 'bg-red-500'
  },
  {
    id: 'rock-paper-scissors',
    name: '✊ Pedra, Papel, Tesoura',
    description: 'O clássico jogo de estratégia rápida',
    difficulty: 'Fácil',
    players: 1843,
    color: 'bg-purple-500'
  }
];

export const weeklyHighlights = [
  { name: 'João Silva', game: 'Car Racing', score: 15420, avatar: '🏆' },
  { name: 'Maria Santos', game: 'Flip Bird', score: 287, avatar: '🥈' },
  { name: 'Pedro Costa', game: 'Uno Game', score: 45, avatar: '🥉' }
];

export const globalRanking = [
  { rank: 1, name: 'João Silva', totalScore: 45620, games: 156 },
  { rank: 2, name: 'Maria Santos', totalScore: 42100, games: 134 },
  { rank: 3, name: 'Pedro Costa', totalScore: 38950, games: 187 },
  { rank: 4, name: 'Ana Oliveira', totalScore: 35780, games: 98 },
  { rank: 5, name: 'Carlos Pereira', totalScore: 33210, games: 145 }
];