import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ReferenceLine
} from 'recharts';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Target,
  TrendingDown,
  Layers,
  Bot,
  Lock,
  Users,
  Smartphone,
  CreditCard,
  Building2,
  Clock,
  FileCheck2,
  Sparkles,
  Filter,
  ArrowRight,
  ChevronRight,
  Info,
  Sliders,
  Eye,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  BarChart3,
  ListFilter
} from 'lucide-react';
import { THREAT_RISKS_DATA } from '../data/strategicData';
import { ThreatRisk, RiskCategory, RiskLevel } from '../types';

interface RiskMatrixSectionProps {
  onOpenSormDrawer?: () => void;
  onOpenCalculator?: () => void;
  onOpenAiAssistant?: () => void;
}

type ViewMode = 'scatter' | 'grid' | 'mitigation';

// Category color and styling helper
const CATEGORY_CONFIG: Record<RiskCategory, { label: string; badge: string; icon: React.ComponentType<{ className?: string }> }> = {
  regulatory: {
    label: 'Регуляторные',
    badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    icon: ShieldAlert
  },
  market: {
    label: 'Рыночные',
    badge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: Building2
  },
  technical: {
    label: 'Технические',
    badge: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: Lock
  },
  operational: {
    label: 'Операционные',
    badge: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: Users
  }
};

const LEVEL_CONFIG: Record<RiskLevel, { label: string; color: string; badge: string; bgSoft: string }> = {
  critical: {
    label: 'Критический (Красная зона)',
    color: '#ef4444',
    badge: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    bgSoft: 'rgba(239, 68, 68, 0.08)'
  },
  high: {
    label: 'Высокий (Оранжевая зона)',
    color: '#f97316',
    badge: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    bgSoft: 'rgba(249, 115, 22, 0.08)'
  },
  medium: {
    label: 'Умеренный (Желтая зона)',
    color: '#eab308',
    badge: 'bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    bgSoft: 'rgba(234, 179, 8, 0.08)'
  },
  low: {
    label: 'Низкий (Зеленая зона)',
    color: '#10b981',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    bgSoft: 'rgba(16, 185, 129, 0.08)'
  }
};

export const RiskMatrixSection: React.FC<RiskMatrixSectionProps> = ({
  onOpenSormDrawer,
  onOpenCalculator,
  onOpenAiAssistant
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [selectedRiskId, setSelectedRiskId] = useState<string>('risk-sorm');
  const [viewMode, setViewMode] = useState<ViewMode>('scatter');
  const [showMitigated, setShowMitigated] = useState<boolean>(false);

  // Filtered dataset
  const filteredRisks = useMemo(() => {
    return THREAT_RISKS_DATA.filter((risk) => {
      const matchCategory = selectedCategoryId === 'all' || risk.category === selectedCategoryId;
      const matchLevel = selectedLevelId === 'all' || risk.level === selectedLevelId;
      return matchCategory && matchLevel;
    });
  }, [selectedCategoryId, selectedLevelId]);

  // Selected Risk Object
  const selectedRisk = useMemo(() => {
    return THREAT_RISKS_DATA.find((r) => r.id === selectedRiskId) || THREAT_RISKS_DATA[0];
  }, [selectedRiskId]);

  // Chart data preparation
  const scatterData = useMemo(() => {
    return filteredRisks.map((risk) => {
      const prob = showMitigated ? (risk.mitigatedProbability ?? risk.probability * 0.35) : risk.probability;
      const imp = showMitigated ? (risk.mitigatedImpact ?? risk.impact * 0.35) : risk.impact;
      const score = (prob * imp) / 100;
      
      // Calculate dynamic color based on current coordinates
      let pointColor = risk.color;
      if (showMitigated) {
        if (score > 40) pointColor = '#ef4444';
        else if (score > 25) pointColor = '#f97316';
        else if (score > 10) pointColor = '#eab308';
        else pointColor = '#10b981';
      }

      return {
        ...risk,
        x: prob, // Probability
        y: imp,  // Impact
        z: Math.max(score * 1.6, 25), // Bubble Size
        displayScore: score.toFixed(1),
        pointColor
      };
    });
  }, [filteredRisks, showMitigated]);

  // Key Aggregates
  const stats = useMemo(() => {
    const total = THREAT_RISKS_DATA.length;
    const criticalCount = THREAT_RISKS_DATA.filter((r) => r.level === 'critical').length;
    const highCount = THREAT_RISKS_DATA.filter((r) => r.level === 'high').length;
    const avgScoreRaw = THREAT_RISKS_DATA.reduce((acc, r) => acc + (r.probability * r.impact) / 100, 0) / total;
    const avgScoreMitigated = THREAT_RISKS_DATA.reduce(
      (acc, r) => acc + ((r.mitigatedProbability ?? r.probability * 0.35) * (r.mitigatedImpact ?? r.impact * 0.35)) / 100,
      0
    ) / total;
    const mitigationEfficiency = Math.round(((avgScoreRaw - avgScoreMitigated) / avgScoreRaw) * 100);

    return {
      total,
      criticalCount,
      highCount,
      avgScoreRaw: avgScoreRaw.toFixed(1),
      avgScoreMitigated: avgScoreMitigated.toFixed(1),
      mitigationEfficiency
    };
  }, []);

  return (
    <section id="risks" className="mb-14 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-200 dark:border-rose-800">
            Оценка угроз
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Probability & Impact Matrix
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('scatter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'scatter'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Scatter Chart</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Реестр угроз ({filteredRisks.length})</span>
          </button>
          <button
            onClick={() => setViewMode('mitigation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'mitigation'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>План митигации</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Матрица рисков и внешних угроз
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl mt-1">
            Комплексный анализ 10 внешних регуляторных, рыночных, технологических и операционных барьеров для СмИТ Биллинг с расчетом индекса критичности и готовым планом нейтрализации.
          </p>
        </div>

        {/* Toggle: Show Mitigated vs Raw Risks */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-850 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
          <div className="text-left">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Эффект митигации</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {showMitigated ? 'Показан остаточный риск' : 'Исходный уровень угроз'}
            </p>
          </div>
          <button
            onClick={() => setShowMitigated(!showMitigated)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden ${
              showMitigated ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label="Переключить учет мер митигации"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showMitigated ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Всего угроз в реестре</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.total} <span className="text-xs font-normal text-slate-500">факторов</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            4 категории: Закон, Рынок, Стек, Операции
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">Красная зона (Критические)</span>
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-700 dark:text-rose-400">
            {stats.criticalCount} <span className="text-xs font-normal text-rose-600/80">угрозы</span>
          </div>
          <p className="text-[11px] text-rose-600/90 dark:text-rose-400/90 mt-1">
            СОРМ-3 сертификация и Инерция CTO
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Средний Risk Score</span>
            <Target className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${showMitigated ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
              {showMitigated ? stats.avgScoreMitigated : stats.avgScoreRaw}
            </span>
            <span className="text-xs text-slate-400 line-through">
              {showMitigated ? `${stats.avgScoreRaw}` : ''}
            </span>
            <span className="text-xs font-medium text-slate-500">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {showMitigated ? 'С учетом защитных мер Build 2405' : 'Базовый уровень риска до внедрения мер'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Эффективность защиты</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
            -{stats.mitigationEfficiency}% <span className="text-xs font-normal text-emerald-600/80">снижение</span>
          </div>
          <p className="text-[11px] text-emerald-600/90 dark:text-emerald-400/90 mt-1">
            Благодаря Dual-run, On-premise AI и SMS-шлюзу
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Категория:
        </span>
        <button
          onClick={() => setSelectedCategoryId('all')}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
            selectedCategoryId === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Все ({THREAT_RISKS_DATA.length})
        </button>

        {(['regulatory', 'market', 'technical', 'operational'] as RiskCategory[]).map((cat) => {
          const count = THREAT_RISKS_DATA.filter((r) => r.category === cat).length;
          const conf = CATEGORY_CONFIG[cat];
          const Icon = conf.icon;
          const isActive = selectedCategoryId === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategoryId(cat)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{conf.label}</span>
              <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
          Уровень:
        </span>
        {(['all', 'critical', 'high', 'medium', 'low'] as const).map((lvl) => {
          const isActive = selectedLevelId === lvl;
          const label = lvl === 'all' ? 'Все уровни' : LEVEL_CONFIG[lvl].label.split(' ')[0];
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevelId(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* VIEW 1: SCATTER CHART MATRIX & DETAIL PANEL */}
      {viewMode === 'scatter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Scatter Chart Card (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    Диаграмма рассеяния: Вероятность vs Влияние
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Нажмите на точку для детального разбора угрозы и плана нейтрализации
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Критический
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block ml-1" /> Высокий
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block ml-1" /> Средний
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ml-1" /> Низкий
                </div>
              </div>

              {/* Responsive Scatter Chart */}
              <div className="h-[380px] sm:h-[420px] w-full relative">
                {/* Background Quadrant Watermarks / Colored zones */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none p-5 pl-12 pb-10 z-0">
                  {/* Top-Left: High Impact (Orange) */}
                  <div className="bg-orange-500/[0.03] dark:bg-orange-500/[0.05] rounded-tl-xl p-3 border-r border-b border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      Высокое влияние / Низкая вер-ть
                    </span>
                  </div>
                  {/* Top-Right: Critical (Red) */}
                  <div className="bg-rose-500/[0.05] dark:bg-rose-500/[0.08] rounded-tr-xl p-3 border-b border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-between items-end text-right">
                    <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Зона критического риска
                    </span>
                  </div>
                  {/* Bottom-Left: Low Risk (Green) */}
                  <div className="bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] rounded-bl-xl p-3 border-r border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Низкий приоритет
                    </span>
                  </div>
                  {/* Bottom-Right: High Probability (Yellow) */}
                  <div className="bg-amber-500/[0.03] dark:bg-amber-500/[0.05] rounded-br-xl p-3 flex flex-col justify-end items-end text-right">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Высокая вер-ть / Умеренное влияние
                    </span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, bottom: 30, left: 10 }}
                  >
                    {/* Dividing threshold lines */}
                    <ReferenceLine
                      x={50}
                      stroke="#94a3b8"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      opacity={0.6}
                    />
                    <ReferenceLine
                      y={50}
                      stroke="#94a3b8"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      opacity={0.6}
                    />

                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Вероятность"
                      unit="%"
                      domain={[0, 100]}
                      tickCount={6}
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                      label={{
                        value: 'Вероятность возникновения (Probability, %)',
                        position: 'insideBottom',
                        offset: -18,
                        fill: '#64748b',
                        fontSize: 11,
                        fontWeight: 600
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Влияние"
                      unit="%"
                      domain={[0, 100]}
                      tickCount={6}
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                      label={{
                        value: 'Влияние на бизнес / Ущерб (Impact, %)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 5,
                        fill: '#64748b',
                        fontSize: 11,
                        fontWeight: 600
                      }}
                    />
                    <ZAxis type="number" dataKey="z" range={[200, 650]} />

                    <Tooltip
                      cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as ThreatRisk & { displayScore: string };
                          return (
                            <div className="bg-slate-900/95 dark:bg-slate-800/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 backdrop-blur-md max-w-xs text-xs animate-in fade-in duration-150">
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="font-mono font-bold text-[11px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                                  {data.code}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                                  {data.categoryLabel}
                                </span>
                              </div>
                              <h4 className="font-bold text-sm text-white mb-1.5 leading-snug">
                                {data.name}
                              </h4>
                              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-700/60 my-2 text-center">
                                <div>
                                  <div className="text-[10px] text-slate-400">Вероятность</div>
                                  <div className="font-bold text-slate-200">{data.probability}%</div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-400">Влияние</div>
                                  <div className="font-bold text-slate-200">{data.impact}%</div>
                                </div>
                                <div>
                                  <div className="text-[10px] text-slate-400">Risk Score</div>
                                  <div className="font-extrabold text-amber-400">{data.displayScore}</div>
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-300 line-clamp-2">
                                {data.description}
                              </p>
                              <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                <ShieldCheck className="w-3 h-3" /> Нажмите для плана защиты
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />

                    <Scatter
                      name="Threats"
                      data={scatterData}
                      onClick={(point) => setSelectedRiskId(point.id)}
                      className="cursor-pointer"
                    >
                      {scatterData.map((entry) => {
                        const isSelected = entry.id === selectedRiskId;
                        return (
                          <Cell
                            key={`cell-${entry.id}`}
                            fill={entry.pointColor}
                            stroke={isSelected ? '#ffffff' : '#ffffff'}
                            strokeWidth={isSelected ? 3.5 : 1.5}
                            className="transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer"
                            style={{
                              filter: isSelected ? 'drop-shadow(0px 0px 8px rgba(239, 68, 68, 0.7))' : 'none'
                            }}
                          />
                        );
                      })}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>

                {/* Quadrant Watermark Labels */}
                <div className="absolute top-6 right-6 text-right pointer-events-none select-none opacity-40 dark:opacity-30">
                  <div className="text-[11px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                    🔴 Критическая зона
                  </div>
                  <div className="text-[9px] text-slate-500">Высокая вероятность & Ущерб</div>
                </div>

                <div className="absolute top-6 left-12 pointer-events-none select-none opacity-40 dark:opacity-30">
                  <div className="text-[11px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    🟠 Зона бдительности
                  </div>
                  <div className="text-[9px] text-slate-500">Высокий ущерб / Низкая вер.</div>
                </div>

                <div className="absolute bottom-12 right-6 text-right pointer-events-none select-none opacity-40 dark:opacity-30">
                  <div className="text-[11px] font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                    🟡 Операционные риски
                  </div>
                  <div className="text-[9px] text-slate-500">Высокая вер. / Низкий ущерб</div>
                </div>

                <div className="absolute bottom-12 left-12 pointer-events-none select-none opacity-40 dark:opacity-30">
                  <div className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    🟢 Контролируемая зона
                  </div>
                  <div className="text-[9px] text-slate-500">Низкий риск / Принятие</div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Selector Pills */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Быстрый выбор:</span>
              {THREAT_RISKS_DATA.map((risk) => {
                const isSelected = risk.id === selectedRiskId;
                return (
                  <button
                    key={risk.id}
                    onClick={() => setSelectedRiskId(risk.id)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 scale-105 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {risk.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Dive Threat Detail Card (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              {/* Card Header with Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {selectedRisk.code}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${CATEGORY_CONFIG[selectedRisk.category].badge}`}>
                    {selectedRisk.categoryLabel}
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${LEVEL_CONFIG[selectedRisk.level].badge}`}>
                  {selectedRisk.levelLabel}
                </span>
              </div>

              {/* Threat Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
                {selectedRisk.name}
              </h3>

              {/* Gauge Metrics (Probability, Impact, Risk Score) */}
              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Вероятность</div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedRisk.probability}%
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${selectedRisk.probability}%` }} />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Влияние</div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedRisk.impact}%
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${selectedRisk.impact}%` }} />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Risk Index</div>
                  <div className="text-base sm:text-lg font-black text-red-600 dark:text-red-400 mt-0.5">
                    {selectedRisk.riskScore} <span className="text-[10px] font-normal text-slate-400">/ 100</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${selectedRisk.riskScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Description & Impact */}
              <div className="space-y-3 mb-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400" /> Суть угрозы:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedRisk.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Возможные последствия:
                  </h4>
                  <p className="text-xs text-rose-900/80 dark:text-rose-300/80 leading-relaxed">
                    {selectedRisk.consequences}
                  </p>
                </div>
              </div>

              {/* Mitigation Strategy */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Стратегия нейтрализации (Mitigation):
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                  {selectedRisk.mitigationStrategy}
                </p>
              </div>

              {/* Preventive Actions in Build 2405 */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Готовность мер в Build 2405:
                </h4>
                <ul className="space-y-1.5">
                  {selectedRisk.preventiveActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Контур:</span> {selectedRisk.owner}
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Сроки:</span> {selectedRisk.timeline}
                </div>
                <div className="col-span-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <span className="font-semibold">Остаточный риск:</span> {selectedRisk.residualRisk}
                </div>
              </div>
            </div>

            {/* Contextual Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {selectedRisk.id === 'risk-sorm' && onOpenSormDrawer && (
                <button
                  onClick={onOpenSormDrawer}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Чек-лист сертификации СОРМ-3</span>
                </button>
              )}

              {(selectedRisk.id === 'risk-cto-inertia' || selectedRisk.id === 'risk-competitor-dumping') && onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Открыть калькулятор окупаемости</span>
                </button>
              )}

              {onOpenAiAssistant && (
                <button
                  onClick={onOpenAiAssistant}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                  title="Задать вопрос AI-стратегу по этой угрозе"
                >
                  <Bot className="w-4 h-4 text-emerald-500" />
                  <span>AI анализ</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RISK REGISTRY GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredRisks.map((risk) => {
            const isSelected = risk.id === selectedRiskId;
            return (
              <div
                key={risk.id}
                onClick={() => {
                  setSelectedRiskId(risk.id);
                  setViewMode('scatter');
                }}
                className={`p-5 rounded-[24px] bg-white dark:bg-slate-900 border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between group ${
                  isSelected
                    ? 'border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                      {risk.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${LEVEL_CONFIG[risk.level].badge}`}>
                      {risk.levelLabel.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {risk.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                    {risk.description}
                  </p>
                </div>

                <div>
                  {/* Mini metrics bar */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-center mb-3">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Вероятность</div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{risk.probability}%</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Влияние</div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{risk.impact}%</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase font-bold">Score</div>
                      <div className="text-xs font-black text-red-600 dark:text-red-400">{risk.riskScore}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Защита готова
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-400 group-hover:text-emerald-500 transition-colors">
                      Разбор <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 3: FULL MITIGATION ACTION PLAN TABLE */}
      {viewMode === 'mitigation' && (
        <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Сводный план нейтрализации рисков и превентивных мер
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                10 регламентов защиты ядра биллинга, финансовых шлюзов и коммерческой модели
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              Build 2405: 87% мер внедрено
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Код</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Угроза / Фактор риска</th>
                  <th className="py-3.5 px-3 text-center">Score (P×I)</th>
                  <th className="py-3.5 px-4 min-w-[280px]">Стратегия митигации</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Превентивные меры Build 2405</th>
                  <th className="py-3.5 px-3">Сроки</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredRisks.map((risk) => (
                  <tr
                    key={risk.id}
                    onClick={() => {
                      setSelectedRiskId(risk.id);
                      setViewMode('scatter');
                    }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {risk.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white mb-0.5">{risk.name}</div>
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${CATEGORY_CONFIG[risk.category].badge}`}>
                        {risk.categoryLabel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-black text-red-600 dark:text-red-400 font-mono text-sm">
                        {risk.riskScore}
                      </span>
                      <div className="text-[10px] text-slate-400">P:{risk.probability}% I:{risk.impact}%</div>
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed text-slate-600 dark:text-slate-300">
                      {risk.mitigationStrategy}
                    </td>
                    <td className="py-3.5 px-4">
                      <ul className="space-y-1">
                        {risk.preventiveActions.map((act, i) => (
                          <li key={i} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1">
                            <span className="text-emerald-500 font-bold">✓</span> {act}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3.5 px-3 text-[11px] font-medium text-slate-500 whitespace-nowrap">
                      {risk.timeline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strategic Risk Insights Callout Box */}
      <div className="mt-6 p-5 sm:p-6 rounded-[28px] bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              Главный стратегический вывод
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Внешние риски не носят непреодолимый характер для СмИТ Биллинг
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Критический риск СОРМ-3 обходится работой через сертифицированные аппаратные съемники партнеров (Норси-Транс / МФИ Софт) и фокусом на ICP1/ICP2. Инерция CTO нивелируется безопасным Dual-run режимом без остановки сети.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onOpenSormDrawer && (
            <button
              onClick={onOpenSormDrawer}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
            >
              Схема СОРМ-3
            </button>
          )}
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs"
            >
              Калькулятор ROI
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
