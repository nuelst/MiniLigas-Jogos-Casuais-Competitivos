import { Play } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            🎮 Jogos Casuais
            <br />
            <span className="text-primary">Competitivos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Compete com jogadores do mundo todo em jogos rápidos e divertidos.
            Suba no ranking, conquiste troféus e mostre suas habilidades!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
              <Play className="inline-block mr-2 h-5 w-5" />
              Começar a Jogar
            </button>
            <a href="#rankings" className="border-2 border-border text-foreground hover:bg-accent px-8 py-4 rounded-lg font-bold text-lg transition-all block text-center">
              Ver Rankings
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <Image
            src="/assets/hero.svg"
            alt="hero"
            width={400}
            height={400}
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-pulse"
          />
        </div>
      </div>
    </section>
  );
}