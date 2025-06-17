import React from 'react';
import { GameStats, GridSize } from '../types';
import { RotateCcw } from 'lucide-react';

interface StatsProps {
  stats: GameStats;
  onNewGame: () => void;
  gridSize: GridSize;
}

const Stats: React.FC<StatsProps> = ({ stats, onNewGame, gridSize }) => {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
      <button
        onClick={onNewGame}
        className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl 
                   hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl
                   transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2
                   touch-manipulation"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-sm sm:text-base">New Game</span>
      </button>
    </div>
  );
};

export default Stats;