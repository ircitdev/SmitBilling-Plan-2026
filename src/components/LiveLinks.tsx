import React from 'react';
import { ExternalLink, Globe, BookOpen, Network, KeyRound, MonitorPlay } from 'lucide-react';
import { METADATA } from '../data/strategicData';

/**
 * «Смотреть вживую» — работающие адреса продукта.
 *
 * Блок есть в статической версии плана и там несёт главную мысль: всё
 * перечисленное выше можно открыть прямо сейчас, а не посмотреть на
 * скриншотах. В портале его не было — вернули.
 */

const LINKS = [
  {
    icon: Globe,
    title: 'Лендинг продукта',
    href: METADATA.landingUrl,
    host: 'billing.smit34.ru',
    note: 'витрина для клиентов: модули, тарифы, заявка'
  },
  {
    icon: BookOpen,
    title: 'Документация',
    href: METADATA.docsUrl,
    host: 'docs.billing.smit34.ru',
    note: 'разделы системы, API, интеграции, поиск'
  },
  {
    icon: Network,
    title: 'Граф знаний архитектуры',
    href: METADATA.graphUrl,
    host: 'docs.billing.smit34.ru/understand',
    note: '11 слоёв, поиск, тур из 13 шагов'
  },
  {
    icon: MonitorPlay,
    title: 'Демо-стенд',
    href: METADATA.demoUrl,
    host: 'demo.billing.smit34.ru',
    note: 'обезличенные данные, можно щёлкать что угодно'
  },
  {
    icon: KeyRound,
    title: 'Сервер лицензий',
    href: METADATA.licenseServerUrl,
    host: 'license.billing.smit34.ru',
    note: 'тарифы, каталог модулей, счета и акты'
  }
];

export const LiveLinks: React.FC = () => {
  return (
    <section className="mb-14 scroll-mt-20" id="live">
      <div className="animated-gradient glow-shadow relative overflow-hidden rounded-[32px] bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-xl p-7 sm:p-9">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <ExternalLink className="w-3.5 h-3.5" />
            Смотреть вживую
          </span>

          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Продукт можно открыть прямо сейчас
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Не скриншоты в презентации, а работающие адреса: витрина для клиента, полная
            документация системы, интерактивная карта её архитектуры и стенд на обезличенных
            данных.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {LINKS.map(({ icon: Icon, title, href, host, note }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-white/35 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              >
                <Icon className="w-7 h-7 text-emerald-300 shrink-0 mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-sm text-white">{title}</span>
                  <span className="block text-[11px] text-emerald-300/90 font-mono mt-0.5 break-all">
                    {host}
                  </span>
                  <span className="block text-xs text-slate-400 mt-1 leading-relaxed">{note}</span>
                </span>
                <ExternalLink className="w-4 h-4 text-emerald-300/70 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
