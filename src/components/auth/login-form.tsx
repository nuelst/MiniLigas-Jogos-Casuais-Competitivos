'use client';

import { loginSchema, type LoginData } from '@/lib/validations';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, KeyRound, Loader2, LogIn, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const router = useRouter();
  const { signIn, loading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    clearError();
    const result = await signIn(data.emailOrUsername, data.password);

    if (result.success) {
      // Redirecciona baseado no role do usuário
      if (result.user?.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/games');
      }
    } else {
      setError('root', { message: result.error });
    }
  };
  return (
    <div className="bg-card/10 backdrop-blur-sm rounded-xl p-8 border border-border">
      {(error || errors.root) && (
        <div className="mb-6 p-4 bg-destructive/20 border border-destructive/30 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
          <p className="text-destructive text-sm">
            {error || errors.root?.message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="emailOrUsername" className="block text-foreground font-medium mb-2">
            Email ou Nome de usuário
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="emailOrUsername"
              {...register('emailOrUsername')}
              className={`w-full bg-input border rounded-lg px-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.emailOrUsername
                ? 'border-destructive focus:ring-destructive'
                : 'border-border focus:ring-primary'
                }`}
              placeholder="Digite seu email ou nome de usuário"
            />
          </div>
          {errors.emailOrUsername && (
            <p className="mt-1 text-destructive text-sm">{errors.emailOrUsername.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-foreground font-medium mb-2">
            Senha
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className={`w-full bg-input border rounded-lg px-12 pr-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.password
                ? 'border-destructive focus:ring-destructive'
                : 'border-border focus:ring-primary'
                }`}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-destructive text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 disabled:cursor-not-allowed text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isSubmitting || loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Entrando...</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              <span>Entrar</span>
            </>
          )}
        </button>
      </form>


      <div className="mt-6 text-center">
        <p className="text-muted-foreground mb-4">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Cadastre-se
          </Link>
        </p>
        <Link href="/" className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
        </Link>
      </div>
    </div>
  );
} 