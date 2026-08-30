import React from 'react';
import { 
  Sparkles, 
  Calculator, 
  Bot, 
  Headphones,
  ExternalLink,
  BookOpen,
  Calendar
} from 'lucide-react';
import { METADATA } from '../data/strategicData';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode } from '../types';

interface NavbarProps {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  isSystemDark: boolean;
  onSetThemeMode: (mode: ThemeMode) => void;
  onOpenSearch?: () => void;
  onOpenCalculator: () => void;
  onOpenSormDrawer?: () => void;
  onOpenAiAssistant: () => void;
  onOpenDemoWidget?: (mode?: 'chat' | 'book' | 'bookings') => void;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  themeMode,
  isDarkMode,
  isSystemDark,
  onSetThemeMode,
  onOpenSearch,
  onOpenCalculator,
  onOpenSormDrawer,
  onOpenAiAssistant,
  onOpenDemoWidget,
  onPlayAudio,
  isPlayingAudio
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo - Bento Style */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="#tldr" className="flex items-center gap-3 group">
            <div className="group-hover:scale-105 transition-transform">
              <BrandLogo size="md" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  СмИТ Биллинг
                </span>
                <span className="hidden sm:inline-flex bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {METADATA.build}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                Стратегический план развития ISP · {METADATA.version}
              </p>
            </div>
          </a>
        </div>

        {/* Action Controls - Bento Styled Pills & Rounded Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Podcast Button */}
          <button
            onClick={onPlayAudio}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              isPlayingAudio
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-emerald-50/60 dark:hover:bg-slate-700'
            }`}
            title="Аудиоверсия документа"
          >
            <Headphones className={`w-4 h-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">Аудио</span>
          </button>

          {/* ROI / Pricing Calculator */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Калькулятор окупаемости для ISP"
          >
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">Калькулятор</span>
          </button>

          {/* AI Strategy Assistant */}
          <button
            onClick={onOpenAiAssistant}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Задать вопрос AI-помощнику СмИТ"
          >
            <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>AI</span>
          </button>

          {/* Demo Booking Button (High-conversion CTA).
              На телефоне скрыта: там на запись ведёт плавающая круглая
              кнопка, а в шапке место нужнее навигации. */}
          <button
            onClick={() => onOpenDemoWidget?.('book')}
            className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] border border-emerald-500/40"
            title="Записаться на живую 30-мин демонстрацию СмИТ Биллинг"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Демо</span>
          </button>

          {/* 3-Way Theme Switcher (System / Light / Dark) */}
          <ThemeToggle
            themeMode={themeMode}
            isDarkMode={isDarkMode}
            isSystemDark={isSystemDark}
            onSetThemeMode={onSetThemeMode}
          />

          {/* External Docs Link */}
          <a
            href={METADATA.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            title="Открыть документацию СмИТ Биллинг"
          >
            <BookOpen className="w-4 h-4" />
            <span>Документация</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
};
