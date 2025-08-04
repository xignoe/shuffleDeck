export interface Card {
  id: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  position: number;
  isHighlighted: boolean;
}

export type Suit = Card['suit'];
export type Rank = Card['rank'];