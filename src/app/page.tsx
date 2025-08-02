import { Footer } from '@/components/landing-page/footer';
import { GameSection } from '@/components/landing-page/game-section';
import { GlobalRankingSection } from '@/components/landing-page/global-ranking-section';
import { Header } from '@/components/landing-page/header';
import { HeroSection } from '@/components/landing-page/hero-section';
import { StatsSection } from '@/components/landing-page/stats-section';
import { WeeklyHighlightsSection } from '@/components/landing-page/weekly-highlights-section';

export default function Home() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <GameSection />
        <WeeklyHighlightsSection />
        <GlobalRankingSection />
      </main>
      <Footer />
    </div>
  );
}
