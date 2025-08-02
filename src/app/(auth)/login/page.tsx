
import { LoginForm } from '@/components/auth/login-form';
import { GamepadIcon } from 'lucide-react';

export default function LoginPage() {

  return (
    <div>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <GamepadIcon className="h-12 w-12 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">MiniLigas</h1>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
        <p className="text-white/70">Entre na sua conta para continuar jogando</p>
      </div>

      <LoginForm />
    </div>
  );
} 