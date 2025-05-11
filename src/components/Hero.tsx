import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1100px] px-4 md:px-8 lg:px-24 pt-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">
        <motion.div 
          className="relative aspect-[4/3] overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Practice Interviews"
            className="w-full h-full object-cover transition-all duration-300 hover:filter-none"
            style={{ filter: 'sepia(0.1)' }}
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-['Canela_Deck'] text-[clamp(3.25rem,6vw,4.75rem)] leading-tight tracking-[-0.02em] text-[#2E1D10]">
            Practice Interviews
          </h1>
          <p className="font-['DM_Serif_Text'] text-xl text-black/70 max-w-[40ch]">
            Curated mock sessions—crafted for ambitious product leaders.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;