import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

interface Interview {
  id: string;
  title: string;
  description: string;
  avatar_url: string;
  company: string;
  duration_minutes: number;
}

interface SpotlightCarouselProps {
  interviews: Interview[];
  onInterviewSelect: (id: string) => void;
}

const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({
  interviews,
  onInterviewSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    // Initialize smooth scroll
    const lenis = new Lenis({
      wrapper: carouselRef.current,
      content: carouselRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'horizontal',
      gestureOrientation: 'horizontal',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP ScrollTrigger for fade-out gradients
    if (containerRef.current && carouselRef.current) {
      const fadeLeft = containerRef.current.querySelector('.fade-left');
      const fadeRight = containerRef.current.querySelector('.fade-right');

      gsap.to(fadeLeft, {
        opacity: 1,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'left left',
          end: '10% left',
          scrub: true,
          horizontal: true,
        },
      });

      gsap.to(fadeRight, {
        opacity: 1,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'right right',
          end: '90% right',
          scrub: true,
          horizontal: true,
        },
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Fade-out gradients */}
      <div className="fade-left pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-base to-transparent opacity-0" />
      <div className="fade-right pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-base to-transparent opacity-0" />

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {interviews.map((interview, index) => (
          <motion.div
            key={interview.id}
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <SpotlightCard
              logoSrc={interview.avatar_url}
              title={interview.title}
              minutes={interview.duration_minutes}
              imageSrc={interview.avatar_url}
              ctaHref={`#interview-${interview.id}`}
              onPlay={() => onInterviewSelect(interview.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpotlightCarousel;