export interface Character {
  name: string;
  description: string;
  traits: string[];
  house: string;
  quote: string;
  funnyExplanation: string;
  careerPaths: string[];
  careerExplanation: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    traits: string[];
  }[];
}

export interface UserResponse {
  questionId: string;
  selectedTraits: string[];
}