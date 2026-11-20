import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { eventConfig } from '../config/event';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Copy,
  Check,
  RotateCcw,
  MessageCircle,
  Share2,
  CalendarPlus,
  ChevronDown
} from 'lucide-react';

interface CinematicScrollJourneyProps {
  onReplay: () => void;
}

// Delicate fluttering butterfly component inspired by benchmark reference
const Butterfly: React.FC<{
  className?: string;
  wingColor1?: string;
  wingColor2?: string;
}> = ({
  className = '',
  wingColor1 = '#D4E5F7',
  wingColor2 = '#F6E2A0'
}) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 80" className="w-10 h-8 drop-shadow-md">
      <g className="animate-wing">
        <path
          d="M50 38C30 4 3 8 8 30c3 15 28 18 42 10Z"
          fill={wingColor1}
          fillOpacity="0.9"
          stroke="#C6A56B"
          strokeWidth="1.2"
        />
        <path
          d="M50 42C36 50 18 54 24 70c6 11 24-8 26-24Z"
          fill={wingColor2}
          fillOpacity="0.9"
          stroke="#C6A56B"
          strokeWidth="1.2"
        />
      </g>
      <g transform="translate(100 0) scale(-1 1)" className="animate-wing">
        <path
          d="M50 38C30 4 3 8 8 30c3 15 28 18 42 10Z"
          fill={wingColor1}
          fillOpacity="0.9"
          stroke="#C6A56B"
          strokeWidth="1.2"
        />
        <path
          d="M50 42C36 50 18 54 24 70c6 11 24-8 26-24Z"
          fill={wingColor2}
          fillOpacity="0.9"
          stroke="#C6A56B"
          strokeWidth="1.2"
        />
      </g>
      <ellipse cx="50" cy="42" rx="2.5" ry="14" fill="#8a6a24" />
      <path d="M49 28Q44 14 38 12M51 28Q56 14 62 12" stroke="#8a6a24" strokeWidth="1.2" fill="none" />
    </svg>
  </div>
);

export const CinematicScrollJourney: React.FC<CinematicScrollJourneyProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Real-time Countdown calculation for 2026-11-25T20:00:00+05:00
  const calculateTimeLeft = () => {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${eventConfig.venue}, ${eventConfig.venueFullAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const shareText = `You are cordially invited to celebrate the Engagement Ceremony of ${eventConfig.groom} & ${eventConfig.bride} on ${eventConfig.dayDisplay}, ${eventConfig.dateDisplay} ${eventConfig.yearDisplay} at ${eventConfig.timeDisplay} at ${eventConfig.venue}.`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `The Engagement of ${eventConfig.groom} & ${eventConfig.bride}`,
          text: shareText,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\nView the invitation: ${window.location.origin}`
  )}`;

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Engagement Ceremony: ${eventConfig.groom} & ${eventConfig.bride}`
  )}&dates=20261125T150000Z/20261125T180000Z&details=${encodeURIComponent(
    shareText
  )}&location=${encodeURIComponent(eventConfig.venueFullAddress)}`;

  return (
    <div ref={containerRef} className="relative w-full text-[#0F1E36] overflow-x-clip">
      {/* Top Floating Golden & Sapphire Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#1B365D] via-[#C6A56B] to-[#1B365D] z-50 shadow-[0_1px_10px_rgba(27,54,93,0.5)]"
      />

      {/* Persistent Elegant Top Navigation Bar */}
      <div className="fixed top-0 inset-x-0 z-40 px-6 py-3.5 flex items-center justify-between pointer-events-none bg-gradient-to-b from-white/95 via-white/80 to-transparent backdrop-blur-[4px]">
        <div className="flex items-center gap-2.5">
          <span className="font-serif italic text-lg text-[#1B365D] font-bold tracking-wider">
            F & A
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#2C4D75] hidden sm:inline font-semibold">
            · 25 November 2026
          </span>
        </div>
      </div>

      {/* Floating Background Butterflies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <Butterfly className="absolute top-[18%] left-[8%] animate-float-rings" />
        <Butterfly className="absolute top-[45%] right-[10%] animate-float-rings [animation-delay:2s]" wingColor1="#FFFFFF" wingColor2="#C6A56B" />
        <Butterfly className="absolute top-[75%] left-[12%] animate-float-rings [animation-delay:3.5s]" />
      </div>

      {/* ========================================================= */}
      {/* SCENE 01 — THE HOLY OPENING HERO WITH FLOATING RINGS */}
      {/* ========================================================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="space-y-4 sm:space-y-6 my-auto"
        >
          {/* Holy Bismillah in Amiri Calligraphy */}
          <p className="font-arabic text-3xl sm:text-5xl md:text-6xl text-[#8a6a24] tracking-wider leading-[2.3] select-none drop-shadow-sm pb-1">
            {eventConfig.bismillahArabic}
          </p>

          <span className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#1B365D] font-sans font-bold block">
            With the blessings of Allah
          </span>

          {/* ===================================================== */}
          {/* THE GOLDEN ENGAGEMENT RINGS CENTERPIECE (Benchmark ring effect) */}
          {/* ===================================================== */}
          <div className="relative py-4 my-2 flex items-center justify-center">
            {/* Concentric Animated Ring Pulses radiating behind rings */}
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-[#C6A56B]/30 animate-ring-pulse pointer-events-none" />
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-[#1B365D]/15 animate-ring-pulse pointer-events-none [animation-delay:1.5s]" />
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#D4E5F7]/40 via-[#F6E2A0]/30 to-[#D4E5F7]/40 blur-2xl pointer-events-none" />

            {/* Floating Golden Rings Asset from benchmark */}
            <div className="relative z-10 w-44 sm:w-56 h-auto mx-auto animate-float-rings select-none">
              <img
                src="/rings.png"
                alt="Two golden diamond engagement rings"
                className="w-full h-auto drop-shadow-[0_15px_22px_rgba(138,106,36,0.35)] object-contain"
              />
              {/* Twinkling Diamond Flare Sparkles */}
              <Sparkles className="absolute top-2 right-10 w-6 h-6 text-[#d9b55e] animate-diamond-twinkle drop-shadow" />
              <Sparkles className="absolute bottom-4 left-8 w-5 h-5 text-[#f6e2a0] animate-diamond-twinkle [animation-delay:1.2s] drop-shadow" />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-xs uppercase tracking-widest text-[#1B365D] font-bold block">
              You Are Cordially Invited
            </span>
            <span className="text-xs uppercase tracking-widest text-[#2C4D75]/80 font-light block">
              To Celebrate the Engagement of
            </span>
          </div>

          <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent mx-auto my-3" />

          {/* Couple Names Centerpiece */}
          <div className="space-y-2 py-2">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0F1E36] tracking-wide">
              {eventConfig.groom}
            </h1>
            <span className="font-serif italic text-2xl sm:text-4xl text-[#8a6a24] block my-1">
              &
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0F1E36] tracking-wide">
              {eventConfig.bride}
            </h1>
          </div>

          <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent mx-auto my-3" />

          <p className="text-xs uppercase tracking-widest text-[#1B365D] pt-2 font-semibold">
            {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.timeDisplay} · {eventConfig.venue}
          </p>

          {/* Animated Scroll Cue */}
          <div className="pt-8 flex flex-col items-center justify-center text-xs tracking-widest uppercase text-[#2C4D75]">
            <span className="text-[10px] mb-2 font-semibold">Scroll to Explore Ceremony</span>
            <ChevronDown className="w-5 h-5 text-[#8a6a24] animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 02 — THE COUPLE REVEAL & RING HANDS CEREMONY */}
      {/* ========================================================= */}
      <section
        id="couple"
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="w-full space-y-6"
        >
          {/* Hand Ceremony Illustration from benchmark */}
          <div className="w-52 sm:w-64 mx-auto mb-2 select-none">
            <img
              src="/ring_hands.png"
              alt="Golden ring being placed upon bride's hand"
              className="w-full h-auto drop-shadow-[0_12px_18px_rgba(27,54,93,0.18)] object-contain rounded-2xl"
            />
          </div>

          <span className="text-[11px] uppercase tracking-ultra text-[#1B365D] font-bold block">
            Two Families · One Beautiful Beginning
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0F1E36] font-medium">
            The Couple
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#2C4D75] max-w-lg mx-auto font-light leading-relaxed">
            With the blessings of Allah and the love of our families, we joyfully invite you to celebrate a beautiful new chapter in our lives.
          </p>

          {/* Side-by-side Portrait Presentations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto items-center pt-4">
            {/* Groom Portrait Frame */}
            <div className="royal-card relative p-7 sm:p-9 rounded-3xl text-center group">
              <div className="absolute inset-2 border border-[#1B365D]/20 rounded-2xl pointer-events-none" />

              {/* Arched Portrait Window Placeholder */}
              <div className="w-32 h-40 sm:w-40 sm:h-48 mx-auto rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#FFFFFF] via-[#EBF3FA] to-[#D4E5F7] border-2 border-[#C6A56B]/60 flex flex-col items-center justify-center relative overflow-hidden mb-5 shadow-inner">
                <div className="w-16 h-16 rounded-full border-2 border-[#1B365D]/30 flex items-center justify-center bg-white shadow-md">
                  <span className="font-serif italic text-2xl text-[#1B365D] font-bold">FA</span>
                </div>
                <span className="text-[10px] uppercase tracking-ultra text-[#1B365D] mt-3 font-bold">
                  The Groom
                </span>
                <div className="absolute inset-1 rounded-t-full rounded-b-xl border border-[#C6A56B]/25 pointer-events-none" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#0F1E36] font-medium">
                {eventConfig.groom}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[#2C4D75] mt-1.5 font-semibold">
                {eventConfig.groomParents}
              </p>
            </div>

            {/* Bride Portrait Frame */}
            <div className="royal-card relative p-7 sm:p-9 rounded-3xl text-center group">
              <div className="absolute inset-2 border border-[#1B365D]/20 rounded-2xl pointer-events-none" />

              {/* Arched Portrait Window Placeholder */}
              <div className="w-32 h-40 sm:w-40 sm:h-48 mx-auto rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#FFFFFF] via-[#EBF3FA] to-[#D4E5F7] border-2 border-[#C6A56B]/60 flex flex-col items-center justify-center relative overflow-hidden mb-5 shadow-inner">
                <div className="w-16 h-16 rounded-full border-2 border-[#1B365D]/30 flex items-center justify-center bg-white shadow-md">
                  <span className="font-serif italic text-2xl text-[#1B365D] font-bold">AS</span>
                </div>
                <span className="text-[10px] uppercase tracking-ultra text-[#1B365D] mt-3 font-bold">
                  The Bride
                </span>
                <div className="absolute inset-1 rounded-t-full rounded-b-xl border border-[#C6A56B]/25 pointer-events-none" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#0F1E36] font-medium">
                {eventConfig.bride}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[#2C4D75] mt-1.5 font-semibold">
                {eventConfig.brideParents}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 03 — THE SACRED BLESSING */}
      {/* ========================================================= */}
      <section
        id="blessing"
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="w-full space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A56B]/50 bg-white/90 shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8a6a24]" />
            <span className="text-[11px] uppercase tracking-ultra text-[#1B365D] font-bold">
              Sacred Blessing
            </span>
          </div>

          <div className="royal-card relative p-8 sm:p-14 rounded-3xl max-w-3xl mx-auto">
            <div className="absolute inset-3 border border-[#C6A56B]/30 rounded-2xl pointer-events-none" />

            <div dir="rtl" className="my-4">
              <p className="font-arabic text-2xl sm:text-4xl md:text-5xl text-[#8a6a24] leading-[2.4] sm:leading-[2.5] tracking-wide select-none drop-shadow-sm pb-2">
                {eventConfig.duaArabic}
              </p>
            </div>

            <div className="w-44 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent mx-auto my-5" />

            <p className="font-serif italic text-lg sm:text-2xl text-[#0F1E36] leading-relaxed max-w-xl mx-auto font-light">
              "{eventConfig.duaTranslation}"
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#8a6a24] mt-4 font-sans font-bold">
              Sunan Abi Dawud
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 04 — THE DATE REVEAL (25 November 2026) */}
      {/* ========================================================= */}
      <section
        id="date"
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="royal-card relative p-8 sm:p-12 rounded-3xl shadow-2xl overflow-hidden text-center">
            <div className="absolute inset-2 border border-[#1B365D]/20 rounded-2xl pointer-events-none" />

            {/* Embossed Wax Seal on Top */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#f6e2a0] via-[#d9b55e] to-[#8a6a24] shadow-lg flex items-center justify-center border-2 border-white">
              <div className="w-12 h-12 rounded-full border border-white/80 flex flex-col items-center justify-center text-[#0F1E36]">
                <span className="font-serif italic font-bold text-sm leading-none text-[#1B365D]">FA</span>
                <span className="text-[7px] uppercase tracking-widest font-bold mt-0.5 text-[#8a6a24]">2026</span>
              </div>
            </div>

            <span className="text-[11px] uppercase tracking-ultra text-[#1B365D] font-bold block">
              SAVE THE DATE
            </span>

            <h3 className="font-serif text-4xl sm:text-6xl text-[#0F1E36] font-normal my-2 tracking-wide">
              {eventConfig.dateDisplay}
            </h3>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#8a6a24]">
              {eventConfig.yearDisplay}
            </p>

            <div className="w-40 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent mx-auto my-4" />

            <div className="space-y-1 text-xs uppercase tracking-widest text-[#2C4D75]">
              <p className="font-semibold text-sm text-[#0F1E36]">{eventConfig.dayDisplay} Evening</p>
              <p className="text-[#8a6a24] font-bold text-base">{eventConfig.timeDisplay}</p>
              <p className="text-[10px] text-[#1B365D] pt-1 font-medium">{eventConfig.timezone} (Pakistan Standard Time)</p>
              <p className="pt-2 text-xs text-[#0F1E36] font-serif font-semibold">{eventConfig.venue}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 05 — THE CELEBRATION & LIVE COUNTDOWN */}
      {/* ========================================================= */}
      <section
        id="celebration"
        className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="w-full space-y-4"
        >
          <span className="text-[11px] uppercase tracking-ultra text-[#1B365D] font-bold block">
            Ceremony Registry & Countdown
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#0F1E36] font-medium">
            {eventConfig.event}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#8a6a24] mb-4">
            {eventConfig.groom} & {eventConfig.bride}
          </p>

          <div className="w-52 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A56B] to-transparent mx-auto my-4" />

          {/* Countdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto my-6">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map(item => (
              <div
                key={item.label}
                className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-[#C6A56B]/50 shadow-md backdrop-blur-md"
              >
                <span className="font-serif text-3xl sm:text-5xl text-[#0F1E36] font-normal block">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#1B365D] font-bold mt-1 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-widest text-[#2C4D75] mt-4 font-semibold">
            Target: {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} at {eventConfig.timeDisplay} ({eventConfig.timezone})
          </p>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 06 — THE FINAL INVITATION, VENUE & ACTIONS */}
      {/* ========================================================= */}
      <section
        id="closing"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="w-full space-y-5"
        >
          <span className="text-[11px] uppercase tracking-ultra text-[#1B365D] font-bold block">
            With Love & Gratitude
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#0F1E36] font-medium">
            Dear Friends & Family
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#2C4D75] max-w-lg mx-auto font-light leading-relaxed">
            Your presence will make our celebration even more special. We would be delighted to have you join us as we begin this beautiful new chapter.
          </p>

          <p className="font-serif text-xl sm:text-3xl text-[#8a6a24] italic font-normal">
            {eventConfig.groom} & {eventConfig.bride}
          </p>

          {/* Embedded Verified Location Card */}
          <div className="royal-card p-5 sm:p-6 rounded-2xl max-w-xl mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#8a6a24] font-bold block">
                Venue & Map Pin
              </span>
              <p className="font-serif text-lg text-[#0F1E36] font-medium">{eventConfig.venue}</p>
              <p className="text-[11px] text-[#2C4D75]">{eventConfig.venueFullAddress}</p>
              <p className="text-[10px] font-mono text-[#1B365D] font-semibold">GPS: {eventConfig.venueCoordinates.lat}° N, {eventConfig.venueCoordinates.lng}° E</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyAddress}
                className="px-3.5 py-2 rounded-full bg-white border border-[#1B365D]/30 text-[10px] uppercase tracking-widest text-[#0F1E36] hover:bg-[#EBF3FA] transition-colors font-bold shadow-sm"
              >
                {copiedAddress ? "Copied" : "Copy Address"}
              </button>
              <a
                href={eventConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#1B365D] to-[#2C4D75] text-white text-[10px] uppercase tracking-widest font-bold shadow hover:shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3 h-3 fill-current" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Action Buttons: Replay, WhatsApp, Share, Add to Calendar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0F1E36] via-[#1B365D] to-[#2C4D75] text-white text-xs uppercase tracking-widest font-semibold shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Invitation</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-xs uppercase tracking-widest text-[#1e7e34] font-semibold hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#1B365D]/30 text-xs uppercase tracking-widest text-[#0F1E36] font-semibold hover:bg-[#EBF3FA] transition-colors shadow-sm cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#8a6a24]" /> : <Share2 className="w-3.5 h-3.5 text-[#1B365D]" />}
              <span>{copiedLink ? "Link Copied" : "Share"}</span>
            </button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#1B365D]/30 text-xs uppercase tracking-widest text-[#0F1E36] font-semibold hover:bg-[#EBF3FA] transition-colors shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#1B365D]" />
              <span>Calendar</span>
            </a>
          </div>

          <p className="text-[10px] text-[#2C4D75]/80 pt-4 tracking-wider font-medium">
            {eventConfig.groom} & {eventConfig.bride} · {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.venue}
          </p>
        </motion.div>
      </section>
    </div>
  );
};