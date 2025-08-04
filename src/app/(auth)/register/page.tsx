import { RegisterForm } from '@/components/auth/register-form';
import { GamepadIcon } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <GamepadIcon className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">MiniLigas</h1>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Criar Nova Conta</h2>
        <p className="text-muted-foreground">Junte-se à comunidade e comece a jogar!</p>
      </div>

      <RegisterForm />
    </div>


  );
}   