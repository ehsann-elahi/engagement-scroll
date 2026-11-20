import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../config/event';
import { OrnamentalDivider } from './OrnamentalDivider';
import { RotateCcw, Share2, MessageCircle, CalendarPlus, Check, ArrowUp } from 'lucide-react';

interface ClosingProps {
  onReplay: () => void;
}

export const ClosingSection: React.FC<ClosingProps> = ({ onReplay }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const shareText = `You are cordially invited to celebrate the Engagement Ceremony of ${eventConfig.groom} & ${eventConfig.bride} on ${eventConfig.dateDisplay} ${eventConfig.yearDisplay} at ${eventConfig.timeDisplay} at ${eventConfig.venue}.`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\nView the invitation: ${window.location.origin}`
  )}`;

  // Google Calendar pre-filled URL: 2026-12-25 20:00 to 23:00 PKT (15:00 UTC to 18:00 UTC)
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Engagement Ceremony: ${eventConfig.groom} & ${eventConfig.bride}`
  )}&dates=20261225T150000Z/20261225T180000Z&details=${encodeURIComponent(
    shareText
  )}&location=${encodeURIComponent(eventConfig.venueFullAddress)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `The Engagement of ${eventConfig.groom} & ${eventConfig.bride}`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <footer className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#172D27] luxury-grain text-[#FAF8F3] overflow-hidden border-t border-[#C6A56B]/30">
      {/* Background soft glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-[#30483B] rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Closing Title */}
        <motion.div
          initial={{ opacity: 0.9, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs uppercase tracking-ultra text-[#DFCA9E] font-medium block">
            With Joy & Anticipation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF8F3] font-normal leading-tight">
            Looking Forward to Celebrating With You
          </h2>

          <OrnamentalDivider className="my-6 sm:my-8" />

          {/* Names */}
          <p className="font-serif text-3xl sm:text-4xl text-[#C6A56B]">
            {eventConfig.groom} & {eventConfig.bride}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest text-[#EDE5D6]/80">
            <span>{eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
            <span className="text-[#C6A56B]">|</span>
            <span>{eventConfig.timeDisplay}</span>
            <span className="text-[#C6A56B]">|</span>
            <span>{eventConfig.venue}</span>
          </div>
        </motion.div>

        {/* Action Buttons: Replay, WhatsApp, Share, Add to Calendar */}
        <motion.div
          initial={{ opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Replay Invitation Button */}
          <button
            onClick={onReplay}
            aria-label="Replay the entire invitation experience"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#C6A56B] to-[#DFCA9E] hover:from-[#DFCA9E] hover:to-[#C6A56B] text-[#172D27] text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-[#C6A56B]/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" />
            <span>Replay Invitation</span>
          </button>

          {/* Share on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share invitation via WhatsApp"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 hover:border-[#25D366] text-xs uppercase tracking-widest text-[#FAF8F3] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          {/* Share / Copy Link */}
          <button
            onClick={handleShare}
            aria-label="Share or copy invitation link"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#30483B]/60 hover:bg-[#30483B] border border-[#C6A56B]/40 hover:border-[#C6A56B] text-xs uppercase tracking-widest text-[#FAF8F3] transition-all duration-300"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#DFCA9E]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#C6A56B]" />
                <span>Share Invitation</span>
              </>
            )}
          </button>

          {/* Add to Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add event to Google Calendar"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#30483B]/60 hover:bg-[#30483B] border border-[#C6A56B]/40 hover:border-[#C6A56B] text-xs uppercase tracking-widest text-[#FAF8F3] transition-all duration-300"
          >
            <CalendarPlus className="w-4 h-4 text-[#C6A56B]" />
            <span>Add to Calendar</span>
          </a>
        </motion.div>

        {/* Back to top micro button */}
        <div className="mt-16 pt-8 border-t border-[#C6A56B]/15 flex flex-col items-center justify-center space-y-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Return to top of page"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#EDE5D6]/60 hover:text-[#C6A56B] transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            <span>Return to Top</span>
          </button>

          <p className="text-[11px] text-[#EDE5D6]/40 tracking-wider">
            {eventConfig.groom} & {eventConfig.bride} · {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.venue}
          </p>
        </div>
      </div>
    </footer>
  );
};
