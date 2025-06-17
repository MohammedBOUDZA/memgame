import React from 'react';
import Board from './components/Board';
import Stats from './components/Stats';
import WinModal from './components/WinModal';
import PowerEffectDisplay from './components/PowerEffectDisplay';
import GridSelector from './components/GridSelector';
import DecorativeImages from './components/DecorativeImages';
import Timer from './components/Timer';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-2 sm:p-4 relative overflow-hidden">
      {/* Decorative Background Images */}
      <DecorativeImages />
      
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            Memory Cards
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 px-4">
            Find all pairs and unlock special power cards!
          </p>
        </div>

        {/* Stats - Mobile Only */}
        <div className="block lg:hidden">
          <Stats stats={stats} onNewGame={initializeGame} gridSize={gridSize} />
        </div>

        {/* Main Game Area */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-4 lg:gap-8">
          {/* Left Sidebar - Grid Selector */}
          <div className="w-full lg:w-auto lg:min-w-[280px] order-1 lg:order-none">
            <div className="p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <GridSelector
                selectedGrid={selectedGridKey}
                onGridChange={handleGridChange}
                disabled={stats.moves > 0 && !stats.isGameComplete}
              />
            </div>
            
            {/* Desktop Stats */}
            <div className="hidden lg:block mt-4">
              <Stats stats={stats} onNewGame={initializeGame} gridSize={gridSize} />
            </div>
          </div>

          {/* Center - Game Board */}
          <div className="order-2 lg:order-none flex-1 flex justify-center min-w-0">
            <Board 
              cards={cards} 
              onCardClick={handleCardClick}
              revealedCards={revealedCards}
              gridSize={gridSize}
            />
          </div>

          {/* Right Sidebar - Timer */}
          <div className="w-full lg:w-auto lg:min-w-[280px] order-3 lg:order-none">
            <Timer 
              timeElapsed={stats.timeElapsed}
              moves={stats.moves}
              matchedPairs={stats.matchedPairs}
              totalPairs={gridSize.pairs + gridSize.powerPairs}
              isGameComplete={stats.isGameComplete}
            />
          </div>
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