import React from 'react';
import Board from './components/Board';
import Stats from './components/Stats';
import WinModal from './components/WinModal';
import PowerEffectDisplay from './components/PowerEffectDisplay';
import GridSelector from './components/GridSelector';
import DecorativeImages from './components/DecorativeImages';
import { useMemoryGame } from './hooks/useMemoryGame';

function App() {
  const {
    cards,
    stats,
    activeEffects,
    revealedCards,
    selectedGridKey,
    gridSize,
    handleCardClick,
    handleGridChange,
    initializeGame
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Decorative Background Images */}
      <DecorativeImages />
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Memory Cards
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Find all pairs and unlock special power cards!
          </p>
        </div>

        {/* Stats */}
        <Stats stats={stats} onNewGame={initializeGame} gridSize={gridSize} />

        {/* Game Board with Grid Selector */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
          {/* Grid Selector - Left side on large screens, top on smaller screens */}
          <div className="order-1 lg:order-none">
            <div className="p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <GridSelector
                selectedGrid={selectedGridKey}
                onGridChange={handleGridChange}
                disabled={stats.moves > 0 && !stats.isGameComplete}
              />
            </div>
          </div>

          {/* Game Board - Center */}
          <div className="order-2 lg:order-none flex-1 flex justify-center">
            <Board 
              cards={cards} 
              onCardClick={handleCardClick}
              revealedCards={revealedCards}
              gridSize={gridSize}
            />
          </div>

          {/* Empty space for balance on large screens */}
          <div className="hidden lg:block w-64"></div>
        </div>

        {/* Power Effects Display */}
        <PowerEffectDisplay activeEffects={activeEffects} />

        {/* Win Modal */}
        <WinModal 
          isOpen={stats.isGameComplete}
          stats={stats}
          onNewGame={initializeGame}
        />
      </div>
    </div>
  );
}

export default App;