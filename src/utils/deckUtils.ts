import type { Card, Suit, Rank } from '../types';
import type { ShuffleStep, ShuffleAlgorithm } from '../types/shuffle';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

/**
 * Creates a standard ordered deck of 52 cards
 * Order: Hearts A-K, Diamonds A-K, Clubs A-K, Spades A-K
 */
export const createOrderedDeck = (): Card[] => {
  const deck: Card[] = [];
  let position = 0;

  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        id: `${suit}-${rank}`,
        suit,
        rank,
        position,
        isHighlighted: false
      });
      position++;
    });
  });

  return deck;
};

/**
 * Resets all cards to their original positions and removes highlights
 */
export const resetDeck = (deck: Card[]): Card[] => {
  return deck.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
};

/**
 * Shuffles a deck using the Fisher-Yates algorithm
 * This is an unbiased shuffle that produces a uniformly random permutation
 */
export const fisherYatesShuffle = (deck: Card[]): Card[] => {
  // Create a copy to avoid mutating the original deck
  const shuffledDeck = [...deck];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at i and randomIndex
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
  }
  
  // Update positions to match new order and remove highlights
  return shuffledDeck.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
};

/**
 * Generates step-by-step data for Fisher-Yates shuffle algorithm
 * Returns an array of shuffle steps that can be used for visualization
 */
export const fisherYatesShuffleSteps = (deck: Card[]): ShuffleStep[] => {
  const steps: ShuffleStep[] = [];
  const workingDeck = [...deck];
  
  // Fisher-Yates shuffle algorithm with step tracking
  for (let i = workingDeck.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // Create step data before performing the swap
    const step: ShuffleStep = {
      description: `Step ${steps.length + 1}: Swap card at position ${i} with card at position ${randomIndex}`,
      cardIndices: [i, randomIndex],
      action: 'swap',
      fromPositions: [i, randomIndex],
      toPositions: [randomIndex, i]
    };
    
    steps.push(step);
    
    // Perform the actual swap
    [workingDeck[i], workingDeck[randomIndex]] = [workingDeck[randomIndex], workingDeck[i]];
  }
  
  return steps;
};

/**
 * Applies a specific shuffle step to a deck
 */
export const applyShuffleStep = (deck: Card[], step: ShuffleStep): Card[] => {
  const newDeck = [...deck];
  
  if (step.action === 'swap' && step.cardIndices.length === 2) {
    const [index1, index2] = step.cardIndices;
    [newDeck[index1], newDeck[index2]] = [newDeck[index2], newDeck[index1]];
  } else if (step.action === 'move') {
    // For move operations, we need to handle the card repositioning
    // This is a simplified version - the actual implementation would depend on the specific algorithm
    // For visualization purposes, we'll just highlight the cards being moved
  }
  
  // Update positions and highlight the affected cards
  return newDeck.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: step.cardIndices.includes(index)
  }));
};

/**
 * Shuffles a deck using the Riffle Shuffle algorithm
 * Simulates the physical riffle shuffle used in card games
 */
export const riffleShuffle = (deck: Card[]): Card[] => {
  // Create a copy to avoid mutating the original deck
  const shuffledDeck = [...deck];
  
  // Split the deck roughly in half (with slight randomization)
  const midPoint = Math.floor(shuffledDeck.length / 2);
  const splitVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
  const splitPoint = Math.max(1, Math.min(shuffledDeck.length - 1, midPoint + splitVariation));
  
  const leftHalf = shuffledDeck.slice(0, splitPoint);
  const rightHalf = shuffledDeck.slice(splitPoint);
  
  // Interleave the two halves with slight randomization
  const result: Card[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < leftHalf.length || rightIndex < rightHalf.length) {
    // Randomly choose which half to take from (with slight bias towards alternating)
    const takeFromLeft = leftIndex < leftHalf.length && 
      (rightIndex >= rightHalf.length || Math.random() < 0.5);
    
    if (takeFromLeft) {
      result.push(leftHalf[leftIndex]);
      leftIndex++;
    } else {
      result.push(rightHalf[rightIndex]);
      rightIndex++;
    }
  }
  
  // Update positions and remove highlights
  return result.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
};

/**
 * Generates step-by-step data for Riffle Shuffle algorithm
 * Returns an array of shuffle steps that can be used for visualization
 */
export const riffleShuffleSteps = (deck: Card[]): ShuffleStep[] => {
  const steps: ShuffleStep[] = [];
  const workingDeck = [...deck];
  
  // Split the deck roughly in half (with slight randomization)
  const midPoint = Math.floor(workingDeck.length / 2);
  const splitVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
  const splitPoint = Math.max(1, Math.min(workingDeck.length - 1, midPoint + splitVariation));
  
  // Step 1: Split the deck
  const leftHalf = workingDeck.slice(0, splitPoint);
  const rightHalf = workingDeck.slice(splitPoint);
  
  steps.push({
    description: `Step 1: Split deck at position ${splitPoint} (${leftHalf.length} cards left, ${rightHalf.length} cards right)`,
    cardIndices: Array.from({length: workingDeck.length}, (_, i) => i),
    action: 'split',
    fromPositions: Array.from({length: workingDeck.length}, (_, i) => i),
    toPositions: Array.from({length: workingDeck.length}, (_, i) => i)
  });
  
  // Interleave the two halves with step tracking
  const result: Card[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  let stepCount = 2;
  
  while (leftIndex < leftHalf.length || rightIndex < rightHalf.length) {
    // Randomly choose which half to take from (with slight bias towards alternating)
    const takeFromLeft = leftIndex < leftHalf.length && 
      (rightIndex >= rightHalf.length || Math.random() < 0.5);
    
    if (takeFromLeft) {
      const card = leftHalf[leftIndex];
      result.push(card);
      
      steps.push({
        description: `Step ${stepCount}: Take card from left half (position ${leftIndex} in left half)`,
        cardIndices: [leftIndex],
        action: 'move',
        fromPositions: [leftIndex],
        toPositions: [result.length - 1]
      });
      
      leftIndex++;
    } else {
      const card = rightHalf[rightIndex];
      result.push(card);
      
      steps.push({
        description: `Step ${stepCount}: Take card from right half (position ${rightIndex} in right half)`,
        cardIndices: [splitPoint + rightIndex],
        action: 'move',
        fromPositions: [splitPoint + rightIndex],
        toPositions: [result.length - 1]
      });
      
      rightIndex++;
    }
    
    stepCount++;
  }
  
  return steps;
};

/**
 * Clears all highlights from the deck
 */
export const clearHighlights = (deck: Card[]): Card[] => {
  return deck.map(card => ({
    ...card,
    isHighlighted: false
  }));
};

/**
 * Shuffles a deck using the Overhand Shuffle algorithm
 * Simulates the common casual shuffling method where small groups are taken from top and placed on bottom
 */
export const overhandShuffle = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck];
  const result: Card[] = [];
  
  while (shuffledDeck.length > 0) {
    // Take a small group from the top (1-7 cards, with bias towards smaller groups)
    const groupSize = Math.min(
      shuffledDeck.length,
      Math.floor(Math.random() * 7) + 1
    );
    
    // Take the group from the top
    const group = shuffledDeck.splice(0, groupSize);
    
    // Place the group on the bottom (beginning of result array)
    result.unshift(...group);
  }
  
  // Update positions and remove highlights
  return result.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
};

/**
 * Generates step-by-step data for Overhand Shuffle algorithm
 * Returns an array of shuffle steps that can be used for visualization
 */
export const overhandShuffleSteps = (deck: Card[]): ShuffleStep[] => {
  const steps: ShuffleStep[] = [];
  const workingDeck = [...deck];
  const result: Card[] = [];
  let stepCount = 1;
  
  while (workingDeck.length > 0) {
    // Take a small group from the top (1-7 cards, with bias towards smaller groups)
    const groupSize = Math.min(
      workingDeck.length,
      Math.floor(Math.random() * 7) + 1
    );
    
    // Create indices for the group being moved
    const groupIndices = Array.from({length: groupSize}, (_, i) => i);
    
    steps.push({
      description: `Step ${stepCount}: Take ${groupSize} card${groupSize > 1 ? 's' : ''} from top and place on bottom`,
      cardIndices: groupIndices,
      action: 'move',
      fromPositions: groupIndices,
      toPositions: Array.from({length: groupSize}, (_, i) => result.length + i)
    });
    
    // Take the group from the top
    const group = workingDeck.splice(0, groupSize);
    
    // Place the group on the bottom (beginning of result array)
    result.unshift(...group);
    
    stepCount++;
  }
  
  return steps;
};

/**
 * Shuffles a deck using the Hindu Shuffle algorithm
 * Traditional shuffle method where small packets are pulled from bottom and dropped on top
 */
export const hinduShuffle = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck];
  const result: Card[] = [];
  
  while (shuffledDeck.length > 0) {
    // Pull a small packet from the bottom (1-6 cards, with bias towards smaller packets)
    const packetSize = Math.min(
      shuffledDeck.length,
      Math.floor(Math.random() * 6) + 1
    );
    
    // Take the packet from the bottom
    const packet = shuffledDeck.splice(-packetSize, packetSize);
    
    // Drop the packet on top (end of result array)
    result.push(...packet);
  }
  
  // Update positions and remove highlights
  return result.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
};

/**
 * Generates step-by-step data for Hindu Shuffle algorithm
 * Returns an array of shuffle steps that can be used for visualization
 */
export const hinduShuffleSteps = (deck: Card[]): ShuffleStep[] => {
  const steps: ShuffleStep[] = [];
  const workingDeck = [...deck];
  const result: Card[] = [];
  let stepCount = 1;
  
  while (workingDeck.length > 0) {
    // Pull a small packet from the bottom (1-6 cards, with bias towards smaller packets)
    const packetSize = Math.min(
      workingDeck.length,
      Math.floor(Math.random() * 6) + 1
    );
    
    // Create indices for the packet being moved (from the bottom)
    const packetIndices = Array.from({length: packetSize}, (_, i) => workingDeck.length - packetSize + i);
    
    steps.push({
      description: `Step ${stepCount}: Pull ${packetSize} card${packetSize > 1 ? 's' : ''} from bottom and drop on top`,
      cardIndices: packetIndices,
      action: 'move',
      fromPositions: packetIndices,
      toPositions: Array.from({length: packetSize}, (_, i) => result.length + i)
    });
    
    // Take the packet from the bottom
    const packet = workingDeck.splice(-packetSize, packetSize);
    
    // Drop the packet on top (end of result array)
    result.push(...packet);
    
    stepCount++;
  }
  
  return steps;
};

/**
 * Available shuffle algorithms
 */
export const SHUFFLE_ALGORITHMS: ShuffleAlgorithm[] = [
  {
    name: 'Fisher-Yates',
    description: 'Modern unbiased shuffle algorithm that produces a uniformly random permutation. Each card has an equal probability of ending up in any position. This is the gold standard for computer-based shuffling.',
    timeComplexity: 'O(n)',
    steps: [],
    execute: fisherYatesShuffleSteps
  },
  {
    name: 'Riffle Shuffle',
    description: 'Simulates the physical riffle shuffle used in card games. The deck is split roughly in half and the cards are interleaved with slight randomization. Commonly used in casinos and card games.',
    timeComplexity: 'O(n)',
    steps: [],
    execute: riffleShuffleSteps
  },
  {
    name: 'Overhand Shuffle',
    description: 'Common casual shuffling method where small groups of cards are taken from the top of the deck and placed on the bottom. While intuitive, it requires many iterations to achieve good randomization and has poor mixing properties.',
    timeComplexity: 'O(n²) for full randomization',
    steps: [],
    execute: overhandShuffleSteps
  },
  {
    name: 'Hindu Shuffle',
    description: 'Traditional shuffle method from South Asia where small packets of cards are pulled from the bottom of the deck and dropped on top. Similar to overhand shuffle but with opposite direction of movement.',
    timeComplexity: 'O(n²) for full randomization',
    steps: [],
    execute: hinduShuffleSteps
  }
];

/**
 * Get algorithm by name
 */
export const getAlgorithmByName = (name: string): ShuffleAlgorithm | undefined => {
  return SHUFFLE_ALGORITHMS.find(algo => algo.name === name);
};