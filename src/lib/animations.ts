import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const luxuryReveal = (elements: Element[]) => {
  if (prefersReducedMotion) {
    // Simple fade for users who prefer reduced motion
    return gsap.to(elements, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // Clip path reveal animation
  return gsap.to(elements, {
    clipPath: 'inset(0 0 0 0)',
    duration: 0.9,
    stagger: 0.07,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  });
};

export const kenBurns = (element: Element) => {
  if (prefersReducedMotion) return;

  return gsap.to(element, {
    scale: 1.08,
    duration: 12,
    ease: 'none',
    yoyo: true,
    repeat: -1
  });
};

export const hoverTighten = (element: Element) => {
  if (prefersReducedMotion) return;

  return gsap.to(element, {
    letterSpacing: 0,
    duration: 0.25,
    ease: 'power2.out'
  });
};

export const initLuxuryReveal = () => {
  // Batch the animations for better performance
  ScrollTrigger.batch('.luxury-row-card', {
    onEnter: (elements) => luxuryReveal(elements),
    start: 'top bottom-=100',
    once: true
  });
};