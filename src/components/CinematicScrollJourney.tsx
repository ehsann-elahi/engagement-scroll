import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { eventConfig } from '../config/event';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Check,
  RotateCcw,
  MessageCircle,
  Share2,
  CalendarPlus,
  ChevronDown,
  Heart,
} from 'lucide-react';

interface CinematicScrollJourneyProps {
  onReplay: () => void;
}

// Delicate fluttering starlight butterfly component
const Butterfly: React.FC<{
  className?: string;
  wingColor1?: string;
  wingColor2?: string;
}> = ({
  className = '',
  wingColor1 = '#FFF1C5',
  wingColor2 = '#ECC872',
}) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 80" className="w-9 h-7 drop-shadow-[0_0_8px_rgba(236,200,114,0.5)]">
      <g className="animate-wing">
        <path
          d="M50 38C30 4 3 8 8 30c3 15 28 18 42 10Z"
          fill={wingColor1}
          fillOpacity="0.85"
          stroke="#ECC872"
          strokeWidth="1.2"
        />
        <path
          d="M50 42C36 50 18 54 24 70c6 11 24-8 26-24Z"
          fill={wingColor2}
          fillOpacity="0.85"
          stroke="#ECC872"
          strokeWidth="1.2"
        />
      </g>
      <g transform="translate(100 0) scale(-1 1)" className="animate-wing">
        <path
          d="M50 38C30 4 3 8 8 30c3 15 28 18 42 10Z"
          fill={wingColor1}
          fillOpacity="0.85"
          stroke="#ECC872"
          strokeWidth="1.2"
        />
        <path
          d="M50 42C36 50 18 54 24 70c6 11 24-8 26-24Z"
          fill={wingColor2}
          fillOpacity="0.85"
          stroke="#ECC872"
          strokeWidth="1.2"
        />
      </g>
      <ellipse cx="50" cy="42" rx="2.5" ry="14" fill="#ECC872" />
      <path d="M49 28Q44 14 38 12M51 28Q56 14 62 12" stroke="#FFF1C5" strokeWidth="1.2" fill="none" />
    </svg>
  </div>
);

export const CinematicScrollJourney: React.FC<CinematicScrollJourneyProps> = ({ onReplay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mouse tilt tracking for 3D hero rings interaction
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / centerX,
      y: (clientY - centerY) / centerY,
    });
  };

  // Parallax transform bindings based on scroll
  const ringsY = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const ringsScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.88]);
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  const smoothRingsY = useSpring(ringsY, { stiffness: 80, damping: 20 });
  const smoothRingsScale = useSpring(ringsScale, { stiffness: 80, damping: 20 });

  // Real-time Countdown calculation for 2026-12-25T20:00:00+05:00
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
  )}&dates=20261225T150000Z/20261225T180000Z&details=${encodeURIComponent(
    shareText
  )}&location=${encodeURIComponent(eventConfig.venueFullAddress)}`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full text-[#F8FAFC] overflow-x-clip"
    >
      {/* Top Floating Golden Starlight Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ECC872] via-[#FFF1C5] to-[#ECC872] z-50 shadow-[0_0_12px_rgba(236,200,114,0.8)]"
      />

      {/* Persistent Elegant Top Navigation Bar */}
      <div className="fixed top-0 inset-x-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#050811]/90 via-[#050811]/60 to-transparent backdrop-blur-[6px]">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-lg gold-text-foil font-bold tracking-wider">
            F & A
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#CBD5E1] hidden sm:inline font-semibold">
            · 25 December 2026
          </span>
        </div>
      </div>

      {/* Floating Starlight Butterflies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <Butterfly className="absolute top-[20%] left-[6%] animate-float-smooth" />
        <Butterfly
          className="absolute top-[48%] right-[8%] animate-float-smooth [animation-delay:2.5s]"
          wingColor1="#D4E5F7"
          wingColor2="#FFF1C5"
        />
        <Butterfly className="absolute top-[78%] left-[10%] animate-float-smooth [animation-delay:4s]" />
      </div>

      {/* ========================================================= */}
      {/* SCENE 01 — THE HOLY OPENING HERO WITH 3D FLOATING RINGS */}
      {/* ========================================================= */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 sm:space-y-7 my-auto w-full"
        >
          {/* Holy Bismillah in Amiri Calligraphy with Luminous Backlight */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#ECC872]/20 blur-2xl rounded-full pointer-events-none" />
            <p className="relative font-arabic text-3xl sm:text-5xl md:text-6xl text-[#ECC872] tracking-wider leading-[2.3] select-none drop-shadow-[0_2px_15px_rgba(236,200,114,0.4)] pb-1">
              {eventConfig.bismillahArabic}
            </p>
          </div>

          <span className="text-[11px] sm:text-xs uppercase tracking-ultra text-[#D4E5F7] font-sans font-semibold block">
            With the blessings of Allah
          </span>

          {/* ===================================================== */}
          {/* THE 3D FLOATING GOLDEN ENGAGEMENT RINGS (Benchmark Centerpiece) */}
          {/* ===================================================== */}
          <motion.div
            style={{
              y: smoothRingsY,
              scale: smoothRingsScale,
              opacity: ringsOpacity,
            }}
            className="relative py-4 my-2 flex items-center justify-center"
          >
            {/* Concentric Animated Ring Pulses radiating behind rings */}
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-[#ECC872]/30 animate-ring-pulse pointer-events-none" />
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#D4E5F7]/20 animate-ring-pulse pointer-events-none [animation-delay:1.6s]" />
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-r from-[#ECC872]/35 via-[#FFF1C5]/45 to-[#ECC872]/35 blur-3xl pointer-events-none" />

            {/* Interactive 3D Tilt Rings Box responding to mouse pointer */}
            <div
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 14}deg) rotateX(${-mousePos.y * 14}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative z-10 w-52 sm:w-64 h-52 sm:h-64 mx-auto rounded-full bg-gradient-to-b from-[#182647]/90 via-[#0E172E]/95 to-[#050811] border-2 border-[#ECC872]/60 shadow-[0_0_50px_rgba(236,200,114,0.35),inset_0_0_30px_rgba(236,200,114,0.18)] flex items-center justify-center p-6 select-none"
            >
              <img
                src="/rings.png"
                alt="Two golden diamond engagement rings"
                className="w-full h-auto object-contain animate-float-smooth gold-filter-art scale-110"
              />
              {/* Twinkling Diamond Flare Sparkles */}
              <Sparkles className="absolute top-4 right-10 w-6 h-6 text-[#FFF1C5] animate-diamond-glint drop-shadow-[0_0_12px_#FFF1C5]" />
              <Sparkles className="absolute bottom-6 left-8 w-5 h-5 text-[#ECC872] animate-diamond-glint [animation-delay:1.4s] drop-shadow-[0_0_10px_#ECC872]" />
            </div>
          </motion.div>

          <div className="space-y-1.5 pt-1">
            <span className="text-xs uppercase tracking-widest text-[#ECC872] font-bold block">
              You Are Cordially Invited
            </span>
            <span className="text-xs uppercase tracking-widest text-[#CBD5E1]/80 font-light block">
              To Celebrate the Engagement of
            </span>
          </div>

          <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#ECC872] to-transparent mx-auto my-3" />

          {/* Couple Names Centerpiece */}
          <div className="space-y-2 py-2">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8FAFC] tracking-wide drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              {eventConfig.groom}
            </h1>
            <span className="font-serif italic text-2xl sm:text-4xl gold-text-foil block my-1">
              &
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#F8FAFC] tracking-wide drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              {eventConfig.bride}
            </h1>
          </div>

          <div className="w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#ECC872] to-transparent mx-auto my-3" />

          <p className="text-xs uppercase tracking-widest text-[#CBD5E1] pt-2 font-semibold">
            {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.timeDisplay} · {eventConfig.venue}
          </p>

          {/* Animated Scroll Cue */}
          <div className="pt-8 flex flex-col items-center justify-center text-xs tracking-widest uppercase text-[#94A3B8]">
            <span className="text-[10px] mb-2 font-semibold text-[#ECC872]">Scroll to Explore Ceremony</span>
            <ChevronDown className="w-5 h-5 text-[#ECC872] animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 02 — THE COUPLE REVEAL & RING HANDS CEREMONY */}
      {/* ========================================================= */}
      <section
        id="couple"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-6"
        >
          {/* Hand Ceremony Illustration with Golden Aura Glow */}
          <div className="relative w-56 sm:w-72 mx-auto mb-4 select-none">
            <div className="absolute inset-0 bg-[#ECC872]/25 blur-2xl rounded-full pointer-events-none" />
            <img
              src="/ring_hands.png"
              alt="Golden ring placed upon bride's hand"
              className="relative w-full h-auto object-contain rounded-2xl border border-[#ECC872]/20 gold-filter-art"
            />
          </div>

          <span className="text-[11px] uppercase tracking-ultra text-[#ECC872] font-bold block">
            Two Families · One Beautiful Beginning
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F8FAFC] font-medium">
            The Couple
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto font-light leading-relaxed">
            With the blessings of Allah and the love of our families, we joyfully invite you to celebrate a beautiful new chapter in our lives.
          </p>

          {/* Side-by-side Crystal Glass Portrait Frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto items-center pt-4">
            {/* Groom Portrait Frame */}
            <div className="crystal-card crystal-card-interactive sheen-card relative p-8 sm:p-10 rounded-3xl text-center group">
              <div className="absolute inset-2 border border-[#ECC872]/20 rounded-2xl pointer-events-none" />

              {/* Arched Portrait Window Placeholder */}
              <div className="w-32 h-40 sm:w-40 sm:h-48 mx-auto rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#121B33] via-[#0A0F1F] to-[#050811] border-2 border-[#ECC872]/50 flex flex-col items-center justify-center relative overflow-hidden mb-5 shadow-inner">
                <div className="w-16 h-16 rounded-full border-2 border-[#ECC872]/40 flex items-center justify-center bg-[#0F172A] shadow-md">
                  <span className="font-serif italic text-2xl text-[#ECC872] font-bold">FA</span>
                </div>
                <span className="text-[10px] uppercase tracking-ultra text-[#FFF1C5] mt-3 font-bold">
                  The Groom
                </span>
                <div className="absolute inset-1 rounded-t-full rounded-b-xl border border-[#ECC872]/20 pointer-events-none" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8FAFC] font-medium">
                {eventConfig.groom}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[#CBD5E1] mt-1.5 font-semibold">
                {eventConfig.groomParents}
              </p>
            </div>

            {/* Bride Portrait Frame */}
            <div className="crystal-card crystal-card-interactive sheen-card relative p-8 sm:p-10 rounded-3xl text-center group">
              <div className="absolute inset-2 border border-[#ECC872]/20 rounded-2xl pointer-events-none" />

              {/* Arched Portrait Window Placeholder */}
              <div className="w-32 h-40 sm:w-40 sm:h-48 mx-auto rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#121B33] via-[#0A0F1F] to-[#050811] border-2 border-[#ECC872]/50 flex flex-col items-center justify-center relative overflow-hidden mb-5 shadow-inner">
                <div className="w-16 h-16 rounded-full border-2 border-[#ECC872]/40 flex items-center justify-center bg-[#0F172A] shadow-md">
                  <span className="font-serif italic text-2xl text-[#ECC872] font-bold">AS</span>
                </div>
                <span className="text-[10px] uppercase tracking-ultra text-[#FFF1C5] mt-3 font-bold">
                  The Bride
                </span>
                <div className="absolute inset-1 rounded-t-full rounded-b-xl border border-[#ECC872]/20 pointer-events-none" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8FAFC] font-medium">
                {eventConfig.bride}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[#CBD5E1] mt-1.5 font-semibold">
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
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ECC872]/40 bg-[#0A0F1F]/80 shadow-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ECC872]" />
            <span className="text-[11px] uppercase tracking-ultra text-[#FFF1C5] font-bold">
              Sacred Blessing
            </span>
          </div>

          <div className="crystal-card sheen-card relative p-8 sm:p-14 rounded-3xl max-w-3xl mx-auto border border-[#ECC872]/35 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]">
            <div className="absolute inset-3 border border-[#ECC872]/20 rounded-2xl pointer-events-none" />

            <div dir="rtl" className="my-5 relative">
              <div className="absolute inset-0 bg-[#ECC872]/15 blur-3xl rounded-full pointer-events-none" />
              <p className="relative font-arabic text-2xl sm:text-4xl md:text-5xl text-[#ECC872] leading-[2.4] sm:leading-[2.5] tracking-wide select-none drop-shadow-[0_2px_15px_rgba(236,200,114,0.4)] pb-2">
                {eventConfig.duaArabic}
              </p>
            </div>

            <div className="w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#ECC872] to-transparent mx-auto my-6" />

            <p className="font-serif italic text-lg sm:text-2xl text-[#F8FAFC] leading-relaxed max-w-xl mx-auto font-light">
              "{eventConfig.duaTranslation}"
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#ECC872] mt-5 font-sans font-bold">
              Sunan Abi Dawud
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 04 — THE DATE REVEAL (Friday, 25 December 2026) */}
      {/* ========================================================= */}
      <section
        id="date"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <div className="crystal-card crystal-card-interactive sheen-card relative p-8 sm:p-12 rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] border border-[#ECC872]/35 overflow-hidden text-center">
            <div className="absolute inset-2 border border-[#ECC872]/20 rounded-2xl pointer-events-none" />

            {/* Embossed Metallic Wax Seal on Top */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFF1C5] via-[#ECC872] to-[#8F6A1E] shadow-[0_8px_25px_rgba(236,200,114,0.4)] flex items-center justify-center border-2 border-[#FFF1C5]">
              <div className="w-12 h-12 rounded-full border border-[#ECC872]/60 flex flex-col items-center justify-center text-[#F8FAFC] bg-gradient-to-br from-[#0B1226] to-[#050811] shadow-inner">
                <span className="font-serif italic font-bold text-sm leading-none text-[#ECC872]">FA</span>
                <span className="text-[7px] uppercase tracking-widest font-bold mt-0.5 text-[#FFF1C5]">2026</span>
              </div>
            </div>

            <span className="text-[11px] uppercase tracking-ultra text-[#ECC872] font-bold block">
              SAVE THE DATE
            </span>

            <h3 className="font-serif text-4xl sm:text-6xl text-[#F8FAFC] font-normal my-2 tracking-wide">
              {eventConfig.dateDisplay}
            </h3>

            <p className="font-serif italic text-2xl sm:text-3xl gold-text-foil">
              {eventConfig.yearDisplay}
            </p>

            <div className="w-40 h-[1.5px] bg-gradient-to-r from-transparent via-[#ECC872] to-transparent mx-auto my-5" />

            <div className="space-y-1.5 text-xs uppercase tracking-widest text-[#CBD5E1]">
              <p className="font-semibold text-sm text-[#F8FAFC]">{eventConfig.dayDisplay} Evening</p>
              <p className="gold-text-foil font-bold text-base">{eventConfig.timeDisplay}</p>
              <p className="text-[10px] text-[#94A3B8] pt-1 font-medium">{eventConfig.timezone} (Pakistan Standard Time)</p>
              <p className="pt-2 text-xs text-[#F8FAFC] font-serif font-semibold">{eventConfig.venue}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 05 — THE CELEBRATION & LIVE COUNTDOWN */}
      {/* ========================================================= */}
      <section
        id="celebration"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-4"
        >
          <span className="text-[11px] uppercase tracking-ultra text-[#ECC872] font-bold block">
            Ceremony Registry & Live Countdown
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F8FAFC] font-medium">
            {eventConfig.event}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl gold-text-foil mb-4">
            {eventConfig.groom} & {eventConfig.bride}
          </p>

          <div className="w-52 h-[1.5px] bg-gradient-to-r from-transparent via-[#ECC872] to-transparent mx-auto my-4" />

          {/* Modern Crystal Countdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-xl mx-auto my-8">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map(item => (
              <div
                key={item.label}
                className="crystal-card crystal-card-interactive sheen-card p-5 sm:p-6 rounded-2xl border border-[#ECC872]/30 shadow-xl backdrop-blur-xl relative overflow-hidden"
              >
                <span className="font-serif text-3xl sm:text-5xl text-[#F8FAFC] font-normal block drop-shadow-[0_2px_10px_rgba(236,200,114,0.3)]">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#ECC872] font-bold mt-1.5 block">
                  {item.label}
                </span>
                {item.label === 'Seconds' && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ECC872] animate-ping" />
                )}
              </div>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-widest text-[#CBD5E1] mt-4 font-semibold">
            Target: {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} at {eventConfig.timeDisplay} ({eventConfig.timezone})
          </p>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 06 — THE FINAL INVITATION, VENUE & ACTIONS */}
      {/* ========================================================= */}
      <section
        id="closing"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-24 relative max-w-4xl mx-auto z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full space-y-6"
        >
          <span className="text-[11px] uppercase tracking-ultra text-[#ECC872] font-bold block">
            With Love & Gratitude
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#F8FAFC] font-medium">
            Dear Friends & Family
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto font-light leading-relaxed">
            Your presence will make our celebration even more special. We would be delighted to have you join us as we begin this beautiful new chapter.
          </p>

          <p className="font-serif text-2xl sm:text-4xl gold-text-foil italic font-normal py-1">
            {eventConfig.groom} & {eventConfig.bride}
          </p>

          {/* Embedded Verified Location Card */}
          <div className="crystal-card sheen-card p-6 sm:p-7 rounded-2xl max-w-xl mx-auto text-left flex flex-col sm:flex-row items-center justify-between gap-5 mt-6 border border-[#ECC872]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ECC872] font-bold block">
                Venue & Map Pin
              </span>
              <p className="font-serif text-lg text-[#F8FAFC] font-medium">{eventConfig.venue}</p>
              <p className="text-[11px] text-[#CBD5E1]">{eventConfig.venueFullAddress}</p>
              <p className="text-[10px] font-mono text-[#D4E5F7] font-semibold">
                GPS: {eventConfig.venueCoordinates.lat}° N, {eventConfig.venueCoordinates.lng}° E
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#ECC872]/40 text-[10px] uppercase tracking-widest text-[#F8FAFC] transition-colors font-bold shadow-sm cursor-pointer"
              >
                {copiedAddress ? 'Copied' : 'Copy Address'}
              </button>
              <a
                href={eventConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#ECC872] via-[#FFF1C5] to-[#ECC872] text-[#050811] text-[10px] uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(236,200,114,0.3)] hover:shadow-[0_6px_20px_rgba(236,200,114,0.45)] transition-all inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3 h-3 fill-current" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Action Buttons Suite: Replay, WhatsApp, Share, Add to Calendar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ECC872] via-[#FFF1C5] to-[#ECC872] text-[#050811] text-xs uppercase tracking-widest font-bold shadow-[0_4px_15px_rgba(236,200,114,0.3)] hover:shadow-[0_8px_25px_rgba(236,200,114,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Invitation</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-xs uppercase tracking-widest text-[#4ade80] font-semibold hover:bg-[#25D366]/30 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-[#ECC872]/40 text-xs uppercase tracking-widest text-[#F8FAFC] font-semibold hover:bg-white/20 transition-colors shadow-sm cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#ECC872]" /> : <Share2 className="w-3.5 h-3.5 text-[#ECC872]" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-[#ECC872]/40 text-xs uppercase tracking-widest text-[#F8FAFC] font-semibold hover:bg-white/20 transition-colors shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#ECC872]" />
              <span>Calendar</span>
            </a>
          </div>

          <p className="text-[10px] text-[#94A3B8] pt-4 tracking-wider font-medium">
            {eventConfig.groom} & {eventConfig.bride} · {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.venue}
          </p>
        </motion.div>
      </section>
    </div>
  );
};
