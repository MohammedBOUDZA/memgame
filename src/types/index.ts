export interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  isPowerCard: boolean;
  powerType?: PowerType;
}

export type PowerType = 'shuffle' | 'timeFreeze' | 'peek' | 'autoMatch';

export interface GameStats {
  moves: number;
  matchedPairs: number;
  timeElapsed: number;
  isGameComplete: boolean;
}

export interface PowerEffect {
  type: PowerType;
  isActive: boolean;
  duration?: number;
}

export interface GridSize {
  rows: number;
  cols: number;
  totalCards: number;
  pairs: number;
  powerPairs: number;
}

export const GRID_SIZES: Record<string, GridSize> = {
  '4x4': { rows: 4, cols: 4, totalCards: 16, pairs: 6, powerPairs: 2 },
  '6x6': { rows: 6, cols: 6, totalCards: 36, pairs: 16, powerPairs: 2 },
  '8x8': { rows: 8, cols: 8, totalCards: 64, pairs: 28, powerPairs: 4 },
  '10x6': { rows: 6, cols: 10, totalCards: 60, pairs: 26, powerPairs: 4 }
};