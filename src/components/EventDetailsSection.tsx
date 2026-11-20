import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Calendar, Clock, MapPin, Heart, Sparkles, UserCheck } from 'lucide-react';

export const EventDetailsSection: React.FC = () => {
  const details = [
    {
      label: 'The Event',
      value: eventConfig.event,
      subvalue: 'Solemnization of Engagement',
      icon: Heart,
    },
    {
      label: 'The Couple',
      value: `${eventConfig.groom} & ${eventConfig.bride}`,
      subvalue: 'Together with their families',
      icon: UserCheck,
    },
    {
      label: 'The Date',
      value: `${eventConfig.dateDisplay} ${eventConfig.yearDisplay}`,
      subvalue: 'Friday Evening',
      icon: Calendar,
    },
    {
      label: 'The Time',
      value: eventConfig.timeDisplay,
      subvalue: 'Reception & Dinner Ceremony',
      icon: Clock,
    },
    {
      label: 'The Venue',
      value: eventConfig.venue,
      subvalue: eventConfig.venueFullAddress,
      icon: MapPin,
    },
  ];

  return (
    <section id="details" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#FAF8F3] text-[#252A25] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs uppercase tracking-ultra text-[#B98783] font-medium block mb-2">
            Ceremony Information
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#172D27] font-medium">
            The Celebration
          </h2>
          <OrnamentalDivider className="my-6" />
          <p className="font-sans text-sm sm:text-base text-[#252A25]/75 max-w-xl mx-auto font-light leading-relaxed">
            All the key arrangements for our engagement gathering. We request the honor of your presence and prayers.
          </p>
        </motion.div>

        {/* Editorial Registry Card */}
        <motion.div
          initial={{ opacity: 0.95, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#EDE5D6]/30 rounded-3xl border border-[#C6A56B]/30 p-8 sm:p-14 shadow-lg backdrop-blur-sm"
        >
          {/* Inner hairline */}
          <div className="absolute inset-3 border border-[#C6A56B]/20 rounded-2xl pointer-events-none" />

          <div className="divide-y divide-[#C6A56B]/25">
            {details.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0.9, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between text-left gap-3 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#172D27]/5 border border-[#C6A56B]/30 flex items-center justify-center group-hover:border-[#C6A56B] transition-colors">
                      <Icon className="w-4 h-4 text-[#C6A56B]" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#B98783] font-semibold block">
                        {item.label}
                      </span>
                      <p className="font-serif text-xl sm:text-2xl text-[#172D27] font-medium group-hover:text-[#30483B] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right pl-14 sm:pl-0">
                    <span className="text-xs font-sans text-[#252A25]/60 font-medium">
                      {item.subvalue}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
