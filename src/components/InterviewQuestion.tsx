import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Timer } from 'lucide-react';
import { InterviewQuestion as IInterviewQuestion } from '../data/interviewQuestions';

interface InterviewQuestionProps {
  question: IInterviewQuestion;
  isActive: boolean;
}

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({ question, isActive }) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      className="rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${difficultyColors[question.difficulty]}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
        <div className="flex items-center text-gray-500">
          <Timer className="mr-1 h-4 w-4" />
          <span className="text-sm">{Math.floor(question.expectedDuration / 60)}min</span>
        </div>
      </div>
      
      <div className="mb-4 flex items-start">
        <MessageSquare className="mr-3 h-5 w-5 flex-shrink-0 text-purple-600" />
        <p className="text-lg font-medium text-gray-800">{question.question}</p>
      </div>
      
      {isActive && (
        <motion.div
          className="mt-2 h-1 rounded-full bg-purple-600"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: question.expectedDuration }}
        />
      )}
    </motion.div>
  );
};

export default InterviewQuestion;