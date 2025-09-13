import React, { useState } from 'react';
import NameInput from './components/NameInput';
import NameAnnouncement from './components/NameAnnouncement';
import PersonalityQuiz from './components/PersonalityQuiz';
import CharacterReveal from './components/CharacterReveal';
import SortingHat from './components/SortingHat';
import { UserResponse, Character } from './types';
import { matchCharacter } from './utils/matching';

type AppState = 'name-input' | 'name-announcement' | 'quiz' | 'reveal';

function App() {
  const [state, setState] = useState<AppState>('name-input');
  const [userName, setUserName] = useState('');
  const [matchedCharacter, setMatchedCharacter] = useState<Character | null>(null);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setState('name-announcement');
  };

  const handleNameAnnouncementComplete = () => {
    setState('quiz');
  };

  const handleQuizComplete = (responses: UserResponse[]) => {
    const character = matchCharacter(responses);
    setMatchedCharacter(character);
    setState('reveal');
  };

  const handleRestart = () => {
    setState('name-input');
    setUserName('');
    setMatchedCharacter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background magical effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {state === 'name-input' && (
          <div className="text-center mb-8">
            <SortingHat />
            <div className="mt-8">
              <NameInput onSubmit={handleNameSubmit} />
            </div>
          </div>
        )}
        
        {state === 'name-announcement' && (
          <NameAnnouncement 
            name={userName} 
            onComplete={handleNameAnnouncementComplete} 
          />
        )}
        
        {state === 'quiz' && (
          <PersonalityQuiz 
            name={userName} 
            onComplete={handleQuizComplete} 
          />
        )}
        
        {state === 'reveal' && matchedCharacter && (
          <CharacterReveal 
            name={userName} 
            character={matchedCharacter} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
}

export default App;