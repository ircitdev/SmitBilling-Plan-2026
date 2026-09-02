import React from 'react';
import { 
  ExternalLink,
  Target, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight, 
  Sparkles,
  Compass,
  Check
} from 'lucide-react';
import { METADATA } from '../data/strategicData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

interface TLDRSectionProps {
  onOpenSormDrawer: () => void;
  onOpenCalculator: () => void;
  /**
   * 'summary' — сводка вверху документа;
   * 'verdict' — только главный вывод, идёт в конце, перед заключением;
   * 'details' — вывод вместе с карточками сильных и слабых сторон
   *   (полные секции о них есть отдельно, поэтому в документе не нужен).
   */
  part?: 'summary' | 'verdict' | 'details' | 'all';
}

/** Ссылка на карточку модуля в каталоге лендинга — она открывается модалкой. */
const ModuleLink: React.FC<{ code: string; children: React.ReactNode }> = ({ code, children }) => (
  <a
    href={`https://billing.smit34.ru/#module-${code}`}
    target="_blank"
    rel="noopener"
    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-400/60 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 transition-colors whitespace-nowrap"
  >
    {children}
    <ExternalLink className="w-2.5 h-2.5" />
  </a>
);

export const TLDRSection: React.FC<TLDRSectionProps> = ({
  onOpenSormDrawer,
  onOpenCalculator,
  part = 'all'
}) => {
  const showSummary = part === 'all' || part === 'summary';
  const showDetails = part === 'all' || part === 'details';
  const showVerdict = showDetails || part === 'verdict';
  return (
    <section id={part === 'summary' || part === 'all' ? 'tldr' : 'tldr-details'} className="mb-14 scroll-mt-20">
      {/* Section Header */}
      {showSummary && (
      <ScrollReveal direction="up" distance={20}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
            TL;DR — ключевые выводы
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Главные тезисы за 60 секунд
        </h2>
      </ScrollReveal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {showSummary && (
          <>
        {/* Card 1: Lead Takeaways (Full width Bento Card) */}
        <ScrollReveal direction="up" distance={24} className="md:col-span-2">
          <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Главное о рынке и расстановке сил
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  5 ключевых выводов анализа структуры российского рынка биллинга
                </p>
              </div>
            </div>

            <ScrollStagger staggerDelay={0.06} className="wf-thesis-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-sm text-slate-700 dark:text-slate-300">
              <ScrollStaggerItem distance={16} className="h-full">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all h-full">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1.5">01. РЫНОК</span>
                    <p className="leading-snug text-xs sm:text-sm"><strong>Рынок зрелый.</strong> 5.28 млрд ₽ (2024), рост +12%/год. 7–10 лидеров с 15–20 летней историей.</p>
                  </div>
                </div>
              </ScrollStaggerItem>

              <ScrollStaggerItem distance={16} className="h-full">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all h-full">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1.5">02. КОНКУРЕНТ №1</span>
                    <p className="leading-snug text-xs sm:text-sm"><strong>Carbon Soft</strong> — соперник №1. Та же ниша, мы наследуем структуру БД Carbon 4.</p>
                  </div>
                </div>
              </ScrollStaggerItem>

              <ScrollStaggerItem distance={16} className="h-full">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all h-full">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1.5">03. ПРЕМИУМ</span>
                    <p className="leading-snug text-xs sm:text-sm"><strong>Hydra (Latera)</strong> — премиум (360 клиентов в 46 странах). 50% кода open-source.</p>
                  </div>
                </div>
              </ScrollStaggerItem>

              <ScrollStaggerItem distance={16} className="h-full">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all h-full">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1.5">04. LEGACY</span>
                    <p className="leading-snug text-xs sm:text-sm"><strong>UTM5 (NetUP)</strong> — самый крупный, но архаичный. Уязвим в UX, мобильных и AI.</p>
                  </div>
                </div>
              </ScrollStaggerItem>

              <ScrollStaggerItem distance={16} className="h-full">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/30 transition-all h-full">
                  <div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1.5">05. ДОНОР</span>
                    <p className="leading-snug text-xs sm:text-sm"><strong>Mikbill</strong> — источник наших будущих клиентов (PHP+MySQL, перерастают при 500+ клиентах).</p>
                  </div>
                </div>
              </ScrollStaggerItem>
            </ScrollStagger>
          </div>
        </ScrollReveal>
          </>
        )}

        {showDetails && (
          <>
        {/* Card 2: Unique Strengths (Bento Grid Left Card) */}
        <ScrollReveal direction="up" distance={24} delay={0.05} className="h-full">
          <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Наши уникальные преимущества
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Технологический отрыв и нативная автоматизация
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>AI-агент на 7 каналах</strong> — ЛК, mobile, email, виджет, <strong>голос и реальный телефон</strong>, подсказка оператору; мультипровайдер (Claude / GPT / Gemini / Grok / Yandex).
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="ai">AI-ассистент</ModuleLink>
                      <ModuleLink code="voice">Голосовая связь</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>AI-помощник генерации SQL-отчетов</strong> — уникальная фича на рынке РФ.
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="reports">Отчёты и аналитика</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>Своя Поддержка + CRM</strong> — полный отказ от FreeScout в пользу нативного конвейера тикетов и сделок.
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="helpdesk">Поддержка</ModuleLink>
                      <ModuleLink code="crm">CRM / Продажи</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>Замкнутый финансовый контур</strong> — банковская выписка из почты → сопоставление клиента → зачисление → счёт и акт → <strong>чек 54-ФЗ в ОФД</strong>.
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="bank">Банковские выписки</ModuleLink>
                      <ModuleLink code="fiscal">Фискализация 54-ФЗ</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>Мультиорганизация & White-label</strong> + центральный сервер лицензий и автообновлений.
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="multiorg">Мультиорганизация</ModuleLink>
                      <ModuleLink code="whitelabel">Whitelabel</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>Маркетинг внутри биллинга</strong> — конструктор лендингов, боты-воронки, AI-мастер кампаний и сбор лидов сразу в CRM.
                  
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      <ModuleLink code="games">Игры / Маркетинг</ModuleLink>
                      <ModuleLink code="landing">Лендинги</ModuleLink>
                    </span>
                  </span>
                </li>

                <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 flex flex-col">
                    <strong>SMS-шлюз через Android</strong> (sms-gate.app) — отправка по тарифу SIM-карты с экономией 5–15k ₽/мес.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <a
                href="https://billing.smit34.ru/#modules"
                target="_blank"
                rel="noopener"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                Все модули в каталоге <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 3: Real Weaknesses (Bento Grid Right Card) */}
        <ScrollReveal direction="up" distance={24} delay={0.08} className="h-full">
          <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Наши текущие слабости и пробелы
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Честный аудит узких мест на старте коммерциализации
                  </p>
                </div>
              </div>

              <ol className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
                <li className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
                  <strong>Мало внешних платящих клиентов</strong> — в бою три свои организации (СмІТ, Робор, ИТЦ), но коммерческий рынок ещё не охвачен.
                </li>

                <li className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
                  <strong>Нет сертификации СОРМ в Минцифры</strong> — технически экспорт готов, но нет бумажного сертификата ЦНИИС (блокер для крупных операторов).
                </li>

                <li className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
                  <strong>Нет публичного бренда и маркетинга</strong> — нулевая известность на выставках и отраслевых порталах.
                </li>

                <li className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800">
                  <strong>Нет встроенного DPI/СКАТ</strong> — модуль готов в бэклоге, актуально только для сетей 5000+ абонентов.
                </li>
              </ol>

              {/* Closed gap alert */}
              <div className="mt-5 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200">
                <span className="font-bold flex items-center gap-1.5 mb-1.5 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Закрыто с прошлой версии плана (Build 1978 → 2286):
                </span>
                Фискализация 54-ФЗ в боевом режиме (ФД 27480), банковская очередь с аудитом, единая библиотека UI компонентов, обучающие ролики ко всем модулям.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={onOpenSormDrawer}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                План сертификации СОРМ <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

          </>
        )}

        {showVerdict && (
          <>
        {/* Card 4: Strategic Verdict */}
        <ScrollReveal direction="up" distance={24} delay={0.1} className="md:col-span-2">
          <div className="glow-shadow rotating-gradient relative overflow-hidden p-7 sm:p-9 rounded-[32px] bg-slate-900 text-white dark:bg-slate-900 border border-slate-800 shadow-xl">
            <Compass className="absolute -right-8 -bottom-8 w-48 h-48 text-white/5 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-emerald-500 text-slate-950 shadow-md">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Главная стратегическая рекомендация
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-200 max-w-4xl leading-relaxed mb-6">
                <strong>Не пытаться быть «как Carbon, но дешевле».</strong> Наша победная ниша —{' '}
                <span className="text-emerald-400 font-bold">
                  «Современный СмИТ Биллинг для micro/small ISP (500–5 000 абонентов), перерастающих Mikbill и самописные системы»
                </span>{' '}
                с фокусом на <strong className="text-emerald-400 font-bold">AI как ключевой differentiator</strong> и безупречный UX.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Рассчитать стоимость для своего ISP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#recommendations"
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                >
                  Топ-12 рекомендаций
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
};
