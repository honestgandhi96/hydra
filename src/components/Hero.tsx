import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !headlineRef.current || !contentRef.current) return;

    // Ken Burns effect on hero image
    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 12,
      ease: 'none',
      yoyo: true,
      repeat: -1
    });

    // Clip path animation for content
    gsap.fromTo(
      contentRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center',
          end: 'bottom center',
        }
      }
    );
  }, []);

  return (
    <div className="relative min-h-hero overflow-hidden">
      <div className="mx-auto grid h-full max-w-content grid-cols-1 items-center gap-12 px-6 pt-[120px] lg:grid-cols-[60%_40%]">
        <motion.div 
          className="relative aspect-[4/3] overflow-hidden rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            ref={imageRef}
            src="https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg"
            alt="Modern office meeting space"
            className="h-full w-full object-cover transition-all duration-700 hover:filter-none"
            style={{ filter: 'sepia(0.1)' }}
          />
        </motion.div>

        <div ref={contentRef} className="space-y-8">
          <motion.h1 
            ref={headlineRef}
            className="font-canela text-[clamp(3.5rem,6vw,5rem)] leading-[1.1] tracking-tightest text-espresso"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Next Round Starts Here
          </motion.h1>
          
          <motion.p 
            className="font-dm-serif text-xl text-espresso/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Curated mock sessions built for ambitious product leaders.
          </motion.p>

          <motion.button
            className="group relative overflow-hidden rounded-lg bg-parchment px-8 py-4 text-espresso transition-all hover:bg-espresso hover:text-parchment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center font-medium">
              Start Interviewing
              <svg 
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;