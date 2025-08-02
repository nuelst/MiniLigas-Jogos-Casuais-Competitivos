'use client';

import { ArrowLeft, KeyRound, LogIn, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

//TODO: improve form validation with zod and add react-hook-form
export function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('form data:', formData);

  };
  return <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="username" className="block text-white font-medium mb-2">
          Nome de Usuário
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-white font-medium mb-2">
          Senha
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            placeholder="Digite sua senha"
            required
          />
        </div>
      </div>


      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <LogIn className="h-5 w-5" />
        <span>Entrar</span>
      </button>
    </form>


    <div className="mt-6 text-center">
      <p className="text-white/70 mb-4">
        Não tem uma conta?{' '}
        <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
          Cadastre-se
        </Link>
      </p>
      <Link href="/" className="text-white/50 hover:text-white/70 text-sm flex items-center justify-center">
        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
      </Link>
    </div>
  </div>
} 