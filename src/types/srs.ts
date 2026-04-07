export type SRSLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSItem {
  id: string;
  level: SRSLevel;
  nextReview: string; // ISO string
  lastReview?: string; // ISO string
}

export interface SRSData {
  [id: string]: SRSItem;
}

export interface PracticeSessionSettings {
  levels: ('N5' | 'N4')[];
  verbGroups: string[];
  includeGrammar: boolean;
  maxItems: number;
}
