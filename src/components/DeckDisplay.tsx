import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Card as CardType } from '../types';
import Card from './Card';
import './DeckDisplay.css';

interface DeckDisplayProps {
  cards: CardType[];
  title?: string;
  isAnimating?: boolean;
}

const DeckDisplay: React.FC<DeckDisplayProps> = ({ cards, title, isAnimating = false }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gridRef.current) return;
      
      const focusedElement = document.activeElement as HTMLElement;
      if (!gridRef.current.contains(focusedElement)) return;
      
      const cards = Array.from(gridRef.current.querySelectorAll('[tabindex="0"]')) as HTMLElement[];
      const currentIndex = cards.indexOf(focusedElement);
      
      let nextIndex = currentIndex;
      
      switch (event.key) {
        case 'ArrowRight':
          nextIndex = Math.min(currentIndex + 1, cards.length - 1);
          break;
        case 'ArrowLeft':
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case 'ArrowDown':
          nextIndex = Math.min(currentIndex + 13, cards.length - 1);
          break;
        case 'ArrowUp':
          nextIndex = Math.max(currentIndex - 13, 0);
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = cards.length - 1;
          break;
        default:
          return;
      }
      
      if (nextIndex !== currentIndex) {
        event.preventDefault();
        cards[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className="deck-display">
      {title && (
        <motion.h3 
          className="deck-title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
      )}
      <motion.div 
        ref={gridRef}
        className={`cards-grid ${isAnimating ? 'animating' : ''}`}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        role="grid"
        aria-label={title || "Card deck display"}
        aria-rowcount={4}
        aria-colcount={13}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const row = Math.floor(index / 13) + 1;
            const col = (index % 13) + 1;
            
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                style={{ gridColumn: `${col}`, gridRow: `${row}` }}
                role="gridcell"
                aria-rowindex={row}
                aria-colindex={col}
              >
                <Card card={card} isAnimating={isAnimating} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DeckDisplay;