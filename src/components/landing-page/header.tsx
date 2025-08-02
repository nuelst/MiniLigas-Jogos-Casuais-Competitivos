import { GamepadIcon } from "lucide-react";

export function Header() {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GamepadIcon className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">MiniLigas</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#jogos" className="text-white/80 hover:text-white transition-colors">Jogos</a>
            <a href="#rankings" className="text-white/80 hover:text-white transition-colors">Rankings</a>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
              Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}