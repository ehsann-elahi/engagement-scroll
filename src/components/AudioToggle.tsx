import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../audio/soundscape';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());

  const handleToggle = () => {
    const isUnmuted = soundEngine.toggleMute();
    setIsMuted(!isUnmuted);
    try {
      sessionStorage.setItem('audio_muted', (!isUnmuted).toString());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('audio_muted');
      if (saved === 'true') {
        soundEngine.toggleMute();
        setIsMuted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={handleToggle}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1B365D] hover:bg-[#0F1E36] backdrop-blur-md border border-[#C6A56B] text-[#FAF8F3] transition-all duration-300 shadow-xl hover:shadow-[#C6A56B]/30 cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          {!isMuted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFCA9E] opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${!isMuted ? 'bg-[#DFCA9E]' : 'bg-[#FAF8F3]/40'}`} />
        </span>

        {!isMuted ? (
          <Volume2 className="w-4 h-4 text-[#DFCA9E] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#FAF8F3]/60 transition-transform duration-300 group-hover:scale-110" />
        )}

        <span className="text-[10px] uppercase tracking-widest font-sans text-[#FAF8F3] hidden sm:inline font-semibold">
          {!isMuted ? "Music Playing" : "Muted"}
        </span>
      </button>
    </div>
  );
};
