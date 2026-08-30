import React from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Users, 
  Target, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationDrawerProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export const RecommendationDrawer: React.FC<RecommendationDrawerProps> = ({
  recommendation,
  onClose
}) => {
  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  Приоритет #{recommendation.rank}
                </span>

                {recommendation.done && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Реализовано
                  </span>
                )}

                {recommendation.isNew && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    <Sparkles className="w-3 h-3" /> Новая рекомендация
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {recommendation.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 py-5 border-b border-slate-100 dark:border-slate-800">
            <div className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Сроки
              </span>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {recommendation.budget.time}
              </span>
            </div>

            <div className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Coins className="w-3.5 h-3.5 text-amber-600" /> Бюджет
              </span>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {recommendation.budget.money}
              </span>
            </div>

            <div className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5 text-blue-600" /> Команда
              </span>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {recommendation.budget.team}
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Суть и стратегическое обоснование
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {recommendation.summary}
            </p>
          </div>

          {/* Implementation Steps */}
          <div className="py-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Пошаговый план внедрения ({recommendation.steps.length} этапа)
            </h3>
            <div className="space-y-3">
              {recommendation.steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.body}
                    </p>
                    {step.meta && (
                      <span className="inline-block mt-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                        {step.meta}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs & Risks */}
          <div className="py-5 space-y-4">
            {/* KPI */}
            <div className="p-5 rounded-[24px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <Target className="w-4 h-4 text-emerald-600" />
                Целевые KPI успеха:
              </div>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {recommendation.kpis.map((kpi, kIdx) => (
                  <li key={kIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk */}
            <div className="p-5 rounded-[24px] bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Главный риск и как его минимизировать:
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {recommendation.risks}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs"
          >
            Закрыть окно
          </button>
        </div>
      </div>
    </div>
  );
};
