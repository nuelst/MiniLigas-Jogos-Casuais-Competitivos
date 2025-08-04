import { GameRanking } from "./game";

export type GameStats = {
  id: string;
  name: string;
  emoji: string;
  totalPlayers: number;
  totalGames: number;
  averageScore: number;
  topPlayer: GameRanking;
};

export type DashboardStats = {
  totalPlayers: number;
  totalGames: number;
  activeGames: number;
  topPlayerOverall: {
    name: string;
    avatar: string;
    totalScore: number;
    gamesPlayed: number;
  };
};

export type PlayerSummary = {
  name: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  favoriteGame: string;
  rank: number;
};