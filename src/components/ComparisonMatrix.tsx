import React, { useState, useMemo } from 'react';
import { 
  Check, 
  X, 
  Minus, 
  HelpCircle, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { MATRIX_DATA } from '../data/strategicData';
import { MatrixRow } from '../types';
import { ScrollReveal } from './ScrollReveal';

export const ComparisonMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [highlightSmitAdvantages, setHighlightSmitAdvantages] = useState(false);

  // На телефоне восемь колонок не помещаются — сравниваем с одним
  // конкурентом за раз, остальные переключаются чипами.
  const RIVALS = [
    { key: 'carbon' as const, label: 'Carbon Soft' },
    { key: 'utm5' as const, label: 'UTM5' },
    { key: 'hydra' as const, label: 'Hydra' },
    { key: 'lanbilling' as const, label: 'LANBilling' },
    { key: 'bgbilling' as const, label: 'BGBilling' },
    { key: 'mikbill' as const, label: 'Mikbill' },
  ];
  const [rival, setRival] = useState<typeof RIVALS[number]['key']>('carbon');
  const rivalLabel = RIVALS.find((r) => r.key === rival)?.label ?? '';

  const categories = useMemo(() => {
    const set = new Set(MATRIX_DATA.map((row) => row.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredData = useMemo(() => {
    return MATRIX_DATA.filter((row) => {
      const matchesSearch =
        searchQuery === '' ||
        row.parameter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.smit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.carbon.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || row.category === selectedCategory;

      const matchesHighlight =
        !highlightSmitAdvantages ||
        (row.smitStatus === 'yes' &&
          (row.carbon.includes('Нет') ||
            row.utm5.includes('Нет') ||
            row.mikbill.includes('Нет') ||
            row.smit.includes('AI') ||
            row.smit.includes('выписок') ||
            row.smit.includes('Android')));

      return matchesSearch && matchesCat && matchesHighlight;
    });
  }, [searchQuery, selectedCategory, highlightSmitAdvantages]);

  const renderStatusCell = (value: string, isSmit = false, docTip?: string, link?: string) => {
    const isYes = value.toLowerCase().startsWith('да') || value.toLowerCase().includes('есть') || value.toLowerCase().includes('современный');
    const isNo = value.toLowerCase().startsWith('нет');
    const isPartial = value.toLowerCase().includes('частично') || value.toLowerCase().includes('ограниченно') || value.toLowerCase().includes('плагин');

    return (
      <div className="flex items-center gap-1.5 min-w-0">
        {isYes ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
        ) : isNo ? (
          <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 opacity-80" />
        ) : isPartial ? (
          <Minus className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        ) : null}

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1 truncate"
            title={docTip || value}
          >
            <span className="truncate">{value}</span>
            <ExternalLink className="w-2.5 h-2.5 flex-shrink-0 opacity-70" />
          </a>
        ) : (
          <span
            className={`truncate ${
              isSmit
                ? 'font-semibold text-emerald-800 dark:text-emerald-300'
                : isNo
                ? 'text-slate-400 dark:text-slate-500'
                : isYes
                ? 'text-slate-900 dark:text-slate-200'
                : 'text-slate-700 dark:text-slate-300'
            }`}
            title={docTip || value}
          >
            {value}
          </span>
        )}
      </div>
    );
  };

  return (
    <section id="table" className="mb-14 scroll-mt-20">
      <ScrollReveal direction="up" distance={20}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
            Большая сравнительная таблица
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Сравнение по 50+ параметрам
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
          Детальная матрица возможностей СмИТ относительно шести ключевых систем на российском рынке. 
          Показано: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{filteredData.length}</strong> из {MATRIX_DATA.length} параметров.
        </p>
      </ScrollReveal>

      {/* Matrix Controls & Search */}
      <ScrollReveal direction="up" distance={20} delay={0.05}>
        <div className="p-5 sm:p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Live Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по параметрам матрицы..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Highlight Switch */}
            <button
              onClick={() => setHighlightSmitAdvantages(!highlightSmitAdvantages)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs ${
                highlightSmitAdvantages
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Только преимущества СмИТ</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                {cat === 'all' ? 'Все категории' : cat}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Matrix Table */}
      <ScrollReveal direction="up" distance={24} delay={0.1}>

        {/* Мобильный вид: карточка на параметр вместо восьми колонок */}
        <div className="md:hidden">
          {/* Выбор конкурента */}
          <div className="sticky top-16 z-20 -mx-4 px-4 py-2.5 bg-slate-50/95 dark:bg-[#0f141c]/95 backdrop-blur-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Сравнить с
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {RIVALS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRival(r.key)}
                  aria-pressed={rival === r.key}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold border transition-colors ${
                    rival === r.key
                      ? 'bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-500'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Параметров по заданным фильтрам не найдено. Сбросьте поиск или фильтр
            </div>
          ) : (
            <div className="space-y-2.5 mt-3">
              {filteredData.map((row, idx) => {
                const isNewCat = idx === 0 || filteredData[idx - 1].category !== row.category;
                return (
                  <React.Fragment key={row.id}>
                    {isNewCat && (
                      <div className="pt-4 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {row.category}
                      </div>
                    )}
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="px-4 py-3 font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
                        {row.parameter}
                      </div>
                      <div className="px-4 py-3 bg-emerald-500/5 dark:bg-emerald-950/20 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                          СмИТ Биллинг
                        </div>
                        <div className="text-sm text-slate-900 dark:text-white">
                          {renderStatusCell(row.smit, true, row.smitDocTip, row.smitLink)}
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                          {rivalLabel}
                        </div>
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {renderStatusCell(row[rival])}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Легенда */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Поддерживается
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Minus className="w-3.5 h-3.5 text-amber-500" /> Ограниченно
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <X className="w-3.5 h-3.5 text-rose-500" /> Отсутствует
            </span>
          </div>
        </div>

        <div className="hidden md:block overflow-hidden rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="overflow-x-auto max-h-[700px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              {/* Table Header */}
              <thead className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-200">
                <tr>
                  <th className="sticky left-0 z-30 bg-slate-100/95 dark:bg-slate-900/95 p-3.5 min-w-[200px] max-w-[260px] shadow-[1px_0_0_0_rgba(0,0,0,0.06)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.06)]">
                    Параметр
                  </th>
                  <th className="p-3.5 min-w-[180px] bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-extrabold border-l border-r border-emerald-500/20">
                    СмИТ Биллинг
                  </th>
                  <th className="p-3.5 min-w-[140px]">Carbon Soft</th>
                  <th className="p-3.5 min-w-[140px]">UTM5 (NetUP)</th>
                  <th className="p-3.5 min-w-[140px]">Hydra</th>
                  <th className="p-3.5 min-w-[140px]">LANBilling</th>
                  <th className="p-3.5 min-w-[140px]">BGBilling</th>
                  <th className="p-3.5 min-w-[140px]">Mikbill</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      Параметров по заданным фильтрам не найдено. Сбросьте поиск или фильтры.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, idx) => {
                    const isNewCat =
                      idx === 0 || filteredData[idx - 1].category !== row.category;

                    return (
                      <React.Fragment key={row.id}>
                        {isNewCat && (
                          <tr className="bg-slate-50 dark:bg-slate-850 font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <td colSpan={8} className="sticky left-0 px-3.5 py-2.5 bg-slate-50/95 dark:bg-slate-850/95">
                              {row.category}
                            </td>
                          </tr>
                        )}
                        <tr className="hover:bg-emerald-500/5 dark:hover:bg-emerald-500/5 transition-colors">
                          <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 p-3.5 font-medium text-slate-900 dark:text-white shadow-[1px_0_0_0_rgba(0,0,0,0.06)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.06)] truncate max-w-[260px]">
                            {row.parameter}
                          </td>
                          <td className="p-3.5 bg-emerald-500/5 dark:bg-emerald-950/20 border-l border-r border-emerald-500/20">
                            {renderStatusCell(row.smit, true, row.smitDocTip, row.smitLink)}
                          </td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.carbon)}</td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.utm5)}</td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.hydra)}</td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.lanbilling)}</td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.bgbilling)}</td>
                          <td className="p-3.5 text-slate-700 dark:text-slate-300">{renderStatusCell(row.mikbill)}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Legend */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Поддерживается
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Minus className="w-3.5 h-3.5 text-amber-500" /> Ограниченно / Плагин
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <X className="w-3.5 h-3.5 text-rose-500" /> Отсутствует
              </span>
            </div>
            <div className="font-medium text-slate-500 dark:text-slate-400">
              Нажмите на подсвеченные ссылки в колонке СмИТ для перехода к документации
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
