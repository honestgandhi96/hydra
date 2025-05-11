import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowRight, Timer, X } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Dialog from '@radix-ui/react-dialog';
import { supabase } from '../services/supabase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from '@studio-freight/lenis';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger, Flip);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

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
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize magnetic cursor effect
    if (typeof window !== 'undefined' && cursorRef.current) {
      const cursor = cursorRef.current;
      const cards = document.querySelectorAll('.interview-card');

      const onMouseMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          );

          if (distance < 120) {
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const force = (120 - distance) / 120;
            gsap.to(card, {
              x: Math.cos(angle) * 20 * force,
              y: Math.sin(angle) * 20 * force,
              duration: 0.3,
              ease: 'power2.out',
            });
          } else {
            gsap.to(card, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [interviews]);

  const handleCardClick = (interview: Interview) => {
    const state = Flip.getState('.interview-card');
    setSelectedInterview(interview);
    Flip.from(state, {
      duration: 0.5,
      ease: 'power2.inOut',
      absolute: true,
      toggleClass: 'flipping',
    });
  };

  const filterCategories = [
    { id: 'all', label: 'All' },
    { id: 'pm', label: 'Product' },
    { id: 'swe', label: 'Engineering' },
    { id: 'ds', label: 'Data Science' },
  ];

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-gradient-radial from-[#0D011F] to-[#1B064C] p-4 md:p-8"
    >
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 mix-blend-difference backdrop-blur-xl"
      />

      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Pick Your Challenge
          </h1>
          <p className="text-lg text-gray-300">
            Select a company to start your practice interview
          </p>
        </motion.div>

        <div className="sticky top-4 z-10 mb-8 flex justify-center space-x-4">
          {filterCategories.map((category) => (
            <motion.button
              key={category.id}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all",
                filter === category.id
                  ? "bg-[#B46CFF] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              )}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div 
          ref={cardsRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {interviews.map((interview) => (
              <motion.div
                key={interview.id}
                layoutId={`card-${interview.id}`}
                className="interview-card group relative overflow-hidden rounded-xl bg-white/5 p-6 backdrop-blur-md transition-all hover:translate-y-[-8px] hover:shadow-2xl"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                }}
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      className="w-full text-left"
                      onClick={() => handleCardClick(interview)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar.Root className="h-16 w-16 overflow-hidden rounded-full bg-purple-100">
                          <Avatar.Image
                            src={interview.avatar_url || ''}
                            alt={interview.company}
                            className="h-full w-full object-cover"
                          />
                          <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-purple-100 text-purple-600">
                            <Building2 className="h-8 w-8" />
                          </Avatar.Fallback>
                        </Avatar.Root>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white">
                            {interview.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {interview.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center text-gray-300">
                          <Timer className="mr-1 h-4 w-4" />
                          <span>{interview.duration_minutes}min</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-[#B46CFF] transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#1B064C] p-8 shadow-2xl">
                      <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">
                          Start Interview
                        </h2>
                        <Dialog.Close className="rounded-full p-2 text-gray-400 hover:bg-white/10">
                          <X className="h-5 w-5" />
                        </Dialog.Close>
                      </div>

                      <div className="mb-8">
                        <p className="text-gray-300">
                          You're about to start a {interview.duration_minutes}-minute interview with {interview.company}. 
                          Are you ready to begin?
                        </p>
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Dialog.Close className="rounded-lg px-4 py-2 text-gray-300 hover:bg-white/10">
                          Cancel
                        </Dialog.Close>
                        <button
                          onClick={() => onInterviewStart(interview.id)}
                          className="rounded-lg bg-[#B46CFF] px-6 py-2 font-medium text-white hover:bg-[#E7BFFF]"
                        >
                          Start Now
                        </button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InterviewSelection;