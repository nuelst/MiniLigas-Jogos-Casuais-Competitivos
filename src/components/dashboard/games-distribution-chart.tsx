"use client"

import { getGameStatsFromDB } from "@/lib/dashboard-api"
import type { GameStats } from "@/types/dashboard"
import { TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

const chartConfig = {
  players: {
    label: "Jogadores",
  },
  "car-racing": {
    label: "Car Racing",
    color: "var(--chart-1)",
  },
  "flip-bird": {
    label: "Flip Bird",
    color: "var(--chart-2)",
  },
  "uno-game": {
    label: "Uno Game",
    color: "var(--chart-3)",
  },
  "rock-paper-scissors": {
    label: "Pedra, Papel, Tesoura",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig


interface TooltipProps {
  readonly active?: boolean;
  readonly payload?: Array<{
    readonly payload: {
      readonly emoji: string;
      readonly name: string;
      readonly players: number;
      readonly totalPlayers: number;
      readonly percentage: string;
      readonly totalGames: number;
    };
  }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload?.length) {
    const data = payload[0].payload;

    return (
      <div className="rounded-lg border bg-background p-3 shadow-xl min-w-[180px] animate-in fade-in-0 zoom-in-95 duration-150">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{data.emoji}</span>
          <span className="font-semibold text-foreground">{data.name}</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Jogadores:</span>
            <span className="font-medium text-foreground">{data.players.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Participação:</span>
            <span className="font-medium text-foreground">{data.percentage}%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Partidas:</span>
            <span className="font-medium text-foreground">{data.totalGames.toLocaleString()}</span>
          </div>
          <div className="pt-1 mt-2 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              de {data.totalPlayers.toLocaleString()} jogadores na plataforma
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function GamesDistributionChart() {
  const [gameStats, setGameStats] = useState<GameStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await getGameStatsFromDB()
        setGameStats(stats)
      } catch (error) {
        console.error('Erro ao carregar estatísticas dos jogos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const colorMap = {
    "car-racing": "var(--chart-1)",
    "flip-bird": "var(--chart-2)",
    "uno-game": "var(--chart-3)",
    "rock-paper-scissors": "var(--chart-4)",
    "jokenpo-game": "var(--chart-5)",
    "dino-game": "var(--chart-6)",
  } as const

  const totalPlayers = gameStats.reduce((sum, game) => sum + game.totalPlayers, 0);

  const chartData = gameStats.map((game) => ({
    game: game.id,
    players: game.totalPlayers,
    fill: colorMap[game.id as keyof typeof colorMap] || "var(--chart-1)",
    name: game.name,
    emoji: game.emoji,
    totalPlayers: totalPlayers, // Para cálculo de porcentagem no tooltip
    totalGames: game.totalGames, // Total de partidas do jogo
    percentage: totalPlayers > 0 ? ((game.totalPlayers / totalPlayers) * 100).toFixed(1) : '0'
  }))

  if (loading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Distribuição de Jogadores</CardTitle>
          <CardDescription>Carregando dados...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square max-h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Jogadores</CardTitle>
        <CardDescription>Por jogo disponível na plataforma</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Pie
              data={chartData}
              dataKey="players"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Crescimento de 12% no engajamento <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total de {totalPlayers} jogadores ativos distribuídos entre {chartData.length} jogos
        </div>
      </CardFooter>
    </Card>
  )
}