import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, BarChart } from 'lucide-react';

interface InterviewFeedbackProps {
  score: number;
  feedback: string;
  correction: string;
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({ score, feedback, correction }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      className="mt-6 rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Feedback</h3>
        <div className={`flex items-center ${getScoreColor(score)}`}>
          <BarChart className="mr-2 h-5 w-5" />
          <span className="text-xl font-bold">{score}/100</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            {score >= 70 ? (
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="mr-2 h-5 w-5 text-red-600" />
            )}
            <h4 className="font-medium text-gray-900">Feedback</h4>
          </div>
          <p className="text-gray-700">{feedback}</p>
        </div>

        <div className="rounded-lg bg-purple-50 p-4">
          <h4 className="mb-2 font-medium text-purple-900">Improved Answer</h4>
          <p className="text-purple-800">{correction}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewFeedback;