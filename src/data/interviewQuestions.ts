export interface InterviewQuestion {
  id: number;
  question: string;
  category: 'strategy' | 'execution' | 'leadership' | 'technical';
  difficulty: 'easy' | 'medium' | 'hard';
  expectedDuration: number; // in seconds
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "How would you prioritize features in a product backlog?",
    category: "strategy",
    difficulty: "medium",
    expectedDuration: 120
  },
  {
    id: 2,
    question: "Describe a time when you had to make a difficult product decision with incomplete information.",
    category: "leadership",
    difficulty: "hard",
    expectedDuration: 180
  },
  {
    id: 3,
    question: "How do you measure the success of a product?",
    category: "execution",
    difficulty: "medium",
    expectedDuration: 120
  },
  {
    id: 4,
    question: "Explain how you would conduct user research for a new feature.",
    category: "execution",
    difficulty: "easy",
    expectedDuration: 90
  },
  {
    id: 5,
    question: "How would you handle a situation where your team disagrees with your product vision?",
    category: "leadership",
    difficulty: "hard",
    expectedDuration: 180
  }
];

export interface InterviewState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  scores: Record<number, number>;
  feedback: Record<number, string>;
  corrections: Record<number, string>;
  overallScore: number | null;
  isComplete: boolean;
}

export const initialInterviewState: InterviewState = {
  currentQuestionIndex: 0,
  answers: {},
  scores: {},
  feedback: {},
  corrections: {},
  overallScore: null,
  isComplete: false
};