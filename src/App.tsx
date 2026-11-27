import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { CinematicScrollJourney } from './components/CinematicScrollJourney';
import { AudioToggle } from './components/AudioToggle';
import { AzureCanvas } from './components/AzureCanvas';
import { soundEngine } from './audio/soundscape';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Initialize Lenis kinetic momentum scrolling synced 1:1 with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setTimeout(() => ScrollTrigger.refresh(), 120);
  };

  const handleReplayInvitation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsInvitationOpen(false);
      soundEngine.stopBackgroundMusic();
    }, 600);
  };

  return (
    <div className="relative min-h-screen text-white font-sans antialiased selection:bg-white/30 selection:text-white">
      {/* Radiant Bright Royal Blue & Floating Crystal Stardust Canvas */}
      <AzureCanvas />

      {/* Audio toggle available whenever invitation is opened */}
      {isInvitationOpen && <AudioToggle />}

      {/* 3D Folded Royal Blue Silk Envelope Ceremony Overlay */}
      <AnimatePresence>
        {!isInvitationOpen && (
          <OpeningEnvelope
            isOpen={isInvitationOpen}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Continuous GSAP + Lenis Scroll-Driven Journey */}
      <main className={!isInvitationOpen ? 'h-screen overflow-hidden' : 'relative w-full z-10'}>
        <CinematicScrollJourney
          isOpen={isInvitationOpen}
          onReplay={handleReplayInvitation}
        />
      </main>
    </div>
  );
};

export default App;
