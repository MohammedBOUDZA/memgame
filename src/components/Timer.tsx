import React from 'react';
import { formatTime } from '../utils/gameUtils';
import { Clock, MousePointer, Target, Trophy } from 'lucide-react';

interface TimerProps {
  timeElapsed: number;
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  isGameComplete: boolean;
}

const Timer: React.FC<TimerProps> = ({ 
  timeElapsed, 
  moves, 
  matchedPairs, 
  totalPairs, 
  isGameComplete 
}) => {
  const progress = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;
  
  const getTimeColor = () => {
    if (isGameComplete) return 'text-green-400';
    if (timeElapsed > 300) return 'text-red-400'; // 5+ minutes
    if (timeElapsed > 180) return 'text-orange-400'; // 3+ minutes
    if (timeElapsed > 60) return 'text-yellow-400'; // 1+ minute
    return 'text-green-400';
  };

  const getMovesColor = () => {
    if (isGameComplete) return 'text-green-400';
    if (moves > 100) return 'text-red-400';
    if (moves > 60) return 'text-orange-400';
    if (moves > 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-4">
      {/* Main Timer Display */}
      <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
        <div className="text-center space-y-4">
          {/* Timer */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">TIME</span>
            </div>
            <div className={`text-4xl sm:text-5xl lg:text-6xl font-mono font-bold ${getTimeColor()} transition-colors duration-300`}>
              {formatTime(timeElapsed)}
            </div>
            {isGameComplete && (
              <div className="flex items-center justify-center gap-1 text-green-400 animate-pulse">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-medium">COMPLETED!</span>
              </div>
            )}
          </div>

          {/* Progress Ring */}
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06d6a0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-3">
        {/* Moves */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80">
              <MousePointer className="w-4 h-4" />
              <span className="text-sm font-medium">MOVES</span>
            </div>
            <div className={`text-2xl font-mono font-bold ${getMovesColor()} transition-colors duration-300`}>
              {moves}
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">PAIRS</span>
            </div>
            <div className="text-2xl font-mono font-bold text-blue-400 transition-colors duration-300">
              {matchedPairs}/{totalPairs}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl border border-purple-300/30">
        <div className="text-center">
          <div className="text-xs text-white/60 mb-1">PERFORMANCE</div>
          <div className="text-sm font-semibold text-white">
            {moves === 0 ? 'Ready to start!' :
             moves < totalPairs * 2 ? '🏆 Excellent!' :
             moves < totalPairs * 3 ? '⭐ Great!' :
             moves < totalPairs * 4 ? '👍 Good!' :
             '💪 Keep going!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;