import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  AlertTriangle,
  Clock,
  Coins,
  Users
} from 'lucide-react';
import { RECOMMENDATIONS } from '../data/strategicData';
import { Recommendation } from '../types';

interface RecommendationsSectionProps {
  onSelectRecommendation: (reco: Recommendation) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  onSelectRecommendation
}) => {
  return (
    <section id="recommendations" className="mb-14 scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Стратегия · 12 рекомендаций
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Топ рекомендаций по приоритетам
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Расположены в порядке убывания критичности. <strong>Кликните по любой карточке</strong> для открытия пошагового плана действий с бюджетом, сроками, составом команды, KPI и анализом рисков.
      </p>

      {/* Grid of 12 Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {RECOMMENDATIONS.map((reco) => {
          const isDone = !!reco.done;

          return (
            <div
              key={reco.id}
              onClick={() => onSelectRecommendation(reco)}
              className={`p-6 sm:p-7 rounded-[28px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group border ${
                isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-emerald-500/10'
                  : reco.isNew
                  ? 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-emerald-500/5 border-amber-300/80 dark:border-amber-700/60 hover:border-amber-400 hover:shadow-amber-500/10'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50'
              }`}
            >
              <div>
                {/* Header Rank Badge */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700">
                    <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    #{reco.rank}
                  </span>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Сделано
                    </span>
                  ) : reco.isNew ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                      <Sparkles className="w-3.5 h-3.5" /> Новое
                    </span>
                  ) : null}
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2.5 leading-snug">
                  {reco.title}
                </h3>

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

      {/* Negative Constraints Banner ("What NOT to do") */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-xs sm:text-sm">
        <div className="font-bold flex items-center gap-2.5 mb-2.5 text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Что мы категорически НЕ ДЕЛАЕМ (анти-паттерны стратегии):
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Не конкурировать с Carbon в лоб на их поле (известность и база) — выигрывать на AI и UX.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Не целиться в enterprise-сегмент Hydra/BGBilling (бюджеты и циклы продаж несравнимы).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Не делать всё одинаково хорошо — бить в узкие differentiators (мульти-провайдер AI + 54-ФЗ).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Не уходить в разработку фич ради разработки до набора 2–3 платных клиентов.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
