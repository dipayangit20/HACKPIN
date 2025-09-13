import React, { useEffect, useState } from 'react';
import { RefreshCw, Briefcase, TrendingUp } from 'lucide-react';
import { Character } from '../types';
import SortingHat from './SortingHat';

interface CharacterRevealProps {
  name: string;
  character: Character;
  onRestart: () => void;
}

export default function CharacterReveal({ name, character, onRestart }: CharacterRevealProps) {
  const [stage, setStage] = useState<'thinking' | 'revealing' | 'revealed'>('thinking');
  const [revealText, setRevealText] = useState('');

  const thinkingMessages = [
    "Hmm... interesting...",
    "Yes, yes... I see it now...",
    "The threads of your personality weave together...",
    "Ah! The picture becomes clear..."
  ];

  const finalReveal = `${name}, after peering deep into your soul, I have found your magical match!`;

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    // Thinking phase
    thinkingMessages.forEach((message, index) => {
      timeouts.push(
        setTimeout(() => {
          setRevealText(message);
        }, index * 2000)
      );
    });

    // Revealing phase
    timeouts.push(
      setTimeout(() => {
        setStage('revealing');
        setRevealText(finalReveal);
      }, thinkingMessages.length * 2000)
    );

    // Final reveal
    timeouts.push(
      setTimeout(() => {
        setStage('revealed');
      }, (thinkingMessages.length * 2000) + 3000)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [name]);

  const getHouseColor = (house: string) => {
    switch (house) {
      case 'Gryffindor': return 'from-red-600 to-yellow-600';
      case 'Slytherin': return 'from-green-600 to-gray-600';
      case 'Ravenclaw': return 'from-blue-600 to-indigo-600';
      case 'Hufflepuff': return 'from-yellow-600 to-orange-600';
      default: return 'from-purple-600 to-indigo-600';
    }
  };

  return (
    <div className="text-center space-y-8 animate-fade-in">
      {stage !== 'revealed' ? (
        <>
          <SortingHat isThinking={true} />
          <div className="bg-gray-800/30 rounded-3xl p-8 border border-yellow-500/20 max-w-2xl mx-auto">
            <p className="text-xl text-yellow-300 italic font-medium leading-relaxed min-h-[60px] flex items-center justify-center">
              {revealText}
              {stage === 'thinking' && <span className="animate-pulse ml-1">|</span>}
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-8">
          {/* Final reveal */}
          <div className="bg-gray-800/30 rounded-3xl p-6 border border-yellow-500/20 max-w-2xl mx-auto">
            <p className="text-lg text-yellow-300 italic mb-4">{finalReveal}</p>
          </div>

          {/* Character card */}
          <div className={`bg-gradient-to-br ${getHouseColor(character.house)} p-1 rounded-3xl max-w-2xl mx-auto transform animate-bounce-in`}>
            <div className="bg-gray-900 rounded-3xl p-8">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {character.name}
              </h2>
              <p className="text-xl text-gray-300 mb-4 italic">
                {character.description}
              </p>
              
              <div className={`bg-gradient-to-r ${getHouseColor(character.house)} text-white px-4 py-2 rounded-full inline-block font-semibold mb-6`}>
                {character.house}
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 mb-6">
                <p className="text-lg text-yellow-300 font-medium mb-3">
                  {character.funnyExplanation}
                </p>
                <blockquote className="text-gray-300 italic border-l-4 border-yellow-500 pl-4">
                  "{character.quote}"
                </blockquote>
              </div>

              {/* Career Recommendations */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-6 mb-6 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-xl font-bold text-indigo-300">Recommended Career Paths</h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {character.careerExplanation}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {character.careerPaths.map((career, index) => (
                    <div
                      key={index}
                      className="bg-indigo-800/30 border border-indigo-500/30 rounded-lg p-3 text-center hover:bg-indigo-700/40 transition-colors duration-300"
                    >
                      <TrendingUp className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                      <span className="text-sm text-indigo-200 font-medium">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {character.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm border border-yellow-500/30"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5" />
                Sort Another Soul
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}