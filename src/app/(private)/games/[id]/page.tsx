import { use } from "react";

type GamePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function GamePage({ params }: GamePageProps) {
  const { id } = use(params);
  return <div>Game {id}</div>;
}