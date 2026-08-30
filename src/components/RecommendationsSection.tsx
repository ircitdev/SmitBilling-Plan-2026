import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Calendar,
  Filter,
  LayoutGrid
} from 'lucide-react';
import { RECOMMENDATIONS } from '../data/strategicData';
import { Recommendation, RecommendationStatus } from '../types';
import { ImpactVsEffortMatrix } from './ImpactVsEffortMatrix';

interface RecommendationsSectionProps {
  onSelectRecommendation: (reco: Recommendation) => void;
  statuses?: Record<string, RecommendationStatus>;
  onUpdateStatus?: (id: string, status: RecommendationStatus) => void;
  activeFilter?: 'all' | RecommendationStatus;
  onClearFilter?: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  onSelectRecommendation,
  statuses = {},
  onUpdateStatus,
  activeFilter = 'all',
  onClearFilter
}) => {
  const [sectionView, setSectionView] = useState<'both' | 'matrix_only' | 'cards_only'>('both');

  const filteredRecommendations = RECOMMENDATIONS.filter((reco) => {
    if (activeFilter === 'all') return true;
    const currentStatus = statuses[reco.id] || (reco.done ? 'completed' : 'planned');
    return currentStatus === activeFilter;
  });

  return (
    <section id="recommendations" className="mb-14 scroll-mt-20">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
            Стратегия · 12 рекомендаций
          </span>
          {activeFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
              <Filter className="w-3 h-3" />
              Фильтр: {activeFilter === 'completed' ? 'Выполненные' : activeFilter === 'in-progress' ? 'В работе' : 'В планах'} ({filteredRecommendations.length})
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeFilter !== 'all' && onClearFilter && (
            <button
              onClick={onClearFilter}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline"
            >
              Сбросить фильтр (показать все 12)
            </button>
          )}

          {/* Section view toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSectionView('both')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                sectionView === 'both'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Все блоки
            </button>
            <button
              onClick={() => setSectionView('matrix_only')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                sectionView === 'matrix_only'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Только матрица
            </button>
            <button
              onClick={() => setSectionView('cards_only')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                sectionView === 'cards_only'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Только карточки
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Стратегические рекомендации и приоритизация
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Интерактивная приоритизация 12 ключевых инициатив по соотношению <strong>влияния на бизнес (Impact)</strong> и <strong>сложности реализации (Effort)</strong>. Кликните по любой инициативе для перехода в паспорт с пошаговым планом, сметой, KPI и рисками.
      </p>

      {/* 1. Impact vs Effort Matrix Visualization */}
      {(sectionView === 'both' || sectionView === 'matrix_only') && (
        <ImpactVsEffortMatrix
          onSelectRecommendation={onSelectRecommendation}
          statuses={statuses}
          onUpdateStatus={onUpdateStatus}
        />
      )}

      {/* 2. Grid of Recommendation Cards */}
      {(sectionView === 'both' || sectionView === 'cards_only') && (
        <>
          <div className="flex items-center justify-between gap-3 mb-4 mt-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Каталог инициатив в порядке приоритета
            </h3>
            <span className="text-xs text-slate-500">
              Показано: {filteredRecommendations.length} из {RECOMMENDATIONS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {filteredRecommendations.map((reco) => {
              const currentStatus = statuses[reco.id] || (reco.done ? 'completed' : 'planned');
              const isDone = currentStatus === 'completed';
              const isInProgress = currentStatus === 'in-progress';

              return (
                <div
                  key={reco.id}
                  onClick={() => onSelectRecommendation(reco)}
                  className={`p-6 sm:p-7 rounded-[28px] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between group border ${
                    isDone
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/10'
                      : isInProgress
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-700/60 hover:border-amber-400 hover:shadow-amber-500/10'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60'
                  }`}
                >
                  <div>
                    {/* Header Rank & Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-transform duration-200 group-hover:scale-105">
                          <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                          #{reco.rank}
                        </span>
                        {reco.roiRatio && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            ROI {reco.roiRatio}x
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Status Pill with interactive toggle capability */}
                        {isDone ? (
                          <span 
                            onClick={(e) => {
                              if (onUpdateStatus) {
                                e.stopPropagation();
                                onUpdateStatus(reco.id, 'in-progress');
                              }
                            }}
                            title="Нажмите, чтобы переключить статус"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 hover:opacity-80 transition-all hover:scale-105"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Выполнено
                          </span>
                        ) : isInProgress ? (
                          <span 
                            onClick={(e) => {
                              if (onUpdateStatus) {
                                e.stopPropagation();
                                onUpdateStatus(reco.id, 'completed');
                              }
                            }}
                            title="Нажмите, чтобы переключить статус"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800 hover:opacity-80 transition-all hover:scale-105"
                          >
                            <Clock className="w-3.5 h-3.5" /> В работе
                          </span>
                        ) : (
                          <span 
                            onClick={(e) => {
                              if (onUpdateStatus) {
                                e.stopPropagation();
                                onUpdateStatus(reco.id, 'in-progress');
                              }
                            }}
                            title="Нажмите, чтобы переключить статус"
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:opacity-80 transition-all hover:scale-105"
                          >
                            <Calendar className="w-3.5 h-3.5 text-slate-400" /> В планах
                          </span>
                        )}

                        {reco.isNew && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                            <Sparkles className="w-3 h-3" /> Новое
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                      {reco.title}
                    </h3>

                    {reco.categoryTag && (
                      <div className="mb-2.5">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {reco.categoryTag}
                        </span>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                      {reco.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {reco.budget.time}
                    </span>
                    <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Подробный план <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Negative Constraints Banner ("What NOT to do") */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="font-bold flex items-center gap-2.5 mb-3 text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Что мы категорически НЕ ДЕЛАЕМ (анти-паттерны стратегии):
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700">
            <span className="text-amber-600 font-bold text-base leading-none">•</span>
            <span>Не конкурировать с Carbon в лоб на их поле (известность и база) — выигрывать на AI и UX.</span>
          </li>
          <li className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700">
            <span className="text-amber-600 font-bold text-base leading-none">•</span>
            <span>Не целиться в enterprise-сегмент Hydra/BGBilling (бюджеты и циклы продаж несравнимы).</span>
          </li>
          <li className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700">
            <span className="text-amber-600 font-bold text-base leading-none">•</span>
            <span>Не делать всё одинаково хорошо — бить в узкие differentiators (мульти-провайдер AI + 54-ФЗ).</span>
          </li>
          <li className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm hover:border-amber-300 dark:hover:border-amber-700">
            <span className="text-amber-600 font-bold text-base leading-none">•</span>
            <span>Не уходить в разработку фич ради разработки до набора 2–3 платных клиентов.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
