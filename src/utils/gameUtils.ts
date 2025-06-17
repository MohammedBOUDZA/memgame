import { Card, PowerType, GridSize } from '../types';

const REGULAR_EMOJIS = [
  '🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤',
  '🎸', '🎺', '🎻', '🎹', '🎵', '🎶', '🎧', '🎮',
  '🏆', '🏅', '🏀', '⚽', '🎾', '🏈', '⚾', '🏐',
  '🌟', '⭐', '💫', '✨', '🚀', '🛸', '🌙', '☀️',
  '🌈', '🦄', '🐱', '🐶', '🐼', '🦊', '🐸', '🐙',
  '🍎', '🍌', '🍓', '🍊', '🍇', '🥝', '🍑', '🥭',
  '🌺', '🌸', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'
];

const POWER_CARDS = [
  { emoji: '🔄', type: 'shuffle' as PowerType, name: 'Shuffle' },
  { emoji: '⏱️', type: 'timeFreeze' as PowerType, name: 'Time Freeze' },
  { emoji: '👁️', type: 'peek' as PowerType, name: 'Peek' },
  { emoji: '💥', type: 'autoMatch' as PowerType, name: 'Auto Match' }
];

export const generateCards = (gridSize: GridSize): Card[] => {
  const cards: Card[] = [];
  let cardId = 0;

  // Add regular pairs
  for (let i = 0; i < gridSize.pairs; i++) {
    const emoji = REGULAR_EMOJIS[i % REGULAR_EMOJIS.length];
    // Add pair
    cards.push({
      id: cardId++,
      content: emoji,
      isFlipped: false,
      isMatched: false,
      isPowerCard: false
    });
    cards.push({
      id: cardId++,
      content: emoji,
      isFlipped: false,
      isMatched: false,
      isPowerCard: false
    });
  }

  // Add power cards
  for (let i = 0; i < gridSize.powerPairs; i++) {
    const powerCard = POWER_CARDS[i % POWER_CARDS.length];
    cards.push({
      id: cardId++,
      content: powerCard.emoji,
      isFlipped: false,
      isMatched: false,
      isPowerCard: true,
      powerType: powerCard.type
    });
    cards.push({
      id: cardId++,
      content: powerCard.emoji,
      isFlipped: false,
      isMatched: false,
      isPowerCard: true,
      powerType: powerCard.type
    });
  }

  return shuffleArray(cards);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};