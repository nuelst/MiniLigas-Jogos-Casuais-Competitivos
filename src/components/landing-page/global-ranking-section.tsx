'use client';

import { gameRankings } from '@/shared/mocks/ranking';
import { GameTab } from '@/types/game';
import { Award, Crown, Medal } from 'lucide-react';
import { useState } from 'react';

export function GlobalRankingSection() {
  const [activeTab, setActiveTab] = useState('car-racing');

  const gameTabs: GameTab[] = [
    { id: 'car-racing', name: 'Car Racing', emoji: '🚗', color: 'bg-blue-500' },
    { id: 'flip-bird', name: 'Flip Bird', emoji: '🐦', color: 'bg-green-500' },
    { id: 'uno-game', name: 'Uno Game', emoji: '🃏', color: 'bg-red-500' },
    { id: 'rock-paper-scissors', name: 'Pedra, Papel, Tesoura', emoji: '✊', color: 'bg-purple-500' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-primary" />;
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3:
        return <Award className="h-5 w-5 text-accent" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-primary to-primary/80';
      case 2:
        return 'bg-gradient-to-r from-muted-foreground to-muted-foreground/80';
      case 3:
        return 'bg-gradient-to-r from-accent to-accent/80';
      default:
        return 'bg-muted';
    }
  };

  const getPodiumStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-primary/30 to-primary/20 border-primary/50 border-2 transform md:-translate-y-2';
      case 1:
        return 'bg-gradient-to-br from-muted/30 to-muted/20 border-muted-foreground/50 border-2';
      case 2:
        return 'bg-gradient-to-br from-accent/30 to-accent/20 border-accent/50 border-2';
      default:
        return '';
    }
  };

  const currentRanking = gameRankings[activeTab] || [];
  const activeGame = gameTabs.find(tab => tab.id === activeTab);

  return (
    <section id="rankings" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-foreground text-center mb-12">
        🏆 Rankings dos Jogos
      </h3>


      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {gameTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${activeTab === tab.id
                ? `bg-primary text-primary-foreground shadow-lg`
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              <span className="text-xl">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>


      {activeGame && (
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 bg-primary rounded-full mb-4`}>
            <span className="text-2xl">{activeGame.emoji}</span>
            <h4 className="text-xl font-bold text-primary-foreground">{activeGame.name}</h4>
          </div>
          <p className="text-muted-foreground">Top 10 jogadores com melhor desempenho</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-card backdrop-blur-sm rounded-xl overflow-hidden border border-border">

          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRanking.slice(0, 3).map((player, index) => (
                <div
                  key={player.rank}
                  className={`text-center p-4 rounded-xl ${getPodiumStyle(index)}`}
                >
                  <div className="text-4xl mb-2">{player.avatar}</div>
                  <div className="flex items-center justify-center mb-2">
                    {getRankIcon(player.rank)}
                    <span className="ml-2 text-2xl font-bold text-foreground">#{player.rank}</span>
                  </div>
                  <h5 className="text-lg font-bold text-foreground mb-1">{player.name}</h5>
                  <div className="text-primary font-bold text-xl mb-1">
                    {player.score.toLocaleString()} pts
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {player.gamesPlayed} jogos
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Posição</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Jogador</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Pontuação</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Jogos</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Média</th>
                </tr>
              </thead>
              <tbody>
                {currentRanking.map((player, index) => (
                  <tr
                    key={player.rank}
                    className={`border-t border-border hover:bg-muted/50 transition-colors ${index < 3 ? 'bg-muted/30' : ''
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getRankBadgeColor(player.rank)}`}>
                          <span className="text-primary-foreground font-bold text-sm">#{player.rank}</span>
                        </div>
                        {getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{player.avatar}</span>
                        <span className="text-foreground font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-primary font-bold text-lg">
                        {player.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {player.gamesPlayed}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {(player.score / player.gamesPlayed).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}