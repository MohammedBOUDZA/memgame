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
    if (gridSize.cols <= 4) return 'w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28';
    if (gridSize.cols <= 6) return 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24';
    if (gridSize.cols <= 8) return 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20';
    return 'w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16';
  };

  const getGridCols = () => {
    return `grid-cols-${gridSize.cols}`;
  };

  return (
    <div className="flex justify-center w-full">
      <div 
        className={`
          grid gap-2 md:gap-3 p-4 md:p-6 
          bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl
          ${getGridCols()}
        `}
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          maxWidth: 'fit-content'
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