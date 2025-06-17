import React from 'react';
import { GameStats, GridSize } from '../types';
import { formatTime } from '../utils/gameUtils';
import { Clock, MousePointer, Target } from 'lucide-react';

interface StatsProps {
  stats: GameStats;
  onNewGame: () => void;
  gridSize: GridSize;
}

const Stats: React.FC<StatsProps> = ({ stats, onNewGame, gridSize }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
      <div className="flex gap-6">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg">{formatTime(stats.timeElapsed)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-white">
          <MousePointer className="w-5 h-5" />
          <span className="font-mono text-lg">{stats.moves}</span>
        </div>
        
        <div className="flex items-center gap-2 text-white">
          <Target className="w-5 h-5" />
          <span className="font-mono text-lg">{stats.matchedPairs}/{gridSize.pairs + gridSize.powerPairs}</span>
        </div>
      </div>
      
      <button
        onClick={onNewGame}
        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl 
                   hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl
                   transform hover:scale-105"
      >
        New Game
      </button>
    </div>
  );
};

export default Stats;