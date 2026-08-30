import React, { useState } from 'react';
import { 
  Target, 
  Quote, 
  Copy, 
  Check, 
  Sparkles, 
  Star, 
  ChevronRight, 
  Calculator,
  Compass,
  Zap,
  ShieldAlert,
  Users,
  Filter,
  Layers,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Send,
  Video,
  CheckCircle2,
  Table
} from 'lucide-react';
import { POSITIONING_DATA, METADATA } from '../data/strategicData';
import { ICPProfile } from '../types';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

interface PositioningSectionProps {
  onOpenCalculator?: () => void;
}

export const PositioningSection: React.FC<PositioningSectionProps> = ({ onOpenCalculator }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSentence, setCopiedSentence] = useState(false);
  const [selectedIcp, setSelectedIcp] = useState<string | null>('icp1');

  const handleCopyTagline = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopySentence = () => {
    navigator.clipboard.writeText(POSITIONING_DATA.oneSentence);
    setCopiedSentence(true);
    setTimeout(() => setCopiedSentence(false), 2000);
  };

  const handleQuickWinAction = (win: typeof POSITIONING_DATA.marketingQuickWins[0]) => {
    if (win.actionUrl) {
      window.open(win.actionUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (win.step === 2) {
      if (onOpenCalculator) {
        onOpenCalculator();
      } else {
        const pricingEl = document.getElementById('pricing');
        pricingEl?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (win.step === 3) {
      const matrixEl = document.getElementById('competitors') || document.getElementById('matrix');
      matrixEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="positioning" className="mb-14 scroll-mt-20">
      {/* Category Badge & Main Section Header */}
      <ScrollReveal direction="up" distance={20}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            СТРАТЕГИЯ
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Позиционирование и go-to-market
        </h2>
      </ScrollReveal>

      {/* 1. Positioning (One Sentence) */}
      <ScrollReveal direction="up" delay={0.05} distance={24} className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          Позиционирование (одно предложение)
        </h3>

        <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/40 relative group">
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Emerald Quote Marks */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-serif text-2xl sm:text-3xl font-black shrink-0 border border-emerald-200/80 dark:border-emerald-800/80">
              «
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {POSITIONING_DATA.oneSentence}
              </p>

              {/* Author and Version Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={METADATA.authorPhoto}
                    alt=""
                    loading="lazy"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-emerald-500/60"
                    onError={(e) => {
                      // фото не загрузилось — показываем кружок с инициалами
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    style={{ display: 'none' }}
                    className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold items-center justify-center text-sm shadow-md"
                  >
                    {POSITIONING_DATA.author.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {POSITIONING_DATA.author.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {POSITIONING_DATA.author.role} · {POSITIONING_DATA.author.versionDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySentence}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-all"
                  >
                    {copiedSentence ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Скопировать формулировку</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 2. Taglines (3 options) */}
      <div className="mb-8">
        <ScrollReveal direction="up" distance={16}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            Tagline (3 варианта)
          </h3>
        </ScrollReveal>

        <ScrollStagger staggerDelay={0.07} className="space-y-2.5">
          {POSITIONING_DATA.taglines.map((tagline, idx) => {
            const isCopied = copiedIndex === idx;
            return (
              <ScrollStaggerItem key={idx} distance={16}>
                <div
                  onClick={() => handleCopyTagline(tagline, idx)}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-500/40 cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {tagline}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                    {isCopied ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Скопировано
                      </span>
                    ) : (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5" />
                        Копировать
                      </span>
                    )}
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </div>

      {/* 3. Target ICPs (4 Cards Grid) */}
      <div className="mb-8">
        <ScrollReveal direction="up" distance={16}>
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Целевые ICP
            </h3>
            {onOpenCalculator && (
              <button
                type="button"
                onClick={onOpenCalculator}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                Рассчитать окупаемость для ICP
              </button>
            )}
          </div>
        </ScrollReveal>

        <ScrollStagger staggerDelay={0.09} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POSITIONING_DATA.icps.map((icp) => {
            const isStar = icp.isStar;
            const isSelected = selectedIcp === icp.id;

            return (
              <ScrollStaggerItem key={icp.id} distance={20} className="h-full">
                <div
                  onClick={() => setSelectedIcp(icp.id)}
                  className={`p-5 sm:p-6 rounded-[28px] h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between cursor-pointer ${
                    isStar
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-500/70 shadow-md shadow-emerald-500/10 hover:border-emerald-500'
                      : isSelected
                      ? 'bg-white dark:bg-slate-900 border-2 border-emerald-400/80 shadow-md'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40'
                  }`}
                >
                  <div>
                    {/* ICP Header */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className={`font-extrabold text-sm sm:text-base flex items-center gap-1.5 ${
                        isStar ? 'text-emerald-900 dark:text-emerald-300' : 'text-slate-900 dark:text-white'
                      }`}>
                        {icp.name}
                        {isStar && <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 shrink-0" />}
                      </h4>
                      {icp.badge && (
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                          {icp.badge}
                        </span>
                      )}
                    </div>

                    {/* Subtitle / Specs */}
                    <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                      {icp.audienceRange} · {icp.marketPotential}
                    </div>

                    {/* Description / Strategy */}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-white">{icp.pricingRecommendation}</span>{' '}
                      <span>{icp.strategyHighlight}</span>
                    </p>
                  </div>

                  {/* Bottom hint */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Сегмент рынка</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                      Выбрать <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </div>

      {/* 4. Sales Funnel & Marketing Quick Wins (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Воронка продаж */}
        <ScrollReveal direction="left" distance={24} duration={0.55} className="h-full">
          <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Filter className="w-4 h-4" />
                  </div>
                  Воронка продаж
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  5 этапов
                </span>
              </div>

              <div className="space-y-3 relative">
                {/* Subtle connecting line behind items */}
                <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 pointer-events-none" />

                {POSITIONING_DATA.salesFunnel.map((stage) => (
                  <div
                    key={stage.step}
                    className="relative p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700/50 transition-all duration-200 flex items-start gap-3.5 group"
                  >
                    <div className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs transition-colors z-10">
                      {stage.step}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                        {stage.stage}:
                      </span>{' '}
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {stage.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Конверсия в первый контракт</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Pilot → SLA
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick wins маркетинга */}
        <ScrollReveal direction="right" distance={24} duration={0.55} className="h-full">
          <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg hover:border-emerald-500/30">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  Quick wins маркетинга
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
                  Запуск за 1–3 дня
                </span>
              </div>

              <div className="space-y-3">
                {POSITIONING_DATA.marketingQuickWins.map((win) => {
                  const isLink = Boolean(win.actionUrl);

                  return (
                    <div
                      key={win.step}
                      onClick={() => handleQuickWinAction(win)}
                      className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 hover:bg-amber-50/60 dark:hover:bg-amber-950/20 border border-slate-200/60 dark:border-slate-700/60 hover:border-amber-300 dark:hover:border-amber-700/50 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs transition-colors">
                          {win.step}
                        </div>

                        <div className="min-w-0 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                          {win.step === 1 ? (
                            <span>
                              Demo-аккаунт на{' '}
                              <span className="font-bold text-emerald-600 dark:text-emerald-400 underline decoration-emerald-300 underline-offset-2">
                                demo.billing.smit34.ru
                              </span>{' '}
                              с реалистичными данными
                            </span>
                          ) : win.step === 3 ? (
                            <span>
                              Comparison page{' '}
                              <span className="font-semibold text-slate-900 dark:text-white">
                                «СмИТ vs Carbon / UTM5 / Mikbill»
                              </span>
                            </span>
                          ) : (
                            <span>{win.title}</span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {isLink ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Каналы лидогенерации</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Inbound & Direct Outreach
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

