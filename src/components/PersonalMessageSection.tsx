import React from 'react';
import { motion } from 'framer-motion';
import { OrnamentalDivider } from './OrnamentalDivider';
import { HeartHandshake } from 'lucide-react';

export const PersonalMessageSection: React.FC = () => {
  return (
    <section id="message" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#FAF8F3] text-[#252A25] overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Parchment Letter Container */}
        <motion.div
          initial={{ opacity: 0.95, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#EDE5D6]/40 p-8 sm:p-16 rounded-3xl border border-[#C6A56B]/40 shadow-xl"
        >
          {/* Subtle ornate inner border */}
          <div className="absolute inset-3 sm:inset-4 border border-[#C6A56B]/25 rounded-2xl pointer-events-none" />

          {/* Letter Icon */}
          <div className="w-12 h-12 rounded-full bg-[#172D27]/5 border border-[#C6A56B]/30 mx-auto flex items-center justify-center mb-6">
            <HeartHandshake className="w-5 h-5 text-[#C6A56B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172D27] font-medium mb-4">
            Dear Friends & Family
          </h2>

          <OrnamentalDivider className="my-6" />

          {/* Letter Body */}
          <div className="space-y-6 max-w-xl mx-auto font-sans text-base sm:text-lg text-[#252A25]/85 leading-relaxed font-light">
            <p>
              Your presence will make our celebration even more special. We would be delighted to have you join us as we begin this beautiful new chapter.
            </p>
            <p className="font-serif italic text-xl sm:text-2xl text-[#172D27]">
              With love and gratitude.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-8 pt-6 border-t border-[#C6A56B]/20">
            <span className="font-serif text-3xl sm:text-4xl text-[#B98783] italic font-normal tracking-wide">
              Faiq & Ayesha
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
