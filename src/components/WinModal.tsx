import React, { useEffect, useState } from 'react';
import { GameStats } from '../types';
import { formatTime } from '../utils/gameUtils';
import { Trophy, Clock, MousePointer, RotateCcw } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
  stats: GameStats;
  onNewGame: () => void;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-bounce"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );
};

const WinModal: React.FC<WinModalProps> = ({ isOpen, stats, onNewGame }) => {
  if (!isOpen) return null;

  const getPerformanceMessage = () => {
    if (stats.moves < 80) return "🏆 Perfect Memory!";
    if (stats.moves < 120) return "🌟 Excellent!";
    if (stats.moves < 160) return "👏 Well Done!";
    return "🎉 Congratulations!";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl animate-bounce-in">
        <Confetti />
        
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="text-4xl sm:text-6xl animate-bounce">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-500" />
          </div>
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              You Win!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              {getPerformanceMessage()}
            </p>
          </div>
          
          <div className="space-y-3 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono text-base sm:text-lg">{formatTime(stats.timeElapsed)}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <MousePointer className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono text-base sm:text-lg">{stats.moves} moves</span>
            </div>
          </div>
          
          <button
            onClick={onNewGame}
            className="w-full px-4 py-3 sm:px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl 
                       hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl
                       transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2
                       touch-manipulation text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;