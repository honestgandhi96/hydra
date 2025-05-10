import React from 'react';
import { TranscriptData } from '../types';
import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';

interface TranscriptProps {
  transcript: TranscriptData;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript }) => {
  const { text, isLoading, error } = transcript;
  
  if (error) {
    return (
      <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-800 shadow-sm">
        <p className="font-medium">Error getting transcript:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        className="mt-6 flex items-center justify-center rounded-lg bg-gray-50 p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-purple-600" />
        <span className="text-gray-600">Transcribing your speech...</span>
      </motion.div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <motion.div 
      className="mt-6 rounded-lg bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-2 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900">Transcript</h3>
      </div>
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
};

export default Transcript;