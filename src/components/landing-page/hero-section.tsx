import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          🎮 Jogos Casuais
          <br />
          <span className="text-yellow-400">Competitivos</span>
        </h2>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          Compete com jogadores do mundo todo em jogos rápidos e divertidos.
          Suba no ranking, conquiste troféus e mostre suas habilidades!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
            <Play className="inline-block mr-2 h-5 w-5" />
            Começar a Jogar
          </button>
          <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all">
            Ver Rankings
          </button>
        </div>
      </div>
    </section>
  );
}