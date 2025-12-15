import React, { useEffect, useRef, useState } from "react";
import { Users, Award, Calendar, TrendingUp } from "lucide-react";

// Combined React component: Stats + Piano
// Piano uses online audio URLs for note samples (with WebAudio fallback oscillator)

export default function StatsWithPiano() {
  // ---------- Stats section (intersection reveal) ----------
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, label: "Members Trained", value: "5000+", color: "lime" },
    { icon: Award, label: "Expert Trainers", value: "25+", color: "cyan" },
    { icon: Calendar, label: "Years Experience", value: "12+", color: "lime" },
    { icon: TrendingUp, label: "Success Rate", value: "98%", color: "cyan" },
  ];

  // ---------- Piano section ----------
  // Mode + audio
  const [crazyMode, setCrazyMode] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<string, AudioBuffer | null>>({});

  // NOTES used in the piano (octave 4 and 5 sample set)
  const notes = [
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
  ];

  // Map a note to an online mp3 asset (jsDelivr / GitHub-hosted soundfont repository)
  // NOTE: If a host is down the component falls back to synthesized tones
  const noteToUrl = (note: string) => {
    // Many soundfont collections use names like "A4.mp3" -- we'll try a common CDN pattern
    // This pattern points to the FluidR3_GM acoustic grand piano mp3s on jsDelivr (if available)
    // Fallback will handle if fetch fails.
    return `https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/acoustic_grand_piano-mp3/${note}.mp3`;
  };

  // Preload audio buffers (attempt online fetch). If fails, buffer stays null and we use oscillator fallback.
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const ctx = audioContextRef.current;
    let isMounted = true;

    async function loadAll() {
      for (const n of notes) {
        try {
          const url = noteToUrl(n);
          const res = await fetch(url);
          if (!isMounted) return;
          if (!res.ok) {
            buffersRef.current[n] = null;
            continue;
          }
          const arrayBuffer = await res.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          buffersRef.current[n] = audioBuffer;
        } catch (e) {
          // fetch or decode failed — leave null to use oscillator fallback
          buffersRef.current[n] = null;
        }
      }
    }

    loadAll();
    return () => {
      isMounted = false;
    };
  }, []);

  function playBuffer(note: string) {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const buf = buffersRef.current[note];
    if (buf) {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const gain = ctx.createGain();
      gain.gain.value = 0.7;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
      // auto cleanup
      src.onended = () => {
        try {
          src.disconnect();
          gain.disconnect();
        } catch (e) {}
      };
      return;
    }
    // fallback oscillator
    playSynth(note);
  }

  // small mapping from note name to frequency (equal temperament)
  const freqMap: Record<string, number> = {
    C4: 261.63,
    "C#4": 277.18,
    D4: 293.66,
    "D#4": 311.13,
    E4: 329.63,
    F4: 349.23,
    "F#4": 369.99,
    G4: 392.0,
    "G#4": 415.3,
    A4: 440.0,
    "A#4": 466.16,
    B4: 493.88,
    C5: 523.25,
    "C#5": 554.37,
    D5: 587.33,
    "D#5": 622.25,
    E5: 659.25,
  };

  function playSynth(note: string) {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freqMap[note] || 440;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.6, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now);
    o.stop(now + 1.1);
    o.onended = () => {
      try {
        o.disconnect();
        g.disconnect();
      } catch (e) {}
    };
  }

  // crazy-mode sounds (short playful blips) as oscillator variations
  function playCrazy(kind: string) {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const s = ctx.createOscillator();
    const g = ctx.createGain();
    s.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    switch (kind) {
      case "meow":
        s.type = "triangle";
        s.frequency.value = 800;
        g.gain.setValueAtTime(0.4, now);
        s.start(now);
        s.stop(now + 0.25);
        break;
      case "bark":
        s.type = "square";
        s.frequency.value = 220;
        g.gain.setValueAtTime(0.4, now);
        s.start(now);
        s.stop(now + 0.15);
        break;
      case "chirp":
        s.type = "sine";
        s.frequency.value = 1200;
        g.gain.setValueAtTime(0.25, now);
        s.start(now);
        s.stop(now + 0.1);
        break;
      case "laugh":
        s.type = "sawtooth";
        s.frequency.value = 420;
        g.gain.setValueAtTime(0.35, now);
        s.start(now);
        s.stop(now + 0.5);
        break;
      default:
        s.type = "sine";
        s.frequency.value = 600;
        g.gain.setValueAtTime(0.2, now);
        s.start(now);
        s.stop(now + 0.12);
    }
  }

  // Piano keys layout (converted from the HTML piano)
  const keys = [
    { label: "C4", type: "white", crazy: "bell" },
    { label: "C#4", type: "black", crazy: "meow" },
    { label: "D4", type: "white", crazy: "honk" },
    { label: "D#4", type: "black", crazy: "bark" },
    { label: "E4", type: "white", crazy: "quack" },
    { label: "F4", type: "white", crazy: "moo" },
    { label: "F#4", type: "black", crazy: "chirp" },
    { label: "G4", type: "white", crazy: "ribbit" },
    { label: "G#4", type: "black", crazy: "laugh" },
    { label: "A4", type: "white", crazy: "roar" },
    { label: "A#4", type: "black", crazy: "scream" },
    { label: "B4", type: "white", crazy: "hiss" },
    { label: "C5", type: "white", crazy: "ding" },
    { label: "C#5", type: "black", crazy: "snort" },
    { label: "D5", type: "white", crazy: "burp" },
    { label: "D#5", type: "black", crazy: "pop" },
    { label: "E5", type: "white", crazy: "whoosh" },
  ];

  // Play a key (tries buffer -> fallback synth -> crazy sound)
  function handlePlay(key: { label: string; type: string; crazy: string }) {
    // ensure audio context resumed on first interaction (browsers require user gesture)
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      audioContextRef.current.resume();
    }

    if (crazyMode) {
      playCrazy(key.crazy);
    } else {
      playBuffer(key.label);
    }
  }

  // Small rendering helpers
  const statItemClass = (isLime: boolean) => `
    text-center transform transition-all duration-700 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`;

  // ---------- JSX ----------
  return (
    <div className="w-full">
      {/* Stats section */}
      <section
        ref={sectionRef}
        className="py-16 bg-gradient-to-b from-black to-neutral-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isLime = stat.color === "lime";
              return (
                <div
                  key={index}
                  className={statItemClass(isLime)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-4 rounded-2xl ${
                        isLime
                          ? "bg-lime-400/10 border border-lime-400/30"
                          : "bg-cyan-400/10 border border-cyan-400/30"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isLime ? "text-lime-400" : "text-cyan-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`bebas text-4xl md:text-5xl mb-2 ${
                      isLime ? "text-gradient-lime" : "text-gradient-blue"
                    }`}
                  >
                    {stat.value}
                  </div>

                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Piano section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">Interactive Piano</h3>
                <p className="text-sm text-gray-400">
                  Tap keys to play. Use Crazy Mode for fun sounds.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCrazyMode(!crazyMode)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    crazyMode
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
                  }`}
                >
                  {crazyMode ? "🤪 Crazy Mode" : "🎵 Piano Mode"}
                </button>

                <div className="text-gray-400 text-sm">
                  Audio:{" "}
                  {audioContextRef.current
                    ? audioContextRef.current.state
                    : "init"}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end">
                {/* Render white keys with gaps for black keys */}
                {keys.map((k, i) => {
                  const isWhite = k.type === "white";
                  return (
                    <button
                      key={k.label + i}
                      onClick={() => handlePlay(k)}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        handlePlay(k);
                      }}
                      className={`focus:outline-none ${
                        isWhite
                          ? "col-span-2 bg-white text-slate-800 shadow-md rounded-md h-20 md:h-36"
                          : "col-span-1 bg-slate-800 text-slate-100 shadow-inner rounded-md h-12 md:h-24 -mt-10 md:-mt-20 z-10"
                      }`}
                    >
                      <div className="text-xs md:text-sm font-medium">
                        {k.label.replace(/#/, "♯")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Tip: on some browsers the first tap will unlock audio (user
              gesture required).
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
