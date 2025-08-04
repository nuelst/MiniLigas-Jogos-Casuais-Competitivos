'use client';

import { getGamesFromDB, getGlobalRankings } from '@/lib/games-api';
import type { Ranking } from '@/types/database';
import { Award, Crown, Medal, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameTab {
  id: string
  name: string
  emoji: string
  color: string
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState('');
  const [gameTabs, setGameTabs] = useState<GameTab[]>([]);
  const [rankings, setRankings] = useState<Record<string, Ranking[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [gamesData, rankingsData] = await Promise.all([
          getGamesFromDB(),
          getGlobalRankings()
        ]);

        const tabs = gamesData.map((game) => ({
          id: game.id,
          name: game.name.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim(),
          emoji: game.emoji,
          color: game.color
        }));

        setGameTabs(tabs);
        setRankings(rankingsData);

        if (tabs.length > 0 && !activeTab) {
          setActiveTab(tabs[0].id);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de ranking:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activeTab]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <Trophy className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPodiumStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/50 border-2 transform md:-translate-y-2 shadow-yellow-500/20 shadow-lg';
      case 1:
        return 'bg-gradient-to-br from-gray-400/20 to-gray-500/10 border-gray-400/50 border-2 shadow-gray-400/20 shadow-lg';
      case 2:
        return 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/50 border-2 shadow-orange-500/20 shadow-lg';
      default:
        return '';
    }
  };

  const currentRanking = rankings[activeTab] || [];
  const activeGame = gameTabs.find(tab => tab.id === activeTab);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🏆 Rankings Globais
          </h1>
          <p className="text-muted-foreground">
            Carregando rankings...
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-muted rounded animate-pulse" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card/80 rounded-xl p-6 border border-border">
              <div className="h-20 bg-muted rounded mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-8 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gameTabs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🏆 Rankings Globais
          </h1>
          <p className="text-muted-foreground">
            Nenhum jogo disponível ainda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          🏆 Rankings Globais
        </h1>
        <p className="text-muted-foreground">
          Veja os melhores jogadores de cada jogo e compete pelo topo!
        </p>
      </div>

      {/* Game Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {gameTabs.map((game) => (
          <button
            key={game.id}
            onClick={() => setActiveTab(game.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === game.id
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card/80 text-card-foreground hover:bg-card border border-border'
              }`}
          >
            <span className={`w-6 h-6 ${game.color} rounded-full flex items-center justify-center text-white text-xs`}>
              {game.emoji}
            </span>
            {game.name}
          </button>
        ))}
      </div>

      {/* Current Game Info */}
      {activeGame && (
        <div className="mb-8 text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 ${activeGame.color} rounded-xl text-white shadow-lg`}>
            <span className="text-2xl">{activeGame.emoji}</span>
            <div>
              <h2 className="text-xl font-bold">{activeGame.name}</h2>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Users className="h-4 w-4" />
                {currentRanking.length} jogadores
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRanking.length > 0 ? (
        <div className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {currentRanking.slice(0, 3).map((player, index) => (
              <div
                key={player.rank}
                className={`${getPodiumStyle(index)} rounded-xl p-6 text-center`}
              >
                <div className={`w-16 h-16 ${getRankBadgeColor(player.rank)} rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold`}>
                  {player.rank}
                </div>
                <div className="mb-3">
                  {getRankIcon(player.rank)}
                </div>
                <h3 className="font-bold text-lg text-card-foreground mb-1">{player.name}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{player.best_score.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">pontos</p>
              </div>
            ))}
          </div>

          {currentRanking.length > 3 && (
            <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border">
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Classificação Completa
                </h3>
                <div className="space-y-3">
                  {currentRanking.slice(3).map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center justify-between p-4 bg-card/80 rounded-lg border border-border hover:bg-card transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${getRankBadgeColor(player.rank)} rounded-full flex items-center justify-center font-bold text-sm`}>
                          {player.rank}
                        </div>
                        <div>
                          <h4 className="font-semibold text-card-foreground">{player.name}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">{player.best_score.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">pontos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Nenhum ranking disponível
          </h3>
          <p className="text-muted-foreground">
            Seja o primeiro a jogar {activeGame?.name}!
          </p>
        </div>
      )}
    </div>
  );
}