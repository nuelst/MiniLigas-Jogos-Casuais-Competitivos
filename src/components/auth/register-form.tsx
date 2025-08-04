'use client';

import { registerSchema, type RegisterData } from '@/lib/validations';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, CheckCircle, Eye, EyeOff, KeyRound, Loader2, Mail, User, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function RegisterForm() {
  const router = useRouter();
  const { signUp, loading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    clearError();
    setSuccess(false);

    const result = await signUp({
      email: data.email,
      password: data.password,
      username: data.username,
      name: data.name,
    });

    if (result.success) {
      setSuccess(true);
      toast.success('Conta criada com sucesso!', {
        description: 'Verifique seu email para confirmar sua conta e fazer login.',
        duration: 5000,
      });
      // Redirecionar para página de confirmação de email ou login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      setError('root', { message: result.error });
    }
  };

  if (success) {
    return (
      <div className="bg-card/10 backdrop-blur-sm rounded-xl p-8 border border-border text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Conta criada com sucesso!</h2>
          <p className="text-muted-foreground">
            Verifique seu email para ativar sua conta.
            <br />
            Redirecionando para o login...
          </p>
        </div>
      </div>
    );
  }

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
          <label htmlFor="name" className="block text-foreground font-medium mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`w-full bg-input border rounded-lg px-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.name
                ? 'border-destructive focus:ring-destructive'
                : 'border-border focus:ring-primary'
                }`}
              placeholder="Digite seu nome completo"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Nome de Usuário */}
        <div>
          <label htmlFor="username" className="block text-foreground font-medium mb-2">
            Nome de Usuário
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`w-full bg-input border rounded-lg px-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.username
                ? 'border-destructive focus:ring-destructive'
                : 'border-border focus:ring-primary'
                }`}
              placeholder="Digite seu nome de usuário"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-destructive text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-foreground font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full bg-input border rounded-lg px-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors.email
                ? 'border-destructive focus:ring-destructive'
                : 'border-border focus:ring-primary'
                }`}
              placeholder="Digite seu email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-destructive text-sm">{errors.email.message}</p>
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
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-destructive text-sm">{errors.password.message}</p>
          )}
        </div>


        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
        >
          {isSubmitting || loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Criando conta...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              <span>Criar Conta</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground mb-4">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Faça login
          </Link>
        </p>
        <Link href="/" className="text-muted-foreground hover:text-foreground text-sm flex items-center justify-center transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
        </Link>
      </div>
    </div>
  );
}