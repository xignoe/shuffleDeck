import React from 'react';
import { motion } from 'framer-motion';
import type { Card as CardType } from '../types';
import './Card.css';

interface CardProps {
  card: CardType;
  isAnimating?: boolean;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const getSuitSymbol = (suit: CardType['suit']): string => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  const getSuitColor = (suit: CardType['suit']): string => {
    return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  };

  return (
    <motion.div 
      className={`card ${card.isHighlighted ? 'highlighted' : ''}`}
      data-suit={card.suit}
      data-rank={card.rank}
      layout
      initial={{ scale: 1, y: 0 }}
      animate={{
        scale: card.isHighlighted ? 1.05 : 1,
        y: card.isHighlighted ? -4 : 0,
        boxShadow: card.isHighlighted 
          ? '0 0 0 2px rgba(0, 123, 255, 0.25), 0 8px 20px rgba(0, 123, 255, 0.3)'
          : '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{
        y: -2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      role="img"
      aria-label={`${card.rank} of ${card.suit}`}
      tabIndex={0}
    >
      <div className="card-content">
        <div className={`card-rank ${getSuitColor(card.suit)}`}>
          {card.rank}
        </div>
        <div className={`card-suit ${getSuitColor(card.suit)}`}>
          {getSuitSymbol(card.suit)}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;