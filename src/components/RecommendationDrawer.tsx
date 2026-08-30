import React, { useEffect } from 'react';
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
  Calendar,
  Layers
} from 'lucide-react';
import { Recommendation, RecommendationStatus } from '../types';

interface RecommendationDrawerProps {
  recommendation: Recommendation | null;
  status?: RecommendationStatus;
  onUpdateStatus?: (id: string, status: RecommendationStatus) => void;
  onClose: () => void;
}

export const RecommendationDrawer: React.FC<RecommendationDrawerProps> = ({
  recommendation,
  status = 'planned',
  onUpdateStatus,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && recommendation) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recommendation, onClose]);

  if (!recommendation) return null;

  const currentStatus = status || (recommendation.done ? 'completed' : 'planned');

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl sm:max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  Приоритет #{recommendation.rank}
                </span>

                {/* Status Badge */}
                {currentStatus === 'completed' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" /> Реализовано
                  </span>
                )}

                {currentStatus === 'in-progress' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    <Clock className="w-3 h-3" /> В активной работе
                  </span>
                )}

                {currentStatus === 'planned' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    <Calendar className="w-3 h-3" /> В планах
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

          {/* Interactive Status Switcher */}
          {onUpdateStatus && (
            <div className="py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Статус в дорожной карте:
                </span>
                <span className="text-[11px] text-slate-400">Синхронизировано с глобальным прогресс-баром</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateStatus(recommendation.id, 'completed')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    currentStatus === 'completed'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Выполнено
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateStatus(recommendation.id, 'in-progress')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    currentStatus === 'in-progress'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/80 hover:bg-amber-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> В работе
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateStatus(recommendation.id, 'planned')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                    currentStatus === 'planned'
                      ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" /> В планах
                </button>
              </div>
            </div>
          )}

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
