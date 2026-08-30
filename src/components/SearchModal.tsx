import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Search, 
  ArrowRight, 
  Building2, 
  Star, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { COMPETITORS, RECOMMENDATIONS, ROADMAP_ITEMS } from '../data/strategicData';
import { Recommendation } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendation: (reco: Recommendation) => void;
  onSelectCompetitor: (compId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendation,
  onSelectCompetitor
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent or opened
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return { competitors: [], recommendations: [], roadmap: [] };

    const q = query.toLowerCase();

    const matchedCompetitors = COMPETITORS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.segment.toLowerCase().includes(q) ||
        c.ourTake.toLowerCase().includes(q) ||
        c.stack.toLowerCase().includes(q)
    );

    const matchedRecommendations = RECOMMENDATIONS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.kpis.join(' ').toLowerCase().includes(q)
    );

    const matchedRoadmap = ROADMAP_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.statusLabel.toLowerCase().includes(q)
    );

    return {
      competitors: matchedCompetitors,
      recommendations: matchedRecommendations,
      roadmap: matchedRoadmap
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.competitors.length + results.recommendations.length + results.roadmap.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Поиск по конкурентам, рекомендациям, задачам плана..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin">
          {!query.trim() ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
              Введите название конкурента (напр. Carbon, Hydra, UTM5), рекомендацию или фичу биллинга
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              По запросу «{query}» ничего не найдено.
            </div>
          ) : (
            <>
              {/* Competitor Results */}
              {results.competitors.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Конкуренты ({results.competitors.length})
                  </h3>
                  <div className="space-y-2">
                    {results.competitors.map((comp) => (
                      <div
                        key={comp.id}
                        onClick={() => {
                          onSelectCompetitor(comp.id);
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {comp.name}
                            </span>
                            <span className="text-[11px] text-slate-500 ml-2 font-mono">
                              {comp.segment} · {comp.clients}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation Results */}
              {results.recommendations.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Стратегические рекомендации ({results.recommendations.length})
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((reco) => (
                      <div
                        key={reco.id}
                        onClick={() => {
                          onSelectRecommendation(reco);
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              #{reco.rank} {reco.title}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {reco.summary}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmap Results */}
              {results.roadmap.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Задачи дорожной карты ({results.roadmap.length})
                  </h3>
                  <div className="space-y-2">
                    {results.roadmap.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-500 ml-2 font-mono">
                              {item.statusLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-850/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Навигация: Нажмите ESC для закрытия</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">СмИТ Биллинг 2026</span>
        </div>
      </div>
    </div>
  );
};
