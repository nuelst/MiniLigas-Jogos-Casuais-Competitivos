import Image from "next/image";

export function BuildingGame() {
  return (
    <div className="game-container">
      <div className="  p-8  mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            🏗️ Jogo de Construção
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Em breve! Construa estruturas incríveis e desafie outros jogadores.
          </p>
          <div className="relative">
            <Image
              src="/assets/building.svg"
              alt="building game"
              width={300}
              height={300}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 animate-pulse mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}