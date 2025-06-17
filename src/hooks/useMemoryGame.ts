import { useState, useEffect, useCallback } from 'react';
import { Card, GameStats, PowerType, PowerEffect, GridSize, GRID_SIZES } from '../types';
import { generateCards, shuffleArray } from '../utils/gameUtils';

export const useMemoryGame = () => {
  const [selectedGridKey, setSelectedGridKey] = useState<string>('6x6');
  const [gridSize, setGridSize] = useState<GridSize>(GRID_SIZES['6x6'] || { rows: 6, cols: 6, pairs: 16, powerPairs: 2 });
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    matchedPairs: 0,
    timeElapsed: 0,
    isGameComplete: false
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeEffects, setActiveEffects] = useState<PowerEffect[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [timeFreezeDuration, setTimeFreezeDuration] = useState(0);

  // Initialize game
  const initializeGame = useCallback((newGridKey?: string) => {
    const gridKey = newGridKey || selectedGridKey;
    const newGridSize = GRID_SIZES[gridKey] || GRID_SIZES['6x6'] || { rows: 6, cols: 6, pairs: 16, powerPairs: 2 };
    
    setSelectedGridKey(gridKey);
    setGridSize(newGridSize);
    
    const newCards = generateCards(newGridSize);
    setCards(newCards);
    setFlippedCards([]);
    setStats({
      moves: 0,
      matchedPairs: 0,
      timeElapsed: 0,
      isGameComplete: false
    });
    setIsTimerActive(true);
    setActiveEffects([]);
    setRevealedCards([]);
    setTimeFreezeDuration(0);
  }, [selectedGridKey]);

  // Handle grid size change
  const handleGridChange = useCallback((gridKey: string) => {
    initializeGame(gridKey);
  }, [initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && !stats.isGameComplete) {
      interval = setInterval(() => {
        if (timeFreezeDuration > 0) {
          setTimeFreezeDuration(prev => prev - 1);
        } else {
          setStats(prev => ({
            ...prev,
            timeElapsed: prev.timeElapsed + 1
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, stats.isGameComplete, timeFreezeDuration]);

  // Check for game completion
  useEffect(() => {
    const matchedPairs = cards.filter(card => card.isMatched).length / 2;
    const totalPairs = gridSize.pairs + gridSize.powerPairs;
    const isComplete = matchedPairs === totalPairs;
    
    setStats(prev => ({
      ...prev,
      matchedPairs,
      isGameComplete: isComplete
    }));

    if (isComplete) {
      setIsTimerActive(false);
    }
  }, [cards, gridSize]);

  // Power card effects
  const executePowerEffect = useCallback((powerType: PowerType) => {
    switch (powerType) {
      case 'shuffle':
        setCards(prev => {
          const unmatchedCards = prev.filter(card => !card.isMatched);
          const matchedCards = prev.filter(card => card.isMatched);
          const shuffledUnmatched = shuffleArray(unmatchedCards);
          
          // Maintain positions but shuffle content
          const newCards = prev.map((card, index) => {
            if (card.isMatched) return card;
            const unmatchedIndex = unmatchedCards.findIndex(c => c.id === card.id);
            return shuffledUnmatched[unmatchedIndex] || card;
          });
          
          return newCards;
        });
        
        setActiveEffects(prev => [...prev, { type: 'shuffle', isActive: true }]);
        setTimeout(() => {
          setActiveEffects(prev => prev.filter(effect => effect.type !== 'shuffle'));
        }, 2000);
        break;

      case 'timeFreeze':
        setTimeFreezeDuration(10);
        setActiveEffects(prev => [...prev, { type: 'timeFreeze', isActive: true, duration: 10 }]);
        
        // Update duration display
        const freezeInterval = setInterval(() => {
          setActiveEffects(prev => 
            prev.map(effect => 
              effect.type === 'timeFreeze' 
                ? { ...effect, duration: (effect.duration || 10) - 1 }
                : effect
            )
          );
        }, 1000);
        
        setTimeout(() => {
          clearInterval(freezeInterval);
          setActiveEffects(prev => prev.filter(effect => effect.type !== 'timeFreeze'));
        }, 10000);
        break;

      case 'peek':
        const unmatchedCards = cards.filter(card => !card.isMatched && !card.isFlipped);
        const randomCards = shuffleArray(unmatchedCards).slice(0, Math.min(6, unmatchedCards.length));
        const cardIds = randomCards.map(card => card.id);
        
        setRevealedCards(cardIds);
        setActiveEffects(prev => [...prev, { type: 'peek', isActive: true }]);
        
        setTimeout(() => {
          setRevealedCards([]);
          setActiveEffects(prev => prev.filter(effect => effect.type !== 'peek'));
        }, 2000);
        break;

      case 'autoMatch':
        setCards(prev => {
          const unmatchedCards = prev.filter(card => !card.isMatched);
          const pairs = new Map<string, Card[]>();
          
          // Group unmatched cards by content
          unmatchedCards.forEach(card => {
            if (!pairs.has(card.content)) {
              pairs.set(card.content, []);
            }
            pairs.get(card.content)!.push(card);
          });
          
          // Find first complete pair
          for (const [content, cardPair] of pairs) {
            if (cardPair.length === 2 && !cardPair[0].isPowerCard) {
              // Match this pair
              return prev.map(card => 
                cardPair.some(c => c.id === card.id)
                  ? { ...card, isMatched: true, isFlipped: true }
                  : card
              );
            }
          }
          
          return prev;
        });
        
        setActiveEffects(prev => [...prev, { type: 'autoMatch', isActive: true }]);
        setTimeout(() => {
          setActiveEffects(prev => prev.filter(effect => effect.type !== 'autoMatch'));
        }, 2000);
        break;
    }
  }, [cards]);

  const handleCardClick = useCallback((clickedCard: Card) => {
    if (flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Flip the card
    setCards(prev => 
      prev.map(card => 
        card.id === clickedCard.id 
          ? { ...card, isFlipped: true }
          : card
      )
    );

    if (newFlippedCards.length === 2) {
      setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

      const [firstCard, secondCard] = newFlippedCards;
      const isMatch = firstCard.content === secondCard.content;

      if (isMatch) {
        // Cards match
        setCards(prev => 
          prev.map(card => 
            newFlippedCards.some(flipped => flipped.id === card.id)
              ? { ...card, isMatched: true }
              : card
          )
        );

        // Execute power effect if it's a power card match
        if (firstCard.isPowerCard && firstCard.powerType) {
          setTimeout(() => {
            executePowerEffect(firstCard.powerType!);
          }, 500);
        }

        setFlippedCards([]);
      } else {
        // Cards don't match - flip them back after delay
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              newFlippedCards.some(flipped => flipped.id === card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, executePowerEffect]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    cards,
    stats,
    activeEffects,
    revealedCards,
    selectedGridKey,
    gridSize,
    handleCardClick,
    handleGridChange,
    initializeGame
  };
};