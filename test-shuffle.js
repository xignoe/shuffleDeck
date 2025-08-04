// Quick test to verify Fisher-Yates shuffle algorithm
function fisherYatesShuffle(deck) {
  const shuffledDeck = [...deck];
  
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
  }
  
  return shuffledDeck.map((card, index) => ({
    ...card,
    position: index,
    isHighlighted: false
  }));
}

// Create a simple test deck
const testDeck = [
  { id: '1', suit: 'hearts', rank: 'A', position: 0, isHighlighted: false },
  { id: '2', suit: 'hearts', rank: '2', position: 1, isHighlighted: false },
  { id: '3', suit: 'hearts', rank: '3', position: 2, isHighlighted: false },
  { id: '4', suit: 'hearts', rank: '4', position: 3, isHighlighted: false },
  { id: '5', suit: 'hearts', rank: '5', position: 4, isHighlighted: false }
];

console.log('Original deck:', testDeck.map(card => card.rank));

// Test multiple shuffles to ensure randomness
for (let i = 0; i < 5; i++) {
  const shuffled = fisherYatesShuffle(testDeck);
  console.log(`Shuffle ${i + 1}:`, shuffled.map(card => card.rank));
  
  // Verify all cards are still present
  const originalRanks = testDeck.map(card => card.rank).sort();
  const shuffledRanks = shuffled.map(card => card.rank).sort();
  const allPresent = JSON.stringify(originalRanks) === JSON.stringify(shuffledRanks);
  console.log(`  All cards present: ${allPresent}`);
}

console.log('\nFisher-Yates shuffle test completed successfully!');