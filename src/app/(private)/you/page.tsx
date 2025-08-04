'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';
import {
  Calendar,
  Crown,
  Gamepad2,
  LogOut,
  Mail,
  Settings,
  Shield,
  Trophy,
  User,
  Users
} from 'lucide-react';

// Função utilitária para calcular tempo decorrido
const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'hoje';
  if (diffInDays === 1) return 'há 1 dia';
  if (diffInDays < 30) return `há ${diffInDays} dias`;
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? 'há 1 mês' : `há ${months} meses`;
  }
  const years = Math.floor(diffInDays / 365);
  return years === 1 ? 'há 1 ano' : `há ${years} anos`;
};

export default function YouPage() {
  const { user, signOut, isAdmin } = useAuthStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const memberSince = getTimeAgo(user.created_at);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
            <p className="text-muted-foreground">Gerencie suas informações e configurações</p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              {isAdmin && (
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-card-foreground">{user.name}</h2>
                  <Badge variant={isAdmin ? "default" : "secondary"} className="flex items-center gap-1">
                    {isAdmin ? <Shield className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                    {isAdmin ? 'Administrador' : 'Jogador'}
                  </Badge>
                </div>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Email</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Membro desde</p>
                    <p className="text-muted-foreground">{memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gamepad2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Jogos Favoritos</h3>
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-sm text-muted-foreground">disponíveis</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Melhor Score</h3>
            <p className="text-2xl font-bold text-primary">-</p>
            <p className="text-sm text-muted-foreground">em breve</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Posição Global</h3>
            <p className="text-2xl font-bold text-primary">-</p>
            <p className="text-sm text-muted-foreground">em breve</p>
          </Card>
        </div>

        {/* Account Details */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Detalhes da Conta</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-card-foreground mb-1">
                  ID do Usuário
                </div>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded font-mono">
                  {user.id}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-card-foreground mb-1">
                  Data de Criação
                </div>
                <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {new Date(user.created_at).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Ações Rápidas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Ver Meus Jogos
            </Button>

            <Button variant="outline" className="justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              Ver Rankings
            </Button>

            {isAdmin && (
              <Button variant="outline" className="justify-start md:col-span-2">
                <Shield className="h-4 w-4 mr-2" />
                Painel Administrativo
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}