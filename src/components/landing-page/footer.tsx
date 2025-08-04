import { getCurrentYear } from "@/shared/utils/time";

export function Footer() {
  return (
    <footer className="bg-muted/50 backdrop-blur-sm border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          <p>&copy; {getCurrentYear()} MiniLigas - Jogos Casuais Competitivos</p>
          <p className="mt-2">Divirta-se e compita com jogadores do mundo todo! 🎮</p>
        </div>
      </div>
    </footer>
  );
}