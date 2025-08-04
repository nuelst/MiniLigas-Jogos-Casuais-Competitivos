'use client';

import { GamesDistributionChart } from "@/components/dashboard/games-distribution-chart";

import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { gameRankings } from "@/shared/mocks/ranking";
import { getDashboardStats, getGameStats, getPlayersSummary } from "@/shared/utils/dashboard";
import { useState } from "react";

function getRankEmoji(rank: number): string {
  if (rank === 1) return '🏆';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
}

function getGameStatusBadge(rank: number): { variant: "default" | "secondary" | "outline", text: string } {
  if (rank <= 3) return { variant: "default", text: "Podium" };
  if (rank <= 5) return { variant: "secondary", text: "Top 5" };
  return { variant: "outline", text: "Ativo" };
}

export default function DashboardPage() {
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const dashboardStats = getDashboardStats();
  const gameStats = getGameStats();
  const playersSummary = getPlayersSummary();

  const currentGameRanking = selectedGame === 'all'
    ? []
    : gameRankings[selectedGame] || [];

  // Reset pagination when changing games
  const handleGameChange = (value: string) => {
    setSelectedGame(value);
    setCurrentPage(1);
  };

  // Calculate pagination for general ranking
  const totalPages = Math.ceil(playersSummary.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPlayers = playersSummary.slice(startIndex, endIndex);

  // Calculate pagination for game-specific ranking
  const totalGamePages = Math.ceil(currentGameRanking.length / itemsPerPage);
  const gameStartIndex = (currentPage - 1) * itemsPerPage;
  const gameEndIndex = gameStartIndex + itemsPerPage;
  const currentGamePlayers = currentGameRanking.slice(gameStartIndex, gameEndIndex);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie jogadores, rankings e estatísticas da plataforma
            </p>
          </div>
          <Button variant="outline">
            📊 Exportar Relatório
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Jogadores</CardTitle>
              <span className="text-2xl">👥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalPlayers}</div>
              <p className="text-xs text-muted-foreground">
                +2 novos esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Partidas</CardTitle>
              <span className="text-2xl">🎮</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalGames.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +180 nas últimas 24h
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jogos Ativos</CardTitle>
              <span className="text-2xl">🕹️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeGames}</div>
              <p className="text-xs text-muted-foreground">
                Todos funcionando
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Player</CardTitle>
              <span className="text-2xl">{dashboardStats.topPlayerOverall.avatar}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.topPlayerOverall.name}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.topPlayerOverall.totalScore.toLocaleString()} pontos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Rankings da Plataforma</CardTitle>
                <CardDescription>
                  Visualize rankings gerais e específicos por jogo
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <Select value={selectedGame} onValueChange={handleGameChange}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Selecione um ranking" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🏆 Ranking Geral</SelectItem>
                      {gameStats.map((game) => (
                        <SelectItem key={game.id} value={game.id}>
                          {game.emoji} {game.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {selectedGame === 'all' ? (
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ranking</TableHead>
                          <TableHead>Jogador</TableHead>
                          <TableHead>Pontuação Total</TableHead>
                          <TableHead>Partidas Jogadas</TableHead>
                          <TableHead>Jogo Favorito</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPlayers.map((player) => (
                          <TableRow key={player.name}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">#{player.rank}</span>
                                {player.rank <= 3 && (
                                  <span className="text-lg">
                                    {getRankEmoji(player.rank)}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{player.avatar}</span>
                                <span className="font-medium">{player.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-bold">
                              {player.totalScore.toLocaleString()}
                            </TableCell>
                            <TableCell>{player.gamesPlayed}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{player.favoriteGame}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={player.rank <= 5 ? "default" : "outline"}>
                                {player.rank <= 5 ? "Top Player" : "Ativo"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>


                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Mostrando {startIndex + 1} a {Math.min(endIndex, playersSummary.length)} de {playersSummary.length} jogadores
                      </p>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>

                          {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg">
                      <span className="text-3xl">
                        {gameStats.find(g => g.id === selectedGame)?.emoji}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {gameStats.find(g => g.id === selectedGame)?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {gameStats.find(g => g.id === selectedGame)?.totalPlayers} jogadores • {gameStats.find(g => g.id === selectedGame)?.totalGames} partidas
                        </p>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Posição</TableHead>
                          <TableHead>Jogador</TableHead>
                          <TableHead>Pontuação</TableHead>
                          <TableHead>Partidas</TableHead>
                          <TableHead>Média por Partida</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentGamePlayers.map((player) => {
                          const status = getGameStatusBadge(player.rank);
                          return (
                            <TableRow key={player.name}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold">#{player.rank}</span>
                                  {player.rank <= 3 && (
                                    <span className="text-lg">
                                      {getRankEmoji(player.rank)}
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{player.avatar}</span>
                                  <span className="font-medium">{player.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-bold">
                                {player.score.toLocaleString()}
                              </TableCell>
                              <TableCell>{player.gamesPlayed}</TableCell>
                              <TableCell>
                                {Math.round(player.score / player.gamesPlayed).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge variant={status.variant}>{status.text}</Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>

                    {/* Paginação do Ranking por Jogo */}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Mostrando {gameStartIndex + 1} a {Math.min(gameEndIndex, currentGameRanking.length)} de {currentGameRanking.length} jogadores
                      </p>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>

                          {[...Array(totalGamePages)].map((_, index) => {
                            const page = index + 1;
                            if (
                              page === 1 ||
                              page === totalGamePages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setCurrentPage(page)}
                                    isActive={currentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage(Math.min(totalGamePages, currentPage + 1))}
                              className={currentPage === totalGamePages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>


          <div className="lg:col-span-1 flex flex-col gap-4">
            <GamesDistributionChart />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}