import React from 'react';
import { GRID_SIZES, GridSize } from '../types';
import { Grid3X3, Grid2X2, LayoutGrid } from 'lucide-react';

interface GridSelectorProps {
  selectedGrid: string;
  onGridChange: (gridKey: string) => void;
  disabled?: boolean;
}

const GridSelector: React.FC<GridSelectorProps> = ({ 
  selectedGrid, 
  onGridChange, 
  disabled = false 
}) => {
  const getGridIcon = (gridKey: string) => {
    switch (gridKey) {
      case '4x4': return <Grid2X2 className="w-4 h-4" />;
      case '6x6': return <Grid3X3 className="w-4 h-4" />;
      case '8x8': return <LayoutGrid className="w-4 h-4" />;
      case '10x6': return <LayoutGrid className="w-4 h-4" />;
      default: return <Grid3X3 className="w-4 h-4" />;
    }
  };

  const getDifficultyLabel = (gridKey: string) => {
    switch (gridKey) {
      case '4x4': return 'Easy';
      case '6x6': return 'Medium';
      case '8x8': return 'Hard';
      case '10x6': return 'Expert';
      default: return 'Medium';
    }
  };

  const getDifficultyColor = (gridKey: string) => {
    switch (gridKey) {
      case '4x4': return 'text-green-400';
      case '6x6': return 'text-yellow-400';
      case '8x8': return 'text-orange-400';
      case '10x6': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-white font-semibold text-lg text-center lg:text-left">
        Grid Size
      </label>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(GRID_SIZES).map(([gridKey, gridSize]) => (
          <button
            key={gridKey}
            onClick={() => onGridChange(gridKey)}
            disabled={disabled}
            className={`
              relative p-3 rounded-xl border-2 transition-all duration-200
              ${selectedGrid === gridKey
                ? 'bg-white/20 border-white shadow-lg scale-105'
                : 'bg-white/5 border-white/30 hover:bg-white/10 hover:border-white/50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
              touch-manipulation
            `}
          >
            <div className="flex flex-col items-center gap-1.5 text-white">
              {getGridIcon(gridKey)}
              <div className="text-sm font-bold">{gridKey}</div>
              <div className={`text-xs ${getDifficultyColor(gridKey)}`}>
                {getDifficultyLabel(gridKey)}
              </div>
              <div className="text-xs opacity-75">
                {gridSize.totalCards} cards
              </div>
            </div>
            {selectedGrid === gridKey && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
      {disabled && (
        <p className="text-xs text-white/60 text-center mt-2">
          Finish current game to change grid size
        </p>
      )}
    </div>
  );
};

export default GridSelector;