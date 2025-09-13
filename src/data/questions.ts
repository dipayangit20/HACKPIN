import { Question } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    text: 'What would you do if you found a mysterious book that whispers to you?',
    options: [
      {
        text: 'Research its history thoroughly before touching it',
        traits: ['intelligent', 'studious', 'perfectionist']
      },
      {
        text: 'Ask friends for advice and investigate together',
        traits: ['loyal', 'family-oriented', 'protective']
      },
      {
        text: 'Listen to what it has to say - it might be interesting',
        traits: ['creative', 'intuitive', 'open-minded']
      },
      {
        text: 'Use it to gain an advantage over others',
        traits: ['ambitious', 'competitive', 'secretive']
      }
    ]
  },
  {
    id: '2',
    text: 'Your ideal way to spend a weekend is:',
    options: [
      {
        text: 'Reading in a cozy library or learning something new',
        traits: ['intelligent', 'studious', 'wise']
      },
      {
        text: 'Hanging out with friends and having adventures',
        traits: ['loyal', 'brave', 'humorous']
      },
      {
        text: 'Exploring nature or creating art',
        traits: ['creative', 'peaceful', 'nature-loving']
      },
      {
        text: 'Planning future goals and networking',
        traits: ['ambitious', 'strategic', 'competitive']
      }
    ]
  },
  {
    id: '3',
    text: 'When facing a difficult challenge, you:',
    options: [
      {
        text: 'Research every possible solution methodically',
        traits: ['intelligent', 'perfectionist', 'studious']
      },
      {
        text: 'Jump in to help others, even if it\'s risky',
        traits: ['brave', 'selfless', 'protective']
      },
      {
        text: 'Trust your intuition and think outside the box',
        traits: ['intuitive', 'creative', 'eccentric']
      },
      {
        text: 'Find a way to turn it to your advantage',
        traits: ['ambitious', 'strategic', 'intelligent']
      }
    ]
  },
  {
    id: '4',
    text: 'What motivates you most?',
    options: [
      {
        text: 'The pursuit of knowledge and excellence',
        traits: ['intelligent', 'perfectionist', 'growth-minded']
      },
      {
        text: 'Protecting and helping the people you care about',
        traits: ['loyal', 'protective', 'selfless']
      },
      {
        text: 'Following your unique path and being authentic',
        traits: ['free-spirited', 'creative', 'rebellious']
      },
      {
        text: 'Achieving your goals and proving yourself',
        traits: ['ambitious', 'determined', 'competitive']
      }
    ]
  },
  {
    id: '5',
    text: 'How do others typically see you?',
    options: [
      {
        text: 'The reliable one who always has the right answer',
        traits: ['helpful', 'intelligent', 'perfectionist']
      },
      {
        text: 'The loyal friend who\'s always there when needed',
        traits: ['loyal', 'kind', 'humble']
      },
      {
        text: 'The unique one who thinks differently',
        traits: ['eccentric', 'creative', 'wise']
      },
      {
        text: 'The ambitious one with high standards',
        traits: ['ambitious', 'proud', 'intense']
      }
    ]
  },
  {
    id: '6',
    text: 'Your biggest fear is:',
    options: [
      {
        text: 'Failing an important test or letting others down',
        traits: ['perfectionist', 'helpful', 'insecure']
      },
      {
        text: 'Losing the people you care about',
        traits: ['loyal', 'family-oriented', 'protective']
      },
      {
        text: 'Being forced to conform and lose your uniqueness',
        traits: ['free-spirited', 'rebellious', 'creative']
      },
      {
        text: 'Not achieving your potential or being seen as weak',
        traits: ['ambitious', 'proud', 'determined']
      }
    ]
  }
];