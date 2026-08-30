import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ExternalLink,
  Target,
  Smartphone,
  Network,
  Cpu,
  Layers,
  Video
} from 'lucide-react';
import { MARKET_STATS, MARKET_SEGMENTS, REGULATORY_REQUIREMENTS, METADATA } from '../data/strategicData';

export const MarketSection: React.FC = () => {
  return (
    <section id="market" className="mb-14 scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Состояние рынка
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Российский рынок биллинга для ISP
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Объём рынка 5.28 млрд ₽ (2024), устойчивый рост +12%/год (TAdviser Telecom). 
        Жесткая регуляторика РФ требует обязательную выгрузку СОРМ-3 для всех лицензированных операторов связи.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-6">
        {MARKET_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all"
          >
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">
                {stat.label}
              </div>
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-3 font-mono font-bold">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Document Link */}
      <a
        href={METADATA.googleDocUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-8 p-5 sm:p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 transition-all hover:border-emerald-500/40 hover:shadow-md"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-200 dark:border-blue-800">
            <FileText className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Российский рынок биллинга для ISP: аналитический обзор на август 2026 года
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Google Документы — полный развернутый разбор игроков, нормативной базы и перспектив
            </p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
      </a>

      {/* Target Segments */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Целевые сегменты рынка ISP
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {MARKET_SEGMENTS.map((seg) => (
            <div
              key={seg.id}
              className={`p-5 rounded-[28px] transition-all flex flex-col justify-between ${
                seg.isTarget
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-bold text-sm sm:text-base ${seg.isTarget ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                    {seg.name}
                  </h4>
                  {seg.isTarget && (
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                      Цель
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mb-2.5 pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
                  {seg.range}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {seg.description}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                <strong>Игроки:</strong> {seg.players}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Requirements & Trends Grid (Bento pair) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regulatory */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Регуляторные требования РФ
              </h3>
            </div>

            <div className="space-y-3">
              {REGULATORY_REQUIREMENTS.map((req, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-mono">
                      {req.code}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium font-mono">
                      {req.law}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {req.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trends 2024-2026 */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Главные тренды 2024–2026
              </h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
                <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Мобильные приложения абонентов</strong> — стандарт де-факто. Операторы без мобильного приложения проигрывают отток федералам.
                </div>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
                <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>AI-поддержка и голосовые боты</strong> — у большинства конкурентов в зачаточном состоянии. Главное окно возможностей для СмИТ.
                </div>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
                <Network className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>DPI-интеграция (СКАТ)</strong> — обязательна для операторов от 5 000 абонентов для экономии внешнего аплинка и СОРМ.
                </div>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Мульти-организация и облачный учет</strong> — объединение мелких операторов в холдинги с единым центром управления.
                </div>
              </li>

              <li className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3">
                <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Видеонаблюдение и домофония</strong> — ключевой источник роста среднего чека (ARPU +150–500 ₽/мес).
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
