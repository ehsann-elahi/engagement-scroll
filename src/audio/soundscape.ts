// Luxury Web Audio Synthesized Orchestral Soundscape & Sound Effects
// Real-time acoustic synthesis with zero external MP3 network dependencies

class SoundEngine {
  private ac: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private sequenceTimer: number | null = null;

  private initContext() {
    if (!this.ac) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ac = new AudioCtx();

      // Master output
      this.masterGain = this.ac.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ac.currentTime);

      // Music sub-gain
      this.musicGain = this.ac.createGain();
      this.musicGain.gain.setValueAtTime(0.5, this.ac.currentTime);

      // Convolution reverb for cathedral/wedding hall depth
      const rv = this.ac.createConvolver();
      const len = this.ac.sampleRate * 3.2;
      const ir = this.ac.createBuffer(2, len, this.ac.sampleRate);
      const wet = this.ac.createGain();
      wet.gain.value = 0.45;

      for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
        }
      }
      rv.buffer = ir;

      this.musicGain.connect(this.masterGain);
      this.musicGain.connect(rv);
      rv.connect(wet);
      wet.connect(this.masterGain);
      this.masterGain.connect(this.ac.destination);
    }

    if (this.ac.state === 'suspended') {
      this.ac.resume();
    }
  }

  // Convert MIDI note to Hertz
  private hz(n: number): number {
    return 440 * Math.pow(2, (n - 69) / 12);
  }

  // Play an instrument voice
  private voice(
    type: 'pad' | 'lead' | 'harp',
    note: number,
    startDelay: number,
    holdDuration: number,
    volume: number
  ) {
    if (!this.ac || !this.musicGain) return;
    const t0 = this.ac.currentTime + startDelay;
    const filter = this.ac.createBiquadFilter();
    const gain = this.ac.createGain();

    const presets = {
      pad: { waves: ['sawtooth', 'sawtooth'] as OscillatorType[], at: 0.35, rel: 1.0, cut: 850 },
      lead: { waves: ['sawtooth', 'triangle'] as OscillatorType[], at: 0.08, rel: 0.6, cut: 1200 },
      harp: { waves: ['triangle', 'sine'] as OscillatorType[], at: 0.005, rel: 0.0, cut: 2400 },
    };

    const p = presets[type];
    filter.type = 'lowpass';
    filter.Q.value = 0.4;
    filter.frequency.setValueAtTime(p.cut * 0.6, t0);
    filter.frequency.linearRampToValueAtTime(p.cut, t0 + p.at + 0.1);

    const end = type === 'harp' ? t0 + holdDuration : t0 + holdDuration + p.rel;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + p.at);

    if (type === 'harp') {
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
    } else {
      gain.gain.setValueAtTime(volume, t0 + holdDuration);
      gain.gain.linearRampToValueAtTime(0.0001, end);
    }

    p.waves.forEach((w, i) => {
      if (!this.ac) return;
      const osc = this.ac.createOscillator();
      osc.type = w;
      osc.frequency.value = this.hz(note);
      osc.detune.value = i ? 6 : -6;
      osc.connect(filter);
      osc.start(t0);
      osc.stop(end + 0.05);
    });

    filter.connect(gain);
    gain.connect(this.musicGain);
  }

  // Tactile wax seal breaking & envelope opening sound effect
  public playSealBreak() {
    this.initContext();
    if (!this.ac || !this.masterGain) return;

    const t = this.ac.currentTime;

    // 1. Low paper rustle crunch
    const bufferSize = this.ac.sampleRate * 0.18;
    const buffer = this.ac.createBuffer(1, bufferSize, this.ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = this.ac.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ac.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1400;

    const noiseGain = this.ac.createGain();
    noiseGain.gain.setValueAtTime(0.35, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);

    // 2. High golden sparkle chime
    const osc = this.ac.createOscillator();
    const chimeGain = this.ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1174.66, t); // D6
    osc.frequency.exponentialRampToValueAtTime(2349.32, t + 0.25); // D7

    chimeGain.gain.setValueAtTime(0.15, t);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

    osc.connect(chimeGain);
    chimeGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Play romantic processional melody (Stately D-major royal wedding progression)
  public startBackgroundMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Royal chord progression: D major -> G major -> A major -> D major
    const playStatelyPhrase = () => {
      if (!this.isPlaying) return;

      const beat = 0.55; // tempo

      // Chords (pad voice)
      const chords = [
        { notes: [38, 50, 57, 62, 66], b: 0, len: 4 }, // D
        { notes: [43, 55, 59, 67], b: 4, len: 2 },     // G
        { notes: [45, 57, 61, 64], b: 6, len: 2 },     // A
        { notes: [38, 50, 57, 62, 66], b: 8, len: 5 }, // D resolution
      ];

      chords.forEach(c => {
        c.notes.forEach(n => {
          this.voice('pad', n, c.b * beat, c.len * beat, 0.035);
        });
      });

      // Lead royal melody (horn & strings)
      const melody = [
        { n: 69, b: 0, l: 1.5, v: 0.06 },
        { n: 74, b: 1.5, l: 0.5, v: 0.07 },
        { n: 74, b: 2.0, l: 1.0, v: 0.07 },
        { n: 78, b: 3.0, l: 1.0, v: 0.07 },
        { n: 79, b: 4.0, l: 1.5, v: 0.07 },
        { n: 78, b: 5.5, l: 0.5, v: 0.07 },
        { n: 76, b: 6.0, l: 2.0, v: 0.07 },
        { n: 74, b: 8.0, l: 4.5, v: 0.08 },
      ];

      melody.forEach(m => {
        this.voice('lead', m.n, m.b * beat, m.l * beat, m.v);
      });

      // Delicate harp arpeggio runs in background
      const harpNotes = [62, 66, 69, 74, 78, 81, 78, 74];
      harpNotes.forEach((hn, i) => {
        this.voice('harp', hn, (i * 0.45) * beat, 1.4 * beat, 0.04);
      });
      harpNotes.slice().reverse().forEach((hn, i) => {
        this.voice('harp', hn, (4 + i * 0.45) * beat, 1.4 * beat, 0.04);
      });
    };

    playStatelyPhrase();
    this.sequenceTimer = window.setInterval(playStatelyPhrase, 7600);
  }

  public stopBackgroundMusic() {
    this.isPlaying = false;
    if (this.sequenceTimer) {
      clearInterval(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    if (this.musicGain && this.ac) {
      this.musicGain.gain.linearRampToValueAtTime(0.0001, this.ac.currentTime + 0.8);
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ac) {
      const target = this.isMuted ? 0.0001 : 0.7;
      this.masterGain.gain.linearRampToValueAtTime(target, this.ac.currentTime + 0.3);
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEngine = new SoundEngine();
