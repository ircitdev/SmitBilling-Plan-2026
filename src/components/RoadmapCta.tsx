import React from 'react';
import { Map, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

/**
 * Блок над футером: увод на страницу исполнения плана.
 *
 * Документ отвечает на вопрос «что мы собираемся делать», а дорожная
 * карта — «что из этого уже сделано». Читатель дошёл до конца, и это
 * единственное место, где такой переход уместен.
 */
export const RoadmapCta: React.FC = () => {
  return (
    <section className="mt-16 mb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rotating-gradient glow-shadow relative overflow-hidden rounded-[32px] bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-xl">
        {/* мягкое свечение бренда, чтобы блок читался как акцент, а не как ещё одна карточка */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <Map
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-8 w-44 h-44 text-white/5"
        />

        <div className="relative z-10 p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-7">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5" />
              Живая страница
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Что из этого плана уже сделано
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              План отвечает на вопрос, куда идём. Дорожная карта — на вопрос, где мы сейчас:
              статусы задач по волнам, журнал работ с проверяемым результатом и метрики
              к 31 декабря 2026 года.
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Задачи по волнам со статусами
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Журнал работ по датам
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Метрики и целевые значения
              </li>
            </ul>
          </div>

          <div className="lg:shrink-0">
            <a
              href="/plan2026/roadmap/"
              className="liquid-metal group inline-flex w-full lg:w-auto items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              <Map className="w-5 h-5" />
              Дорожная карта
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
