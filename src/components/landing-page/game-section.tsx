import { games } from '@/shared/mocks/landing-page';
import { Play } from 'lucide-react';

export function GameSection() {
  return (
    <section id="jogos" className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-foreground text-center mb-12">
        🕹️ Jogos Disponíveis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 hover:bg-card transition-all transform hover:scale-105 border border-border">
            <div className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
              {game.name.split(' ')[0]}
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