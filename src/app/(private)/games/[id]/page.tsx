import { CarRacingGame } from "@/components/games/car-racing";
import { FlipBird } from "@/components/games/flip-bird";
import { JokenpoGame } from "@/components/games/jokenpo-game";
import { UnoGame } from "@/components/games/uno-game";
import { notFound } from 'next/navigation';
import { use } from "react";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GAMES = {
  'flip-bird': FlipBird,

  'jokenpo-game': JokenpoGame,
  'uno-game': UnoGame,
  'car-racing': CarRacingGame,
}

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);

  const GameComponent = GAMES[id as keyof typeof GAMES];

  if (!GameComponent) {
    notFound();
  }

  return <GameComponent />;
}
