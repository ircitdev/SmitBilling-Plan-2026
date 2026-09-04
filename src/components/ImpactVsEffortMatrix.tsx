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
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import {
  Zap,
  Target,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Filter,
  CheckCircle2,
  ListFilter,
  BarChart3,
  Layers,
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';
import { RECOMMENDATIONS } from '../data/strategicData';
import { Recommendation, RecommendationStatus } from '../types';

interface ImpactVsEffortMatrixProps {
  onSelectRecommendation: (reco: Recommendation) => void;
  statuses?: Record<string, RecommendationStatus>;
  onUpdateStatus?: (id: string, status: RecommendationStatus) => void;
}

type QuadrantFilter = 'all' | 'quick_wins' | 'major_projects' | 'fill_ins' | 'thankless';
type ViewMode = 'matrix' | 'quadrants' | 'roi_ranking';

interface MatrixItem extends Recommendation {
  x: number; // Effort score
  y: number; // Impact score
  z: number; // Bubble size (ROI / priority weighting)
  status: RecommendationStatus;
}

// Quadrant configurations
const QUADRANTS_CONFIG = {
  quick_wins: {
    id: 'quick_wins',
    title: 'Быстрые победы (Quick Wins)',
    shortTitle: 'Быстрые победы',
    subtitle: 'Высокое влияние при умеренной сложности',
    action: 'Делать в первую очередь (High ROI)',
    color: '#10b981', // emerald-500
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    bgTint: 'rgba(16, 185, 129, 0.05)',
    icon: Zap,
    xRange: [0, 50],
    yRange: [50, 100]
  },
  major_projects: {
    id: 'major_projects',
    title: 'Стратегические ставки (Major Projects)',
    shortTitle: 'Стратегические ставки',
    subtitle: 'Высокое влияние, требуют значительных ресурсов',
    action: 'Тщательное планирование и поэтапный запуск',
    color: '#3b82f6', // blue-500
    badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    bgTint: 'rgba(59, 130, 246, 0.05)',
    icon: Target,
    xRange: [50, 100],
    yRange: [50, 100]
  },
  fill_ins: {
    id: 'fill_ins',
    title: 'Тактические доработки (Fill-ins)',
    shortTitle: 'Тактические доработки',
    subtitle: 'Умеренное влияние при низкой сложности',
    action: 'Выполнять параллельно в фоновом режиме',
    color: '#8b5cf6', // purple-500
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    bgTint: 'rgba(139, 92, 246, 0.04)',
    icon: Layers,
    xRange: [0, 50],
    yRange: [0, 50]
  },
  thankless: {
    id: 'thankless',
    title: 'Отложенные задачи (Deferred)',
    shortTitle: 'Отложенные задачи',
    subtitle: 'Высокая сложность при отложенном эффекте',
    action: 'Отложить до масштабирования (10+ клиентов)',
    color: '#f59e0b', // amber-500
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    bgTint: 'rgba(245, 158, 11, 0.04)',
    icon: Clock,
    xRange: [50, 100],
    yRange: [0, 50]
  }
};

// Custom Scatter Node Component
const CustomScatterNode = (props: any) => {
  const { cx, cy, payload, hoveredId, selectedId } = props;
  if (typeof cx !== 'number' || typeof cy !== 'number') return null;

  const isHovered = hoveredId === payload.id;
  const isSelected = selectedId === payload.id;
  const isDone = payload.status === 'completed';
  const isInProgress = payload.status === 'in-progress';

  // Determine node color by quadrant
  let baseColor = '#10b981';
  if (payload.quadrant === 'major_projects') baseColor = '#3b82f6';
  else if (payload.quadrant === 'fill_ins') baseColor = '#8b5cf6';
  else if (payload.quadrant === 'thankless') baseColor = '#f59e0b';

  const radius = isHovered || isSelected ? 22 : 18;

  return (
    <g className="cursor-pointer transition-all duration-200">
      {/* Outer halo on hover/select */}
      {(isHovered || isSelected) && (
        <circle
          cx={cx}
          cy={cy}
          r={radius + 8}
          fill={baseColor}
          opacity={0.25}
          className="animate-pulse"
        />
      )}

      {/* Main Node Background */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={isDone ? '#10b981' : isInProgress ? '#f59e0b' : baseColor}
        stroke="#ffffff"
        strokeWidth={2.5}
        className="filter drop-shadow-md"
      />

      {/* Done Checkmark or Rank Number */}
      {isDone ? (
        <path
          d={`M ${cx - 3.4} ${cy} l 2.6 2.8 l 4.8 -5.6`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={10}
          fontWeight="bold"
          fontFamily="monospace"
        >
          #{payload.rank}
        </text>
      )}

      {/* Mini label when hovered or top priority */}
      {(isHovered || payload.rank <= 3) && (
        <g pointerEvents="none">
          <rect
            x={cx - 45}
            y={cy - radius - 20}
            width={90}
            height={16}
            rx={4}
            fill="rgba(15, 23, 42, 0.85)"
          />
          <text
            x={cx}
            y={cy - radius - 8}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={9}
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {payload.rankLabel || `Приоритет #${payload.rank}`}
          </text>
        </g>
      )}
    </g>
  );
};

export const ImpactVsEffortMatrix: React.FC<ImpactVsEffortMatrixProps> = ({
  onSelectRecommendation,
  statuses = {},
  onUpdateStatus
}) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('matrix');

  // Prepare matrix data with fallback coordinates and computed ROI
  const matrixData: MatrixItem[] = useMemo(() => {
    return RECOMMENDATIONS.map((reco) => {
      const currentStatus = statuses[reco.id] || (reco.done ? 'completed' : 'planned');
      const x = reco.effortScore ?? 50;
      const y = reco.impactScore ?? 75;
      const roi = reco.roiRatio ?? (x > 0 ? Number((y / x).toFixed(2)) : 1);

      return {
        ...reco,
        x,
        y,
        z: Math.max(10, Math.min(30, roi * 8)),
        status: currentStatus
      };
    });
  }, [statuses]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    matrixData.forEach(item => {
      if (item.categoryTag) set.add(item.categoryTag);
    });
    return Array.from(set);
  }, [matrixData]);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return matrixData.filter(item => {
      const matchQuadrant = selectedQuadrant === 'all' || item.quadrant === selectedQuadrant;
      const matchCategory = selectedCategory === 'all' || item.categoryTag === selectedCategory;
      return matchQuadrant && matchCategory;
    });
  }, [matrixData, selectedQuadrant, selectedCategory]);

  // Quadrant counts and stats
  const stats = useMemo(() => {
    const quickWins = matrixData.filter(i => i.quadrant === 'quick_wins');
    const majorProjects = matrixData.filter(i => i.quadrant === 'major_projects');
    const fillIns = matrixData.filter(i => i.quadrant === 'fill_ins');
    const thankless = matrixData.filter(i => i.quadrant === 'thankless');

    const completed = matrixData.filter(i => i.status === 'completed').length;
    const inProgress = matrixData.filter(i => i.status === 'in-progress').length;
    const planned = matrixData.filter(i => i.status === 'planned').length;

    const avgRoi = (matrixData.reduce((acc, i) => acc + (i.roiRatio || 1), 0) / matrixData.length).toFixed(2);

    return {
      quickWinsCount: quickWins.length,
      majorProjectsCount: majorProjects.length,
      fillInsCount: fillIns.length,
      thanklessCount: thankless.length,
      completed,
      inProgress,
      planned,
      avgRoi
    };
  }, [matrixData]);

  // Custom Matrix Tooltip
  const CustomMatrixTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const item: MatrixItem = payload[0]?.payload;
    if (!item) return null;

    const qConfig = QUADRANTS_CONFIG[item.quadrant as keyof typeof QUADRANTS_CONFIG] || QUADRANTS_CONFIG.quick_wins;
    const QIcon = qConfig.icon;

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-xs max-w-sm z-50 pointer-events-auto">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              #{item.rank}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${qConfig.badgeClass}`}>
              <QIcon className="w-3 h-3" />
              {qConfig.shortTitle}
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            item.status === 'completed'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : item.status === 'in-progress'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
          }`}>
            {item.status === 'completed' ? 'Выполнено' : item.status === 'in-progress' ? 'В работе' : 'В планах'}
          </span>
        </div>

        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug mb-1.5">
          {item.title}
        </h4>

        <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2 mb-3">
          {item.summary}
        </p>

        {/* Scores & ROI Metrics */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 mb-3">
          <div>
            <div className="text-[10px] text-slate-500 font-medium">Влияние</div>
            <div className="text-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
              {item.y} <span className="text-[10px] text-slate-400">/ 100</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-medium">Сложность</div>
            <div className="text-sm font-mono font-extrabold text-slate-700 dark:text-slate-300">
              {item.x} <span className="text-[10px] text-slate-400">/ 100</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-medium">Индекс ROI</div>
            <div className="text-sm font-mono font-extrabold text-blue-600 dark:text-blue-400">
              {item.roiRatio ? `${item.roiRatio}x` : '—'}
            </div>
          </div>
        </div>

        {/* Budget & Team info */}
        {item.budget && (
          <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2">
            <span>Срок: <strong className="text-slate-800 dark:text-slate-200">{item.budget.time}</strong></span>
            <span>Бюджет: <strong className="text-slate-800 dark:text-slate-200">{item.budget.money}</strong></span>
          </div>
        )}

        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
          <span>Кликните для деталей</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Приоритезация · Матрица 2×2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              Средний ROI: {stats.avgRoi}x
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Матрица влияния и трудозатрат (Impact vs Effort)
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Координатная сетка 12 стратегических рекомендаций. Позволяет выявить <strong>«Быстрые победы»</strong> с максимальной отдачей и отделить их от долгосрочных инфраструктурных ставок.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl self-start lg:self-auto">
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'matrix'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Матрица 2×2
          </button>
          <button
            onClick={() => setViewMode('quadrants')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'quadrants'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            По квадрантам
          </button>
          <button
            onClick={() => setViewMode('roi_ranking')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'roi_ranking'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Рейтинг ROI
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center justify-between gap-3 py-4 flex-wrap border-b border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Квадрант:
          </span>
          <button
            onClick={() => setSelectedQuadrant('all')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              selectedQuadrant === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Все ({matrixData.length})
          </button>
          <button
            onClick={() => setSelectedQuadrant('quick_wins')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
              selectedQuadrant === 'quick_wins'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            <Zap className="w-3 h-3" /> Quick Wins ({stats.quickWinsCount})
          </button>
          <button
            onClick={() => setSelectedQuadrant('major_projects')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
              selectedQuadrant === 'major_projects'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
            }`}
          >
            <Target className="w-3 h-3" /> Стратегические ставки ({stats.majorProjectsCount})
          </button>
          <button
            onClick={() => setSelectedQuadrant('fill_ins')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
              selectedQuadrant === 'fill_ins'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60'
            }`}
          >
            <Layers className="w-3 h-3" /> Тактические ({stats.fillInsCount})
          </button>
          <button
            onClick={() => setSelectedQuadrant('thankless')}
            className={`px-3 py-1 rounded-full font-bold transition-all flex items-center gap-1 ${
              selectedQuadrant === 'thankless'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
            }`}
          >
            <Clock className="w-3 h-3" /> Отложенные ({stats.thanklessCount})
          </button>
        </div>

        {/* Category Tag filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold">Категория:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Фильтр по категории"
            className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Все категории ({categories.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'matrix' && (
        <div className="pt-6">
          {/* Scatter Chart */}
          <div className="relative w-full h-[480px] sm:h-[540px]">
            {/* Background Quadrant Watermarks / Labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none p-8 pl-14 pb-12 z-0 opacity-80">
              {/* Top-Left: Quick Wins */}
              <div className="bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] rounded-tl-2xl p-4 border-r border-b border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>БЫСТРЫЕ ПОБЕДЫ (QUICK WINS)</span>
                </div>
                <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/70 font-medium">
                  Высокий Impact / Низкий Effort · Делать в первую очередь
                </div>
              </div>

              {/* Top-Right: Major Projects */}
              <div className="bg-blue-500/[0.04] dark:bg-blue-500/[0.06] rounded-tr-2xl p-4 border-b border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-extrabold text-xs">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>СТРАТЕГИЧЕСКИЕ СТАВКИ (MAJOR BETS)</span>
                </div>
                <div className="text-[11px] text-blue-600/80 dark:text-blue-400/70 font-medium">
                  Высокий Impact / Высокий Effort · Фундамент масштаба
                </div>
              </div>

              {/* Bottom-Left: Fill-ins */}
              <div className="bg-purple-500/[0.03] dark:bg-purple-500/[0.05] rounded-bl-2xl p-4 border-r border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-extrabold text-xs">
                  <Layers className="w-4 h-4 text-purple-500" />
                  <span>ТАКТИЧЕСКИЕ УЛУЧШЕНИЯ (FILL-INS)</span>
                </div>
                <div className="text-[11px] text-purple-600/80 dark:text-purple-400/70 font-medium">
                  Умеренный Impact / Низкий Effort · Делать по мере сил
                </div>
              </div>

              {/* Bottom-Right: Thankless Tasks */}
              <div className="bg-amber-500/[0.03] dark:bg-amber-500/[0.05] rounded-br-2xl p-4 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-extrabold text-xs">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>⏳ ОТЛОЖЕННЫЕ ЗАДАЧИ (DEFERRED)</span>
                </div>
                <div className="text-[11px] text-amber-600/80 dark:text-amber-400/70 font-medium">
                  Низкий Impact / Высокий Effort · Отложить до 10+ клиентов
                </div>
              </div>
            </div>

            {/* Recharts Scatter Component */}
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 24, right: 32, bottom: 36, left: 16 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const item = e.activePayload[0].payload as MatrixItem;
                    onSelectRecommendation(item);
                  }
                }}
              >
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Трудозатраты (Effort)"
                  domain={[0, 100]}
                  tickCount={6}
                  unit=" п."
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  label={{
                    value: 'СЛОЖНОСТЬ / ТРУДОЗАТРАТЫ (EFFORT) →',
                    position: 'insideBottom',
                    offset: -18,
                    fill: '#64748b',
                    fontSize: 11,
                    fontWeight: 700
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Влияние (Impact)"
                  domain={[0, 100]}
                  tickCount={6}
                  unit=" п."
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  label={{
                    value: '← СТРАТЕГИЧЕСКОЕ ВЛИЯНИЕ (IMPACT)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 10,
                    fill: '#64748b',
                    fontSize: 11,
                    fontWeight: 700
                  }}
                />
                <ZAxis type="number" dataKey="z" range={[140, 480]} />

                {/* 50% Threshold Reference Lines */}
                <ReferenceLine x={50} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} />
                <ReferenceLine y={50} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} />

                <Tooltip content={<CustomMatrixTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }} />

                <Scatter
                  name="Рекомендации"
                  data={filteredData}
                  shape={(props: any) => (
                    <CustomScatterNode
                      {...props}
                      hoveredId={hoveredId}
                      selectedId={selectedId}
                    />
                  )}
                  onMouseEnter={(node: any) => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Legend and Quick Selector */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {filteredData.map((item) => {
              const isDone = item.status === 'completed';
              const isInProgress = item.status === 'in-progress';
              const isHovered = hoveredId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectRecommendation(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`p-2 rounded-xl text-left border transition-all duration-200 text-xs flex flex-col justify-between min-w-0 overflow-hidden hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:shadow-xs ${
                    isHovered
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm -translate-y-0.5'
                      : isDone
                      ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-400'
                      : isInProgress
                      ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 hover:border-amber-400'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:border-emerald-500/40 dark:hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono font-bold text-[11px] text-slate-800 dark:text-slate-200 shrink-0">
                      #{item.rank}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ROI {item.roiRatio}x
                    </span>
                  </div>
                  {/* две строки вместо обрезки в одну: на телефоне из «Найти 2–3
                      платных клиентов…» в одну строку не остаётся смысла */}
                  <div className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] leading-snug line-clamp-2 break-words">
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quadrants Breakdown View */}
      {viewMode === 'quadrants' && (
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {Object.entries(QUADRANTS_CONFIG).map(([key, config]) => {
            const items = matrixData.filter(i => i.quadrant === key);
            const Icon = config.icon;

            return (
              <div
                key={key}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`p-2 rounded-xl border ${config.badgeClass}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {config.title}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {items.length} {items.length === 1 ? 'задача' : items.length < 5 ? 'задачи' : 'задач'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {config.subtitle}
                  </p>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <strong>Правило:</strong> {config.action}
                  </div>

                  {/* List of items in this quadrant */}
                  <div className="space-y-2.5">
                    {items.map(item => {
                      const isDone = item.status === 'completed';
                      const isInProgress = item.status === 'in-progress';

                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectRecommendation(item)}
                          className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              #{item.rank}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>Impact: <strong className="text-emerald-600 dark:text-emerald-400">{item.y}</strong></span>
                                <span>·</span>
                                <span>Effort: <strong className="text-slate-700 dark:text-slate-300">{item.x}</strong></span>
                                <span>·</span>
                                <span>ROI: <strong className="text-blue-600 dark:text-blue-400">{item.roiRatio}x</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isDone ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                                Готово
                              </span>
                            ) : isInProgress ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                                В работе
                              </span>
                            ) : null}
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ROI Ranking View */}
      {viewMode === 'roi_ranking' && (
        <div className="pt-6">
          <div className="space-y-2.5">
            {[...matrixData]
              .sort((a, b) => (b.roiRatio || 0) - (a.roiRatio || 0))
              .map((item, index) => {
                const qConfig = QUADRANTS_CONFIG[item.quadrant as keyof typeof QUADRANTS_CONFIG] || QUADRANTS_CONFIG.quick_wins;
                const isDone = item.status === 'completed';
                const isInProgress = item.status === 'in-progress';
                const roi = item.roiRatio || 1;
                const roiPercentage = Math.min(100, Math.round((roi / 4.55) * 100));

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectRecommendation(item)}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-extrabold text-sm text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                        #{index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            Рекомендация #{item.rank}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${qConfig.badgeClass}`}>
                            {qConfig.shortTitle}
                          </span>
                          {item.categoryTag && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {item.categoryTag}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mt-0.5">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                      {/* Visual ROI Bar */}
                      <div className="w-32 hidden md:block">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span>ROI Bar</span>
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{roi}x</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                            style={{ width: `${roiPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-mono font-extrabold text-blue-600 dark:text-blue-400">
                          {roi}x ROI
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Impact {item.y} / Effort {item.x}
                        </div>
                      </div>

                      {isDone ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Выполнено
                        </span>
                      ) : isInProgress ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          В работе
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          В планах
                        </span>
                      )}

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Strategic Takeaways Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">Quick Wins (Лидеры по ROI):</strong>
            AI-интеграция, 54-ФЗ замкнутый денежный контур и сервер лицензий обеспечивают максимальный прирост ценности без затяжных НИОКР.
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
          <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">Стратегические ставки:</strong>
            Первые 2–3 региональных клиента (Рекомендация №1) и сертификат СОРМ ЦНИИС (№3) — главные системные драйверы выручки на 2026–2027 гг.
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">Интерактивность:</strong>
            Нажмите на любую точку графика или элемент списка, чтобы открыть детальный паспорт с пошаговыми шагами, сметой и рисками.
          </div>
        </div>
      </div>
    </div>
  );
};
