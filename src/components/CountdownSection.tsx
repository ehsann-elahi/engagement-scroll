import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Clock, PartyPopper } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(eventConfig.targetDateTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#172D27] luxury-grain text-[#FAF8F3] overflow-hidden border-b border-[#C6A56B]/20">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C6A56B]/40 bg-[#30483B]/50 mb-6"
        >
          <Clock className="w-3.5 h-3.5 text-[#C6A56B]" />
          <span className="text-xs uppercase tracking-ultra text-[#DFCA9E] font-medium">
            Live Countdown
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-[#FAF8F3] font-medium"
        >
          Counting Down to Our Special Day
        </motion.h2>

        <OrnamentalDivider className="my-6 sm:my-8" />

        {timeLeft.isPast ? (
          /* Graceful celebration state when date arrives */
          <motion.div
            initial={{ opacity: 0.95, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#30483B]/80 border border-[#C6A56B] max-w-xl mx-auto shadow-2xl space-y-4"
          >
            <PartyPopper className="w-12 h-12 text-[#C6A56B] mx-auto animate-bounce" />
            <h3 className="font-serif text-3xl sm:text-4xl text-[#DFCA9E]">
              The Celebration Has Commenced
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#EDE5D6] leading-relaxed">
              We are overjoyed to celebrate the engagement of Faiq & Ayesha with our beloved family and friends!
            </p>
          </motion.div>
        ) : (
          /* Real-time countdown boxes */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mt-8">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#30483B]/60 backdrop-blur-md border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all duration-300 shadow-lg hover:shadow-[#C6A56B]/10 flex flex-col items-center justify-center"
              >
                {/* Micro corner accent */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C6A56B]/40 group-hover:bg-[#C6A56B] transition-colors" />

                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF8F3] font-normal tracking-tight">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#DFCA9E] mt-2 font-medium">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Timezone footnote */}
        <p className="text-xs uppercase tracking-widest text-[#EDE5D6]/60 mt-8 font-light">
          Calculated for {eventConfig.timezone} (UTC+05:00) · {eventConfig.dateDisplay} {eventConfig.yearDisplay} at {eventConfig.timeDisplay}
        </p>
      </div>
    </section>
  );
};
