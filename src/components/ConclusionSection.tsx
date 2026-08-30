import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Sparkles, 
  Target, 
  ArrowRight, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Cpu, 
  Smartphone, 
  AlertCircle 
} from 'lucide-react';
import { CONCLUSION_DATA } from '../data/strategicData';

interface ConclusionSectionProps {
  onOpenPricing?: () => void;
  onOpenDemo?: () => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  onOpenPricing,
  onOpenDemo
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${CONCLUSION_DATA.title}\n\n${CONCLUSION_DATA.marketInsight.lead}\n1. ${CONCLUSION_DATA.marketInsight.gapList[0].title} — ${CONCLUSION_DATA.marketInsight.gapList[0].description}\n2. ${CONCLUSION_DATA.marketInsight.gapList[1].title} — ${CONCLUSION_DATA.marketInsight.gapList[1].description}\n\n${CONCLUSION_DATA.bottleneck.heading} ${CONCLUSION_DATA.bottleneck.description}\n\n${CONCLUSION_DATA.keyRecommendation.heading} ${CONCLUSION_DATA.keyRecommendation.details}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePricingClick = () => {
    if (onOpenPricing) {
      onOpenPricing();
    } else {
      const el = document.getElementById('pricing');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="conclusion" className="mb-14 scroll-mt-20">
      {/* Category Pill Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          {CONCLUSION_DATA.badge}
        </span>
      </div>

      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#065f46] dark:text-emerald-400 tracking-tight">
          {CONCLUSION_DATA.title}
        </h2>

        <button
          onClick={handleCopy}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-xs"
          title="Скопировать текст инсайта"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300">Скопировано</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              <span>Скопировать инсайт</span>
            </>
          )}
        </button>
      </div>

      {/* Main Conclusion Bento Card */}
      <div className="relative p-7 sm:p-10 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden group">
        {/* Subtle Ambient Top-Right Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 text-sm sm:text-base lg:text-[17px] text-slate-800 dark:text-slate-200 leading-[1.75]">
          {/* Paragraph 1: Market Insight & 2 Gaps */}
          <div>
            <p className="mb-4">
              <strong className="font-extrabold text-emerald-800 dark:text-emerald-400">
                Российский рынок биллинг-систем для ISP — зрелый и насыщенный
              </strong>
              , но с двумя пробелами, где мы можем быстро выиграть:
            </p>

            {/* Two Gap Differentiators */}
            <div className="space-y-2.5 pl-2 sm:pl-4">
              {CONCLUSION_DATA.marketInsight.gapList.map((gap) => (
                <div key={gap.id} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-400 font-mono shrink-0">
                    {gap.id}
                  </span>
                  <p>
                    <strong className="font-extrabold text-emerald-800 dark:text-emerald-400">
                      {gap.title}
                    </strong>{' '}
                    — {gap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800/80 my-4" />

          {/* Paragraph 2: Core Bottleneck */}
          <div>
            <p>
              <strong className="font-extrabold text-emerald-800 dark:text-emerald-400">
                Главное ограничение прежнее — и стало острее:
              </strong>{' '}
              {CONCLUSION_DATA.bottleneck.description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800/80 my-4" />

          {/* Paragraph 3: Key Actionable Recommendation */}
          <div>
            <p>
              <strong className="font-extrabold text-emerald-800 dark:text-emerald-400">
                Главная рекомендация не меняется:
              </strong>{' '}
              за ближайшие 3 месяца получить{' '}
              <strong className="font-extrabold text-emerald-800 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
                {CONCLUSION_DATA.keyRecommendation.target}
              </strong>
              . Из старого списка «активируется при клиентах» остались только DPI и защита кода — всё остальное уже готово и ждёт, когда его кому-то покажут.
            </p>
          </div>
        </div>

        {/* Action Bar at Bottom of Card */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Стратегический фокус Q3–Q4 2026: Direct Sales & Pilots</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenDemo ? onOpenDemo() : onOpenPricing?.()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Записаться на демонстрацию</span>
            </button>

            <button
              onClick={handlePricingClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-xs transition-all"
            >
              <span>Тарифы и условия</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
