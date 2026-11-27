import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { soundEngine } from '../audio/soundscape';
import { Sparkles, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningEnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ isOpen, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    soundEngine.playSealBreak();
    soundEngine.startBackgroundMusic();

    try {
      const defaults = {
        origin: { y: 0.58 },
        colors: ['#ECC872', '#FFF1C5', '#F5DE98', '#C99B3B', '#FFFFFF', '#DBEAFE'],
        disableForReducedMotion: true,
      };
      confetti({ ...defaults, particleCount: 75, spread: 72, startVelocity: 40 });
      confetti({ ...defaults, particleCount: 50, spread: 120, startVelocity: 48 });
    } catch {
      // silent fallback
    }

    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#142038]"
      style={{
        background:
          'radial-gradient(circle at 50% 24%, #233862 0%, #162542 52%, #0F1A2F 100%)',
      }}
    >
      {/* Subtle architectural corner framing lines in Champagne Gold */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#ECC872]/45 pointer-events-none" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#ECC872]/45 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#ECC872]/45 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#ECC872]/45 pointer-events-none" />

      {/* Soft twilight sapphire & warm gold atmospheric pools */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#385994]/28 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-12%] left-[-5%] w-96 h-96 rounded-full bg-[#ECC872]/12 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl text-center space-y-6 my-auto py-6">
        {/* Bismillah in Luminous Champagne Gold */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <p className="font-arabic text-3xl sm:text-5xl text-[#ECC872] select-none leading-[1.9] pb-2 drop-shadow-[0_4px_20px_rgba(236,200,114,0.38)]">
            {eventConfig.bismillahArabic}
          </p>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#E2E8F0] font-sans font-medium">
            With the blessings of Allah
          </p>
        </motion.div>

        {/* Architectural 3D Folded Silk Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="perspective-1200 relative mx-auto w-full max-w-[440px]"
        >
          <div className="relative azure-glass-strong rounded-[28px] pt-10 pb-9 px-7 sm:px-10 overflow-visible shadow-[0_32px_80px_-16px_rgba(5,11,24,0.65)]">
            {/* Clipped Flap & Diagonal Envelope Seam Layer */}
            <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  rotateX: isOpening ? -160 : 0,
                  opacity: isOpening ? 0.45 : 1,
                }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: 'top center',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
                className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#ECC872]/18 to-transparent border-t border-[#ECC872]/35"
              />

              <svg
                viewBox="0 0 440 120"
                className="absolute top-0 left-0 w-full h-28 opacity-45"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="0" x2="220" y2="112" stroke="#ECC872" strokeWidth="1" />
                <line x1="440" y1="0" x2="220" y2="112" stroke="#ECC872" strokeWidth="1" />
              </svg>
            </div>

            {/* Inner Rising Invitation Content */}
            <motion.div
              animate={{
                y: isOpening ? -28 : 0,
                scale: isOpening ? 1.03 : 1,
              }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 space-y-5 pt-4"
            >
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-[0.26em] text-[#ECC872] font-bold block">
                  You Are Cordially Invited
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#CBD5E1] font-light block">
                  To Celebrate the Engagement of
                </span>
              </div>

              {/* Couple Names in Pure Luminous White */}
              <div className="py-1 space-y-1">
                <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium tracking-wide drop-shadow-[0_2px_14px_rgba(5,11,24,0.45)]">
                  {eventConfig.groom}
                </h1>
                <span className="font-serif italic text-2xl sm:text-3xl gold-text-foil block">
                  &amp;
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium tracking-wide drop-shadow-[0_2px_14px_rgba(5,11,24,0.45)]">
                  {eventConfig.bride}
                </h1>
              </div>

              {/* Date & Time Bar */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#ECC872]/25 text-xs uppercase tracking-[0.22em] text-[#F8FAFC] font-medium">
                <span className="text-[#FFF1C5] font-semibold">{eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
                <span className="w-1 h-1 rounded-full bg-[#ECC872]" />
                <span>{eventConfig.timeDisplay}</span>
              </div>

              {/* Tactile Champagne Gold Wax Seal & Foil CTA Button */}
              <div className="pt-4 flex flex-col items-center relative">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute w-28 h-28 rounded-full border border-[#ECC872]/40 animate-orbital-ripple pointer-events-none" />
                  <div className="absolute w-36 h-36 rounded-full border border-[#FFF1C5]/20 animate-orbital-ripple [animation-delay:1.4s] pointer-events-none" />

                  <motion.button
                    onClick={handleOpenInvitation}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.93 }}
                    disabled={isOpening}
                    aria-label="Open your engagement invitation"
                    className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ECC872] rounded-full z-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#ECC872] to-[#B08328] shadow-[0_12px_32px_rgba(236,200,114,0.38)] flex items-center justify-center border-2 border-[#FFF1C5] transition-transform duration-300">
                      <div className="w-[60px] h-[60px] rounded-full border border-[#ECC872]/60 flex flex-col items-center justify-center bg-gradient-to-br from-[#1A2B4C] to-[#101B31]">
                        <span className="font-serif italic font-bold text-lg leading-none text-[#ECC872]">
                          FA
                        </span>
                        <span className="text-[8px] uppercase tracking-widest mt-1 font-bold text-[#FFF1C5]">
                          2026
                        </span>
                      </div>
                    </div>
                    <Sparkles className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[#ECC872] animate-star-glint drop-shadow" />
                  </motion.button>
                </div>

                <motion.button
                  onClick={handleOpenInvitation}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isOpening}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ECC872] via-[#FFF1C5] to-[#ECC872] text-[#0F1A2F] text-xs uppercase tracking-[0.22em] font-bold shadow-[0_12px_30px_rgba(236,200,114,0.34)] hover:shadow-[0_16px_38px_rgba(236,200,114,0.48)] transition-all duration-300 cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 text-[#0F1A2F]" />
                  <span>{isOpening ? 'Opening Invitation...' : 'Open Your Invitation'}</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Clean Venue Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-xs uppercase tracking-[0.24em] text-[#CBD5E1] font-medium"
        >
          {eventConfig.venue} · Faisalabad
        </motion.p>
      </div>
    </motion.div>
  );
};
