import { create } from 'zustand';
import { InterviewState, initialInterviewState, interviewQuestions } from '../data/interviewQuestions';

interface InterviewStore extends InterviewState {
  setAnswer: (questionId: number, answer: string) => void;
  setScore: (questionId: number, score: number) => void;
  setFeedback: (questionId: number, feedback: string) => void;
  setCorrection: (questionId: number, correction: string) => void;
  nextQuestion: () => void;
  setOverallScore: (score: number) => void;
  completeInterview: () => void;
  resetInterview: () => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialInterviewState,
  
  setAnswer: (questionId: number, answer: string) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    })),
    
  setScore: (questionId: number, score: number) =>
    set((state) => ({
      scores: { ...state.scores, [questionId]: score }
    })),
    
  setFeedback: (questionId: number, feedback: string) =>
    set((state) => ({
      feedback: { ...state.feedback, [questionId]: feedback }
    })),
    
  setCorrection: (questionId: number, correction: string) =>
    set((state) => ({
      corrections: { ...state.corrections, [questionId]: correction }
    })),
    
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        interviewQuestions.length - 1
      )
    })),
    
  setOverallScore: (score: number) =>
    set(() => ({
      overallScore: score
    })),
    
  completeInterview: () =>
    set(() => ({
      isComplete: true
    })),
    
  resetInterview: () =>
    set(() => ({
      ...initialInterviewState
    }))
}));