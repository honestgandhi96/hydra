import React from 'react';
import { motion } from 'framer-motion';
import { Award, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useInterviewStore } from '../store/interviewStore';
import { interviewQuestions } from '../data/interviewQuestions';

interface InterviewSummaryProps {
  onRestart: () => void;
}

const InterviewSummary: React.FC<InterviewSummaryProps> = ({ onRestart }) => {
  const { scores, overallScore } = useInterviewStore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <motion.div
      className="rounded-lg bg-white p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 text-center">
        <div className="mb-4 flex justify-center">
          <Award className="h-16 w-16 text-purple-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Interview Complete!</h2>
        <div className={`inline-block rounded-full px-4 py-2 text-xl font-bold ${getScoreColor(overallScore || 0)}`}>
          Overall Score: {overallScore}/100
        </div>
      </div>

      <div className="mb-6 space-y-4">
        {interviewQuestions.map((question) => (
          <div key={question.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div className="flex items-center">
              {(scores[question.id] || 0) >= 70 ? (
                <CheckCircle className="mr-3 h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="mr-3 h-5 w-5 text-red-600" />
              )}
              <span className="text-gray-700">{question.question}</span>
            </div>
            <span className={`font-medium ${getScoreColor(scores[question.id] || 0)}`}>
              {scores[question.id] || 0}/100
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Start New Interview
      </button>
    </motion.div>
  );
};

export default InterviewSummary;