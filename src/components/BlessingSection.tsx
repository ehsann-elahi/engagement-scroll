import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Sparkles } from 'lucide-react';

export const BlessingSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#172D27] luxury-grain text-[#FAF8F3] overflow-hidden border-y border-[#C6A56B]/20">
      {/* Background radial shimmer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#30483B]/60 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C6A56B]/40 bg-[#30483B]/50 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
          <span className="text-xs uppercase tracking-ultra text-[#DFCA9E] font-medium">
            Islamic Blessing
          </span>
        </motion.div>

        {/* Outer ornate card */}
        <motion.div
          initial={{ opacity: 0.95, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-14 rounded-3xl bg-[#172D27]/80 backdrop-blur-md border border-[#C6A56B]/40 shadow-2xl"
        >
          {/* Inner decorative frame hairline */}
          <div className="absolute inset-3 border border-[#C6A56B]/20 rounded-2xl pointer-events-none" />

          {/* Arabic Dua */}
          <div dir="rtl" className="my-4">
            <motion.p
              initial={{ opacity: 0.95, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-arabic text-2xl sm:text-4xl md:text-5xl text-[#C6A56B] leading-loose sm:leading-[2.2] tracking-wide select-none"
            >
              {eventConfig.duaArabic}
            </motion.p>
          </div>

          <OrnamentalDivider className="my-6 sm:my-8" />

          {/* Translation */}
          <motion.div
            initial={{ opacity: 0.9, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-[#EDE5D6] leading-relaxed font-light">
              "{eventConfig.duaTranslation}"
            </p>
            <p className="text-xs uppercase tracking-widest text-[#C6A56B]/80 mt-4 font-sans font-medium">
              Sunan Abi Dawud
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
