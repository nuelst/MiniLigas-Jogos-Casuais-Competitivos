import { games } from '@/shared/mocks/landing-page';
import { Play } from 'lucide-react';

export function GameSection() {
  return (
    <section id="jogos" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-white text-center mb-12">
        🕹️ Jogos Disponíveis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all transform hover:scale-105">
            <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
              {game.name.split(' ')[0]}
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
            <p className="text-white/70 text-sm mb-4">{game.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                {game.difficulty}
              </span>
              <span className="text-xs text-white/60">
                {game.players.toLocaleString()} jogadores
              </span>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-semibold transition-colors">
              <Play className="inline-block mr-2 h-4 w-4" />
              Jogar
            </button>
          </div>
        ))}
      </div>
    </section>

  );
} 