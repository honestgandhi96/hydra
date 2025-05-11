import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { supabase } from '../services/supabase';
import InterviewCard from './InterviewCard';
import { cn } from '../lib/utils';

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
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [filter, setFilter] = useState('all');

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

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'pm', label: 'Product' },
    { id: 'swe', label: 'Engineering' },
    { id: 'ds', label: 'Data Science' },
  ];

  return (
    <div className="min-h-screen bg-base px-6 py-section">
      <div className="mx-auto max-w-[900px]">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-fluid-h1 font-light text-charcoal">
            Practice Interviews
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Select a company to start your mock session
          </p>
        </motion.div>

        <div className="mb-12 flex justify-center space-x-3">
          {filterCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm transition-colors",
                filter === category.id
                  ? "bg-sage text-white"
                  : "bg-paper text-charcoal hover:bg-sage/10"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="grid gap-6"
          layout
        >
          <AnimatePresence>
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                onClick={() => setSelectedInterview(interview)}
                isSelected={selectedInterview?.id === interview.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog.Root open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay 
            className="fixed inset-0 bg-midnight/40 backdrop-blur-[8px]"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-lg"
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <Dialog.Title className="font-display text-2xl font-light text-charcoal">
                Start Interview
              </Dialog.Title>
              <Dialog.Close className="rounded-full p-2 text-charcoal/60 hover:bg-paper">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            {selectedInterview && (
              <>
                <p className="text-charcoal/80">
                  You're about to start a {selectedInterview.duration_minutes}-minute interview with {selectedInterview.company}. 
                  Are you ready to begin?
                </p>

                <div className="mt-8 flex justify-end space-x-4">
                  <Dialog.Close 
                    className="rounded-lg px-4 py-2 text-charcoal/60 hover:bg-paper"
                  >
                    Cancel
                  </Dialog.Close>
                  <button
                    onClick={() => onInterviewStart(selectedInterview.id)}
                    className="rounded-lg bg-sage px-6 py-2 font-medium text-white hover:bg-sage/90"
                  >
                    Start Now
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Mobile sticky CTA */}
      {selectedInterview && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 border-t border-paper bg-white p-4 md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
        >
          <button
            onClick={() => onInterviewStart(selectedInterview.id)}
            className="w-full rounded-lg bg-sage py-3 text-center font-medium text-white"
          >
            Start Interview
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default InterviewSelection;