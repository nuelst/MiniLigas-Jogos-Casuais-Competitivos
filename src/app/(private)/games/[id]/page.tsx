import { BuildingGame } from "@/components/games/building-game";
import { FlipBird } from "@/components/games/flip-bird";
import { notFound } from 'next/navigation';
import { use } from "react";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GAMES = {
  'flip-bird': FlipBird,

  'jokenpo-game': BuildingGame,
  'uno-game': BuildingGame,
  'car-racing': BuildingGame,
}

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);

  const GameComponent = GAMES[id as keyof typeof GAMES];

  if (!GameComponent) {
    notFound();
  }

  return <GameComponent />;
}
