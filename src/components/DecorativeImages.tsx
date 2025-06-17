import React from 'react';

const DecorativeImages: React.FC = () => {
  return (
    <>
      {/* Left side decorative elements */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="Gaming decoration"
          className="w-64 h-64 object-cover rounded-full blur-sm"
        />
      </div>
      
      {/* Right side decorative elements */}
      <div className="fixed right-0 top-1/3 transform -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="Cards decoration"
          className="w-48 h-48 object-cover rounded-full blur-sm"
        />
      </div>
      
      {/* Bottom left decorative element */}
      <div className="fixed left-10 bottom-10 opacity-15 pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="Game pieces decoration"
          className="w-32 h-32 object-cover rounded-2xl blur-sm"
        />
      </div>
      
      {/* Top right decorative element */}
      <div className="fixed right-10 top-20 opacity-15 pointer-events-none z-0">
        <img 
          src="https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="Memory decoration"
          className="w-40 h-40 object-cover rounded-2xl blur-sm"
        />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="fixed top-1/4 left-1/4 opacity-10 pointer-events-none z-0 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm"></div>
      </div>
      
      <div className="fixed top-3/4 right-1/4 opacity-10 pointer-events-none z-0 animate-pulse" style={{ animationDelay: '1s' }}>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm"></div>
      </div>
      
      <div className="fixed top-1/2 right-1/3 opacity-10 pointer-events-none z-0 animate-pulse" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-sm"></div>
      </div>
    </>
  );
};

export default DecorativeImages;