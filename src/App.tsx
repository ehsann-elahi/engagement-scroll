import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { CinematicScrollJourney } from './components/CinematicScrollJourney';
import { AudioToggle } from './components/AudioToggle';
import { CelestialCanvas } from './components/CelestialCanvas';
import { soundEngine } from './audio/soundscape';

export const App: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Initialize Lenis smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    // Smooth scroll to top when opening
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleReplayInvitation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsInvitationOpen(false);
      soundEngine.stopBackgroundMusic();
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-[#050811] text-[#F8FAFC] font-sans antialiased selection:bg-[#ECC872]/30 selection:text-[#FFF1C5]">
      {/* 60FPS Celestial Canvas Stardust & Particle Haze */}
      <CelestialCanvas />

      {/* Audio toggle available whenever invitation is opened */}
      {isInvitationOpen && <AudioToggle />}

      {/* Opening Envelope Ceremony Overlay with Smooth Unmount Transition */}
      <AnimatePresence>
        {!isInvitationOpen && (
          <OpeningEnvelope
            isOpen={isInvitationOpen}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Continuous Scroll Journey */}
      <main className={!isInvitationOpen ? 'h-screen overflow-hidden' : 'relative w-full z-10'}>
        <CinematicScrollJourney onReplay={handleReplayInvitation} />
      </main>
    </div>
  );
};

export default App;
