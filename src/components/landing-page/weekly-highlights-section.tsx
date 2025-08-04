'use client';

import type { WeeklyHighlight } from '@/lib/games-api';
import { getWeeklyHighlights } from '@/lib/games-api';
import { useEffect, useState } from 'react';

export function WeeklyHighlightsSection() {
  const [highlights, setHighlights] = useState<WeeklyHighlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHighlights() {
      try {
        const highlightsData = await getWeeklyHighlights();
        setHighlights(highlightsData);
      } catch (error) {
        console.error('Erro ao carregar destaques da semana:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHighlights();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-foreground text-center mb-12">
          ⭐ Destaques da Semana
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm rounded-xl p-6 text-center border border-primary/30">
              <div className="h-16 w-16 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-4 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-8 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (highlights.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-foreground text-center mb-12">
          ⭐ Destaques da Semana
        </h3>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum destaque esta semana ainda. Seja o primeiro a jogar!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-foreground text-center mb-12">
        ⭐ Destaques da Semana
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {highlights.map((player, index) => (
          <div key={`${player.name}-${index}`} className="bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm rounded-xl p-6 text-center border border-primary/30">
            <div className="text-4xl mb-4">{player.avatar}</div>
            <h4 className="text-xl font-bold text-foreground mb-2">{player.name}</h4>
            <p className="text-muted-foreground mb-2">{player.game}</p>
            <div className="text-2xl font-bold text-primary">
              {player.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}