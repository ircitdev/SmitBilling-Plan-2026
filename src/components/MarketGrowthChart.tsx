import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  ComposedChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Users, 
  DollarSign, 
  Info,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { MARKET_GROWTH_DATA } from '../data/strategicData';

type ChartViewMode = 'revenue' | 'operators' | 'tech_adoption' | 'smit_growth';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  viewMode: ChartViewMode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, viewMode }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs max-w-xs">
      <div className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
        <span>Период: {label}</span>
        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
          3-летний прогноз
        </span>
      </div>

      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          let formattedValue = `${entry.value}`;
          if (viewMode === 'revenue') {
            formattedValue = `${entry.value.toFixed(2)} млрд ₽`;
          } else if (viewMode === 'operators') {
            formattedValue = `${entry.value.toLocaleString('ru-RU')} ISP`;
          } else if (viewMode === 'tech_adoption') {
            formattedValue = `${entry.value}%`;
          } else if (viewMode === 'smit_growth') {
            formattedValue = `${entry.value} провайдеров`;
          }

          return (
            <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate">{entry.name}</span>
              </div>
              <span className="font-bold font-mono text-slate-900 dark:text-white shrink-0">
                {formattedValue}
              </span>
            </div>
          );
        })}
      </div>

      {viewMode === 'revenue' && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
          <Target className="w-3 h-3" /> Small (ICP) — ключевой драйвер роста (+20.6% CAGR)
        </div>
      )}
    </div>
  );
};

export const MarketGrowthChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<ChartViewMode>('revenue');

  // Strategic KPI calculations from data
  const baseYear = MARKET_GROWTH_DATA[0]; // 2026
  const targetYear = MARKET_GROWTH_DATA[MARKET_GROWTH_DATA.length - 1]; // 2029

  const smallRevenueGrowthPct = Math.round(((targetYear.smallVolume - baseYear.smallVolume) / baseYear.smallVolume) * 100);
  const totalMarketGrowthPct = Math.round(((targetYear.totalVolume - baseYear.totalVolume) / baseYear.totalVolume) * 100);
  const aiGrowthDelta = targetYear.aiAdoptionPct - baseYear.aiAdoptionPct;

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-10 transition-all">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Стратегическое планирование · Прогноз на 3 года
            </span>
            <span className="text-[11px] font-semibold text-slate-500 font-mono">
              2026 → 2029
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Динамика роста сегментов рынка ISP в РФ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Обоснование фокуса на сегменте <strong>Small (500–5 000 абонентов)</strong>, темпах импортозамещения legacy-биллингов и проникновении AI-модулей.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 self-start lg:self-center overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setViewMode('revenue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              viewMode === 'revenue'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Выручка (млрд ₽)
          </button>

          <button
            type="button"
            onClick={() => setViewMode('operators')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              viewMode === 'operators'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-500" /> Операторы (ISP)
          </button>

          <button
            type="button"
            onClick={() => setViewMode('tech_adoption')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              viewMode === 'tech_adoption'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI & СОРМ-3 (%)
          </button>

          <button
            type="button"
            onClick={() => setViewMode('smit_growth')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              viewMode === 'smit_growth'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600" /> Таргет СмИТ
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="pt-6 pb-2">
        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'revenue' ? (
              <ComposedChart data={MARKET_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tickLine={false} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  unit=" млрд" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  domain={[0, 10]}
                />
                <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '8px' }}
                />
                <Bar dataKey="smallVolume" name="Small (500–5k) [ICP СмИТ]" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="mediumVolume" name="Medium (5k–30k)" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="largeVolume" name="Large & Tier-1 (30k+)" stackId="a" fill="#64748b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="microVolume" name="Micro (<500)" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Line 
                  type="monotone" 
                  dataKey="totalVolume" 
                  name="Весь рынок (млрд ₽)" 
                  stroke="#059669" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#059669', strokeWidth: 2, stroke: '#ffffff' }} 
                />
              </ComposedChart>
            ) : viewMode === 'operators' ? (
              <BarChart data={MARKET_GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tickLine={false} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  domain={[0, 2200]}
                />
                <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '8px' }}
                />
                <Bar dataKey="smallOperatorsCount" name="Small ISP (500–5k) [Рост]" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="mediumOperatorsCount" name="Medium ISP (5k–30k)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="microOperatorsCount" name="Micro ISP (<500) [Спад/M&A]" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : viewMode === 'tech_adoption' ? (
              <ComposedChart data={MARKET_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tickLine={false} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  unit="%" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="aiAdoptionPct" 
                  name="Проникновение AI-биллинга (%)" 
                  fill="#f59e0b" 
                  stroke="#d97706" 
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="sormCompliantPct" 
                  name="Доля операторов с СОРМ-3 сертификацией (%)" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                />
              </ComposedChart>
            ) : (
              <ComposedChart data={MARKET_GROWTH_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  tickLine={false} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  domain={[0, 400]}
                />
                <Tooltip content={<CustomTooltip viewMode={viewMode} />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="smitProjectedClients" 
                  name="Целевая клиентская база СмИТ Биллинг (ISP)" 
                  fill="#10b981" 
                  stroke="#059669" 
                  fillOpacity={0.25}
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="smitProjectedClients" 
                  name="План подключения операторов" 
                  stroke="#047857" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Insight Takeaway Cards supporting Strategic Planning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-6 border-t border-slate-100 dark:border-slate-800">
        {/* Card 1: Small Segment Outperformance */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                Целевой Sweet Spot
              </span>
              <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400">
                +{smallRevenueGrowthPct}% к 2029
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              Сегмент Small: 1.68 → 2.95 млрд ₽
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Малые операторы (500–5 000) растут быстрее всех (+20.6% CAGR) из-за миграции с нелегальных/самописных скриптов и устаревших Carbon 4/Mikbill.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            Опора для рекомендации #2 и #8 <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 2: AI Disruption */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                AI-революция в телекоме
              </span>
              <span className="text-xs font-mono font-black text-amber-700 dark:text-amber-400">
                +{aiGrowthDelta}% за 3 года
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              Проникновение AI: 15% → 78%
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Операторы требуют встроенных AI-ботов и автоматизацию тикетов для сокращения затрат на 1-ю линию поддержки на 60–70%.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-800/60 text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
            Опора для рекомендации #1 и #6 <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

        {/* Card 3: Regulatory Compliance Driver */}
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Регуляторный барьер
              </span>
              <span className="text-xs font-mono font-black text-blue-700 dark:text-blue-400">
                98% к 2029
              </span>
            </div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              СОРМ-3 и 54-ФЗ как обязательный триггер
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ужесточение проверок РКН/ФСБ делает биллинг без сертифицированного СОРМ-3 нежизнеспособным, стимулируя переход на СмИТ.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-200/60 dark:border-blue-800/60 text-[11px] font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
            Опора для рекомендации #4 и #7 <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
