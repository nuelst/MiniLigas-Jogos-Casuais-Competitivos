'use client';

import { ArrowLeft, Calendar, KeyRound, Mail, User, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

//TODO: improve form validation with zod and add react-hook-form
export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register data:', formData);

  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="name" className="block text-white font-medium mb-2">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Digite seu nome completo"
              required
            />
          </div>
        </div>


        <div>
          <label htmlFor="username" className="block text-white font-medium mb-2">
            Nome de Usuário
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
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
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Digite seu email"
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
              minLength={6}
            />
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label htmlFor="age" className="block text-white font-medium mb-2">
              Idade
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="Idade"
                min="13"
                max="120"
                required
              />
            </div>
          </div>


          <div>
            <label htmlFor="gender" className="block text-white font-medium mb-2">
              Gênero
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              required
            >
              <option value="" className="bg-gray-800 text-white">Selecione</option>
              <option value="masculino" className="bg-gray-800 text-white">Masculino</option>
              <option value="feminino" className="bg-gray-800 text-white">Feminino</option>
              <option value="outro" className="bg-gray-800 text-white">Outro</option>
              <option value="prefiro-nao-informar" className="bg-gray-800 text-white">Prefiro não informar</option>
            </select>
          </div>
        </div>


        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Criar Conta</span>
        </button>
      </form>


      <div className="mt-6 text-center">
        <p className="text-white/70 mb-4">
          Já tem uma conta?{' '}
          <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
            Faça login
          </a>
        </p>
        <a href="/" className="text-white/50 hover:text-white/70 text-sm flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
        </a>
      </div>
    </div>
  );
}