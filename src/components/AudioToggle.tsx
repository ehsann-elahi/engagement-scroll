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
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50">
      <button
        onClick={handleToggle}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#15233E]/85 hover:bg-[#1D3054] backdrop-blur-xl border border-[#ECC872]/40 text-[#F8FAFC] transition-all duration-300 shadow-[0_8px_28px_rgba(5,11,24,0.45)] hover:shadow-[0_0_22px_rgba(236,200,114,0.28)] cursor-pointer"
      >
        {!isMuted ? (
          <div className="flex items-end gap-[2.5px] h-3.5" aria-hidden="true">
            <span className="w-[2px] h-full bg-[#ECC872] rounded-full animate-[bounce_0.75s_ease-in-out_infinite]" />
            <span className="w-[2px] h-2/3 bg-[#FFF1C5] rounded-full animate-[bounce_1.05s_ease-in-out_infinite_0.2s]" />
            <span className="w-[2px] h-4/5 bg-[#ECC872] rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.35s]" />
          </div>
        ) : (
          <span className="w-2 h-2 rounded-full bg-slate-400" />
        )}

        {!isMuted ? (
          <Volume2 className="w-4 h-4 text-[#ECC872] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#94A3B8] transition-transform duration-300 group-hover:scale-110" />
        )}

        <span className="text-[10px] uppercase tracking-[0.22em] font-sans text-[#F8FAFC] hidden sm:inline font-semibold">
          {!isMuted ? 'Ceremony Symphony' : 'Muted'}
        </span>
      </button>
    </div>
  );
};
