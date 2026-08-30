import React, { useState } from 'react';
import { 
  Check, 
  BarChart3, 
  Calculator, 
  Copy, 
  CheckCheck, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PRICING_TIERS, PRICING_TERMS_CONFIG, METADATA } from '../data/strategicData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

interface PricingSectionProps {
  onOpenCalculator?: () => void;
  onOpenDemoWidget?: (mode?: 'chat' | 'book' | 'bookings', context?: any) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenCalculator, onOpenDemoWidget }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const startTier = PRICING_TIERS.find(t => t.id === 'start');
  const proTier = PRICING_TIERS.find(t => t.id === 'pro');
  const businessTier = PRICING_TIERS.find(t => t.id === 'business');
  const videoTier = PRICING_TIERS.find(t => t.id === 'video');
  const enterpriseTier = PRICING_TIERS.find(t => t.id === 'enterprise');

  return (
    <section id="pricing" className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {PRICING_TERMS_CONFIG.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 max-w-3xl">
                {PRICING_TERMS_CONFIG.subtitle}
              </p>
            </div>

            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Калькулятор окупаемости</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <div className="space-y-6 mb-8">
          {/* Row 1: 3 main tiers (Старт, Pro, Бизнес) */}
          <ScrollStagger staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. СТАРТ (Featured / First Client Target) */}
            {startTier && (
              <ScrollStaggerItem distance={22} className="h-full">
                <div className="rounded-[28px] p-6 sm:p-8 bg-emerald-50/40 dark:bg-emerald-950/20 border-2 border-emerald-500/80 dark:border-emerald-500 shadow-sm relative flex flex-col justify-between transition-all hover:shadow-md h-full">
                  <div>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#059669] text-white">
                        {startTier.badge || 'ПРОДАЁМ ПЕРВЫМ'}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                      {startTier.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 tracking-tight">
                        {startTier.annualPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400"> / год</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-emerald-200/80 dark:border-emerald-800/50">
                      {startTier.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц при помесячной оплате
                    </p>

                    <ul className="space-y-3">
                      {startTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStaggerItem>
            )}

            {/* 2. PRO */}
            {proTier && (
              <ScrollStaggerItem distance={22} className="h-full">
                <div className="rounded-[28px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {proTier.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 tracking-tight">
                        {proTier.annualPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400"> / год</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      {proTier.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц при помесячной оплате
                    </p>

                    {proTier.inheritText && (
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                        {proTier.inheritText}
                      </p>
                    )}

                    <ul className="space-y-3">
                      {proTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStaggerItem>
            )}

            {/* 3. БИЗНЕС */}
            {businessTier && (
              <ScrollStaggerItem distance={22} className="h-full">
                <div className="rounded-[28px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {businessTier.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 tracking-tight">
                        {businessTier.annualPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400"> / год</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      {businessTier.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц при помесячной оплате
                    </p>

                    {businessTier.inheritText && (
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                        {businessTier.inheritText}
                      </p>
                    )}

                    <ul className="space-y-3">
                      {businessTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStaggerItem>
            )}

          </ScrollStagger>

          {/* Row 2: 2 tiers (Видеонаблюдение, Enterprise) */}
          <ScrollStagger staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 4. ВИДЕОНАБЛЮДЕНИЕ */}
            {videoTier && (
              <ScrollStaggerItem distance={22} className="h-full">
                <div className="rounded-[28px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {videoTier.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 tracking-tight">
                        {videoTier.annualPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400"> / год</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      {videoTier.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц при помесячной оплате
                    </p>

                    <ul className="space-y-3">
                      {videoTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStaggerItem>
            )}

            {/* 5. ENTERPRISE */}
            {enterpriseTier && (
              <ScrollStaggerItem distance={22} className="h-full">
                <div className="rounded-[28px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 h-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {enterpriseTier.name}
                    </h3>

                    <div className="mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 tracking-tight">
                        {enterpriseTier.annualPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-400"> / год</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      {enterpriseTier.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц при помесячной оплате
                    </p>

                    {enterpriseTier.inheritText && (
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                        {enterpriseTier.inheritText}
                      </p>
                    )}

                    <ul className="space-y-3">
                      {enterpriseTier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollStaggerItem>
            )}

          </ScrollStagger>
        </div>

        {/* Info Banner for Individual Add-on Modules */}
        <ScrollReveal direction="up" distance={16} className="mb-8">
          <div className="rounded-[22px] p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
            <p className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {PRICING_TERMS_CONFIG.moduleNotice}
            </p>
          </div>
        </ScrollReveal>

        {/* Strategy & Terms for First Clients (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Left: Скидку даём временем, не рублями */}
          <ScrollReveal direction="left" distance={24} duration={0.55} className="h-full">
            <div className="rounded-[28px] p-6 sm:p-8 bg-emerald-50/30 dark:bg-emerald-950/20 border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-sm flex flex-col justify-between relative h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-300 stroke-[2.5]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {PRICING_TERMS_CONFIG.firstClientsPolicy.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(
                      PRICING_TERMS_CONFIG.firstClientsPolicy.points.map(p => `${p.heading} ${p.text}`).join('\n\n'),
                      'policy-time'
                    )}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition-colors"
                    title="Скопировать условия"
                  >
                    {copiedText === 'policy-time' ? (
                      <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {PRICING_TERMS_CONFIG.firstClientsPolicy.points.map((point, idx) => (
                    <p key={idx}>
                      {point.heading && (
                        <strong className="text-emerald-800 dark:text-emerald-400 font-bold block sm:inline mr-1.5">
                          {point.heading}
                        </strong>
                      )}
                      <span>{point.text}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card Right: Апселл вместо скидки */}
          <ScrollReveal direction="right" distance={24} duration={0.55} className="h-full">
            <div className="rounded-[28px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {PRICING_TERMS_CONFIG.upsellPolicy.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy(
                      PRICING_TERMS_CONFIG.upsellPolicy.points.map(p => `${p.heading} ${p.text}`).join('\n\n'),
                      'policy-upsell'
                    )}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Скопировать логику апселла"
                  >
                    {copiedText === 'policy-upsell' ? (
                      <CheckCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {PRICING_TERMS_CONFIG.upsellPolicy.points.map((point, idx) => (
                    <p key={idx}>
                      {point.heading ? (
                        <>
                          <strong className="text-emerald-800 dark:text-emerald-400 font-bold block sm:inline mr-1.5">
                            {point.heading}
                          </strong>
                          <span>{point.text}</span>
                        </>
                      ) : (
                        <span>{point.text}</span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Demo Booking Callout Banner */}
        <ScrollReveal direction="up" distance={24} duration={0.6} className="mt-8">
          <div className="rounded-[28px] p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    Спец-условия 2026
                  </span>
                  <span className="text-xs text-slate-300">Первые 3 клиента</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  6 месяцев бесплатно + бесплатная миграция данных под ключ
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Запишитесь на живую демонстрацию с ведущим архитектором: покажем работу AI-поддержки на 7 каналах и разберём структуру миграции с вашей текущей базы без простоя сети.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => onOpenDemoWidget?.('book')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Записаться на демо</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenDemoWidget?.('chat')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Задать вопрос AI</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
