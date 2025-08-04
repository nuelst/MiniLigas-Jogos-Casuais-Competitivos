import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminActions() {
  const actions = [
    {
      title: "Gerenciar Jogadores",
      description: "Visualizar, editar ou banir jogadores",
      icon: "👥",
      action: () => console.log("Gerenciar jogadores")
    },
    {
      title: "Configurar Jogos",
      description: "Ajustar parâmetros e dificuldade dos jogos",
      icon: "⚙️",
      action: () => console.log("Configurar jogos")
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios detalhados de desempenho",
      icon: "📊",
      action: () => console.log("Gerar relatórios")
    },
    {
      title: "Moderação",
      description: "Revisar conteúdo e comportamento de usuários",
      icon: "🛡️",
      action: () => console.log("Moderação")
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Administrativas</CardTitle>
        <CardDescription>
          Ferramentas de gestão e moderação da plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto justify-start p-4"
              onClick={action.action}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{action.icon}</span>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}