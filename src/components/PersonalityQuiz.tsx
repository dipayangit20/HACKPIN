import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { questions } from '../data/questions';
import { UserResponse } from '../types';
import SortingHat from './SortingHat';

interface PersonalityQuizProps {
  name: string;
  onComplete: (responses: UserResponse[]) => void;
}

export default function PersonalityQuiz({ name, onComplete }: PersonalityQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (selectedOption === null) return;

    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      selectedTraits: currentQuestion.options[selectedOption].traits
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    if (isLastQuestion) {
      onComplete(updatedResponses);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setResponses(responses.slice(0, -1));
      setSelectedOption(null);
    }
  };

  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="mb-8">
        <SortingHat isThinking={true} />
        <h2 className="text-2xl font-bold text-yellow-400 mt-4">
          Personality Analysis in Progress...
        </h2>
        <p className="text-gray-300 mt-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="bg-gray-800/30 rounded-3xl p-8 border border-yellow-500/20 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-8 leading-relaxed">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedOption === index
                  ? 'border-yellow-400 bg-yellow-400/10 text-yellow-300'
                  : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-yellow-500/50 hover:bg-yellow-500/5'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-4 flex-shrink-0 ${
                  selectedOption === index
                    ? 'border-yellow-400 bg-yellow-400'
                    : 'border-gray-500'
                }`}>
                  {selectedOption === index && (
                    <div className="w-full h-full rounded-full bg-yellow-400" />
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Reveal My Character' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}