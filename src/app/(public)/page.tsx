import { GameSection } from '@/components/landing-page/game-section';
import { GlobalRankingSection } from '@/components/landing-page/global-ranking-section';
import { HeroSection } from '@/components/landing-page/hero-section';
import { StatsSection } from '@/components/landing-page/stats-section';
import { WeeklyHighlightsSection } from '@/components/landing-page/weekly-highlights-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <GameSection />
      <WeeklyHighlightsSection />
      <GlobalRankingSection />
    </main>
  );
}
