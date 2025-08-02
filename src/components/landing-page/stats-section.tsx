import { GamepadIcon, Trophy, Users } from 'lucide-react';
export function StatsSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Users className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">6,287</div>
          <div className="text-white/70">Jogadores Ativos</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <GamepadIcon className="h-10 w-10 text-green-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">45,231</div>
          <div className="text-white/70">Partidas Jogadas</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Trophy className="h-10 w-10 text-purple-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">1,892</div>
          <div className="text-white/70">Recordes Quebrados</div>
        </div>
      </div>
    </section>
  );
}