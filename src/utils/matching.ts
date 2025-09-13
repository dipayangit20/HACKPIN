import { Character } from '../types';
import { characters } from '../data/characters';
import { UserResponse } from '../types';

export function matchCharacter(responses: UserResponse[]): Character {
  // Count trait frequencies from all responses
  const traitCounts: Record<string, number> = {};
  
  responses.forEach(response => {
    response.selectedTraits.forEach(trait => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });
  });

  // Find the character with the most matching traits
  let bestMatch = characters[0];
  let bestScore = 0;

  characters.forEach(character => {
    let score = 0;
    character.traits.forEach(trait => {
      if (traitCounts[trait]) {
        score += traitCounts[trait];
      }
    });
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = character;
    }
  });

  return bestMatch;
}