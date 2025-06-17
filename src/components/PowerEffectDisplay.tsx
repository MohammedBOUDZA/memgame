import React from 'react';
import { PowerEffect } from '../types';

interface PowerEffectDisplayProps {
  activeEffects: PowerEffect[];
}

const PowerEffectDisplay: React.FC<PowerEffectDisplayProps> = ({ activeEffects }) => {
  if (activeEffects.length === 0) return null;

  const getEffectIcon = (type: string) => {
    switch (type) {
      case 'shuffle': return '🔄';
      case 'timeFreeze': return '⏱️';
      case 'peek': return '👁️';
      case 'autoMatch': return '💥';
      default: return '✨';
    }
  };

  const getEffectName = (type: string) => {
    switch (type) {
      case 'shuffle': return 'Cards Shuffled!';
      case 'timeFreeze': return 'Time Frozen!';
      case 'peek': return 'Peek Active!';
      case 'autoMatch': return 'Auto Match!';
      default: return 'Power Active!';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex flex-col gap-2">
        {activeEffects.map((effect, index) => (
          <div
            key={`${effect.type}-${index}`}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full 
                       shadow-lg animate-pulse flex items-center gap-2 font-semibold"
          >
            <span className="text-xl">{getEffectIcon(effect.type)}</span>
            <span>{getEffectName(effect.type)}</span>
            {effect.duration && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {effect.duration}s
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerEffectDisplay;