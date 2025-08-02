import { getCurrentYear } from "@/shared/utils/time";

export function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white/60">
          <p>&copy; {getCurrentYear()} MiniLigas - Jogos Casuais Competitivos</p>
          <p className="mt-2">Divirta-se e compita com jogadores do mundo todo! 🎮</p>
        </div>
      </div>
    </footer>
  );
}