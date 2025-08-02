import { FlipBird } from "@/components/games/flip-bird";
import { use } from "react";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);

  if (id === 'flip-bird') {
    return <FlipBird />;
  }
  return <div>Game {id}</div>;


}
