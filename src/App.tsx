import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GlobalProgressBar, DEFAULT_RECOMMENDATION_STATUSES } from './components/GlobalProgressBar';
import { HeroSection } from './components/HeroSection';
import { TLDRSection } from './components/TLDRSection';
import { PositioningSection } from './components/PositioningSection';
import { PricingSection } from './components/PricingSection';
import { MarketSection } from './components/MarketSection';
import { CompetitorCards } from './components/CompetitorCards';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { StrengthsSection } from './components/StrengthsSection';
import { WeaknessesSection } from './components/WeaknessesSection';
import { RiskMatrixSection } from './components/RiskMatrixSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { RoadmapStatusSection } from './components/RoadmapStatusSection';
import { ConclusionSection } from './components/ConclusionSection';
import { TableOfContents } from './components/TableOfContents';
import { AuroraBackground } from './components/AuroraBackground';
import { LiveLinks } from './components/LiveLinks';
import { SchemesSection } from './components/SchemesSection';
import { LicenseServerSection } from './components/LicenseServerSection';
import { AuthorPanel } from './components/AuthorPanel';
import { askAi } from './services/aiWidget';
import { RoadmapCta } from './components/RoadmapCta';
import { Footer } from './components/Footer';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { SormModal } from './components/SormModal';
import { RecommendationDrawer } from './components/RecommendationDrawer';
import { SearchModal } from './components/SearchModal';
import { Recommendation, RecommendationStatus, ThemeMode } from './types';

export default function App() {
  // System theme detection state
  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  });

  // Selected theme mode: 'system' (default), 'light', or 'dark'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('smit_theme_mode');
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved as ThemeMode;
    }
    // Backward compatibility with previous 'smit_theme' key
    const oldSaved = localStorage.getItem('smit_theme');
    if (oldSaved === 'dark') return 'dark';
    if (oldSaved === 'light') return 'light';
    return 'system';
  });

  // Listen to OS theme changes in real-time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    setIsSystemDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Effective dark mode calculation
  const isDarkMode = themeMode === 'system' ? isSystemDark : themeMode === 'dark';

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('smit_theme_mode', mode);
  };

  // Audio Podcast State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  /**
   * Подкаст можно включить ссылкой.
   *
   * AI-консультант на вопрос «расскажите о планах развития» предлагает
   * послушать запись и ведёт на #podcast. Приходить туда молча странно:
   * человек согласился слушать, значит воспроизведение начинается само.
   * Автозапуск разрешён потому, что предшествует клик по кнопке — без
   * него браузер бы его и не дал.
   */
  useEffect(() => {
    /**
     * Панели и запись открываются ссылкой.
     *
     * AI-консультант отвечает кнопкой со ссылкой на эту же страницу, а
     * половина содержимого живёт не в разделах, а в боковых панелях:
     * профиль автора, разбор СОРМ, калькулятор окупаемости. Раньше он мог
     * только описать их словами — теперь ведёт прямо в нужную.
     */
    const actions: Record<string, () => void> = {
      podcast: () => {
        document.getElementById('podcast')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsPlayingAudio(true);
      },
      author: () => setIsAuthorOpen(true),
      sorm: () => setIsSormOpen(true),
      roi: () => setIsCalculatorOpen(true),
      calculator: () => setIsCalculatorOpen(true),
    };

    const runFromHash = () => {
      const key = decodeURIComponent(window.location.hash || '').replace(/^#/, '');
      actions[key]?.();
    };
    runFromHash();
    window.addEventListener('hashchange', runFromHash);

    // прямые вызовы со страницы: пригодятся кнопкам вне React-дерева
    (window as any).SmitPage = {
      podcast: actions.podcast,
      author: actions.author,
      sorm: actions.sorm,
      roi: actions.roi,
    };
    return () => window.removeEventListener('hashchange', runFromHash);
  }, []);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSormOpen, setIsSormOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  /**
   * Кнопки «Демо», «Записаться» и «Спросить» открывают один AI-консультант —
   * тот, что подключён скриптом с сервера лицензий. Своего чата на странице
   * больше нет: два помощника в одном углу спорили друг с другом, а промпт и
   * история разговоров нужны в одном месте, где их можно читать и править.
   */
  const handleOpenDemoWidget = (mode: 'chat' | 'book' | 'bookings' = 'chat') => {
    const W = (window as any).SmitWidget;
    if (!W) return;                       // скрипт ещё не загрузился — молча ждём
    W.open(mode === 'chat' ? 'chat' : 'book');
  };

  // Recommendations Roadmap Statuses (Persisted in localStorage)
  const [recommendationStatuses, setRecommendationStatuses] = useState<Record<string, RecommendationStatus>>(() => {
    try {
      const saved = localStorage.getItem('smit_recommendations_status');
      if (saved) {
        return { ...DEFAULT_RECOMMENDATION_STATUSES, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse recommendation statuses', e);
    }
    return DEFAULT_RECOMMENDATION_STATUSES;
  });

  // Filter state for recommendations
  const [recoFilter, setRecoFilter] = useState<'all' | RecommendationStatus>('all');

  // Save recommendation statuses to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('smit_recommendations_status', JSON.stringify(recommendationStatuses));
    } catch (e) {
      console.error('Failed to save recommendation statuses', e);
    }
  }, [recommendationStatuses]);

  const handleUpdateStatus = (id: string, newStatus: RecommendationStatus) => {
    setRecommendationStatuses(prev => ({
      ...prev,
      [id]: newStatus
    }));
  };

  const handleResetStatuses = () => {
    setRecommendationStatuses(DEFAULT_RECOMMENDATION_STATUSES);
    try {
      localStorage.removeItem('smit_recommendations_status');
    } catch (e) {
      console.error('Failed to remove saved statuses', e);
    }
  };

  // Global Keyboard Shortcuts (Ctrl/Cmd + K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCompetitorFromSearch = (compId: string) => {
    const element = document.getElementById(compId) || document.getElementById('competitors');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar
        themeMode={themeMode}
        isDarkMode={isDarkMode}
        isSystemDark={isSystemDark}
        onSetThemeMode={handleSetThemeMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSormDrawer={() => setIsSormOpen(true)}
        onOpenAiAssistant={() => askAi()}
        onOpenDemoWidget={handleOpenDemoWidget}
        isPlayingAudio={isPlayingAudio}
        onPlayAudio={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      <AuroraBackground />

      <TableOfContents />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Hero Section & Audio Player */}
        <HeroSection
          onOpenAuthor={() => setIsAuthorOpen(true)}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSormModal={() => setIsSormOpen(true)}
          onOpenDemoWidget={handleOpenDemoWidget}
        />

        {/* TL;DR Executive Summary */}
        <TLDRSection
          part="summary"
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Главный вывод идёт сразу за тезисами: он отвечает именно на них */}
        <TLDRSection
          part="verdict"
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Market Context & Regulatory Drivers */}
        <MarketSection onOpenSormModal={() => setIsSormOpen(true)} />

        {/* Competitor Profiles */}
        <CompetitorCards />

        {/* Interactive Comparison Matrix */}
        <ComparisonMatrix />

        {/* Сравнили с конкурентами — теперь где сильнее и где слабее */}
        <StrengthsSection onOpenSormDrawer={() => setIsSormOpen(true)} />

        <WeaknessesSection onOpenSormDrawer={() => setIsSormOpen(true)} />

        {/* Сильные и слабые стороны разбираются ниже, в блоке тезисов
            под тарифами — здесь они дублировались один в один. */}

        {/* Матрица рисков & Внешние угрозы (Scatter Chart) */}
        <RiskMatrixSection 
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenAiAssistant={() => askAi()}
        />

        {/* 12 Strategic Recommendations */}
        <RecommendationsSection
          onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
          statuses={recommendationStatuses}
          onUpdateStatus={handleUpdateStatus}
          activeFilter={recoFilter}
          onClearFilter={() => setRecoFilter('all')}
        />

        {/* Трекер исполнения — сразу за рекомендациями, по которым он считается */}
        <GlobalProgressBar
          statuses={recommendationStatuses}
          onUpdateStatus={handleUpdateStatus}
          onResetStatuses={handleResetStatuses}
          activeFilter={recoFilter}
          onSelectFilter={setRecoFilter}
          onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
        />

        {/* Detailed Roadmap Status */}
        <RoadmapStatusSection />

        {/* Заключение / Key Insight */}
        {/* Работающие адреса продукта — до итогов, как в статической версии */}
        <LiveLinks />

        {/* Схемы системы — продолжение живых доказательств */}
        <SchemesSection />

        {/* Коммерческая половина: чем биллинг продаётся и обслуживается — перед ценой */}
        <LicenseServerSection />

        {/* Pricing & Terms for First Clients */}
        <PricingSection 
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenDemoWidget={handleOpenDemoWidget}
        />

        {/* Positioning & Go-To-Market Strategy */}
        <PositioningSection
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenAuthor={() => setIsAuthorOpen(true)}
        />

        <ConclusionSection 
          onOpenPricing={() => {
            const el = document.getElementById('pricing');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDemo={() => handleOpenDemoWidget('book')}
        />
      </main>

      {/* Переход к странице исполнения плана — последнее, что видит читатель */}
      <RoadmapCta />

      {/* Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
        onSelectCompetitor={handleSelectCompetitorFromSearch}
      />

      <RoiCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <AuthorPanel open={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} />

      <SormModal
        isOpen={isSormOpen}
        onClose={() => setIsSormOpen(false)}
      />

      <RecommendationDrawer
        recommendation={selectedRecommendation}
        status={selectedRecommendation ? (recommendationStatuses[selectedRecommendation.id] || 'planned') : 'planned'}
        onUpdateStatus={handleUpdateStatus}
        onClose={() => setSelectedRecommendation(null)}
      />
    </div>
  );
}
