import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  TrendingUp,
  Target
} from 'lucide-react';
import { Recommendation, RecommendationStatus } from '../types';
import { RECOMMENDATIONS } from '../data/strategicData';

export const DEFAULT_RECOMMENDATION_STATUSES: Record<string, RecommendationStatus> = {
  r1: 'in-progress',
  r2: 'in-progress',
  r3: 'planned',
  r4: 'in-progress',
  r5: 'completed',
  r6: 'completed',
  r7: 'in-progress',
  r8: 'planned',
  r9: 'completed',
  r10: 'completed',
  r12: 'in-progress',
  r11: 'planned',
};

interface GlobalProgressBarProps {
  statuses: Record<string, RecommendationStatus>;
  onUpdateStatus: (id: string, status: RecommendationStatus) => void;
  onResetStatuses: () => void;
  activeFilter: 'all' | RecommendationStatus;
  onSelectFilter: (filter: 'all' | RecommendationStatus) => void;
  onSelectRecommendation: (reco: Recommendation) => void;
}

export const GlobalProgressBar: React.FC<GlobalProgressBarProps> = ({
  statuses,
  onUpdateStatus,
  onResetStatuses,
  activeFilter,
  onSelectFilter,
  onSelectRecommendation
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const totalCount = RECOMMENDATIONS.length; // 12
  const completedCount = RECOMMENDATIONS.filter(r => (statuses[r.id] || 'planned') === 'completed').length;
  const inProgressCount = RECOMMENDATIONS.filter(r => (statuses[r.id] || 'planned') === 'in-progress').length;
  const plannedCount = RECOMMENDATIONS.filter(r => (statuses[r.id] || 'planned') === 'planned').length;

  const completedPct = Math.round((completedCount / totalCount) * 100);
  const inProgressPct = Math.round((inProgressCount / totalCount) * 100);
  const plannedPct = 100 - completedPct - inProgressPct;
  const overallReadiness = Math.round(((completedCount * 1.0 + inProgressCount * 0.5) / totalCount) * 100);

  const hasChanges = Object.keys(DEFAULT_RECOMMENDATION_STATUSES).some(
    key => statuses[key] !== DEFAULT_RECOMMENDATION_STATUSES[key]
  );

  const scrollToRecommendations = () => {
    const el = document.getElementById('recommendations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      aria-label="Глобальный прогресс стратегических рекомендаций"
      className="mb-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-all"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Стратегический трекер
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Layers className="w-3 h-3 text-slate-500" /> 12 рекомендаций
            </span>

            {hasChanges && (
              <button
                onClick={onResetStatuses}
                title="Сбросить статус всех 12 рекомендаций к исходным данным дорожной карты"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Сбросить к исходным
              </button>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Прогресс реализации 12 стратегических рекомендаций
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Учет выполнения ключевых инициатив дорожной карты SmIT Billing (внедрено, в активной разработке, запланировано)
          </p>
        </div>

        {/* Aggregate Metrics Badge */}
        <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Индекс готовности
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-end gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                {overallReadiness}%
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                В процессе/Готово
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                <span className="text-emerald-700 dark:text-emerald-400">{completedCount}</span>
                <span className="text-slate-400"> + </span>
                <span className="text-amber-700 dark:text-amber-400">{inProgressCount}</span>
                <span className="text-slate-400"> / {totalCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Segment Visual Progress Bar */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-200/70 dark:border-slate-700/70 relative">
          {/* Completed segment */}
          <div 
            style={{ width: `${completedPct}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500 relative group cursor-pointer"
            onClick={() => onSelectFilter(activeFilter === 'completed' ? 'all' : 'completed')}
            title={`Выполнено: ${completedCount} из 12 (${completedPct}%)`}
          />
          {/* In-Progress segment */}
          <div 
            style={{ width: `${inProgressPct}%` }}
            className="h-full bg-amber-500 transition-all duration-500 relative group cursor-pointer"
            onClick={() => onSelectFilter(activeFilter === 'in-progress' ? 'all' : 'in-progress')}
            title={`В работе: ${inProgressCount} из 12 (${inProgressPct}%)`}
          />
          {/* Planned segment */}
          <div 
            style={{ width: `${plannedPct}%` }}
            className="h-full bg-slate-300 dark:bg-slate-700 rounded-r-full transition-all duration-500 relative group cursor-pointer"
            onClick={() => onSelectFilter(activeFilter === 'planned' ? 'all' : 'planned')}
            title={`В планах: ${plannedCount} из 12 (${plannedPct}%)`}
          />
        </div>

        {/* Legend / Status Filter Buttons */}
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs pt-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Filter All */}
            <button
              onClick={() => onSelectFilter('all')}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 transition-colors text-xs ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-3 h-3" /> Все: 12
            </button>

            {/* Completed Filter */}
            <button
              onClick={() => onSelectFilter(activeFilter === 'completed' ? 'all' : 'completed')}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 transition-colors text-xs border ${
                activeFilter === 'completed'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Выполнено: {completedCount} ({completedPct}%)
            </button>

            {/* In-Progress Filter */}
            <button
              onClick={() => onSelectFilter(activeFilter === 'in-progress' ? 'all' : 'in-progress')}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 transition-colors text-xs border ${
                activeFilter === 'in-progress'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              В работе: {inProgressCount} ({inProgressPct}%)
            </button>

            {/* Planned Filter */}
            <button
              onClick={() => onSelectFilter(activeFilter === 'planned' ? 'all' : 'planned')}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 transition-colors text-xs border ${
                activeFilter === 'planned'
                  ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
              <Calendar className="w-3 h-3 text-slate-500" />
              В планах: {plannedCount} ({plannedPct}%)
            </button>
          </div>

          {/* Quick Jump and Expand Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-2.5 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isExpanded ? (
                <>Свернуть сетку <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>Управление статусами (12) <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>

            <button
              onClick={scrollToRecommendations}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline px-2 py-1"
            >
              К списку <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mini Chips Grid for all 12 recommendations (Always visible compact row or expandable detailed grid) */}
      <div className={`pt-3 border-t border-slate-100 dark:border-slate-800 transition-all ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
          <span>Быстрое переключение статусов по 12 рекомендациям:</span>
          <span className="text-slate-500 font-normal">Кликните на карточку или статус для изменения</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {RECOMMENDATIONS.map((reco) => {
            const currentStatus = statuses[reco.id] || 'planned';
            const isMenuOpen = activeMenuId === reco.id;

            let statusBg = 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
            let dotColor = 'bg-slate-400';
            let statusLabel = 'В планах';

            if (currentStatus === 'completed') {
              statusBg = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
              dotColor = 'bg-emerald-500';
              statusLabel = 'Выполнено';
            } else if (currentStatus === 'in-progress') {
              statusBg = 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800';
              dotColor = 'bg-amber-500';
              statusLabel = 'В работе';
            }

            return (
              <div
                key={reco.id}
                className={`relative rounded-2xl border p-2.5 transition-all text-left flex flex-col justify-between ${statusBg}`}
              >
                {/* Top: Rank & Status indicator */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    #{reco.rank}
                  </span>

                  {/* Status Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(isMenuOpen ? null : reco.id);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="Изменить статус"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                      <span>{statusLabel}</span>
                      <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                    </button>

                    {/* Quick status popup */}
                    {isMenuOpen && (
                      <div 
                        className="absolute right-0 top-full mt-1 z-30 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 text-xs animate-in fade-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            onUpdateStatus(reco.id, 'completed');
                            setActiveMenuId(null);
                          }}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 ${
                            currentStatus === 'completed' ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Выполнено
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(reco.id, 'in-progress');
                            setActiveMenuId(null);
                          }}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/50 ${
                            currentStatus === 'in-progress' ? 'font-bold text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-500" /> В работе
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(reco.id, 'planned');
                            setActiveMenuId(null);
                          }}
                          className={`w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                            currentStatus === 'planned' ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> В планах
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <button
                  type="button"
                  onClick={() => onSelectRecommendation(reco)}
                  className="text-left font-bold text-xs leading-snug line-clamp-2 hover:underline text-slate-900 dark:text-white"
                  title={reco.title}
                >
                  {reco.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
