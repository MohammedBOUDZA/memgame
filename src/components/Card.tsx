import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  isRevealed?: boolean;
  size?: string;
}

const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  isRevealed = false, 
  size = 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' 
}) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  const getCardStyle = () => {
    if (card.isPowerCard) {
      return 'bg-gradient-to-br from-purple-500 to-pink-500';
    }
    return 'bg-gradient-to-br from-blue-500 to-cyan-500';
  };

  const getTextSize = () => {
    // More responsive text sizing
    if (size.includes('w-8')) return 'text-xs sm:text-sm';
    if (size.includes('w-10')) return 'text-sm sm:text-base';
    if (size.includes('w-12')) return 'text-base sm:text-lg md:text-xl';
    if (size.includes('w-16')) return 'text-lg sm:text-xl md:text-2xl';
    if (size.includes('w-20')) return 'text-xl sm:text-2xl md:text-3xl';
    return 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl';
  };

  const getPowerBadgeSize = () => {
    if (size.includes('w-8') || size.includes('w-10')) return 'text-xs px-1 py-0.5';
    if (size.includes('w-12')) return 'text-xs px-1 py-0.5';
    return 'text-xs px-1 py-0.5';
  };

  return (
    <div
      className={`
        relative ${size} cursor-pointer transition-all duration-300
        ${card.isMatched ? 'scale-95 opacity-75' : 'hover:scale-105 active:scale-95'}
        touch-manipulation
      `}
      onClick={handleClick}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500 transform-gpu
          ${card.isFlipped || card.isMatched || isRevealed ? 'rotate-y-180' : ''}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl backface-hidden
                     bg-gradient-to-br from-slate-200 to-slate-300 
                     border-2 border-white shadow-lg
                     flex items-center justify-center"
        >
          <div className="w-1/3 h-1/3 bg-gradient-to-br from-slate-400 to-slate-500 rounded-md"></div>
        </div>

        {/* Front of card */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-lg sm:rounded-xl backface-hidden rotate-y-180
            ${getCardStyle()}
            border-2 border-white shadow-lg
            flex items-center justify-center ${getTextSize()}
            ${card.isPowerCard ? 'animate-pulse' : ''}
          `}
        >
          <span className="drop-shadow-lg filter select-none">
            {card.content}
          </span>
          {card.isPowerCard && (
            <div className={`absolute bottom-0.5 right-0.5 ${getPowerBadgeSize()} bg-white/20 rounded text-white font-bold`}>
              POWER
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;