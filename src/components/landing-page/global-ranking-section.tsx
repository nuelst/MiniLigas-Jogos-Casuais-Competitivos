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
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-white/10';
    }
  };

  const getPodiumStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 border-yellow-400/50 border-2 transform md:-translate-y-2';
      case 1:
        return 'bg-gradient-to-br from-gray-300/30 to-gray-500/30 border-gray-400/50 border-2';
      case 2:
        return 'bg-gradient-to-br from-amber-400/30 to-amber-600/30 border-amber-400/50 border-2';
      default:
        return '';
    }
  };

  const currentRanking = gameRankings[activeTab] || [];
  const activeGame = gameTabs.find(tab => tab.id === activeTab);

  return (
    <section id="rankings" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-white text-center mb-12">
        🏆 Rankings dos Jogos
      </h3>


      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {gameTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${activeTab === tab.id
                ? `${tab.color} text-white shadow-lg`
                : 'bg-white/10 text-white/80 hover:bg-white/20'
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
          <div className={`inline-flex items-center space-x-3 px-6 py-3 ${activeGame.color} rounded-full mb-4`}>
            <span className="text-2xl">{activeGame.emoji}</span>
            <h4 className="text-xl font-bold text-white">{activeGame.name}</h4>
          </div>
          <p className="text-white/70">Top 10 jogadores com melhor desempenho</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20">

          <div className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 p-6 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentRanking.slice(0, 3).map((player, index) => (
                <div
                  key={player.rank}
                  className={`text-center p-4 rounded-xl ${getPodiumStyle(index)}`}
                >
                  <div className="text-4xl mb-2">{player.avatar}</div>
                  <div className="flex items-center justify-center mb-2">
                    {getRankIcon(player.rank)}
                    <span className="ml-2 text-2xl font-bold text-white">#{player.rank}</span>
                  </div>
                  <h5 className="text-lg font-bold text-white mb-1">{player.name}</h5>
                  <div className="text-yellow-400 font-bold text-xl mb-1">
                    {player.score.toLocaleString()} pts
                  </div>
                  <div className="text-white/60 text-sm">
                    {player.gamesPlayed} jogos
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Posição</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Jogador</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Pontuação</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Jogos</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Média</th>
                </tr>
              </thead>
              <tbody>
                {currentRanking.map((player, index) => (
                  <tr
                    key={player.rank}
                    className={`border-t border-white/10 hover:bg-white/5 transition-colors ${index < 3 ? 'bg-white/5' : ''
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getRankBadgeColor(player.rank)}`}>
                          <span className="text-white font-bold text-sm">#{player.rank}</span>
                        </div>
                        {getRankIcon(player.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{player.avatar}</span>
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-400 font-bold text-lg">
                        {player.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/70">
                      {player.gamesPlayed}
                    </td>
                    <td className="px-6 py-4 text-white/70">
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