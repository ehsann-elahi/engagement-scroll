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
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0A0F1F]/90 hover:bg-[#121B33] backdrop-blur-xl border border-[#ECC872]/40 text-[#F8FAFC] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(236,200,114,0.3)] cursor-pointer"
      >
        {/* Animated Audio Equalizer Bars when playing */}
        {!isMuted ? (
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-[#ECC872] animate-[bounce_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 h-3/4 bg-[#FFF1C5] animate-[bounce_1.1s_ease-in-out_infinite_0.2s]" />
            <span className="w-0.5 h-1/2 bg-[#ECC872] animate-[bounce_0.9s_ease-in-out_infinite_0.4s]" />
          </div>
        ) : (
          <span className="w-2 h-2 rounded-full bg-slate-500" />
        )}

        {!isMuted ? (
          <Volume2 className="w-4 h-4 text-[#ECC872] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#94A3B8] transition-transform duration-300 group-hover:scale-110" />
        )}

        <span className="text-[10px] uppercase tracking-widest font-sans text-[#F8FAFC] hidden sm:inline font-semibold">
          {!isMuted ? 'Ceremony Symphony' : 'Muted'}
        </span>
      </button>
    </div>
  );
};
