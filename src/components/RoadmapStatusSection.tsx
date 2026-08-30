import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Ban, 
  Search, 
  Filter, 
  Layers, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ROADMAP_ITEMS, METADATA } from '../data/strategicData';
import { RoadmapItem, RoadmapStatusType } from '../types';

export const RoadmapStatusSection: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return ROADMAP_ITEMS.filter((item) => {
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.statusLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [selectedStatus, selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: ROADMAP_ITEMS.length,
      done: ROADMAP_ITEMS.filter((i) => i.status === 'done').length,
      partial: ROADMAP_ITEMS.filter((i) => i.status === 'partial').length,
      planned: ROADMAP_ITEMS.filter((i) => i.status === 'planned').length,
      blocked: ROADMAP_ITEMS.filter((i) => i.status === 'blocked').length
    };
  }, []);

  const getStatusBadge = (status: RoadmapStatusType, label: string) => {
    switch (status) {
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> {label}
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <Clock className="w-3 h-3" /> {label}
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-500/30">
            <AlertCircle className="w-3 h-3" /> {label}
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-500/30">
            <Ban className="w-3 h-3" /> {label}
          </span>
        );
    }
  };

  return (
    <section id="status" className="mb-14 scroll-mt-20">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
            Статус ключевых планов
          </span>
        </div>

        <a
          href={METADATA.roadmapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
        >
          <span>Интерактивный Roadmap 2026</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Что готово, что в работе, что в бэклоге
      </h2>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mb-6">
        Фактический статус ключевых направлений разработки на {METADATA.build}. 
        За последние 288 билдов закрыты: фискализация 54-ФЗ, разбор банковской очереди с ИНН, единая библиотека UI и видеообучение.
      </p>

      {/* Filter and Search Bar */}
      <div className="p-5 sm:p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Все ({counts.all})
            </button>

            <button
              onClick={() => setSelectedStatus('done')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedStatus === 'done'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
              }`}
            >
              Готово ({counts.done})
            </button>

            <button
              onClick={() => setSelectedStatus('partial')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedStatus === 'partial'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100'
              }`}
            >
              В работе ({counts.partial})
            </button>

            <button
              onClick={() => setSelectedStatus('planned')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedStatus === 'planned'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100'
              }`}
            >
              План ({counts.planned})
            </button>

            <button
              onClick={() => setSelectedStatus('blocked')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedStatus === 'blocked'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100'
              }`}
            >
              Блок ({counts.blocked})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по задачам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-xs rounded-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>
      </div>

      {/* Grid of Roadmap items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredItems.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-400">
            Ничего не найдено по заданному фильтру.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-[28px] bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                item.status === 'done'
                  ? 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                  : item.status === 'partial'
                  ? 'border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/10'
                  : item.status === 'blocked'
                  ? 'border-rose-500/30 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/10'
              } ${item.isFullWidth ? 'sm:col-span-2 lg:col-span-3 xl:col-span-4' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  {getStatusBadge(item.status, item.statusLabel)}
                  {item.priority && (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {item.priority}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.build && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                  Build {item.build}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
