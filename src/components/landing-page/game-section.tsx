'use client';

import type { GameInfo } from '@/lib/games-api';
import { getGamesFromDB } from '@/lib/games-api';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GameSection() {
  const [games, setGames] = useState<GameInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const gamesData = await getGamesFromDB();
        setGames(gamesData);
      } catch (error) {
        console.error('Erro ao carregar jogos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  if (loading) {
    return (
      <section id="jogos" className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-foreground text-center mb-12">
          🕹️ Jogos Disponíveis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl mb-4 animate-pulse">
                🎮
              </div>
              <div className="h-6 bg-muted rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-muted rounded mb-4 animate-pulse"></div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="h-8 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="jogos" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-foreground text-center mb-12">
        🕹️ Jogos Disponíveis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 hover:bg-card transition-all transform hover:scale-105 border border-border">
            <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
              {game.emoji}
            </div>
            <h4 className="text-xl font-bold text-card-foreground mb-2">{game.name}</h4>
            <p className="text-muted-foreground text-sm mb-4">{game.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                {game.difficulty}
              </span>
              <span className="text-xs text-muted-foreground">
                {game.players.toLocaleString()} jogadores
              </span>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-semibold transition-colors">
              <Play className="inline-block mr-2 h-4 w-4" />
              Jogar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
} 