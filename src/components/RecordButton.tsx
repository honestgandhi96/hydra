import React from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RecordingState } from '../types';

interface RecordButtonProps {
  recordingState: RecordingState;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ 
  recordingState, 
  onStartRecording, 
  onStopRecording 
}) => {
  const { isRecording, isProcessing } = recordingState;

  // Button variants based on recording state
  const getButtonStyles = () => {
    if (isProcessing) {
      return 'bg-gray-500 hover:bg-gray-600 cursor-wait';
    }
    
    if (isRecording) {
      return 'bg-red-500 hover:bg-red-600';
    }
    
    return 'bg-purple-600 hover:bg-purple-700';
  };

  return (
    <motion.button
      className={`relative flex items-center justify-center rounded-full p-4 text-white shadow-lg ${getButtonStyles()}`}
      onClick={isRecording ? onStopRecording : onStartRecording}
      disabled={isProcessing}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1 }}
      animate={isRecording ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={isRecording ? { 
        repeat: Infinity, 
        duration: 1.5,
        ease: "easeInOut" 
      } : {}}
    >
      {isProcessing ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : isRecording ? (
        <Square className="h-8 w-8" />
      ) : (
        <Mic className="h-8 w-8" />
      )}
      
      {/* Pulse animation for recording state */}
      {isRecording && (
        <motion.span
          className="absolute inset-0 rounded-full bg-red-500 opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
};

export default RecordButton;