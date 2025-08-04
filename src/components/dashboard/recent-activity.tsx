'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
  const activities = [
    {
      type: "new_player",
      message: "Novo jogador registrado: Marina Silva",
      time: "2 minutos atrás",
      icon: "👤",
      variant: "default" as const
    },
    {
      type: "high_score",
      message: "João Silva atingiu novo recorde no Car Racing: 15.420 pontos",
      time: "15 minutos atrás",
      icon: "🏆",
      variant: "default" as const
    },
    {
      type: "game_completed",
      message: "50 partidas de Flip Bird completadas na última hora",
      time: "1 hora atrás",
      icon: "🎮",
      variant: "secondary" as const
    },
    {
      type: "maintenance",
      message: "Manutenção programada do Uno Game concluída",
      time: "2 horas atrás",
      icon: "🔧",
      variant: "outline" as const
    },
    {
      type: "achievement",
      message: "Pedro Costa desbloqueou conquista 'Mestre do UNO'",
      time: "3 horas atrás",
      icon: "🎖️",
      variant: "default" as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>
          Últimas ações e eventos na plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={`${activity.type}-${index}`} className="flex items-start gap-3 pb-3 last:pb-0">
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                  <Badge variant={activity.variant} className="text-xs">
                    {activity.type.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}