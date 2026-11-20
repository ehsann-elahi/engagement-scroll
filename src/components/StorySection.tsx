import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Heart } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF8F3] text-[#252A25] overflow-hidden">
      {/* Decorative floral watermark background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none luxury-grain" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0.8, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-ultra text-[#B98783] font-medium block mb-3"
          >
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#172D27] leading-tight"
          >
            Two Families. One Beautiful Beginning.
          </motion.h2>
          
          <OrnamentalDivider className="my-6" />

          <motion.p
            initial={{ opacity: 0.8, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#252A25]/80 leading-relaxed font-light"
          >
            With the blessings of Allah and the love of our families, we joyfully invite you to celebrate a beautiful new chapter in our lives.
          </motion.p>
        </div>

        {/* Visual Composition: Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0.9, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative bg-[#EDE5D6]/40 p-6 sm:p-8 rounded-2xl border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all duration-500 shadow-sm hover:shadow-xl"
          >
            {/* Elegant Floral Frame Placeholder */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#EDE5D6] border border-[#C6A56B]/20">
              <img
                src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80"
                alt="Elegant boutonniere and formal wedding attire detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172D27]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[11px] uppercase tracking-widest text-[#EDE5D6] font-medium bg-[#172D27]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-[#C6A56B]/40">
                  The Groom
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#172D27] font-medium">
                {eventConfig.groom}
              </h3>
              <p className="font-sans text-sm tracking-wide text-[#30483B] font-medium">
                {eventConfig.groomParents}
              </p>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0.9, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative bg-[#EDE5D6]/40 p-6 sm:p-8 rounded-2xl border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all duration-500 shadow-sm hover:shadow-xl"
          >
            {/* Elegant Floral Frame Placeholder */}
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#EDE5D6] border border-[#C6A56B]/20">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80"
                alt="Romantic engagement rings and floral detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172D27]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[11px] uppercase tracking-widest text-[#EDE5D6] font-medium bg-[#172D27]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-[#C6A56B]/40">
                  The Bride
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#172D27] font-medium">
                {eventConfig.bride}
              </h3>
              <p className="font-sans text-sm tracking-wide text-[#30483B] font-medium">
                {eventConfig.brideParents}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Center Intertwined Monogram Accent */}
        <motion.div
          initial={{ opacity: 0.9, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-[#C6A56B]/30" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A56B]/40 bg-[#EDE5D6]/30 text-xs tracking-widest uppercase text-[#172D27]">
            <Heart className="w-3.5 h-3.5 text-[#B98783] fill-current" />
            <span>Faiq & Ayesha</span>
          </div>
          <span className="h-px w-16 bg-[#C6A56B]/30" />
        </motion.div>
      </div>
    </section>
  );
};
