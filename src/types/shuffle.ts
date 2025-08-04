import type { Card } from './card';

export interface ShuffleStep {
  description: string;
  cardIndices: number[];
  action: 'swap' | 'move' | 'split' | 'merge';
  fromPositions: number[];
  toPositions: number[];
}

export interface ShuffleAlgorithm {
  name: string;
  description: string;
  timeComplexity: string;
  steps: ShuffleStep[];
  execute(deck: Card[]): ShuffleStep[];
}

export interface DeckState {
  cards: Card[];
  originalOrder: Card[];
  currentStep: number;
  totalSteps: number;
  isShuffling: boolean;
  algorithm: ShuffleAlgorithm | null;
}

export interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  speed: number; // 0.5x to 3x
  currentStepIndex: number;
  highlightedCards: number[];
}

export interface ShuffleStatistics {
  algorithmName: string;
  shuffleCount: number;
  averageSteps: number;
  randomnessScore: number;
  executionTimes: number[];
}