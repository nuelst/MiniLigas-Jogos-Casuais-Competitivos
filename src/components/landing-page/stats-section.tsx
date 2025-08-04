'use client';

import type { GlobalStats } from '@/lib/games-api';
import { getGlobalStats } from '@/lib/games-api';
import { GamepadIcon, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatsSection() {
  const [stats, setStats] = useState<GlobalStats>({
    totalPlayers: 0,
    totalGames: 0,
    totalSessions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const statsData = await getGlobalStats();
        setStats(statsData);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
              <div className="h-10 w-10 bg-muted rounded mx-auto mb-2 animate-pulse" />
              <div className="h-8 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <Users className="h-10 w-10 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">
            {stats.totalPlayers.toLocaleString()}
          </div>
          <div className="text-muted-foreground">Jogadores Registrados</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <GamepadIcon className="h-10 w-10 text-accent mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">
            {stats.totalSessions.toLocaleString()}
          </div>
          <div className="text-muted-foreground">Partidas Jogadas</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <Trophy className="h-10 w-10 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">
            {stats.totalGames.toLocaleString()}
          </div>
          <div className="text-muted-foreground">Jogos Disponíveis</div>
        </div>
      </div>
    </section>
  );
}