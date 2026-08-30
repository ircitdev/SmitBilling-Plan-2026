import React from 'react';
import { 
  Building2, 
  Globe, 
  Calendar, 
  Users, 
  Layers, 
  Tag, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPETITORS } from '../data/strategicData';

export const CompetitorCards: React.FC = () => {
  return (
    <section id="competitors" className="mb-14 scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Глубокий профиль каждого
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Карта конкурентов на рынке РФ
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Семь ключевых игроков, их целевые сегменты, сильные и слабые стороны, технологический стек и стратегия СмИТ Биллинг по отношению к каждому.
      </p>

      <div className="space-y-6">
        {COMPETITORS.map((comp) => (
          <div
            key={comp.id}
            className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md"
          >
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                    {comp.name}
                  </h3>
                  <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {comp.marketShareEstimate}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 mt-1">
                  {comp.subtitle}
                </p>
              </div>

              <a
                href={comp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 self-start sm:self-center transition-colors shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{comp.website.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Клиенты</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{comp.clients}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Основан</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{comp.founded}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Сегмент</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{comp.segment}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">СОРМ статус</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 truncate block">{comp.sormCert}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Цена</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{comp.price}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Стек ядра</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono text-[11px] truncate block">{comp.stack}</span>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Сильные стороны
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {comp.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-800/60">
                <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  Слабые стороны и уязвимости
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {comp.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold text-sm leading-none mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Our Strategic Position */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold uppercase text-[11px] block mb-1.5">
                Стратегия СмИТ против {comp.name.split('/')[0].trim()}:
              </strong>
              <p className="leading-relaxed">
                {comp.ourTake}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
