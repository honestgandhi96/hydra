import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Timer } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import { supabase } from '../services/supabase';

interface Interview {
  id: string;
  title: string;
  description: string;
  avatar_url: string | null;
  company: string;
  duration_minutes: number;
}

interface InterviewSelectionProps {
  onInterviewStart: (interviewId: string) => void;
}

const InterviewSelection: React.FC<InterviewSelectionProps> = ({ onInterviewStart }) => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching interviews:', error);
      } else {
        setInterviews(data || []);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && selectedInterview) {
      onInterviewStart(selectedInterview);
    }
    return () => clearInterval(timer);
  }, [isCountingDown, countdown, selectedInterview, onInterviewStart]);

  const handleInterviewSelect = (interviewId: string) => {
    setSelectedInterview(interviewId);
    setIsCountingDown(true);
    setCountdown(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Practice Interviews
          </h1>
          <p className="text-gray-600">
            Select a company to start your practice interview
          </p>
        </div>

        {isCountingDown && selectedInterview && (
          <motion.div 
            className="mb-8 rounded-lg bg-white p-4 shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Timer className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{countdown}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-200">
              <motion.div
                className="h-full rounded-full bg-purple-600"
                initial={{ width: "100%" }}
                animate={{ width: `${(countdown / 5) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {interviews.map((interview) => (
            <motion.button
              key={interview.id}
              className={`w-full rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                selectedInterview === interview.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => handleInterviewSelect(interview.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <Avatar.Root className="h-12 w-12 rounded-full overflow-hidden bg-purple-100">
                  <Avatar.Image
                    src={interview.avatar_url || ''}
                    alt={interview.company}
                    className="h-full w-full object-cover"
                  />
                  <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-purple-100 text-purple-600">
                    <Building2 className="h-6 w-6" />
                  </Avatar.Fallback>
                </Avatar.Root>

                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {interview.title}
                  </h3>
                  <p className="text-sm text-gray-500">{interview.description}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <Timer className="mr-1 h-4 w-4" />
                    <span>{interview.duration_minutes}min</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewSelection;