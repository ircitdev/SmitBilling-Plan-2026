export interface Competitor {
  id: string;
  name: string;
  subtitle: string;
  website: string;
  clients: string;
  founded: string;
  segment: string;
  price: string;
  stack: string;
  sormCert: string;
  pros: string[];
  cons: string[];
  ourTake: string;
  badgeColor: string;
  marketShareEstimate: string;
}

export type MatrixValue = 'yes' | 'no' | 'partial' | 'limited' | 'unknown' | string;

export interface MatrixRow {
  id: string;
  parameter: string;
  category: string;
  smit: string;
  smitStatus: 'yes' | 'no' | 'partial' | 'limited';
  smitLink?: string;
  smitDocTip?: string;
  carbon: string;
  utm5: string;
  hydra: string;
  lanbilling: string;
  bgbilling: string;
  mikbill: string;
}

export type RecommendationStatus = 'completed' | 'in-progress' | 'planned';

export interface RecommendationStep {
  title: string;
  body: string;
  meta?: string;
}

export type QuadrantType = 'quick_wins' | 'major_projects' | 'fill_ins' | 'thankless';

export interface Recommendation {
  id: string;
  rank: number;
  rankLabel: string;
  title: string;
  summary: string;
  intro: string;
  why: string;
  budget: {
    time: string;
    money: string;
    team: string;
  };
  steps: RecommendationStep[];
  kpis: string[];
  risks: string;
  done?: string;
  isNew?: boolean;
  status?: RecommendationStatus;
  impactScore?: number; // 0-100
  effortScore?: number; // 0-100
  quadrant?: QuadrantType;
  quadrantLabel?: string;
  categoryTag?: string;
  roiRatio?: number;
}

export type RoadmapStatusType = 'done' | 'partial' | 'planned' | 'blocked';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatusType;
  statusLabel: string;
  category: 'core' | 'ai' | 'finance' | 'ux' | 'compliance' | 'network' | 'infra';
  build?: string;
  planFile?: string;
  planUrl?: string;
  isFullWidth?: boolean;
  priority?: 'HIGH' | 'MED' | 'LOW';
}

export interface SormChecklistItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  requiredArtifacts: string;
  currentSmITStatus: string;
}

export interface PriceTier {
  id: string;
  name: string;
  annualPrice: number;
  monthlyPrice: number;
  badge?: string;
  isPrimary?: boolean;
  features: string[];
  inheritText?: string;
  recommendedFor: string;
}

export interface MarketSegment {
  id: string;
  name: string;
  range: string;
  description: string;
  players: string;
  isTarget?: boolean;
}

export interface MarketGrowthYearData {
  year: string;
  periodLabel: string;
  microVolume: number;
  smallVolume: number;
  mediumVolume: number;
  largeVolume: number;
  totalVolume: number;
  smallOperatorsCount: number;
  mediumOperatorsCount: number;
  microOperatorsCount: number;
  aiAdoptionPct: number;
  sormCompliantPct: number;
  smitProjectedClients: number;
}

export interface CompetitiveRadarMetric {
  dimension: string;
  dimensionShort: string;
  smitScore: number;
  benchmarkScore: number;
  carbonScore: number;
  hydraScore: number;
  category: 'strength' | 'weakness' | 'neutral';
  description: string;
  smitAdvantage: string;
  marketReality: string;
  target2027: number;
}

export interface ICPProfile {
  id: string;
  name: string;
  isStar?: boolean;
  audienceRange: string;
  marketPotential: string;
  pricingRecommendation: string;
  strategyHighlight: string;
  badge?: string;
}

export interface SalesFunnelStage {
  step: number;
  stage: string;
  description: string;
}

export interface MarketingQuickWin {
  step: number;
  title: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface PositioningData {
  oneSentence: string;
  author: {
    name: string;
    initials: string;
    role: string;
    versionDate: string;
  };
  taglines: string[];
  icps: ICPProfile[];
  salesFunnel: SalesFunnelStage[];
  marketingQuickWins: MarketingQuickWin[];
}

export interface ConclusionData {
  title: string;
  badge: string;
  marketInsight: {
    lead: string;
    gapList: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
  bottleneck: {
    heading: string;
    description: string;
  };
  keyRecommendation: {
    heading: string;
    target: string;
    details: string;
  };
}

export type RiskCategory = 'regulatory' | 'market' | 'technical' | 'operational';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface DemoBooking {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  contactChannel: 'telegram' | 'phone' | 'email';
  contactValue: string;
  subscriberCount: string;
  currentBilling: string;
  focusAreas: string[];
  preferredDate: string;
  preferredTime: string;
  format: 'google_meet' | 'telemost' | 'telegram_video' | 'phone_call';
  customNotes?: string;
  aiTailoredAgenda?: string[];
  status: 'confirmed' | 'pending' | 'rescheduled';
}

export interface ThreatRisk {
  id: string;
  code: string;
  name: string;
  category: RiskCategory;
  categoryLabel: string;
  probability: number; // 0-100%
  impact: number; // 0-100%
  riskScore: number; // calculated 0-100
  mitigatedProbability?: number; // after mitigation
  mitigatedImpact?: number;
  mitigatedScore?: number;
  level: RiskLevel;
  levelLabel: string;
  description: string;
  consequences: string;
  mitigationStrategy: string;
  preventiveActions: string[];
  owner: string;
  timeline: string;
  residualRisk: string;
  color: string;
  iconName?: string;
}



