import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface SpotlightCardProps {
  logoSrc: string;
  title: string;
  minutes: number;
  imageSrc: string;
  ctaHref: string;
  onPlay?: () => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  logoSrc,
  title,
  minutes,
  imageSrc,
  ctaHref,
  onPlay
}) => {
  return (
    <motion.div
      className="aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#141014] to-[#1A0F16] bg-opacity-90 p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex h-full flex-col">
        {/* Brand Stack */}
        <div className="text-center">
          <h3 className="font-neue text-xl text-white">{title}</h3>
          <p className="mt-1 text-xs tracking-[0.2em] text-white/60">BY GRAPEVINE</p>
        </div>

        {/* Hero Image */}
        <div className="relative my-8 flex justify-center">
          <div className="h-40 w-40 overflow-hidden rounded-full border-2 border-white/15">
            <img 
              src={imageSrc} 
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Play Button */}
          <motion.button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F28A30] p-3 text-white"
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Play className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Value Prop */}
        <div className="mt-auto text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-neue text-3xl text-white">{minutes}</span>
            <span className="text-2xl">⏱️</span>
          </div>
          <p className="mt-2 text-white/80">AI Interviews</p>
        </div>

        {/* CTA */}
        <motion.a
          href={ctaHref}
          className={cn(
            "mt-6 flex w-full items-center justify-center rounded-full",
            "bg-white/90 py-3 text-[#131A1C] transition-colors hover:bg-white"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mr-2">Start Interview</span>
          <ExternalLink className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default SpotlightCard;