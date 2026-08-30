import React from 'react';
import { 
  Bot, 
  Palette, 
  Smartphone, 
  Ticket, 
  Megaphone, 
  Network, 
  Sliders, 
  Phone, 
  ExternalLink,
  Globe,
  BookOpen,
  CheckCircle2,
  Share2,
  Sparkles
} from 'lucide-react';
import { METADATA } from '../data/strategicData';

export const StrengthsSection: React.FC = () => {
  return (
    <section id="strengths" className="mb-14 scroll-mt-20">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Где мы сильнее
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Уникальные преимущества СмИТ Биллинг
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Восемь направлений, где мы опережаем большинство конкурентов. 
        Позиционирование на рынке: <em>«СмИТ — биллинг провайдера в эпоху AI с современным UX»</em>.
      </p>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Card 1: AI Agent (Full width on top) */}
        <div className="md:col-span-2 lg:col-span-3 p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/10 dark:from-emerald-950/50 dark:via-slate-900 dark:to-teal-950/40 border border-emerald-500/30 dark:border-emerald-500/30 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Главный Differentiator №1
                </span>
                <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  Мульти-провайдер AI-ассистент на 7 каналах
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://billing.smit34.ru/#module-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                Модуль AI <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://billing.smit34.ru/#module-voice"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                Голос <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
            <strong>Уникально на российском рынке.</strong> Ни у одного традиционного биллинга (Carbon, Hydra, UTM5, LANBilling) нет работающего AI-конвейера:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-850/80 border border-emerald-500/20 shadow-xs">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">7 каналов работы:</strong>
              ЛК, mobile app, email, веб-виджет, <strong>реальный телефонный номер 61-32-40</strong>, подсказки оператору, Telegram-боты.
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-850/80 border border-emerald-500/20 shadow-xs">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Мульти-провайдер:</strong>
              Claude 3.5 Sonnet / Haiku, GPT-4o, Gemini 2.5, Grok, YandexGPT. Автоматический фолбэк при недоступности.
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-850/80 border border-emerald-500/20 shadow-xs">
              <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Глубокая интеграция:</strong>
              AI видит баланс, тариф, состояние порта, не придумывает факты, честно выполняет 22 сервисных действия.
            </div>
          </div>
        </div>

        {/* Card 2: Modern UX & Design System */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              Современный UX и дизайн-система
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Единая дизайн-система <code>.smit-*</code> (Build 408–466), темная тема WCAG AA, A11y навыки, 68 дизайн-паттернов. Никаких «серых C++ окон из 2003 года».
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Сравнение:</strong> Carbon/UTM5 — тяжелый устаревший интерфейс.
          </div>
        </div>

        {/* Card 3: Flutter Mobile App */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              Мобильное приложение (iOS / Android)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Кроссплатформенный Flutter 3.27, Push-уведомления Firebase FCM, встроенный AI-чат поддержки, 5 экранов управления, биометрия local_auth.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <a
              href="https://play.google.com/store/apps/details?id=ru.smit34.smit_billing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1.5"
            >
              Google Play <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 4: Built-in HelpDesk + CRM */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit mb-4">
              <Ticket className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              Своя Поддержка + CRM в ядре
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Собственный модуль Поддержки (тикеты из 9 каналов, SLA, автотеги) и CRM с канбаном, Salesbot и нарядами монтажникам. Отказ от сторонних helpdesk-систем.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">В бою:</strong> 3 550+ сделок и 9 950+ обращений.
          </div>
        </div>

        {/* Card 5: Built-in Marketing & Landings */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 w-fit mb-4">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              Маркетинг прямо в биллинге
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Конструктор лендингов (20+ блоков), боты-воронки в TG/VK, AI-мастер кампаний и сбор заявок сразу в воронку продаж CRM с подсчётом реальной конверсии.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Уникально:</strong> у конкурентов маркетинг оторван от биллинга.
          </div>
        </div>

        {/* Card 6: Knowledge Graph */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              Интерактивный граф архитектуры
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              11 слоев архитектуры на <code>/understand/</code>: 2524 узла, семантический поиск, 13-шаговый тур. Быстрый онбординг инженеров и прозрачность связей.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <a
              href={METADATA.graphUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1.5"
            >
              Открыть граф <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 7: Android SMS Gateway */}
        <div className="p-6 sm:p-7 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
              SMS-шлюз через Android-телефон
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Интеграция с sms-gate.app: отправка SMS по безлимитному тарифу SIM-карты (экономия 5–15 тыс. ₽/мес) + автоответы на БАЛАНС, ОП, ВКЛ/ВЫКЛ.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Экономия:</strong> до 180 000 ₽/год на SMS-агрегаторах.
          </div>
        </div>
      </div>

      {/* Live Resources Band */}
      <div className="p-7 sm:p-9 rounded-[32px] bg-[#04503a] dark:bg-[#05271d] text-white border border-emerald-500/40 shadow-xl shadow-emerald-950/20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20">
              Смотреть систему вживую
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              Все компоненты работают прямо сейчас
            </h3>
          </div>
        </div>

        <p className="text-sm text-emerald-100/90 max-w-3xl leading-relaxed mb-6">
          Не абстрактные концепты в презентации, а готовые боевые адреса: лендинг для привлечения операторов, исчерпывающая документация, дорожная карта реализации и интерактивный граф связей.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <a
            href={METADATA.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <Globe className="w-5 h-5 text-emerald-300" />
              <ExternalLink className="w-4 h-4 text-emerald-300/80" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Лендинг продукта</span>
              <span className="text-xs text-emerald-200/70 font-mono">billing.smit34.ru</span>
            </div>
          </a>

          <a
            href={METADATA.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-5 h-5 text-emerald-300" />
              <ExternalLink className="w-4 h-4 text-emerald-300/80" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Документация</span>
              <span className="text-xs text-emerald-200/70 font-mono">docs.billing.smit34.ru</span>
            </div>
          </a>

          <a
            href={METADATA.roadmapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <ExternalLink className="w-4 h-4 text-emerald-300/80" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Исполнение плана</span>
              <span className="text-xs text-emerald-200/70 font-mono">/plan2026/roadmap</span>
            </div>
          </a>

          <a
            href={METADATA.graphUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 transition-all hover:-translate-y-0.5 flex flex-col justify-between shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <Network className="w-5 h-5 text-emerald-300" />
              <ExternalLink className="w-4 h-4 text-emerald-300/80" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">Граф знаний</span>
              <span className="text-xs text-emerald-200/70 font-mono">/understand</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
