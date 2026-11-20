import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { CinematicScrollJourney } from './components/CinematicScrollJourney';
import { AudioToggle } from './components/AudioToggle';
import { soundEngine } from './audio/soundscape';

export const App: React.FC = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

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
    <div className="relative min-h-screen text-[#252A25] font-sans antialiased selection:bg-[#C6A56B]/30 selection:text-[#172D27]">
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
      <main className={!isInvitationOpen ? 'h-screen overflow-hidden' : 'relative w-full'}>
        <CinematicScrollJourney onReplay={handleReplayInvitation} />
      </main>
    </div>
  );
};

export default App;
