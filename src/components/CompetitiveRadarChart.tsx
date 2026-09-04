import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import { 
  Radar as RadarIcon, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight, 
  Target, 
  Zap, 
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { COMPETITIVE_RADAR_DATA } from '../data/strategicData';
import { CompetitiveRadarMetric } from '../types';

type CompareTarget = 'benchmark' | 'carbon' | 'hydra' | 'target2027';
type DimensionFilter = 'all' | 'strengths' | 'weaknesses';

interface CompetitiveRadarChartProps {
  initialFilter?: DimensionFilter;
  variant?: 'strengths' | 'weaknesses' | 'comprehensive';
  onOpenSormDrawer?: () => void;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: CompetitiveRadarMetric;
  }>;
}

const CustomRadarTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0]?.payload;
  if (!data) return null;

  const smitVal = data.smitScore;
  const compareEntry = payload.find(p => p.name !== 'СмИТ Биллинг');
  const compareVal = compareEntry ? compareEntry.value : data.benchmarkScore;
  const delta = smitVal - compareVal;

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs max-w-xs sm:max-w-sm z-50">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
          {data.dimension}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 ${
          data.category === 'strength'
            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`}>
          {data.category === 'strength' ? 'Сильная сторона' : 'Зона роста (Gap)'}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <strong>СмИТ Биллинг:</strong>
          </span>
          <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
            {smitVal} / 100
          </span>
        </div>

        {compareEntry && (
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: compareEntry.color }} />
              <span>{compareEntry.name}:</span>
            </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {compareVal} / 100
            </span>
          </div>
        )}

        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Разрыв (Delta):</span>
          <span className={`font-mono font-bold ${delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {delta >= 0 ? `+${delta} п.п.` : `${delta} п.п.`}
          </span>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/70 p-2 rounded-xl text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white mb-0.5">{data.smitAdvantage}</p>
      </div>
    </div>
  );
};

export const CompetitiveRadarChart: React.FC<CompetitiveRadarChartProps> = ({
  initialFilter = 'all',
  variant = 'comprehensive',
  onOpenSormDrawer
}) => {
  const [filter, setFilter] = useState<DimensionFilter>(initialFilter);
  const [compareTarget, setCompareTarget] = useState<CompareTarget>('benchmark');
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  // Filtered dataset
  const chartData = useMemo(() => {
    if (filter === 'strengths') {
      return COMPETITIVE_RADAR_DATA.filter(d => d.category === 'strength');
    }
    if (filter === 'weaknesses') {
      return COMPETITIVE_RADAR_DATA.filter(d => d.category === 'weakness');
    }
    return COMPETITIVE_RADAR_DATA;
  }, [filter]);

  // Selected item details for deep-dive panel
  const activeMetric = useMemo(() => {
    if (selectedDimension) {
      return COMPETITIVE_RADAR_DATA.find(d => d.dimension === selectedDimension || d.dimensionShort === selectedDimension);
    }
    return chartData[0];
  }, [selectedDimension, chartData]);

  // Comparison labels and keys
  const compareConfig = useMemo(() => {
    switch (compareTarget) {
      case 'carbon':
        return { dataKey: 'carbonScore', name: 'Carbon Soft (Лидер)', color: '#3b82f6' };
      case 'hydra':
        return { dataKey: 'hydraScore', name: 'Hydra Billing (Enterprise)', color: '#8b5cf6' };
      case 'target2027':
        return { dataKey: 'target2027', name: 'Целевой СмИТ 2027', color: '#06b6d4' };
      case 'benchmark':
      default:
        return { dataKey: 'benchmarkScore', name: 'Среднерыночный Benchmark (Legacy)', color: '#94a3b8' };
    }
  }, [compareTarget]);

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 transition-all">
      {/* Header with Title and Mode Switchers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <RadarIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Радар конкурентного позиционирования
            </span>
            <span className="text-[11px] font-semibold text-slate-500 font-mono">
              Build 2405 vs Рынок РФ
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {variant === 'strengths'
              ? 'Профиль преимуществ: СмИТ vs Традиционные биллинги'
              : variant === 'weaknesses'
              ? 'Gap-анализ и точки сокращения отставания'
              : 'Многомерный радар: СмИТ Биллинг vs Индустриальный бенчмарк'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Наглядная оценка по 8 ключевым осям: где СмИТ совершает технологический отрыв (+76 п.п. в AI и UX), и где требуются инвестиции (СОРМ-3 и масштабирование).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          {/* Dimension Filter Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Все 8 осей
            </button>
            <button
              type="button"
              onClick={() => setFilter('strengths')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filter === 'strengths'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
              }`}
            >
              <Sparkles className="w-3 h-3" /> Сильные (5)
            </button>
            <button
              type="button"
              onClick={() => setFilter('weaknesses')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                filter === 'weaknesses'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
              }`}
            >
              <ShieldAlert className="w-3 h-3" /> Gap / Риски (3)
            </button>
          </div>

          {/* Benchmark Target Selector */}
          <div className="relative">
            <select
              value={compareTarget}
              onChange={(e) => setCompareTarget(e.target.value as CompareTarget)}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="benchmark">Сравнить: Среднерыночный бенчмарк</option>
              <option value="carbon">Сравнить: Carbon Soft (Лидер Small/Med)</option>
              <option value="hydra">Сравнить: Hydra Billing (Enterprise)</option>
              <option value="target2027">Сравнить: Целевой СмИТ 2027</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar on Left, Interactive Metric Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 pb-2">
        {/* Left: Radar Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                cx="50%" 
                cy="50%" 
                outerRadius="75%" 
                data={chartData}
                onClick={(e) => {
                  if (e && e.activeLabel) {
                    setSelectedDimension(e.activeLabel);
                  }
                }}
              >
                <PolarGrid stroke="#cbd5e1" className="dark:stroke-slate-700/80" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="dimensionShort" 
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                  className="cursor-pointer"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#94a3b8', fontSize: 9 }} 
                  stroke="#cbd5e1"
                  className="dark:stroke-slate-700"
                />
                
                <Tooltip content={<CustomRadarTooltip />} />
                
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />

                {/* SmIT Billing Polygon (Emerald) */}
                <Radar
                  name="СмИТ Биллинг"
                  dataKey="smitScore"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.45}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 1.5, stroke: '#ffffff' }}
                />

                {/* Comparison Target Polygon */}
                <Radar
                  name={compareConfig.name}
                  dataKey={compareConfig.dataKey}
                  stroke={compareConfig.color}
                  fill={compareConfig.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3.5, fill: compareConfig.color, strokeWidth: 1, stroke: '#ffffff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1 text-center">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            <span>Нажмите на вершину или ось радара для детального анализа параметра</span>
          </div>
        </div>

        {/* Right: Dimension Drilldown and High-Level Insights */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Active Selected Dimension Card */}
          {activeMetric && (
            <div className={`p-5 rounded-[26px] border transition-all ${
              activeMetric.category === 'strength'
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                  activeMetric.category === 'strength'
                    ? 'text-emerald-800 dark:text-emerald-300'
                    : 'text-rose-800 dark:text-rose-300'
                }`}>
                  {activeMetric.category === 'strength' ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Безоговорочное лидерство (+{(activeMetric.smitScore - activeMetric.benchmarkScore)} п.п.)
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      Зона отставания ({activeMetric.smitScore - activeMetric.benchmarkScore} п.п.)
                    </>
                  )}
                </span>

                <span className="font-mono text-xs font-black text-slate-700 dark:text-slate-300">
                  СмИТ: {activeMetric.smitScore}/100
                </span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-1.5">
                {activeMetric.dimension}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {activeMetric.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">В СмИТ Биллинг:</strong>
                  <span className="text-slate-700 dark:text-slate-300">{activeMetric.smitAdvantage}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-slate-500 block mb-0.5">Традиционный рынок:</strong>
                  <span className="text-slate-600 dark:text-slate-400">{activeMetric.marketReality}</span>
                </div>
              </div>

              {activeMetric.dimensionShort.includes('СОРМ') && onOpenSormDrawer && (
                <button
                  type="button"
                  onClick={onOpenSormDrawer}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Target className="w-3.5 h-3.5" />
                  Открыть чеклист сертификации СОРМ-3
                </button>
              )}
            </div>
          )}

          {/* Quick Axis Switcher Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Быстрый выбор параметров:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COMPETITIVE_RADAR_DATA.map((metric) => (
                <button
                  key={metric.dimensionShort}
                  type="button"
                  onClick={() => setSelectedDimension(metric.dimensionShort)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    (activeMetric?.dimensionShort === metric.dimensionShort)
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                      : metric.category === 'strength'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
                      : 'bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/80 hover:bg-rose-100'
                  }`}
                >
                  {metric.dimensionShort}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Summary Footer Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white">
              Технологический отрыв (+76%)
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
              AI, омниканальность и современный UX создают непреодолимый барьер для старых систем.
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white">
              Главный блокер: СОРМ-3 (-34%)
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
              Сертификат ЦНИИС откроет доступ к 410+ операторам сегмента Medium (5k–30k абонентов).
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white">
              Цель 2027: 85+ баллов
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
              Сбалансированный профиль без слабых мест за счет партнерской сети и сертификата связи.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
