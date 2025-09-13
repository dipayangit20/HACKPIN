import React, { useEffect, useState } from 'react';
import SortingHat from './SortingHat';

interface NameAnnouncementProps {
  name: string;
  onComplete: () => void;
}

export default function NameAnnouncement({ name, onComplete }: NameAnnouncementProps) {
  const [currentText, setCurrentText] = useState('');
  const [showHat, setShowHat] = useState(false);
  
  const fullText = `Ahh... so it's ${name}! *adjusts brim* 
I can sense great potential within you, ${name}. 
Let me delve deeper into your mind...`;

  useEffect(() => {
    setShowHat(true);
    
    // Typewriter effect
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(onComplete, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText, onComplete]);

  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className={`transform transition-all duration-1000 ${
        showHat ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <SortingHat isThinking={true} />
      </div>

      <div className="bg-gray-800/30 rounded-3xl p-8 border border-yellow-500/20 max-w-2xl mx-auto">
        <p className="text-xl text-yellow-300 italic font-medium leading-relaxed min-h-[120px] flex items-center justify-center">
          {currentText}
          <span className="animate-pulse ml-1">|</span>
        </p>
      </div>
    </div>
  );
}