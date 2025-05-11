import React, { useEffect, useRef } from 'react';
import { initLuxuryReveal } from '../lib/animations';
import LuxuryRowCard from './LuxuryRowCard';
import { supabase } from '../services/supabase';

interface Interview {
  id: string;
  title: string;
  description: string;
  avatar_url: string | null;
  company: string;
  duration_minutes: number;
}

const InterviewList: React.FC = () => {
  const [interviews, setInterviews] = React.useState<Interview[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) {
        setInterviews(data);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    if (interviews.length > 0) {
      initLuxuryReveal();
    }
  }, [interviews]);

  return (
    <div ref={containerRef} className="mx-auto max-w-[1100px] px-4 md:px-8 lg:px-24">
      <div className="space-y-px">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="luxury-row-card opacity-0"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <LuxuryRowCard
              logoSrc={interview.avatar_url || ''}
              company={interview.company}
              blurb={interview.description}
              minutes={interview.duration_minutes}
              href={`/interview/${interview.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;