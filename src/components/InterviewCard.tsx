import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Timer } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import { cn } from '../lib/utils';

interface Interview {
  id: string;
  title: string;
  description: string;
  avatar_url: string | null;
  company: string;
  duration_minutes: number;
}

interface InterviewCardProps {
  interview: Interview;
  onClick: () => void;
  isSelected: boolean;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onClick, isSelected }) => {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group w-full rounded-xl bg-white p-6 text-left transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-8",
        "hover:translate-y-[-6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
        isSelected && "ring-2 ring-sage"
      )}
      style={{ 
        border: '1px solid rgba(0,0,0,0.06)',
      }}
      whileHover={{ y: -6 }}
      layout
    >
      <div className="flex items-start space-x-4">
        <Avatar.Root className="h-14 w-14 overflow-hidden rounded-full">
          <Avatar.Image
            src={interview.avatar_url || ''}
            alt={interview.company}
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-paper text-charcoal">
            <Building2 className="h-6 w-6" />
          </Avatar.Fallback>
        </Avatar.Root>

        <div className="flex-1">
          <h3 className="font-display text-fluid-h3 font-light text-charcoal">
            {interview.title}
          </h3>
          <p className="mt-1 font-body text-sm text-charcoal/80">
            {interview.description}
          </p>
        </div>

        <div className="ml-4 flex items-center text-sage">
          <Timer className="mr-1 h-4 w-4" />
          <span className="text-sm">{interview.duration_minutes}min</span>
        </div>
      </div>
    </motion.button>
  );
};

export default InterviewCard;