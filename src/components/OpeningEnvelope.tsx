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

    // 2. Trigger Royal Sapphire, Powder Blue, and Gold stardust confetti shower
    try {
      const count = 100;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#1B365D', '#D4E5F7', '#C6A56B', '#F6E2A0', '#FFFFFF', '#2A4D77'],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.6),
        spread: 65,
        startVelocity: 38,
      });
      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.4),
        spread: 110,
        startVelocity: 48,
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
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{
        background:
          'radial-gradient(ellipse at 15% 15%, rgba(186, 215, 248, 0.65), transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(214, 234, 255, 0.75), transparent 55%), #FFFFFF',
      }}
    >
      {/* Decorative luxury corner borders in royal blue & gold */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#1B365D]/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#1B365D]/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#1B365D]/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#1B365D]/30 pointer-events-none" />

      {/* Floating ambient diamond sparkles */}
      <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#1B365D]/40 animate-ping pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#C6A56B]/60 animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl text-center space-y-5 my-auto py-8">
        {/* Holy Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-1.5"
        >
          <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#8a6a24] select-none leading-[2.2] pb-1 drop-shadow-sm">
            {eventConfig.bismillahArabic}
          </p>
          <p className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#1B365D]/80 font-sans font-semibold mt-1">
            With the blessings of Allah
          </p>
        </motion.div>

        {/* 3D Envelope Presentation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{
            opacity: 1,
            scale: isOpening ? [1, 1.03, 0.96] : 1,
            y: 0,
          }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md bg-white/95 text-[#0F1E36] p-8 sm:p-11 rounded-3xl shadow-[0_25px_60px_-12px_rgba(15,30,54,0.18)] border-2 border-[#C6A56B]/50 backdrop-blur-md overflow-hidden"
        >
          {/* Filigree Inner Border */}
          <div className="absolute inset-2 border border-[#1B365D]/20 rounded-2xl pointer-events-none" />

          {/* Invitation Lead */}
          <div className="space-y-1.5 mb-5">
            <span className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#1B365D] font-bold block">
              You Are Cordially Invited
            </span>
            <span className="text-xs uppercase tracking-widest text-[#2C4D75]/80 font-light block">
              To Celebrate the Engagement of
            </span>
          </div>

          {/* Couple Names Centerpiece */}
          <div className="my-5 space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#0F1E36] font-medium tracking-wide">
              {eventConfig.groom}
            </h1>
            <span className="font-serif italic text-2xl text-[#8a6a24] block">&</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#0F1E36] font-medium tracking-wide">
              {eventConfig.bride}
            </h1>
          </div>

          {/* Date & Venue Teaser */}
          <div className="text-[11px] uppercase tracking-widest text-[#1B365D] pt-3 border-t border-[#C6A56B]/30 font-medium">
            <span>{eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
            <span className="mx-2 text-[#8a6a24]">•</span>
            <span>{eventConfig.timeDisplay}</span>
          </div>

          {/* Tactile Wax Seal Button with Concentric Animated Ring Pulses */}
          <div className="mt-8 flex flex-col items-center relative">
            {/* Concentric Animated Ripple Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-[#C6A56B]/40 animate-ring-pulse pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full border border-[#1B365D]/20 animate-ring-pulse pointer-events-none [animation-delay:1.2s]" />

            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
              disabled={isOpening}
              aria-label="Open your engagement invitation"
              className="group relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D] z-10"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#f6e2a0] via-[#d9b55e] to-[#8a6a24] shadow-xl flex items-center justify-center border-4 border-white group-hover:shadow-[#C6A56B]/50 transition-shadow">
                <div className="w-14 h-14 rounded-full border border-white/80 flex flex-col items-center justify-center text-[#0F1E36] shadow-inner bg-gradient-to-br from-[#FAF8F3] to-[#EBF3FA]">
                  <span className="font-serif italic font-bold text-base leading-none text-[#1B365D]">FA</span>
                  <span className="text-[8px] uppercase tracking-widest mt-1 font-bold text-[#8a6a24]">2026</span>
                </div>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#8a6a24] animate-bounce" />
            </motion.button>

            {/* Explicit Prompt Button */}
            <motion.button
              onClick={handleOpenInvitation}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isOpening}
              className="mt-6 inline-flex items-center gap-2.5 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#0F1E36] via-[#1B365D] to-[#2C4D75] hover:from-[#1B365D] hover:to-[#0F1E36] border border-[#C6A56B]/70 text-[#FAF8F3] text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all duration-300 z-10"
            >
              <MailOpen className="w-4 h-4 text-[#DFCA9E]" />
              <span>{isOpening ? "Unfolding Experience..." : "Open Your Invitation"}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs uppercase tracking-widest text-[#1B365D]/75 font-medium"
        >
          {eventConfig.venue}
        </motion.p>
      </div>
    </motion.div>
  );
};