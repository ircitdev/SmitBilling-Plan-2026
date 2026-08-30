import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  User, 
  FileText, 
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Zap,
  Activity
} from 'lucide-react';
import { METADATA } from '../data/strategicData';
import { AudioPodcastPlayer } from './AudioPodcastPlayer';
import { BrandLogo } from './BrandLogo';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

interface HeroSectionProps {
  isPlayingAudio: boolean;
  onToggleAudio?: () => void;
  onPlayPauseAudio?: () => void;
  onOpenCalculator?: () => void;
  onOpenSormModal?: () => void;
  onOpenSormDrawer?: () => void;
  onOpenDemoWidget?: (mode?: 'chat' | 'book' | 'bookings') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isPlayingAudio,
  onToggleAudio,
  onPlayPauseAudio,
  onOpenCalculator,
  onOpenSormModal,
  onOpenSormDrawer,
  onOpenDemoWidget
}) => {
  const handleAudio = onToggleAudio || onPlayPauseAudio || (() => {});
  const handleSorm = onOpenSormModal || onOpenSormDrawer || (() => {});
  const handleCalc = onOpenCalculator || (() => {});
  const handleDemo = onOpenDemoWidget || (() => {});

  return (
    <section className="mb-12">
      {/* Top Bento Grid - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Grand Bento Card (Spans 2 columns on desktop) */}
        <ScrollReveal direction="up" distance={24} className="lg:col-span-2">
          <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl opacity-70 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <BrandLogo size="sm" className="!w-4 !h-4 !rounded-sm !text-[9px] shadow-none" />
                  {METADATA.build}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-200/80 dark:border-slate-700">
                  Официальный стратегический документ
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
                Стратегический план развития СмИТ Биллинг
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
                Глубокий конкурентный анализ российского рынка биллинг-систем для ISP, детальный gap-анализ относительно 
                <strong className="text-slate-900 dark:text-white font-semibold"> Carbon Soft, Hydra, UTM5, LANBilling, BGBilling, Mikbill</strong> 
                и утвержденные приоритеты команды на 12 месяцев.
              </p>

              {/* Quick Hero Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                  onClick={() => handleDemo('book')}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Записаться на 30-мин live-демо</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDemo('chat')}
                  className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all"
                >
                  <span>Спросить у AI Gemini</span>
                </button>
              </div>
            </div>

            {/* Bottom Bento Metric Bar */}
            <div className="relative z-10 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Версия</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{METADATA.version}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Рынок РФ</p>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{METADATA.marketVolume}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">ICP Сегмент</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">{METADATA.icp}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Автор</p>
                <a href={METADATA.authorTelegram} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 dark:text-emerald-400 hover:underline block truncate mt-0.5">
                  {METADATA.author}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column Bento Stack */}
        <ScrollStagger staggerDelay={0.1} className="flex flex-col gap-6">
          {/* Bento Tile 1: Solid Accent Card (Live Target ICP & Quick ROI) */}
          <ScrollStaggerItem distance={20}>
            <div className="bg-emerald-600 text-white rounded-[32px] p-7 shadow-lg flex flex-col justify-between relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="bg-emerald-500/40 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  ICP ПОЗИЦИЯ
                </span>
              </div>

              <div className="my-4">
                <p className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Целевой сектор ISP</p>
                <p className="text-2xl sm:text-3xl font-extrabold leading-tight mt-1">
                  500 – 5 000
                  <span className="text-base font-medium opacity-90 ml-1.5">абонентов</span>
                </p>
                <p className="text-xs text-emerald-100 mt-1.5 leading-snug">
                  Провайдеры, перерастающие Mikbill и самописные скрипты с потребностью в AI-автоматизации.
                </p>
              </div>

              <button
                onClick={handleCalc}
                className="w-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>Рассчитать окупаемость</span>
              </button>
            </div>
          </ScrollStaggerItem>

          {/* Bento Tile 2: Dark Solid Block (SORM & Market Compliance) */}
          <ScrollStaggerItem distance={20}>
            <div className="bg-slate-900 text-white rounded-[32px] p-7 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">СОРМ-3 / Нормативы РФ</p>
                <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 374-ФЗ / 573
                </span>
              </div>

              <div className="my-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-xl sm:text-2xl font-bold">Готовность ядра: 85%</p>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Генератор файлов и выгрузки готовы; требуется финальная сертификация ИЦ ЦНИИС.
                </p>
                <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[85%]" />
                </div>
              </div>

              <button
                onClick={handleSorm}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-colors"
              >
                <span>Открыть дорожную карту СОРМ</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </ScrollStaggerItem>
        </ScrollStagger>
      </div>

      {/* Bento Audio Podcast Player Card */}
      <ScrollReveal direction="up" distance={20} delay={0.1} className="mb-6">
        <AudioPodcastPlayer isPlaying={isPlayingAudio} onPlayPause={handleAudio} />
      </ScrollReveal>

      {/* Disclaimer Bento Card */}
      <ScrollReveal direction="up" distance={16} delay={0.12}>
        <div className="p-5 rounded-[28px] bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/25 text-amber-900 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-3.5 shadow-sm">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="leading-relaxed">
            <strong className="font-bold">Дисклеймер и методология:</strong> Стоимость систем конкурентов в открытом доступе публикуется «по запросу». 
            Оценки построены на основе отраслевых отчётов TAdviser, ComNews, отзывов операторов связи и открытых тендерных закупок. 
            Документ предназначен для внутреннего стратегического планирования команды СмИТ Биллинг.
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
