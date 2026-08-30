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
import { Footer } from './components/Footer';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { SormModal } from './components/SormModal';
import { RecommendationDrawer } from './components/RecommendationDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { SearchModal } from './components/SearchModal';
import { GeminiDemoWidget } from './components/GeminiDemoWidget';
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

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSormOpen, setIsSormOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  // AI Demo Widget state
  const [isDemoWidgetOpen, setIsDemoWidgetOpen] = useState(false);
  const [demoWidgetMode, setDemoWidgetMode] = useState<'chat' | 'book' | 'bookings'>('chat');
  const [demoWidgetContext, setDemoWidgetContext] = useState<any>(undefined);

  const handleOpenDemoWidget = (mode: 'chat' | 'book' | 'bookings' = 'chat', context?: any) => {
    setDemoWidgetMode(mode);
    setDemoWidgetContext(context);
    setIsDemoWidgetOpen(true);
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
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onOpenDemoWidget={handleOpenDemoWidget}
        isPlayingAudio={isPlayingAudio}
        onPlayAudio={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Hero Section & Audio Player */}
        <HeroSection
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSormModal={() => setIsSormOpen(true)}
          onOpenDemoWidget={handleOpenDemoWidget}
        />

        {/* TL;DR Executive Summary */}
        <TLDRSection 
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Market Context & Regulatory Drivers */}
        <MarketSection onOpenSormModal={() => setIsSormOpen(true)} />

        {/* Competitor Profiles */}
        <CompetitorCards />

        {/* Interactive Comparison Matrix */}
        <ComparisonMatrix />

        {/* Сильные и слабые стороны разбираются ниже, в блоке тезисов
            под тарифами — здесь они дублировались один в один. */}

        {/* Матрица рисков & Внешние угрозы (Scatter Chart) */}
        <RiskMatrixSection 
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenAiAssistant={() => setIsAiOpen(true)}
        />

        {/* 12 Strategic Recommendations */}
        <RecommendationsSection
          onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
          statuses={recommendationStatuses}
          onUpdateStatus={handleUpdateStatus}
          activeFilter={recoFilter}
          onClearFilter={() => setRecoFilter('all')}
        />

        {/* Detailed Roadmap Status */}
        <RoadmapStatusSection />

        {/* Заключение / Key Insight */}
        {/* Pricing & Terms for First Clients */}
        <PricingSection 
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenDemoWidget={handleOpenDemoWidget}
        />

        {/* Разбор тезисов: преимущества, слабости и главный вывод —
            после рынка, конкурентов и сравнения, а не до них */}
        <TLDRSection
          part="details"
          onOpenSormDrawer={() => setIsSormOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Positioning & Go-To-Market Strategy */}
        <PositioningSection onOpenCalculator={() => setIsCalculatorOpen(true)} />

        {/* Стратегический трекер — итоговый блок, после всех разделов */}
        <GlobalProgressBar
          statuses={recommendationStatuses}
          onUpdateStatus={handleUpdateStatus}
          onResetStatuses={handleResetStatuses}
          activeFilter={recoFilter}
          onSelectFilter={setRecoFilter}
          onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
        />

        <ConclusionSection 
          onOpenPricing={() => {
            const el = document.getElementById('pricing');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDemo={() => handleOpenDemoWidget('book')}
        />
      </main>

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

      <SormModal
        isOpen={isSormOpen}
        onClose={() => setIsSormOpen(false)}
      />

      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      <GeminiDemoWidget
        isOpen={isDemoWidgetOpen}
        onOpen={() => {
          setDemoWidgetMode('chat');
          setIsDemoWidgetOpen(true);
        }}
        onClose={() => setIsDemoWidgetOpen(false)}
        initialMode={demoWidgetMode}
        initialContext={demoWidgetContext}
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
