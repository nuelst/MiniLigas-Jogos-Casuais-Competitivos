import { globalRanking } from '@/shared/mocks/landing-page';
import { Crown } from 'lucide-react';

export function GlobalRankingSection() {
  return (
    <section id="rankings" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-white text-center mb-12">
        🏆 Ranking Geral
      </h3>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">Posição</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Jogador</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Pontuação Total</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Jogos</th>
              </tr>
            </thead>
            <tbody>
              {globalRanking.map((player) => (
                <tr key={player.rank} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {player.rank === 1 && <Crown className="h-5 w-5 text-yellow-400 mr-2" />}
                      <span className="text-white font-semibold">#{player.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{player.name}</td>
                  <td className="px-6 py-4 text-yellow-400 font-bold">
                    {player.totalScore.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-white/70">{player.games}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

  );
}