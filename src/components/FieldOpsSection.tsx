import React from 'react';
import {
  ClipboardList,
  Route,
  CalendarDays,
  BarChart3,
  ExternalLink,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from './ScrollReveal';

/**
 * Работа монтажников от заявки до подписанного договора (сентябрь 2026).
 * Идёт сразу за блоком о подписании договора: подпись — последний шаг этой цепочки.
 */
const DEMO = 'https://demo.billing.smit34.ru/admin/crm';

const PARTS = [
  {
    icon: ClipboardList,
    title: 'Наряды',
    href: `${DEMO}/montazh/?period=all`,
    lead: 'Выезды монтажника на сегодня, завтра и неделю — карточками на телефоне.',
    points: [
      'Адрес, время, клиент и материалы в одной карточке',
      'Роутер берётся со склада под наряд и передаётся клиенту после договора',
      'Бланк «Наряд-заказ» в PDF на одном листе вместо бумажного',
      'Отсюда же — подписание договора на телефоне'
    ]
  },
  {
    icon: Route,
    title: 'План выездов',
    href: `${DEMO}/plan/`,
    lead: 'Подтверждённые заявки раскладываются по монтажникам на день.',
    points: [
      'Учитывает график монтажника и окно клиента',
      'Маршрут считается по дорогам, выезд перетаскивается между людьми',
      'Свободные окна и подсказки: заявки поблизости, до 15 км',
      'Утверждает главный инженер, план уходит монтажникам в чат и Telegram'
    ]
  },
  {
    icon: CalendarDays,
    title: 'График монтажников',
    href: `${DEMO}/plan/crew/`,
    lead: 'Кто работает, когда и откуда выезжает.',
    points: [
      'Рабочие дни, часы, точка выезда и навыки',
      'Бригады: напарник и машина, водитель едет первым',
      'Выключенный в графике монтажник в план не попадает',
      'Общие монтажники на несколько организаций — чужие детали скрыты'
    ]
  },
  {
    icon: BarChart3,
    title: 'Отчёты по выездам',
    href: `${DEMO}/plan/report/`,
    lead: 'Что получилось после выездов.',
    points: [
      'Подключения и отказы по районам',
      'Причины отказов, сведённые к общему списку',
      'Пробег по утверждённым выездам',
      'Считается из истории этапов сделок, без ручного учёта'
    ]
  }
];

export const FieldOpsSection: React.FC = () => (
  <section id="fieldops" className="mb-14 scroll-mt-20">
    <ScrollReveal direction="up" distance={20}>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          Новое в 3.7.0
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        От заявки до подключения: выезды монтажников
      </h2>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-4">
        Заявка проходит путь внутри системы целиком: обзвон и проверка техвозможности, план выездов,
        наряд у монтажника, подпись договора на телефоне — без таблиц и пересылки адресов в мессенджерах.
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
        {[
          { icon: PhoneCall, t: 'Обзвон и согласование даты' },
          { icon: MapPin, t: 'Техвозможность по адресу' },
          { icon: Route, t: 'План выездов' },
          { icon: ClipboardList, t: 'Наряд' },
          { icon: ClipboardList, t: 'Договор на телефоне' }
        ].map((s, i, arr) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.t}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {s.t}
              </span>
              {i < arr.length - 1 && <span className="text-slate-400" aria-hidden="true">→</span>}
            </React.Fragment>
          );
        })}
      </div>
    </ScrollReveal>

    <ScrollStagger staggerDelay={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {PARTS.map(p => {
        const Icon = p.icon;
        return (
          <ScrollStaggerItem key={p.title} distance={18} className="h-full">
            <div className="h-full p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{p.title}</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{p.lead}</p>
              <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
                {p.points.map(pt => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noopener"
                className="mt-auto self-start inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Открыть на демо-стенде <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </ScrollStaggerItem>
        );
      })}
    </ScrollStagger>
    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
      Демо-стенд обезличен: клиенты, адреса и телефоны сгенерированы. Вход — demo / demo.
    </p>
  </section>
);
