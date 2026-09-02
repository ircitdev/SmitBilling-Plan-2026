import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { METADATA } from '../data/strategicData';

/**
 * «Как устроен биллинг внутри» — витрина интерактивных схем.
 *
 * Шестнадцать схем живут отдельным сайтом на docs.billing.smit34.ru: здесь
 * только вход в них — вкладки по разделам и лента карточек. Обложки и ролики
 * лежат в облаке, ролик подгружается лишь под курсором, чтобы не тратить
 * трафик у тех, кто просто пролистал раздел.
 */

const COVERS = 'https://storage.googleapis.com/uspeshnyy-projects/smit/billing/workflow/';

interface Scheme {
  file: string;
  title: string;
  kind: string;
  video?: boolean;
}

const GROUPS: { name: string; items: Scheme[] }[] = [
  {
    name: 'Ядро',
    items: [
      { file: 'smitbilling-runtime.architecture', title: 'Runtime-архитектура', kind: 'Архитектура', video: true },
      { file: 'smitbilling-charges.workflow', title: 'Прогон абонплаты', kind: 'Процесс', video: true },
      { file: 'smitbilling-payment.sequence', title: 'Оплата через ЮKassa', kind: 'Последовательность', video: true },
      { file: 'smitbilling-abonent.lifecycle', title: 'Абонент по балансу', kind: 'Состояния', video: true },
      { file: 'smitbilling-sorm.dataflow', title: 'Выгрузка СОРМ', kind: 'Поток данных', video: true }
    ]
  },
  {
    name: 'Сеть',
    items: [
      { file: 'smitbilling-radius.sequence', title: 'Путь RADIUS-пакета', kind: 'Последовательность', video: true },
      { file: 'smitbilling-block.sequence', title: 'Блокировка и возврат доступа', kind: 'Последовательность' },
      { file: 'smitbilling-finblock.architecture', title: 'Финблокировка и заглушка', kind: 'Архитектура' }
    ]
  },
  {
    name: 'Клиенты',
    items: [
      { file: 'smitbilling-support.workflow', title: 'Путь обращения', kind: 'Процесс', video: true },
      { file: 'smitbilling-ai.sequence', title: 'Запрос к ассистенту', kind: 'Последовательность' },
      { file: 'smitbilling-deal.lifecycle', title: 'Жизненный цикл сделки', kind: 'Состояния' }
    ]
  },
  {
    name: 'Деньги',
    items: [
      { file: 'smitbilling-bank.dataflow', title: 'Банковская выписка', kind: 'Поток данных', video: true },
      { file: 'smitbilling-fiscal.lifecycle', title: 'Путь чека до ОФД', kind: 'Состояния' }
    ]
  },
  {
    name: 'Инженерам',
    items: [
      { file: 'smitbilling-deploy.workflow', title: 'Безопасный деплой', kind: 'Процесс', video: true },
      { file: 'smitbilling-queues.architecture', title: 'Очереди и фоновые задачи', kind: 'Архитектура' },
      { file: 'smitbilling-org.dataflow', title: 'Разделение по организациям', kind: 'Поток данных' }
    ]
  }
];

const SchemeCard: React.FC<{ item: Scheme }> = ({ item }) => {
  const clips = useRef<(HTMLVideoElement | null)[]>([]);

  /** Ролик грузится и играет только под курсором либо когда карточка в фокусе. */
  const play = useCallback(() => {
    const visible = clips.current.find((v) => v && v.offsetParent !== null);
    if (!visible) return;
    if (!visible.src) visible.src = visible.dataset.src || '';
    visible.classList.add('ready');
    visible.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    clips.current.forEach((v) => {
      if (!v) return;
      v.classList.remove('ready');
      if (!v.paused) v.pause();
    });
  }, []);

  return (
    <a
      className="wfx-card"
      href={METADATA.schemesUrl + item.file + '.html'}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <span className="wfx-media">
        <img className="wfx-light" src={COVERS + item.file + '.jpg'} alt="" loading="lazy" />
        <img className="wfx-dark" src={COVERS + item.file + '_dark.jpg'} alt="" loading="lazy" />
        {item.video && (
          <>
            <video
              ref={(el) => { clips.current[0] = el; }}
              className="wfx-clip wfx-light"
              data-src={COVERS + item.file + '.mp4'}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
            <video
              ref={(el) => { clips.current[1] = el; }}
              className="wfx-clip wfx-dark"
              data-src={COVERS + item.file + '_dark.mp4'}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            />
          </>
        )}
      </span>
      <span className="wfx-card-body">
        <span className="wfx-kind">{item.kind}</span>
        <span className="wfx-card-title">{item.title}</span>
      </span>
    </a>
  );
};

export const SchemesSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hintOff, setHintOff] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  const syncNav = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 4;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(max <= 0 || el.scrollLeft >= max);
  }, []);

  useEffect(() => {
    if (track.current) track.current.scrollLeft = 0;
    syncNav();
  }, [active, syncNav]);

  useEffect(() => {
    window.addEventListener('resize', syncNav);
    return () => window.removeEventListener('resize', syncNav);
  }, [syncNav]);

  // Подсказка о прокрутке видна три секунды с того момента, как блок попал
  // на экран, и гаснет раньше, если ленту уже сдвинули.
  useEffect(() => {
    const el = section.current;
    if (!el || !('IntersectionObserver' in window)) {
      const t = window.setTimeout(() => setHintOff(true), 3000);
      return () => window.clearTimeout(t);
    }
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          timer = window.setTimeout(() => setHintOff(true), 3000);
          io.disconnect();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const scrollBy = (delta: number) => track.current?.scrollBy({ left: delta, behavior: 'smooth' });

  return (
    <section id="schemes" className="wfx scroll-mt-20" ref={section}>
      <div className="wfx-inner">
        <div className="wfx-top">
          <div>
            <span className="wfx-eyebrow">Схемы системы</span>
            <h2>Как устроен биллинг внутри</h2>
            <p className="wfx-lead">
              Шестнадцать интерактивных схем: архитектура боевого сервера, прогон абонплаты,
              приём платежей, работа с сетью и порядок выкатки. Каждая открывается в браузере —
              с поиском по узлам и разбором связей.
            </p>
          </div>
          <a className="wfx-all" href={METADATA.schemesUrl} target="_blank" rel="noopener noreferrer">
            Открыть все схемы <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="wfx-tabs" role="tablist" aria-label="Разделы схем">
          {GROUPS.map((g, i) => (
            <button
              key={g.name}
              type="button"
              role="tab"
              className="wfx-tab"
              aria-selected={i === active}
              aria-controls="wfx-track"
              onClick={() => setActive(i)}
            >
              {g.name}
            </button>
          ))}
          <span className={hintOff ? 'wfx-hint wfx-hint-off' : 'wfx-hint'} aria-hidden="true">
            <MoveRight className="w-4 h-4" />
            листайте
          </span>
        </div>

        <div className="wfx-slider">
          <button
            type="button"
            className="wfx-nav wfx-prev"
            aria-label="Показать предыдущие схемы"
            hidden={atStart}
            onClick={() => scrollBy(-640)}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div
            className="wfx-track"
            id="wfx-track"
            ref={track}
            onScroll={() => {
              syncNav();
              setHintOff(true);
            }}
          >
            {GROUPS[active].items.map((item) => (
              <SchemeCard key={item.file} item={item} />
            ))}
          </div>

          <button
            type="button"
            className="wfx-nav wfx-next"
            aria-label="Показать следующие схемы"
            hidden={atEnd}
            onClick={() => scrollBy(640)}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
