'use client';

import type { GameInfo } from '@/lib/games-api';
import { getGamesFromDB } from '@/lib/games-api';
import { Play, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function GamesPage() {
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🕹️ Jogos Disponíveis
          </h1>
          <p className="text-muted-foreground">
            Carregando jogos...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-lg">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded mb-4 animate-pulse" />
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-12 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          🕹️ Jogos Disponíveis
        </h1>
        <p className="text-muted-foreground">
          Escolha um jogo e divirta-se! Seus pontos serão salvos automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 hover:bg-card transition-all transform hover:scale-105 border border-border shadow-lg"
          >
            <div className={`w-20 h-20 ${game.color} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto`}>
              {game.emoji}
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2 text-center">
              {game.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 text-center">
              {game.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
                {game.difficulty}
              </span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                {game.players.toLocaleString()}
              </div>
            </div>

            <Link
              href={`/games/${game.id}`}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-colors flex items-center justify-center group"
            >
              <Play className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
              Jogar Agora
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          Quer ver como está seu desempenho?
        </p>
        <Link
          href="/ranking"
          className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          🏆 Ver Rankings
        </Link>
      </div>
    </div>
  );
}