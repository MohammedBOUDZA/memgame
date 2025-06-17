import React from 'react';
import Card from './Card';
import { Card as CardType, GridSize } from '../types';

interface BoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  revealedCards?: number[];
  gridSize: GridSize;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick, revealedCards = [], gridSize }) => {
  const getCardSize = () => {
    // Mobile first approach with better scaling
    if (gridSize.cols <= 4) return 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28';
    if (gridSize.cols <= 6) return 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24';
    if (gridSize.cols <= 8) return 'w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20';
    return 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16';
  };

  const getGap = () => {
    if (gridSize.cols <= 4) return 'gap-3 sm:gap-4';
    if (gridSize.cols <= 6) return 'gap-2 sm:gap-3';
    return 'gap-1 sm:gap-2';
  };

  const getPadding = () => {
    if (gridSize.cols <= 4) return 'p-4 sm:p-6';
    if (gridSize.cols <= 6) return 'p-3 sm:p-4';
    return 'p-2 sm:p-3';
  };

  return (
    <div className="flex justify-center w-full">
      <div 
        className={`
          grid ${getGap()} ${getPadding()}
          bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl
          max-w-full overflow-hidden
        `}
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          maxWidth: 'min(100vw - 2rem, 800px)'
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={onCardClick}
            isRevealed={revealedCards.includes(card.id)}
            size={getCardSize()}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;