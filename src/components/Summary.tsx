import React from 'react';
import { SummaryData } from '../types';
import { motion } from 'framer-motion';
import { FileDigit, Loader2, VolumeX, Volume2 } from 'lucide-react';

interface SummaryProps {
  summary: SummaryData;
  isSpeaking: boolean;
  onSpeakSummary: () => void;
  onStopSpeaking: () => void;
}

const Summary: React.FC<SummaryProps> = ({ 
  summary, 
  isSpeaking,
  onSpeakSummary,
  onStopSpeaking
}) => {
  const { text, isLoading, error } = summary;

  if (error) {
    return (
      <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-800 shadow-sm">
        <p className="font-medium">Error generating summary:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        className="mt-4 flex items-center justify-center rounded-lg bg-gray-50 p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-600" />
        <span className="text-gray-600">Generating summary...</span>
      </motion.div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <motion.div 
      className="mt-4 rounded-lg bg-teal-50 p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <FileDigit className="mr-2 h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-medium text-gray-900">Summary</h3>
        </div>
        <motion.button
          className="flex items-center rounded-full bg-teal-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-teal-700"
          onClick={isSpeaking ? onStopSpeaking : onSpeakSummary}
          whileTap={{ scale: 0.95 }}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="mr-1 h-4 w-4" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="mr-1 h-4 w-4" />
              <span>Speak</span>
            </>
          )}
        </motion.button>
      </div>
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
};

export default Summary;