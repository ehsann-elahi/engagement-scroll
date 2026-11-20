import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Mail, Calendar, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DateRevealProps {
  isRevealed: boolean;
  setIsRevealed: (revealed: boolean) => void;
}

export const DateRevealSection: React.FC<DateRevealProps> = ({ isRevealed, setIsRevealed }) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setHasInteracted(true);
      // Trigger a light golden confetti spray
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C6A56B', '#DFCA9E', '#EDE5D6', '#B98783'],
          disableForReducedMotion: true,
        });
      } catch {
        // silent fallback
      }
    } else {
      setIsRevealed(false);
    }
  };

  return (
    <section id="date-reveal" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#FAF8F3] text-[#252A25] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-ultra text-[#B98783] font-medium block mb-2">
            Interactive Invitation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#172D27] font-medium">
            Unfold Our Special Date
          </h2>
          <p className="text-sm sm:text-base text-[#252A25]/70 max-w-lg mx-auto mt-3 font-light">
            {isRevealed
              ? "The invitation has been unveiled below."
              : "Tap the royal wax seal to open the envelope and reveal the official date."}
          </p>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative max-w-lg mx-auto">
          {/* Card / Envelope Presentation */}
          <motion.div
            layout
            onClick={handleReveal}
            role="button"
            tabIndex={0}
            aria-expanded={isRevealed}
            aria-label={isRevealed ? "Click to fold invitation" : "Click to unfold invitation"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleReveal();
              }
            }}
            className="group relative cursor-pointer select-none outline-none"
          >
            {/* The Outer Envelope Body */}
            <div className={`relative p-8 sm:p-12 rounded-3xl transition-all duration-700 ${
              isRevealed
                ? 'bg-[#172D27] text-[#FAF8F3] shadow-2xl border-2 border-[#C6A56B]'
                : 'bg-[#EDE5D6] hover:bg-[#E4DBCB] text-[#252A25] shadow-xl border border-[#C6A56B]/40 hover:border-[#C6A56B]'
            }`}>
              {/* Corner Accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#C6A56B]" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C6A56B]" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#C6A56B]" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#C6A56B]" />

              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  /* Sealed Envelope View */
                  <motion.div
                    key="sealed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="py-8 flex flex-col items-center justify-center space-y-6"
                  >
                    {/* Royal Wax Seal */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DFCA9E] via-[#C6A56B] to-[#99793B] shadow-xl flex items-center justify-center border-4 border-[#FAF8F3]/40"
                      >
                        <div className="w-16 h-16 rounded-full border border-[#FAF8F3]/50 flex flex-col items-center justify-center text-[#172D27]">
                          <span className="font-serif italic font-bold text-lg leading-none">FA</span>
                          <span className="text-[8px] uppercase tracking-widest mt-1 font-bold">2026</span>
                        </div>
                      </motion.div>
                      <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#C6A56B] animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-serif text-xl sm:text-2xl text-[#172D27] font-medium">
                        To Our Honored Guest
                      </p>
                      <p className="text-xs uppercase tracking-widest text-[#B98783] font-semibold">
                        Tap To Break The Seal
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172D27]/5 border border-[#C6A56B]/30 text-xs text-[#252A25]/70">
                      <Mail className="w-3.5 h-3.5 text-[#C6A56B]" />
                      <span>An Invitation Awaits Inside</span>
                    </div>
                  </motion.div>
                ) : (
                  /* Unfolded Invitation Card View */
                  <motion.div
                    key="unfolded"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="py-4 space-y-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C6A56B]/20 text-[#DFCA9E] text-xs uppercase tracking-widest border border-[#C6A56B]/40">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A56B]" />
                      <span>The Date is Revealed</span>
                    </div>

                    <div>
                      <span className="text-xs sm:text-sm uppercase tracking-ultra text-[#C6A56B] block font-medium">
                        SAVE THE DATE
                      </span>
                      <h3 className="font-serif text-4xl sm:text-6xl text-[#FAF8F3] font-normal my-2 tracking-wide">
                        {eventConfig.dateDisplay}
                      </h3>
                      <p className="font-serif italic text-xl sm:text-2xl text-[#DFCA9E]">
                        {eventConfig.yearDisplay}
                      </p>
                    </div>

                    <OrnamentalDivider className="my-4" light />

                    <div className="space-y-1 text-sm tracking-wider uppercase text-[#EDE5D6]">
                      <p className="text-[#C6A56B] font-semibold text-lg">{eventConfig.timeDisplay}</p>
                      <p className="text-xs text-[#EDE5D6]/80">{eventConfig.timezone} (Pakistan Standard Time)</p>
                      <p className="pt-2 text-sm text-[#FAF8F3] font-serif">{eventConfig.venue}</p>
                    </div>

                    <div className="pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#C6A56B] tracking-widest uppercase hover:underline">
                        <Check className="w-4 h-4" />
                        <span>Tap to fold back</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
