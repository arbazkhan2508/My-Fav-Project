"use client";
import React, { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";

// Sound synthesis helper using Web Audio API
export const playSynthSound = (type: 'chime' | 'pop' | 'click' | 'success') => {
  if (typeof window === "undefined") return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Resume context if suspended
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    
    const now = ctx.currentTime;
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } 
    else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } 
    else if (type === 'chime') {
      // Create a nice sparkly bell chime sound (synthesized arpeggio)
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.6);
      });
    } 
    else if (type === 'success') {
      // Rich chord arpeggio ending on C major
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4 -> C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.2);
      });
    }
  } catch (err) {
    console.error("Failed to play synth sound:", err);
  }
};

// Create a global registry for audio playback triggers to bypass browser autoplay blocks
let playBackgroundAudioFn: (() => void) | null = null;
let pauseBackgroundAudioFn: (() => void) | null = null;

export const startBackgroundMusic = () => {
  if (playBackgroundAudioFn) {
    playBackgroundAudioFn();
  }
};

export const stopBackgroundMusic = () => {
  if (pauseBackgroundAudioFn) {
    pauseBackgroundAudioFn();
  }
};

interface AudioControllerProps {
  shouldPlay?: boolean;
}

export default function AudioController({ shouldPlay = false }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(birthdayConfig.bgMusicUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Map global triggers
    playBackgroundAudioFn = () => {
      if (audio) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((e) => {
            console.log("Audio play blocked, attempting context resume...", e);
            // Fallback: try standard interaction play
          });
      }
    };

    pauseBackgroundAudioFn = () => {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    return () => {
      audio.pause();
      audioRef.current = null;
      playBackgroundAudioFn = null;
      pauseBackgroundAudioFn = null;
    };
  }, []);

  // Sync with shouldPlay prop from parent
  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log("Audio autoplay blocked by browser. Awaiting user interaction.", e);
        });
    }
  }, [shouldPlay]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    // Play interaction chime
    playSynthSound('click');

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Failed to play music:", e));
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[1000] flex items-center gap-3">
      {isPlaying && (
        <span className="hidden md:inline-block text-xs font-medium text-pink-300 bg-pink-950/40 backdrop-blur-md px-3 py-1 rounded-full border border-pink-500/20 animate-pulse">
          Listening to Romantic Piano ✨
        </span>
      )}
      <button
        onClick={toggleMusic}
        className={`p-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 cursor-pointer
          ${isPlaying 
            ? "bg-pink-500/20 border-pink-500/40 text-pink-300 hover:bg-pink-500/30" 
            : "bg-black/40 border-gray-700/40 text-gray-400 hover:border-gray-500 hover:text-white"
          }
        `}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
