import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${eventConfig.venue}, ${eventConfig.venueFullAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#172D27] luxury-grain text-[#FAF8F3] overflow-hidden border-t border-[#C6A56B]/20">
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C6A56B]/40 bg-[#30483B]/50 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span className="text-xs uppercase tracking-ultra text-[#DFCA9E] font-medium">
              Venue Location
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F3] font-medium">
            {eventConfig.venue}
          </h2>

          <OrnamentalDivider className="my-6" />

          <p className="font-sans text-sm sm:text-base text-[#EDE5D6]/85 max-w-xl mx-auto font-light leading-relaxed">
            We look forward to celebrating this special occasion with you.
          </p>
        </motion.div>

        {/* Map Container & Action Card */}
        <motion.div
          initial={{ opacity: 0.95, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden border border-[#C6A56B]/40 bg-[#30483B]/40 shadow-2xl backdrop-blur-md"
        >
          {/* Top Bar with Venue Info and Action Buttons */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#C6A56B]/25">
            <div className="text-left space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold block">
                Official Venue Pin
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F3] font-medium">
                {eventConfig.venue}
              </h3>
              <p className="text-xs sm:text-sm text-[#EDE5D6]/80 font-sans">
                {eventConfig.venueFullAddress}
              </p>
              <p className="text-[11px] font-mono text-[#DFCA9E]/70 pt-1">
                GPS: {eventConfig.venueCoordinates.lat}° N, {eventConfig.venueCoordinates.lng}° E
              </p>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Copy Address Button */}
              <button
                onClick={handleCopyAddress}
                aria-label="Copy venue address to clipboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#172D27]/80 hover:bg-[#172D27] border border-[#C6A56B]/40 hover:border-[#C6A56B] text-xs uppercase tracking-widest text-[#EDE5D6] hover:text-[#FAF8F3] transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#DFCA9E]" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#C6A56B]" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              {/* Get Directions Button */}
              <a
                href={eventConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get driving directions in Google Maps"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C6A56B] to-[#DFCA9E] hover:from-[#DFCA9E] hover:to-[#C6A56B] text-[#172D27] text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-[#C6A56B]/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-[#172D27]">
            <iframe
              title="Cottage, Daewoo Road Location Map"
              src={eventConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />

            {/* Subtle overlay gradient at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#172D27]/80 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
