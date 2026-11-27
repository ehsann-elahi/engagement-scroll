import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventConfig } from '../config/event';
import {
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
  ChevronDown,
  Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CinematicScrollJourneyProps {
  onReplay: () => void;
  isOpen: boolean;
}

const CHAPTERS = [
  { id: 'hero', label: 'Invitation' },
  { id: 'couple', label: 'The Couple' },
  { id: 'blessing', label: 'Blessing' },
  { id: 'date', label: 'Save the Date' },
  { id: 'celebration', label: 'Countdown' },
  { id: 'closing', label: 'Venue' },
];

// Sculpted Circular SVG Ring Chronometer Dial
const OrbitalDial: React.FC<{
  value: number;
  max: number;
  label: string;
  isSeconds?: boolean;
}> = ({ value, max, label, isSeconds = false }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const clampedRatio = Math.max(0.03, Math.min(1, value / max));
  const strokeDashoffset = circumference * (1 - clampedRatio);

  return (
    <div className="orbital-dial relative flex flex-col items-center justify-center group">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
        {/* Soft glass sphere background */}
        <div className="absolute inset-2 rounded-full azure-glass transition-transform duration-500 group-hover:scale-[1.03]" />

        {/* Live Animated Orbital SVG Track */}
        <svg
          className="w-full h-full -rotate-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          viewBox="0 0 128 128"
          aria-hidden="true"
        >
          {/* Base translucent ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2.5"
          />
          {/* Live sweeping crisp white progress arc */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        {/* Center Numeric Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-4xl sm:text-5xl text-white font-normal leading-none tabular-nums drop-shadow-[0_2px_12px_rgba(9,41,112,0.3)]">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/90 font-semibold mt-1.5">
            {label}
          </span>
        </div>

        {/* Live pulse dot on Seconds dial */}
        {isSeconds && (
          <span className="absolute top-2.5 right-3.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
        )}
      </div>
    </div>
  );
};

export const CinematicScrollJourney: React.FC<CinematicScrollJourneyProps> = ({
  onReplay,
  isOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pointerTilt, setPointerTilt] = useState({ x: 0, y: 0 });

  // Smooth 3D pointer tilt for hero diamond rings
  const handleMouseMove = (e: React.MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    setPointerTilt({ x: nx, y: ny });
  };

  // Real-time Countdown to Friday, 25 December 2026 at 8:00 PM (Asia/Karachi)
  const calculateTimeLeft = () => {
    const targetDate = new Date(eventConfig.targetDateTime).getTime();
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // =====================================================================
  // AUTHORED GSAP SCROLLTRIGGER CHOREOGRAPHY (UNIQUE PER SCENE)
  // =====================================================================
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Top continuous scroll progress bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }

      // Active chapter observer for side navigation rail
      CHAPTERS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveChapter(id),
          onEnterBack: () => setActiveChapter(id),
        });
      });

      if (prefersReduced) return;

      // 1. HERO SCENE: Split-Curtain Name Parting + Scrubbed 3D Rings Expansion + Marquee
      gsap.to('.hero-groom-name', {
        x: -85,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-bride-name', {
        x: 85,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-rings-stage', {
        scale: 1.24,
        rotation: 16,
        y: -36,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.kinetic-marquee-track', {
        xPercent: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // 2. COUPLE SCENE: Live Scroll-Drawn Center Spine + Opposing Parallax Cathedral Arches
      const spineLine = containerRef.current?.querySelector('.couple-spine-line') as SVGLineElement | null;
      if (spineLine) {
        const len = spineLine.getTotalLength ? spineLine.getTotalLength() : 420;
        gsap.set(spineLine, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(spineLine, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#couple',
            start: 'top 75%',
            end: 'center 45%',
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        '.couple-hands-emblem',
        { scale: 0.86, y: 24 },
        {
          scale: 1.04,
          y: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: '#couple',
            start: 'top 85%',
            end: 'bottom 25%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.arch-groom',
        { x: -45, y: 28, rotateY: 12 },
        {
          x: 0,
          y: -16,
          rotateY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#couple',
            start: 'top 85%',
            end: 'center 42%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.arch-bride',
        { x: 45, y: -18, rotateY: -12 },
        {
          x: 0,
          y: 18,
          rotateY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#couple',
            start: 'top 85%',
            end: 'center 42%',
            scrub: 1,
          },
        }
      );

      // 3. BLESSING SCENE: Rotating Geometric Mandala + Expanding Sanctum + Line Draw
      gsap.to('.blessing-mandala', {
        rotation: 90,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#blessing',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        '.blessing-arabic-focus',
        { scale: 0.9, y: 26 },
        {
          scale: 1.02,
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: '#blessing',
            start: 'top 80%',
            end: 'center 45%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.blessing-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#blessing',
            start: 'top 70%',
            end: 'center 45%',
            scrub: 0.8,
          },
        }
      );

      // 4. DATE SCENE: Monumental Watermark Parallax + 3D Flattening Crystal Invitation Plate
      gsap.fromTo(
        '.date-watermark',
        { y: -70, x: -30 },
        {
          y: 70,
          x: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '#date',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        '.date-plate-3d',
        { rotateX: 24, rotateY: -8, scale: 0.9, y: 40 },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#date',
            start: 'top 85%',
            end: 'center 48%',
            scrub: 1,
          },
        }
      );

      // 5. CELEBRATION SCENE: Staggered Orbital Dial Constellation Fan-Out
      gsap.fromTo(
        '.orbital-dial',
        { y: 42, scale: 0.86 },
        {
          y: 0,
          scale: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '#celebration',
            start: 'top 85%',
            end: 'center 50%',
            scrub: 1,
          },
        }
      );

      // 6. CLOSING SCENE: Rising Horizon Sanctuary
      gsap.fromTo(
        '.closing-arch-horizon',
        { y: 48, scale: 0.95 },
        {
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#closing',
            start: 'top 88%',
            end: 'center 52%',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    // Ensure ScrollTrigger measures freshly once envelope unmounts
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        // user cancelled
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
      className="relative w-full text-white overflow-x-clip"
    >
      {/* Top Continuous Pure-White Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-white z-50 shadow-[0_0_14px_rgba(255,255,255,0.9)]"
      />

      {/* Persistent Minimalist Top Brand Bar */}
      <header className="fixed top-0 inset-x-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/35 shadow-[0_8px_24px_rgba(9,41,112,0.22)]">
          <span className="font-serif italic text-base sm:text-lg text-white font-semibold tracking-wider">
            F &amp; A
          </span>
          <span className="w-1 h-1 rounded-full bg-white/75 hidden sm:inline-block" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/95 hidden sm:inline font-semibold">
            25 December 2026
          </span>
        </div>
      </header>

      {/* Desktop Floating Chapter Navigation Rail */}
      <nav
        aria-label="Invitation Chapters"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3.5"
      >
        {CHAPTERS.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => scrollToSection(chapter.id)}
              className="group flex items-center gap-2.5 cursor-pointer outline-none"
              aria-label={`Jump to ${chapter.label}`}
            >
              <span
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white opacity-100 translate-x-0'
                    : 'text-white/75 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {chapter.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3 h-3 bg-white shadow-[0_0_12px_#FFFFFF]'
                    : 'w-2 h-2 bg-white/45 group-hover:bg-white/90'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* ================================================================= */}
      {/* SCENE 01 — SPLIT-CURTAIN CELESTIAL HERO & SCRUBBED FLOATING RINGS */}
      {/* ================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-between text-center px-4 sm:px-8 pt-24 pb-8 z-10"
      >
        {/* Top Bismillah */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="font-arabic text-3xl sm:text-5xl md:text-[3.5rem] text-white leading-[1.9] pb-2 select-none drop-shadow-[0_4px_22px_rgba(255,255,255,0.38)]">
            {eventConfig.bismillahArabic}
          </p>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-white/90 font-medium">
            With the blessings of Allah · You are cordially invited
          </p>
        </div>

        {/* Centerpiece: Interactive 3D Floating White-Pearl Rings + Split-Curtain Names */}
        <div className="relative w-full max-w-5xl mx-auto my-auto py-6 flex flex-col items-center justify-center">
          {/* Interactive 3D Scrubbed Rings Medallion */}
          <div className="hero-rings-stage relative mb-7 flex items-center justify-center">
            {/* Concentric Pure-White Expanding Orbital Ripples */}
            <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-white/40 animate-orbital-ripple pointer-events-none" />
            <div className="absolute w-68 h-68 sm:w-80 sm:h-80 rounded-full border border-white/20 animate-orbital-ripple [animation-delay:1.7s] pointer-events-none" />
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-white/25 blur-3xl pointer-events-none" />

            {/* 3D Mouse-Interactive Frosted Crystal Ring Pedestal */}
            <div
              style={{
                transform: `perspective(1000px) rotateY(${pointerTilt.x * 14}deg) rotateX(${-pointerTilt.y * 14}deg)`,
                transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full azure-glass-strong flex items-center justify-center p-6 select-none"
            >
              {/* Delicate rotating dashed orbital ring */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-slow-spin opacity-55 pointer-events-none"
                aria-hidden="true"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="94"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
              </svg>

              <img
                src="/rings.png"
                alt="Interlocking diamond engagement rings"
                className="w-full h-auto object-contain animate-gentle-float pearl-art-filter scale-110"
              />

              <Sparkles className="absolute top-3 right-6 w-5 h-5 text-white animate-star-glint" />
              <Sparkles className="absolute bottom-5 left-6 w-4 h-4 text-white animate-star-glint [animation-delay:1.2s]" />
            </div>
          </div>

          {/* Monumental Split-Curtain Editorial Names */}
          <div className="w-full space-y-1 sm:space-y-2">
            <h1 className="hero-groom-name font-serif text-5xl sm:text-7xl md:text-[5.5rem] font-normal text-white tracking-tight leading-[1.02] drop-shadow-[0_6px_28px_rgba(9,41,112,0.32)]">
              {eventConfig.groom}
            </h1>

            <div className="flex items-center justify-center gap-5 py-1">
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-white/75" />
              <span className="font-serif italic text-3xl sm:text-5xl text-white/95">&amp;</span>
              <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-white/75" />
            </div>

            <h1 className="hero-bride-name font-serif text-5xl sm:text-7xl md:text-[5.5rem] font-normal text-white tracking-tight leading-[1.02] drop-shadow-[0_6px_28px_rgba(9,41,112,0.32)]">
              {eventConfig.bride}
            </h1>
          </div>

          {/* Subtle Date & Venue Strip */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs uppercase tracking-[0.22em] text-white font-semibold">
            <span>{eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay}</span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span>{eventConfig.timeDisplay}</span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span>{eventConfig.venue}</span>
          </div>
        </div>

        {/* Scroll Cue + Continuous Kinetic Scroll-Scrubbed Marquee Ribbon */}
        <div className="w-full space-y-5 pt-4">
          <button
            onClick={() => scrollToSection('couple')}
            className="inline-flex flex-col items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
              Scroll to Unfold Story
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>

          <div className="w-screen -mx-4 sm:-mx-8 border-y border-white/20 py-3 overflow-hidden bg-white/[0.06] backdrop-blur-sm">
            <div className="kinetic-marquee-track flex whitespace-nowrap gap-10 text-xs uppercase tracking-[0.34em] text-white/85 font-medium select-none">
              {Array.from({ length: 6 }).map((_, idx) => (
                <span key={idx} className="inline-flex items-center gap-10">
                  <span>{eventConfig.groom} &amp; {eventConfig.bride}</span>
                  <span className="text-white/50">✦</span>
                  <span>25 December 2026</span>
                  <span className="text-white/50">✦</span>
                  <span>The Engagement Ceremony</span>
                  <span className="text-white/50">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCENE 02 — SCULPTED CATHEDRAL ARCHES & SCROLL-DRAWN SVG SPINE */}
      {/* ================================================================= */}
      <section
        id="couple"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-28 max-w-6xl mx-auto z-10"
      >
        {/* Ceremony Hands Emblem with Rotating Calligraphic Crest */}
        <div className="couple-hands-emblem relative mb-10 flex flex-col items-center text-center">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white/15 blur-2xl pointer-events-none" />
            <svg
              viewBox="0 0 240 240"
              className="absolute inset-0 w-full h-full animate-slow-spin opacity-60 pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="ringCrestPath"
                  d="M 120, 120 m -98, 0 a 98,98 0 1,1 196,0 a 98,98 0 1,1 -196,0"
                />
              </defs>
              <text fill="#FFFFFF" fontSize="9.5" letterSpacing="6.5" fontWeight="600">
                <textPath href="#ringCrestPath">
                  TWO HEARTS · ONE ETERNAL PROMISE · 25 DEC 2026 ·
                </textPath>
              </text>
            </svg>
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full azure-glass flex items-center justify-center p-4">
              <img
                src="/ring_hands.png"
                alt="Ceremony ring placed on hand"
                className="w-full h-auto object-contain pearl-art-filter"
              />
            </div>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal mt-6 tracking-tight">
            The Happy Couple
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/85 max-w-xl mx-auto mt-3 leading-relaxed font-light">
            Together with the prayers and blessings of our beloved families, we invite you to witness the joyous beginning of our forever.
          </p>
        </div>

        {/* Asymmetrical Editorial Cathedral Arches + Live Scroll-Drawn Center Spine */}
        <div className="perspective-1200 relative w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-10 mt-6">
          {/* GROOM CATHEDRAL ARCH */}
          <div className="arch-groom preserve-3d azure-arch sheen-plate rounded-t-[170px] rounded-b-[28px] px-8 pt-14 pb-11 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-white text-[#0B1D42] shadow-[0_14px_34px_rgba(9,41,112,0.3)] flex flex-col items-center justify-center border-4 border-white/40 mb-7">
              <span className="font-serif italic text-3xl font-bold leading-none">FA</span>
              <span className="text-[8px] uppercase tracking-[0.22em] font-bold mt-1 text-[#163A7A]">
                Groom
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide">
              {eventConfig.groom}
            </h3>
            <div className="w-16 h-[1px] bg-white/45 mx-auto my-4" />
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-white/90 font-medium">
              {eventConfig.groomParents}
            </p>
          </div>

          {/* LIVE SCROLL-DRAWN VERTICAL SVG TIMELINE SPINE (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center h-[380px] relative">
            <svg width="48" height="380" viewBox="0 0 48 380" className="overflow-visible" aria-hidden="true">
              <line
                x1="24"
                y1="0"
                x2="24"
                y2="380"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />
              <line
                className="couple-spine-line"
                x1="24"
                y1="0"
                x2="24"
                y2="380"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#0B1D42] shadow-[0_0_28px_rgba(255,255,255,0.75)] flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
          </div>

          {/* BRIDE CATHEDRAL ARCH */}
          <div className="arch-bride preserve-3d azure-arch sheen-plate rounded-t-[170px] rounded-b-[28px] px-8 pt-14 pb-11 text-center md:mt-16">
            <div className="w-28 h-28 mx-auto rounded-full bg-white text-[#0B1D42] shadow-[0_14px_34px_rgba(9,41,112,0.3)] flex flex-col items-center justify-center border-4 border-white/40 mb-7">
              <span className="font-serif italic text-3xl font-bold leading-none">AS</span>
              <span className="text-[8px] uppercase tracking-[0.22em] font-bold mt-1 text-[#163A7A]">
                Bride
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide">
              {eventConfig.bride}
            </h3>
            <div className="w-16 h-[1px] bg-white/45 mx-auto my-4" />
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-white/90 font-medium">
              {eventConfig.brideParents}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCENE 03 — FULL-BLEED ROTATING MANDALA & SACRED BLESSING SANCTUM */}
      {/* ================================================================= */}
      <section
        id="blessing"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 py-28 overflow-hidden z-10"
      >
        {/* Giant Architectural Rotating 8-Point Islamic Star Mandala (Scroll-Scrubbed) */}
        <svg
          viewBox="0 0 600 600"
          className="blessing-mandala absolute w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] pointer-events-none opacity-[0.16]"
          aria-hidden="true"
        >
          <g transform="translate(300,300)" fill="none" stroke="#FFFFFF" strokeWidth="1.2">
            <circle r="275" strokeDasharray="3 7" />
            <circle r="245" />
            <circle r="195" strokeOpacity="0.65" />
            <rect x="-175" y="-175" width="350" height="350" />
            <rect x="-175" y="-175" width="350" height="350" transform="rotate(45)" />
            <rect x="-135" y="-135" width="270" height="270" transform="rotate(22.5)" strokeOpacity="0.6" />
            <rect x="-135" y="-135" width="270" height="270" transform="rotate(67.5)" strokeOpacity="0.6" />
          </g>
        </svg>

        {/* Full-bleed Open Typography Sanctuary (No Boxy Card!) */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/15 border border-white/35 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-white font-semibold">
              Sacred Blessing
            </span>
          </div>

          <div dir="rtl" className="blessing-arabic-focus py-2">
            <p className="font-arabic text-3xl sm:text-5xl md:text-6xl text-white leading-[2.35] sm:leading-[2.45] tracking-wide select-none drop-shadow-[0_6px_28px_rgba(255,255,255,0.35)]">
              {eventConfig.duaArabic}
            </p>
          </div>

          {/* Self-drawing crisp white horizontal line */}
          <div className="blessing-rule w-56 sm:w-72 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto origin-center" />

          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white/95 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-[0_2px_14px_rgba(9,41,112,0.28)]">
            &ldquo;{eventConfig.duaTranslation}&rdquo;
          </blockquote>

          <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold pt-1">
            Sunan Abi Dawud
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCENE 04 — MONUMENTAL WATERMARK "25" & 3D FLATTENING DATE PLATE */}
      {/* ================================================================= */}
      <section
        id="date"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-28 overflow-hidden z-10"
      >
        {/* Monumental Parallax Typographic Watermark */}
        <span
          aria-hidden="true"
          className="date-watermark absolute font-serif text-[18rem] sm:text-[28rem] md:text-[34rem] leading-none text-white/[0.08] font-bold select-none pointer-events-none"
        >
          25
        </span>

        {/* 3D Perspective Crystal Invitation Plate (Scroll-Scrubbed Flattening) */}
        <div className="perspective-1200 w-full max-w-3xl mx-auto relative z-10">
          <div className="date-plate-3d preserve-3d azure-glass-strong sheen-plate rounded-[36px] p-8 sm:p-14">
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_auto_1fr] items-center gap-8 md:gap-10">
              {/* Left Monumental Date Stack */}
              <div className="text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/90 font-semibold">
                  <Calendar className="w-4 h-4" />
                  <span>Save The Date</span>
                </div>
                <div className="flex items-baseline justify-center md:justify-start gap-4 pt-2">
                  <span className="font-serif text-7xl sm:text-8xl md:text-9xl text-white font-normal leading-none">
                    25
                  </span>
                  <div className="text-left">
                    <span className="font-serif text-3xl sm:text-4xl text-white block leading-tight">
                      December
                    </span>
                    <span className="font-serif italic text-2xl sm:text-3xl text-white/90 block">
                      {eventConfig.yearDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Divider */}
              <div className="hidden md:block w-[1px] h-40 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
              <div className="md:hidden h-[1px] w-full bg-gradient-to-r from-transparent via-white/45 to-transparent" />

              {/* Right Schedule & Embossed White Seal */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="w-16 h-16 rounded-full bg-white text-[#0B1D42] shadow-[0_10px_28px_rgba(9,41,112,0.3)] flex flex-col items-center justify-center border-2 border-[#DBEAFE]">
                  <span className="font-serif italic font-bold text-base leading-none">FA</span>
                  <span className="text-[7px] uppercase tracking-widest font-bold mt-0.5 text-[#163A7A]">
                    2026
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="font-serif text-2xl text-white font-medium">
                    {eventConfig.dayDisplay} Evening
                  </p>
                  <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-white font-bold">
                    <Clock className="w-4 h-4 text-white/90" />
                    <span>{eventConfig.timeDisplay}</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                    Pakistan Standard Time
                  </p>
                </div>

                <div className="pt-2 border-t border-white/25 w-full">
                  <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white font-semibold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{eventConfig.venue}, Faisalabad</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SCENE 05 — ORBITAL SVG RING CHRONOMETER COUNTDOWN */}
      {/* ================================================================= */}
      <section
        id="celebration"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 py-28 max-w-5xl mx-auto z-10"
      >
        <div className="space-y-4 mb-12">
          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight">
            Counting Every Moment
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-white/90">
            {eventConfig.event} of {eventConfig.groom} &amp; {eventConfig.bride}
          </p>
        </div>

        {/* 4 Circular Orbital Chronometer Dials */}
        {timeLeft.isPast ? (
          <div className="azure-glass-strong rounded-full px-10 py-6">
            <p className="font-serif text-3xl sm:text-4xl text-white">
              The Celebration Has Begun!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 items-center justify-items-center">
            <OrbitalDial value={timeLeft.days} max={365} label="Days" />
            <OrbitalDial value={timeLeft.hours} max={24} label="Hours" />
            <OrbitalDial value={timeLeft.minutes} max={60} label="Minutes" />
            <OrbitalDial value={timeLeft.seconds} max={60} label="Seconds" isSeconds />
          </div>
        )}

        <p className="text-xs uppercase tracking-[0.26em] text-white/85 font-semibold mt-12">
          {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay} · {eventConfig.timeDisplay}
        </p>
      </section>

      {/* ================================================================= */}
      {/* SCENE 06 — SWEEPING HORIZON FINALE & VENUE (CLEAN — NO GPS!) */}
      {/* ================================================================= */}
      <section
        id="closing"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 py-24 max-w-5xl mx-auto z-10"
      >
        <div className="closing-arch-horizon azure-glass-strong sheen-plate w-full rounded-t-[180px] sm:rounded-t-[260px] rounded-b-[36px] px-6 sm:px-14 pt-20 pb-14 space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-white/90 font-semibold block">
              With Love &amp; Gratitude
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
              Dear Friends &amp; Family
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed font-light">
              Your presence will make our celebration truly unforgettable. We would be honored to welcome you as we celebrate this joyous milestone together.
            </p>

            <p className="font-serif italic text-3xl sm:text-4xl text-white pt-2">
              {eventConfig.groom} &amp; {eventConfig.bride}
            </p>
          </div>

          {/* Clean Venue Showcase Ribbon — ZERO GPS Coordinates */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/35 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#0B1D42] flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-2xl text-white font-medium leading-tight">
                  The Cottage Marquee
                </p>
                <p className="text-xs sm:text-sm text-white/90 font-light">
                  Daewoo Road, Faisalabad, Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-[11px] uppercase tracking-[0.2em] text-white font-semibold transition-colors cursor-pointer"
              >
                {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={eventConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B1D42] hover:bg-[#EFF6FF] text-[11px] uppercase tracking-[0.2em] font-bold shadow-[0_8px_22px_rgba(9,41,112,0.28)] transition-all"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Action Dock */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0B1D42] hover:bg-[#EFF6FF] text-xs uppercase tracking-[0.22em] font-bold shadow-[0_12px_28px_rgba(9,41,112,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Invitation</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-xs uppercase tracking-[0.2em] text-white font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-xs uppercase tracking-[0.2em] text-white font-semibold transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-xs uppercase tracking-[0.2em] text-white font-semibold transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </a>
          </div>

          <p className="text-[11px] uppercase tracking-[0.24em] text-white/75 pt-4 font-medium">
            {eventConfig.groom} &amp; {eventConfig.bride} · {eventConfig.dayDisplay}, {eventConfig.dateDisplay} {eventConfig.yearDisplay}
          </p>
        </div>
      </section>
    </div>
  );
};
