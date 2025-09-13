import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export default function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-yellow-400 mb-2">
          The Sorting Hat
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Welcome, young wizard. I am the ancient Sorting Hat, but today I offer something more than house placement. 
          I shall peer into your very soul and reveal which magical character you truly embody.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name, brave soul..."
            className="w-full px-6 py-4 text-lg bg-gray-800/50 border-2 border-yellow-500/30 rounded-full text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
          />
          <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5 animate-pulse" />
        </div>
        
        <button
          type="submit"
          disabled={!name.trim()}
          className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          Begin the Sorting
        </button>
      </form>
    </div>
  );
}