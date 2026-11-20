import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 py-12 sm:py-16 text-center overflow-hidden bg-[#172D27] luxury-grain border-b border-[#C6A56B]/20">
      {/* Decorative luxury corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C6A56B]/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C6A56B]/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C6A56B]/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C6A56B]/40 pointer-events-none" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#30483B] rounded-full blur-3xl opacity-50" />
      </div>

      {/* Top: Arabic Bismillah */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pt-4 sm:pt-6 flex flex-col items-center"
      >
        <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#C6A56B] tracking-wider select-none leading-relaxed pb-3 drop-shadow-sm">
          {eventConfig.bismillahArabic}
        </p>
        <p className="text-xs uppercase tracking-ultra text-[#DFCA9E]/85 font-sans font-medium mt-2">
          With the blessings of Allah
        </p>
      </motion.div>

      {/* Main Invitation Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto py-8 max-w-3xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-1"
        >
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#C6A56B] font-medium block">
            You Are Cordially Invited
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#EDE5D6]/80 font-light block">
            To Celebrate the Engagement of
          </span>
        </motion.div>

        <OrnamentalDivider className="my-6 sm:my-8" />

        {/* Groom & Bride Names */}
        <div className="space-y-2 sm:space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF8F3] tracking-wide"
          >
            {eventConfig.groom}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center my-2"
          >
            <span className="font-serif italic text-2xl sm:text-3xl text-[#C6A56B] px-4 font-light">
              &
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF8F3] tracking-wide"
          >
            {eventConfig.bride}
          </motion.h1>
        </div>

        {/* Date and Venue brief teaser */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 pt-4 border-t border-[#C6A56B]/20 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm tracking-widest uppercase text-[#EDE5D6]/90"
        >
          <span>{eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
          <span className="text-[#C6A56B]">•</span>
          <span>{eventConfig.timeDisplay}</span>
          <span className="text-[#C6A56B]">•</span>
          <span>{eventConfig.venue}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 pt-4 flex flex-col items-center"
      >
        <a
          href="#story"
          aria-label="Scroll to read the story"
          className="group flex flex-col items-center text-xs tracking-widest uppercase text-[#EDE5D6]/70 hover:text-[#C6A56B] transition-colors duration-300"
        >
          <span className="mb-2 text-[10px] sm:text-xs">Scroll to Begin</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full border border-[#C6A56B]/40 flex items-center justify-center group-hover:border-[#C6A56B] transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-[#C6A56B]" />
          </motion.div>
        </a>
      </motion.div>
    </header>
  );
};
