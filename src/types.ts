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

export interface RecommendationStep {
  title: string;
  body: string;
  meta?: string;
}

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
