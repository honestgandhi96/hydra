import React from 'react';
import { ChevronRight } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';

interface LuxuryRowCardProps {
  logoSrc: string;
  company: string;
  blurb: string;
  minutes: number;
  href: string;
}

const LuxuryRowCard: React.FC<LuxuryRowCardProps> = ({
  logoSrc,
  company,
  blurb,
  minutes,
  href
}) => {
  return (
    <button
      className="group w-full grid grid-cols-[1fr_auto] items-center gap-x-8 p-6 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.07)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C2AE] focus-visible:ring-offset-2"
      onClick={() => window.location.href = href}
      aria-label={`Start ${minutes}-minute ${company} PM interview`}
    >
      <div className="flex items-center gap-x-8">
        <Avatar.Root className="h-14 w-14 rounded-full overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
          <Avatar.Image
            src={logoSrc}
            alt={company}
            className="h-full w-full object-cover"
          />
          <Avatar.Fallback className="h-full w-full flex items-center justify-center bg-[#F5F0EB] text-[#2E1D10]">
            {company[0]}
          </Avatar.Fallback>
        </Avatar.Root>

        <div>
          <h3 className="text-[1.25rem] font-normal text-[#2E1D10] tracking-[-0.02em] transition-[letter-spacing] group-hover:tracking-[0em]">
            {company}
          </h3>
          <p className="text-sm leading-relaxed text-black/70 mt-0.5 max-w-[60ch]">
            {blurb}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-6">
        <span className="inline-flex px-2 py-0.5 rounded bg-[#D4C2AE]/40 text-[#2E1D10] text-xs">
          {minutes} min
        </span>
        <ChevronRight className="w-4 h-4 text-[#D4C2AE] transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};

export default LuxuryRowCard;