import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TLDRSection } from './components/TLDRSection';
import { MarketSection } from './components/MarketSection';
import { CompetitorCards } from './components/CompetitorCards';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { StrengthsSection } from './components/StrengthsSection';
import { WeaknessesSection } from './components/WeaknessesSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import { RoadmapStatusSection } from './components/RoadmapStatusSection';
import { Footer } from './components/Footer';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { SormModal } from './components/SormModal';
import { RecommendationDrawer } from './components/RecommendationDrawer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { SearchModal } from './components/SearchModal';
import { Recommendation } from './types';

export default function App() {
  // Theme state with localStorage persistence and system preference fallback
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('smit_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Audio Podcast State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSormOpen, setIsSormOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smit_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smit_theme', 'light');
    }
  }, [isDarkMode]);

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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

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
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Section & Audio Player */}
        <HeroSection
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSormModal={() => setIsSormOpen(true)}
        />

        {/* TL;DR Executive Summary */}
        <TLDRSection />

        {/* Market Context & Regulatory Drivers */}
        <MarketSection onOpenSormModal={() => setIsSormOpen(true)} />

        {/* Competitor Profiles */}
        <CompetitorCards />

        {/* Interactive Comparison Matrix */}
        <ComparisonMatrix />

        {/* SmIT Billing Core Strengths & Live Resources */}
        <StrengthsSection />

        {/* Gap Analysis & Weaknesses */}
        <WeaknessesSection onOpenSormDrawer={() => setIsSormOpen(true)} />

        {/* 12 Strategic Recommendations */}
        <RecommendationsSection
          onSelectRecommendation={(reco) => setSelectedRecommendation(reco)}
        />

        {/* Detailed Roadmap Status */}
        <RoadmapStatusSection />
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

      <RecommendationDrawer
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </div>
  );
}
