import React from 'react';

interface SortingHatProps {
  isThinking?: boolean;
}

export default function SortingHat({ isThinking = false }: SortingHatProps) {
  return (
    <div className="relative">
      {/* Magical particles */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-60 ${
              isThinking ? 'animate-bounce' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Sorting Hat */}
      <div className={`text-6xl transition-all duration-1000 ${
        isThinking ? 'animate-pulse scale-110' : 'scale-100'
      }`}>
        🎩
      </div>
      
      {/* Glowing effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
        isThinking 
          ? 'bg-yellow-400/20 blur-xl animate-pulse' 
          : 'bg-yellow-400/10 blur-lg'
      }`} />
    </div>
  );
}