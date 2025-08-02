import { weeklyHighlights } from '@/shared/mocks/landing-page';
export function WeeklyHighlightsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h3 className="text-4xl font-bold text-white text-center mb-12">
        ⭐ Destaques da Semana
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {weeklyHighlights.map((player) => (
          <div key={player.name} className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 text-center border border-yellow-500/30">
            <div className="text-4xl mb-4">{player.avatar}</div>
            <h4 className="text-xl font-bold text-white mb-2">{player.name}</h4>
            <p className="text-white/70 mb-2">{player.game}</p>
            <div className="text-2xl font-bold text-yellow-400">
              {player.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </section>

  );
}