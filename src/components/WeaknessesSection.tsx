import React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  Layers,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import { CompetitiveRadarChart } from './CompetitiveRadarChart';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

interface WeaknessesSectionProps {
  onOpenSormDrawer: () => void;
}

export const WeaknessesSection: React.FC<WeaknessesSectionProps> = ({
  onOpenSormDrawer
}) => {
  return (
    <section id="weaknesses" className="mb-14 scroll-mt-20">
      <ScrollReveal direction="up">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-200 dark:border-rose-800">
            Gap-анализ
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Где мы пока слабее конкурентов
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
          Честный анализ 10 слабых мест и барьеров на Build 2286. 
          За последние полторы сотни билдов ключевые продуктовые дыры закрыты — главными внешними блокерами остаются сертификат СОРМ и набор внешней базы.
        </p>
      </ScrollReveal>

      {/* Competitive Radar Positioning Chart for Weaknesses & Gaps */}
      <ScrollReveal direction="up" delay={0.1}>
        <CompetitiveRadarChart 
          initialFilter="weaknesses" 
          variant="weaknesses" 
          onOpenSormDrawer={onOpenSormDrawer} 
        />
      </ScrollReveal>

      {/* Grid of 10 items */}
      <ScrollStagger staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
        {/* Item 1: Few external paying clients */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center justify-center font-mono">
                  1
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Узкая внешняя клиентская база
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                <strong>Текущее:</strong> В бою 3 свои организации (СмІТ, Робор, ИТЦ), но внешних коммерческих ISP мало. У конкурентов — 200–1000+.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Что изменилось:</strong> Денежный контур замкнут до конца (выписка → зачисление → счёт → чек 54-ФЗ), права и мульти-орг закрыты. Продуктовых блокеров нет — нужны продажи.
              </p>
            </div>
          </div>
        </ScrollStaggerItem>

        {/* Item 2: SORM-3 Certification (With Big Callout Button) */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-amber-100/60 dark:from-amber-950/30 dark:via-amber-950/15 dark:to-amber-950/30 border-2 border-amber-400/60 dark:border-amber-500/40 flex flex-col justify-between shadow-sm h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <h3 className="font-bold text-sm sm:text-base text-amber-950 dark:text-amber-200">
                  Нет сертификата СОРМ Минцифры
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                <strong>Текущее:</strong> 13 форматов выгрузок СОРМ-3 и аудит готовы, но нет официального сертификата связи от ЦНИИС.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Решение:</strong> Испытания в ЦНИИС (~500k–1.2M ₽, 6–12 мес).
              </p>
            </div>

            <button
              onClick={onOpenSormDrawer}
              className="mt-4 w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-102 active:scale-98"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Что нужно для сертификации СОРМ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollStaggerItem>

        {/* Item 3: Multi-tenant (CLOSED) */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                  3. Мульти-организация — ЗАКРЫТО
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Сделано:</strong> Модуль мультиорганизации: изоляция данных, per-org реквизиты, платежи, кассы 54-ФЗ, почта и брендинг.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              В бою: СмІТ, Робор, ИТЦ на одной установке
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 4: Brand & Marketing */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center justify-center font-mono">
                  4
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Нет бренда и известности
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Текущее:</strong> Нулевая публичная известность. Carbon выступает на ComNews/TAdviser, Hydra международная.
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-3">
              Решение: статьи на NAG.ru, Habr, YouTube демо-ролики.
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 5: License Server (CLOSED) */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                  5. Сервер лицензий — ЗАКРЫТО
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Сделано:</strong> Сервер <a href="https://license.billing.smit34.ru" target="_blank" rel="noopener noreferrer" className="underline font-semibold">license.billing.smit34.ru</a> запущен: тарифы, счета/акты, ЮKassa, автообновления.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              Каталог модулей с автообновлением в 1 клик
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 6: Tariff Model (CLOSED) */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                  6. Тарифная сетка — ЗАКРЫТО
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Сделано:</strong> Тарифы Старт (99k), Pro (249k), Бизнес (379k), Видео (79k), Enterprise (499k) + модули по 2500 ₽/мес.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              Официальный прайс заведен на сервере лицензий
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 7: No DPI */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center font-mono">
                  7
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Нет встроенного DPI (СКАТ)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Текущее:</strong> RADIUS + MikroTik CoA. Модуль dpi в бэклоге.
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-3">
              Низкий приоритет — актуально для сетей 5000+ абонентов.
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 8: Video surveillance (CLOSED) */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                  8. Видеонаблюдение — ЗАКРЫТО
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Сделано:</strong> Модуль «под ключ»: проект → монтаж → подписки → архив камер в ЛК и приложении + IPTV + телефония.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              5 спринтов UX-аудита (Build 2030–2044)
            </span>
          </div>
        </ScrollStaggerItem>

        {/* Item 9: 24/7 Support */}
        <ScrollStaggerItem className="h-full">
          <div className="p-6 rounded-[28px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs h-full">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center font-mono">
                  9
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Нет круглосуточного SLA 24/7
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Решение:</strong> При 5+ клиентах нанять 2-го инженера. До этого AI-ассистент решает 72.6% обращений в нерабочее время.
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-3">
              Активация при росте базы.
            </span>
          </div>
        </ScrollStaggerItem>
      </ScrollStagger>
    </section>
  );
};
