import React from 'react';
import { 
  Sparkles, 
  Search, 
  Calculator, 
  ShieldCheck, 
  Bot, 
  Moon, 
  Sun, 
  Headphones,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { METADATA } from '../data/strategicData';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenCalculator: () => void;
  onOpenSormDrawer: () => void;
  onOpenAiAssistant: () => void;
  onPlayAudio: () => void;
  isPlayingAudio: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  onOpenSearch,
  onOpenCalculator,
  onOpenSormDrawer,
  onOpenAiAssistant,
  onPlayAudio,
  isPlayingAudio
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo - Bento Style */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="#tldr" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              С
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  СмИТ Биллинг
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
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
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-750 transition-all hover:scale-[1.02]"
            title="Поиск по документу (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">Поиск</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500">
              ⌘K
            </kbd>
          </button>

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

          {/* SORM Checklist Button */}
          <button
            onClick={onOpenSormDrawer}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/50 border border-amber-200/80 dark:border-amber-800/60 transition-colors shadow-sm"
            title="Чек-лист СОРМ-3 сертификации"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">СОРМ-3</span>
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all hover:scale-[1.02]"
            title="Задать вопрос AI-стратегу СмИТ"
          >
            <Bot className="w-4 h-4 text-emerald-400 dark:text-white" />
            <span>AI-Стратег</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Переключить тему"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

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
