import Image from "next/image";

export function BuildingGame() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
        Jogo de Construção
      </h1>
      <Image
        src="/assets/building.svg"
        alt="building game"
        width={300}
        height={300}
        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 animate-pulse"
      />
    </div>
  )
}