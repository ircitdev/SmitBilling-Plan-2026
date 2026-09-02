import React, { useEffect, useMemo, useState } from 'react';
import { List, ChevronUp, ChevronDown, X } from 'lucide-react';

/**
 * Содержание документа — как на статической версии плана.
 *
 * Разделы берём из самой страницы, а не из списка в коде: секции здесь
 * переставляли уже трижды, и ручной список разошёлся бы с фактическим
 * порядком в первый же раз.
 *
 * На десктопе панель стоит слева внизу и сворачивается в кнопку —
 * при узком окне она иначе заезжала бы на карточки. Состояние
 * запоминается. На телефоне — кнопка и выезжающий снизу список.
 */

type Item = { id: string; title: string };

/** Подписи короче заголовков: в узкой колонке важна не полнота, а узнаваемость. */
const SHORT: Record<string, string> = {
  tldr: 'Ключевые выводы',
  market: 'Состояние рынка',
  competitors: 'Карта конкурентов',
  table: 'Сравнение по 50+',
  risks: 'Матрица рисков',
  recommendations: '12 рекомендаций',
  status: 'Статус планов',
  pricing: 'Цена и условия',
  'tldr-details': 'Сильные и слабые стороны',
  positioning: 'Позиционирование',
  conclusion: 'Заключение'
};

const STORAGE_KEY = 'smit_toc_open';

export const TableOfContents: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [openMobile, setOpenMobile] = useState(false);

  // Развёрнута ли панель на десктопе. По умолчанию открыта только там,
  // где рядом с текстом есть свободное поле.
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setOpen(saved === '1');
        return;
      }
    } catch {
      // приватный режим — просто решаем по ширине
    }
    setOpen(window.innerWidth >= 1600);
  }, []);

  const toggle = () => {
    setOpen((v) => {
      try {
        localStorage.setItem(STORAGE_KEY, v ? '0' : '1');
      } catch {
        // не смогли запомнить — не беда
      }
      return !v;
    });
  };

  // разделы собираем после первой отрисовки и ещё раз чуть позже:
  // часть секций появляется вместе с ленивыми блоками
  useEffect(() => {
    const collect = () => {
      const found: Item[] = [];
      document.querySelectorAll<HTMLElement>('main [id]').forEach((el) => {
        if (!el.id || el.closest('[role="dialog"]')) return;
        if (!SHORT[el.id]) return;
        found.push({ id: el.id, title: SHORT[el.id] });
      });
      found.sort((a, b) => {
        const ea = document.getElementById(a.id);
        const eb = document.getElementById(b.id);
        if (!ea || !eb) return 0;
        return ea.compareDocumentPosition(eb) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });
      setItems(found);
    };
    collect();
    const t = window.setTimeout(collect, 1200);
    return () => window.clearTimeout(t);
  }, []);

  // прогресс чтения и активный раздел
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? Math.min(100, Math.max(0, (window.pageYOffset / docH) * 100)) : 0);

        const mid = window.innerHeight * 0.35;
        let current = '';
        items.forEach((it) => {
          const el = document.getElementById(it.id);
          if (el && el.getBoundingClientRect().top <= mid) current = it.id;
        });
        setActiveId(current);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  const pct = useMemo(() => Math.round(progress), [progress]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpenMobile(false);
  };

  if (!items.length) return null;

  const list = (
    <ol className="space-y-0.5">
      {items.map((it, i) => {
        const active = it.id === activeId;
        return (
          <li key={it.id}>
            <button
              onClick={() => go(it.id)}
              aria-current={active ? 'true' : undefined}
              className={`w-full text-left flex items-baseline gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors ${
                active
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="text-[10px] font-mono tabular-nums text-slate-400 dark:text-slate-500 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="leading-snug">{it.title}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Десктоп: слева, прижато к низу экрана */}
      <div className="hidden lg:block fixed left-6 bottom-6 z-[95]">
        {open ? (
          <nav
            aria-label="Содержание"
            className="flex flex-col w-60 max-h-[min(70vh,34rem)] p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Разделы плана
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {pct}%
                </span>
                <button
                  onClick={toggle}
                  aria-label="Свернуть содержание"
                  aria-expanded={true}
                  className="p-1 -mr-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-1 rounded-full bg-slate-200/80 dark:bg-slate-700/60 overflow-hidden mb-3">
              <i
                className="block h-full bg-emerald-500 rounded-full transition-[width] duration-150"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="overflow-y-auto -mx-1 px-1">{list}</div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" /> Наверх
            </button>
          </nav>
        ) : (
          <button
            onClick={toggle}
            aria-label="Развернуть содержание"
            aria-expanded={false}
            className="flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <List className="w-4 h-4" />
            <span className="text-xs font-bold">Содержание</span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {pct}%
            </span>
          </button>
        )}
      </div>

      {/* Телефон и планшет: кнопка слева внизу — справа внизу кнопка AI */}
      <button
        onClick={() => setOpenMobile(true)}
        aria-label="Содержание документа"
        className="lg:hidden fixed left-4 bottom-5 z-[45] w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <List className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold tabular-nums">
          {pct}
        </span>
      </button>

      {openMobile && (
        <div
          className="lg:hidden fixed inset-0 z-[90] flex items-end justify-start bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpenMobile(false)}
        >
          <div
            className="w-full sm:max-w-sm sm:ml-4 sm:mb-4 max-h-[75vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-[24px] border-t sm:border border-slate-200 dark:border-slate-800 p-5 pb-8 animate-in slide-in-from-bottom-6 duration-300 motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                Разделы плана
              </span>
              <button
                onClick={() => setOpenMobile(false)}
                aria-label="Закрыть"
                className="p-2 -mr-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {list}
          </div>
        </div>
      )}
    </>
  );
};
