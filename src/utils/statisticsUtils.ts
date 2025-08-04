import type { Card } from '../types';
import type { ShuffleStatistics } from '../types/shuffle';

/**
 * Calculate basic randomness metrics for a shuffled deck
 */
export const calculateRandomnessMetrics = (originalDeck: Card[], shuffledDeck: Card[]): number => {
  if (originalDeck.length !== shuffledDeck.length) {
    return 0;
  }

  let displacedCards = 0;
  let totalDisplacement = 0;

  // Count cards that moved from their original position
  for (let i = 0; i < originalDeck.length; i++) {
    const originalCard = originalDeck[i];
    const shuffledPosition = shuffledDeck.findIndex(card => card.id === originalCard.id);
    
    if (shuffledPosition !== i) {
      displacedCards++;
      totalDisplacement += Math.abs(shuffledPosition - i);
    }
  }

  // Calculate randomness score as percentage of cards displaced
  // A perfectly random shuffle should displace most cards
  const displacementRatio = displacedCards / originalDeck.length;
  
  // Normalize the average displacement (max possible displacement is deck length / 2 on average)
  const averageDisplacement = totalDisplacement / originalDeck.length;
  const normalizedDisplacement = Math.min(averageDisplacement / (originalDeck.length / 2), 1);
  
  // Combine both metrics for a randomness score (0-100)
  return Math.round((displacementRatio * 0.6 + normalizedDisplacement * 0.4) * 100);
};

/**
 * Calculate the number of runs in a sequence (consecutive cards of the same suit)
 * Lower run count indicates better shuffling
 */
export const calculateRunCount = (deck: Card[]): number => {
  if (deck.length === 0) return 0;
  
  let runs = 1;
  for (let i = 1; i < deck.length; i++) {
    if (deck[i].suit !== deck[i - 1].suit) {
      runs++;
    }
  }
  return runs;
};

/**
 * Calculate entropy-based randomness measure
 * Higher entropy indicates better randomness
 */
export const calculateEntropy = (originalDeck: Card[], shuffledDeck: Card[]): number => {
  const positions = new Map<string, number>();
  
  // Map each card to its new position
  shuffledDeck.forEach((card, index) => {
    positions.set(card.id, index);
  });
  
  // Calculate position differences
  const differences: number[] = [];
  originalDeck.forEach((card, originalIndex) => {
    const newPosition = positions.get(card.id) || 0;
    differences.push(Math.abs(newPosition - originalIndex));
  });
  
  // Calculate entropy of position differences
  const maxDifference = Math.max(...differences);
  if (maxDifference === 0) return 0;
  
  const buckets = new Array(maxDifference + 1).fill(0);
  differences.forEach(diff => buckets[diff]++);
  
  let entropy = 0;
  const total = differences.length;
  
  buckets.forEach(count => {
    if (count > 0) {
      const probability = count / total;
      entropy -= probability * Math.log2(probability);
    }
  });
  
  // Normalize entropy (max entropy for uniform distribution)
  const maxEntropy = Math.log2(buckets.length);
  return maxEntropy > 0 ? (entropy / maxEntropy) * 100 : 0;
};

/**
 * Update statistics for a specific algorithm
 */
export const updateAlgorithmStatistics = (
  currentStats: ShuffleStatistics,
  originalDeck: Card[],
  shuffledDeck: Card[],
  executionTime: number,
  stepCount: number
): ShuffleStatistics => {
  const randomnessScore = calculateRandomnessMetrics(originalDeck, shuffledDeck);
  const newShuffleCount = currentStats.shuffleCount + 1;
  const newExecutionTimes = [...currentStats.executionTimes, executionTime];
  
  // Calculate new average steps
  const totalSteps = (currentStats.averageSteps * currentStats.shuffleCount) + stepCount;
  const newAverageSteps = Math.round(totalSteps / newShuffleCount);
  
  return {
    ...currentStats,
    shuffleCount: newShuffleCount,
    averageSteps: newAverageSteps,
    randomnessScore: Math.round(
      (currentStats.randomnessScore * currentStats.shuffleCount + randomnessScore) / newShuffleCount
    ),
    executionTimes: newExecutionTimes
  };
};

/**
 * Initialize statistics for an algorithm
 */
export const initializeAlgorithmStatistics = (algorithmName: string): ShuffleStatistics => {
  return {
    algorithmName,
    shuffleCount: 0,
    averageSteps: 0,
    randomnessScore: 0,
    executionTimes: []
  };
};

/**
 * Get average execution time for an algorithm
 */
export const getAverageExecutionTime = (stats: ShuffleStatistics): number => {
  if (stats.executionTimes.length === 0) return 0;
  const sum = stats.executionTimes.reduce((acc, time) => acc + time, 0);
  return Math.round(sum / stats.executionTimes.length);
};

/**
 * Compare two algorithms and return comparison metrics
 */
export const compareAlgorithms = (stats1: ShuffleStatistics, stats2: ShuffleStatistics) => {
  return {
    randomnessComparison: {
      algorithm1: { name: stats1.algorithmName, score: stats1.randomnessScore },
      algorithm2: { name: stats2.algorithmName, score: stats2.randomnessScore },
      winner: stats1.randomnessScore > stats2.randomnessScore ? stats1.algorithmName : stats2.algorithmName
    },
    speedComparison: {
      algorithm1: { name: stats1.algorithmName, avgTime: getAverageExecutionTime(stats1) },
      algorithm2: { name: stats2.algorithmName, avgTime: getAverageExecutionTime(stats2) },
      winner: getAverageExecutionTime(stats1) < getAverageExecutionTime(stats2) ? stats1.algorithmName : stats2.algorithmName
    },
    stepComparison: {
      algorithm1: { name: stats1.algorithmName, avgSteps: stats1.averageSteps },
      algorithm2: { name: stats2.algorithmName, avgSteps: stats2.averageSteps },
      winner: stats1.averageSteps < stats2.averageSteps ? stats1.algorithmName : stats2.algorithmName
    }
  };
};