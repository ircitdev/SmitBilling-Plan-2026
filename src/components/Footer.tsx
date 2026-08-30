import React from 'react';
import { 
  ArrowUp, 
  Globe, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { METADATA } from '../data/strategicData';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-2 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-4">
          <BrandLogo size="md" className="shadow-none shrink-0" />
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
                СмИТ Биллинг 2026
              </span>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {METADATA.build}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mt-1">
              Единая стратегическая панель анализа рынка биллинговых систем и плана развития продукта для операторов связи (ISP).
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a
              href={METADATA.landingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" /> Лендинг
            </a>
            <a
              href={METADATA.roadmapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Дорожная карта
            </a>
            <a
              href={METADATA.graphUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Граф архитектуры
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all hover:-translate-y-0.5 shadow-xs shrink-0"
            title="Наверх страницы"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center mt-6 text-[11px] text-slate-400">
        © 2026 СмИТ Биллинг. Все права защищены. Дизайн-система .smit-*, Python 3.12, Django 5.1, PostgreSQL 17.
      </div>
    </footer>
  );
};
