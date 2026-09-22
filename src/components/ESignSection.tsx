import React from 'react';
import {
  Smartphone,
  PenTool,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  Clock,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

/**
 * Подписание договора на телефоне монтажника с кодом из СМС (сентябрь 2026).
 * Вынесено отдельным блоком сразу за тезисами: это то, что продаётся сразу —
 * сделка закрывается в день подключения, без бумаги и поездки в офис.
 */
const STEPS = [
  {
    icon: Smartphone,
    title: 'Договор на экране',
    text: 'Монтажник открывает договор клиента прямо из наряда — с его данными, тарифом и адресом подключения.'
  },
  {
    icon: PenTool,
    title: 'Подпись пальцем',
    text: 'Клиент читает договор и расписывается на экране телефона. Поле подписи разворачивается на весь экран.'
  },
  {
    icon: MessageSquare,
    title: 'Код из СМС',
    text: 'На номер клиента приходит одноразовый код. Введённый код — ключ простой электронной подписи по 63-ФЗ.'
  },
  {
    icon: FileCheck,
    title: 'PDF и копия клиенту',
    text: 'Договор собирается в PDF со штампом подписи и попадает в реестр. Копия уходит клиенту письмом и СМС со ссылкой.'
  }
];

const GAINS = [
  'Сделка закрывается в день подключения — не нужно везти бумагу в офис и вбивать её руками.',
  'Нет потерянных и неподписанных экземпляров: у каждого договора есть PDF, штамп и запись в реестре.',
  'Клиент сразу получает копию, а бухгалтерия и СОРМ — договор с паспортными данными из карточки.'
];

export const ESignSection: React.FC = () => (
  <section id="esign" className="mb-14 scroll-mt-20">
    <ScrollReveal direction="up" distance={20}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Новое в 3.7.0
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Договор подписывается на телефоне при подключении
      </h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Клиент подписывает договор пальцем на экране телефона монтажника и подтверждает подпись кодом из СМС.
        Бумага, поездка в офис и ручной ввод больше не нужны — договор готов, пока монтажник ещё у клиента.
      </p>
    </ScrollReveal>

    <ScrollReveal direction="up" distance={24}>
      <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 text-white shadow-lg border border-emerald-600/40">
        <ScrollStagger staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollStaggerItem key={s.title} distance={16} className="h-full">
                <div className="h-full p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                      Шаг {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
                  <p className="text-sm leading-snug text-emerald-50/90">{s.text}</p>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-emerald-200" aria-hidden="true" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-100">Что это меняет для провайдера</h3>
            </div>
            <ul className="space-y-2 text-sm text-emerald-50/90">
              {GAINS.map(g => (
                <li key={g} className="flex gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" aria-hidden="true" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-200" aria-hidden="true" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-100">Юридически</h3>
            </div>
            <p className="text-sm text-emerald-50/90 leading-snug">
              Простая электронная подпись по 63-ФЗ. Соглашение о её использовании входит в сам договор,
              код действует 10 минут, число попыток и отправок ограничено.
            </p>
            <div className="flex gap-2 p-3 rounded-xl bg-amber-400/10 border border-amber-300/30 text-amber-100 text-xs leading-snug">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>Первая версия — для физлиц с внесёнными паспортными данными. Юрлица подписывают по-старому.</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          <a
            href="https://docs.billing.smit34.ru/pages/crm.html#contract-esign"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-colors"
          >
            Как устроено в CRM <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  </section>
);
