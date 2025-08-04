import { GamepadIcon, Trophy, Users } from 'lucide-react';
export function StatsSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <Users className="h-10 w-10 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">6,287</div>
          <div className="text-muted-foreground">Jogadores Ativos</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <GamepadIcon className="h-10 w-10 text-accent mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">45,231</div>
          <div className="text-muted-foreground">Partidas Jogadas</div>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
          <Trophy className="h-10 w-10 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-foreground">1,892</div>
          <div className="text-muted-foreground">Recordes Quebrados</div>
        </div>
      </div>
    </section>
  );
}