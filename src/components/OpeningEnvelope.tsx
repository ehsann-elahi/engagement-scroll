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

    // 1. Play wax break sound & start background music immediately
    soundEngine.playSealBreak();
    soundEngine.startBackgroundMusic();

    // 2. Trigger Gold, Starlight White, and Celestial Blue stardust confetti shower
    try {
      const count = 120;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#ECC872', '#FFF1C5', '#F5DE98', '#C99B3B', '#D4E5F7', '#FFFFFF'],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.6),
        spread: 70,
        startVelocity: 40,
      });
      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.4),
        spread: 120,
        startVelocity: 50,
      });
    } catch {
      // silent fallback
    }

    // 3. Complete opening transition
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#050811]"
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #132448 0%, #0B1226 55%, #050811 100%)',
      }}
    >
      {/* Decorative luxury corner borders in Champagne Gold */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#ECC872]/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#ECC872]/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#ECC872]/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#ECC872]/40 pointer-events-none" />

      {/* Floating ambient diamond sparkles */}
      <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#ECC872] animate-ping pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#FFF1C5] animate-pulse pointer-events-none" />
      <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 rounded-full bg-[#D4E5F7] animate-ping pointer-events-none [animation-delay:1.5s]" />

      <div className="relative z-10 w-full max-w-xl text-center space-y-6 my-auto py-8">
        {/* Holy Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-2"
        >
          <p className="font-arabic text-3xl sm:text-5xl md:text-6xl text-[#ECC872] select-none leading-[2.3] pb-1 drop-shadow-[0_2px_15px_rgba(236,200,114,0.4)]">
            {eventConfig.bismillahArabic}
          </p>
          <p className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#D4E5F7]/80 font-sans font-semibold">
            With the blessings of Allah
          </p>
        </motion.div>

        {/* 3D Envelope Presentation Card in Midnight Obsidian & Gold Foil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{
            opacity: 1,
            scale: isOpening ? [1, 1.03, 0.96] : 1,
            y: 0,
          }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="crystal-card sheen-card relative mx-auto w-full max-w-md p-8 sm:p-11 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] border border-[#ECC872]/35 backdrop-blur-2xl overflow-hidden"
        >
          {/* Filigree Inner Border */}
          <div className="absolute inset-2 border border-[#ECC872]/20 rounded-2xl pointer-events-none" />

          {/* Invitation Lead */}
          <div className="space-y-1.5 mb-6">
            <span className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#ECC872] font-bold block">
              You Are Cordially Invited
            </span>
            <span className="text-xs uppercase tracking-widest text-[#CBD5E1]/80 font-light block">
              To Celebrate the Engagement of
            </span>
          </div>

          {/* Couple Names Centerpiece */}
          <div className="my-6 space-y-1.5">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F8FAFC] font-medium tracking-wide">
              {eventConfig.groom}
            </h1>
            <span className="font-serif italic text-2xl text-[#ECC872] block">&</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F8FAFC] font-medium tracking-wide">
              {eventConfig.bride}
            </h1>
          </div>

          {/* Date & Venue Teaser */}
          <div className="text-[11px] uppercase tracking-widest text-[#CBD5E1] pt-4 border-t border-[#ECC872]/25 font-medium flex items-center justify-center gap-2">
            <span className="text-[#FFF1C5] font-semibold">{eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
            <span className="text-[#ECC872]">•</span>
            <span>{eventConfig.timeDisplay}</span>
          </div>

          {/* Tactile Wax Seal Button with Concentric Animated Ring Pulses */}
          <div className="mt-8 flex flex-col items-center relative">
            {/* Concentric Animated Ripple Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#ECC872]/35 animate-ring-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#D4E5F7]/15 animate-ring-pulse pointer-events-none [animation-delay:1.4s]" />

            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              disabled={isOpening}
              aria-label="Open your engagement invitation"
              className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ECC872] z-10"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#ECC872] to-[#8F6A1E] shadow-[0_10px_30px_rgba(236,200,114,0.4)] flex items-center justify-center border-2 border-[#FFF1C5] group-hover:shadow-[0_0_35px_rgba(236,200,114,0.6)] transition-all">
                <div className="w-14 h-14 rounded-full border border-[#ECC872]/60 flex flex-col items-center justify-center text-[#F8FAFC] shadow-inner bg-gradient-to-br from-[#0B1226] to-[#050811]">
                  <span className="font-serif italic font-bold text-base leading-none text-[#ECC872]">FA</span>
                  <span className="text-[8px] uppercase tracking-widest mt-1 font-bold text-[#FFF1C5]">2026</span>
                </div>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#ECC872] animate-bounce" />
            </motion.button>

            {/* Explicit Prompt Button */}
            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isOpening}
              className="mt-7 inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#ECC872] via-[#FFF1C5] to-[#ECC872] text-[#050811] text-xs uppercase tracking-widest font-bold shadow-[0_10px_25px_rgba(236,200,114,0.3)] hover:shadow-[0_15px_35px_rgba(236,200,114,0.45)] transition-all duration-300 z-10 cursor-pointer"
            >
              <MailOpen className="w-4 h-4 text-[#050811]" />
              <span>{isOpening ? 'Unfolding Experience...' : 'Open Your Invitation'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs uppercase tracking-widest text-[#CBD5E1]/70 font-medium"
        >
          {eventConfig.venue}
        </motion.p>
      </div>
    </motion.div>
  );
};
