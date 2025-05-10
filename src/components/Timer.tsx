import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  isCountdown?: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete, isCountdown = false }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setProgress((duration - (timeLeft - 1)) / duration * 100);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onComplete();
    }
  }, [timeLeft, duration, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="flex items-center space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <TimerIcon className="h-5 w-5 text-purple-600" />
        <span className="text-lg font-semibold text-gray-900">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <Progress.Root
        className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
        value={progress}
      >
        <Progress.Indicator
          className="h-full w-full bg-purple-600 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </motion.div>
  );
};

export default Timer;