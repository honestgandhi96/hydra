import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterCTAProps {
  onBeginPractice: () => void;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ onBeginPractice }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    gsap.to(headlineRef.current, {
      letterSpacing: "0.05em",
      scrollTrigger: {
        trigger: headlineRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE7E2] py-6">
      <div className="mx-auto max-w-[1100px] px-4 md:px-8 lg:px-24">
        <div className="flex items-center justify-between">
          <h2 
            ref={headlineRef}
            className="font-['DM_Serif_Text'] text-2xl text-[#2E1D10]"
          >
            Start interviewing today
          </h2>
          <button 
            onClick={onBeginPractice}
            className="bg-[#2E1D10] text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
          >
            Begin Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterCTA;