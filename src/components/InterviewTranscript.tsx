import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock } from 'lucide-react';

interface InterviewTranscriptProps {
  transcript: string;
  timestamp: string;
}

const InterviewTranscript: React.FC<InterviewTranscriptProps> = ({ transcript, timestamp }) => {
  if (!transcript) return null;

  return (
    <motion.div
      className="mt-6 rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-medium text-gray-900">Your Answer</h3>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" />
          <span>{timestamp}</span>
        </div>
      </div>
      <p className="text-gray-700">{transcript}</p>
    </motion.div>
  );
};

export default InterviewTranscript