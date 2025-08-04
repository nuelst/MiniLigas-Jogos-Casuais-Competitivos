"use client";

import { GamepadIcon, LogOut, Menu, Play, Settings, Trophy, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../theme-toggle";

const useAuth = () => {
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(

    { name: "João Silva", email: "joao@miniligas.com" }
  );

  return { user, isAuthenticated: !!user };
};

function Avatar({ children, className = "" }: { readonly children: React.ReactNode; readonly className?: string }) {
  return (
    <div className={`w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full text-sm font-medium ${className}`}>
      {children}
    </div>
  );
}


function UserMenu({ user }: { readonly user: { name: string; email: string; avatar?: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-1 rounded-lg transition-colors"
      >
        <Avatar>
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-full h-full rounded-full" />
          ) : (
            user.name.split(' ').map(n => n[0]).join('').toUpperCase()
          )}
        </Avatar>
      </button>

      {isOpen && (
        <>
          <button
            className="fixed inset-0 z-10 bg-transparent border-none cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="p-1">
              <Link href="/profile" className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <User size={16} />
                <span>Perfil</span>
              </Link>
              <Link href="/games" className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <Trophy size={16} />
                <span>Meus Jogos</span>
              </Link>
              <Link href="/settings" className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <Settings size={16} />
                <span>Configurações</span>
              </Link>
              <hr className="my-1 border-border" />
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MobileMenu({ isAuthenticated }: { readonly isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <>
          <button
            className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm border-none cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            aria-label="Close mobile menu"
          />
          <div className="absolute top-full left-4 right-4 mt-2 bg-card border border-border rounded-lg shadow-lg z-30 p-4">
            <nav className="space-y-4">
              <a href="#jogos" className="block text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                Jogos
              </a>
              <a href="#rankings" className="block text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                Rankings
              </a>
              {!isAuthenticated && (
                <Link href="/login" className="block text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

export function Header() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center space-x-4">
            <MobileMenu isAuthenticated={isAuthenticated} />
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <GamepadIcon className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">MiniLigas</h1>
            </Link>
          </div>


          <nav className="hidden md:flex items-center space-x-6">
            <a href="#jogos" className="text-muted-foreground hover:text-foreground transition-colors">
              Jogos
            </a>
            <a href="#rankings" className="text-muted-foreground hover:text-foreground transition-colors">
              Rankings
            </a>
          </nav>


          <div className="flex items-center space-x-2">

            <ThemeToggle />

            {isAuthenticated ? (
              <UserMenu user={user!} />
            ) : (
              <Link
                href="/login"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Play size={16} />
                <span className="hidden sm:inline">Começar a Jogar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}