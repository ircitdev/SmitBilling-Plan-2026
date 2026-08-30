import React, { useState, useMemo, useEffect } from 'react';
import { useExitAnimation } from '../hooks/useExitAnimation';
import { 
  X, 
  Search, 
  ArrowRight, 
  Building2, 
  Star, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  FileText,
  Tag
} from 'lucide-react';
import { COMPETITORS, RECOMMENDATIONS, ROADMAP_ITEMS, POSITIONING_DATA, PRICING_TIERS, PRICING_TERMS_CONFIG, CONCLUSION_DATA, THREAT_RISKS_DATA } from '../data/strategicData';
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
    if (!query.trim()) return { competitors: [], recommendations: [], roadmap: [], positioning: [] };

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

    const matchedPositioning = [
      ...(POSITIONING_DATA.oneSentence.toLowerCase().includes(q) || 'позиционирование go-to-market стратегия'.includes(q)
        ? [{ title: 'Позиционирование (одно предложение)', text: POSITIONING_DATA.oneSentence, section: 'positioning' }]
        : []),
      ...POSITIONING_DATA.taglines
        .filter((t) => t.toLowerCase().includes(q))
        .map((t) => ({ title: 'Tagline СмИТ Биллинг', text: t, section: 'positioning' })),
      ...POSITIONING_DATA.icps
        .filter(
          (icp) =>
            icp.name.toLowerCase().includes(q) ||
            icp.pricingRecommendation.toLowerCase().includes(q) ||
            icp.strategyHighlight.toLowerCase().includes(q) ||
            icp.audienceRange.toLowerCase().includes(q)
        )
        .map((icp) => ({ title: `Целевой профиль: ${icp.name}`, text: `${icp.audienceRange} · ${icp.pricingRecommendation}`, section: 'positioning' })),
      ...POSITIONING_DATA.salesFunnel
        .filter(
          (sf) =>
            sf.stage.toLowerCase().includes(q) ||
            sf.description.toLowerCase().includes(q) ||
            'воронка продаж awareness interest consideration decision retention'.includes(q)
        )
        .map((sf) => ({
          title: `Воронка продаж: ${sf.stage}`,
          text: sf.description,
          section: 'positioning'
        })),
      ...POSITIONING_DATA.marketingQuickWins
        .filter(
          (qw) =>
            qw.title.toLowerCase().includes(q) ||
            'quick wins маркетинг demo калькулятор youtube comparison'.includes(q)
        )
        .map((qw) => ({
          title: `Quick win маркетинга #${qw.step}`,
          text: qw.title,
          section: 'positioning'
        }))
    ];

    const matchedPricing = [
      ...PRICING_TIERS.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.annualPrice.toString().includes(q) ||
          t.monthlyPrice.toString().includes(q) ||
          t.features.some((f) => f.toLowerCase().includes(q)) ||
          (t.badge && t.badge.toLowerCase().includes(q)) ||
          'цена тариф стоимость прайс скидка'.includes(q)
      ).map((t) => ({
        title: `Тариф «${t.name}» — ${t.annualPrice.toLocaleString('ru-RU')} ₽/год`,
        text: `${t.monthlyPrice.toLocaleString('ru-RU')} ₽/мес · ${t.features.slice(0, 3).join(', ')}`,
        section: 'pricing'
      })),
      ...(PRICING_TERMS_CONFIG.firstClientsPolicy.title.toLowerCase().includes(q) ||
      PRICING_TERMS_CONFIG.firstClientsPolicy.points.some((p) => p.text.toLowerCase().includes(q) || p.heading.toLowerCase().includes(q)) ||
      'скидка время бесплатные месяцы условия'.includes(q)
        ? [{
            title: PRICING_TERMS_CONFIG.firstClientsPolicy.title,
            text: '6 месяцев бесплатно первым трём клиентам, миграция 0 ₽, отзыв и кейс взамен',
            section: 'pricing'
          }]
        : []),
      ...(PRICING_TERMS_CONFIG.upsellPolicy.title.toLowerCase().includes(q) ||
      PRICING_TERMS_CONFIG.upsellPolicy.points.some((p) => p.text.toLowerCase().includes(q)) ||
      'апселл 2500 модуль'.includes(q)
        ? [{
            title: PRICING_TERMS_CONFIG.upsellPolicy.title,
            text: 'Подключение модулей по 2 500 ₽/мес вместо скидки на базовую лицензию',
            section: 'pricing'
          }]
        : [])
    ];

    const matchedConclusion = [
      ...(CONCLUSION_DATA.title.toLowerCase().includes(q) ||
      CONCLUSION_DATA.badge.toLowerCase().includes(q) ||
      CONCLUSION_DATA.marketInsight.lead.toLowerCase().includes(q) ||
      CONCLUSION_DATA.bottleneck.description.toLowerCase().includes(q) ||
      CONCLUSION_DATA.keyRecommendation.details.toLowerCase().includes(q) ||
      'заключение инсайт 2-3 платных клиента ограничение зрелый насыщенный пробел'.includes(q)
        ? [{
            title: `${CONCLUSION_DATA.badge}: ${CONCLUSION_DATA.title}`,
            text: `${CONCLUSION_DATA.keyRecommendation.heading} ${CONCLUSION_DATA.keyRecommendation.target}. ${CONCLUSION_DATA.bottleneck.description.slice(0, 80)}...`,
            section: 'conclusion'
          }]
        : [])
    ];

    const matchedRisks = THREAT_RISKS_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.categoryLabel.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.mitigationStrategy.toLowerCase().includes(q) ||
        'матрица рисков угрозы сорм cto инерция демпинг ddos реестр'.includes(q)
    );

    return {
      competitors: matchedCompetitors,
      recommendations: matchedRecommendations,
      roadmap: matchedRoadmap,
      positioning: matchedPositioning,
      pricing: matchedPricing,
      conclusion: matchedConclusion,
      risks: matchedRisks
    };
  }, [query]);

  const { mounted, closing } = useExitAnimation(isOpen);


  if (!mounted) return null;

  const totalResults =
    results.competitors.length +
    results.recommendations.length +
    results.roadmap.length +
    results.positioning.length +
    results.pricing.length +
    results.conclusion.length +
    results.risks.length;



  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 ${closing ? 'is-closing' : ''}`}
      onClick={onClose}
    >
      <div 
        className="panel-right w-full max-w-xl sm:max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-hidden shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-850/50">
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
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Закрыть (Esc)"
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
              {/* Conclusion & Key Insight Results */}
              {results.conclusion.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Заключение и инсайт ({results.conclusion.length})
                  </h3>
                  <div className="space-y-2">
                    {results.conclusion.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const element = document.getElementById('conclusion');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                            <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {item.text}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Positioning & Go-To-Market Results */}
              {results.positioning.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Позиционирование и ICP ({results.positioning.length})
                  </h3>
                  <div className="space-y-2">
                    {results.positioning.map((pos, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const element = document.getElementById('positioning');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">
                            <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {pos.title}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {pos.text}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Terms Results */}
              {results.pricing.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Цены и условия ({results.pricing.length})
                  </h3>
                  <div className="space-y-2">
                    {results.pricing.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const element = document.getElementById('pricing');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                            <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {item.text}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Risk Results */}
              {results.risks.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-500 mb-2">
                    Матрица рисков & Угрозы ({results.risks.length})
                  </h3>
                  <div className="space-y-2">
                    {results.risks.map((risk) => (
                      <div
                        key={risk.id}
                        onClick={() => {
                          const element = document.getElementById('risks');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                          onClose();
                        }}
                        className="p-3.5 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800">
                            <Tag className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          </div>
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {risk.code}: {risk.name}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {risk.categoryLabel} · Score: {risk.riskScore} · {risk.mitigationStrategy}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
