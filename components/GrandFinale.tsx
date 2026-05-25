"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, Play, FileImage, X, Maximize2 } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound, pauseMusic, resumeMusic } from "@/components/AudioController";

interface GrandFinaleProps {
  isUnlocked: boolean;
}

export default function GrandFinale({ isUnlocked }: GrandFinaleProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [noteZoom, setNoteZoom] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openVideoModal = () => {
    playSynthSound('click');
    pauseMusic();
    setVideoModal(true);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    resumeMusic();
    setVideoModal(false);
  };

  const openNoteModal = () => {
    playSynthSound('click');
    setNoteModal(true);
  };

  const closeNoteModal = () => {
    setNoteZoom(false);
    setNoteModal(false);
  };

  // Trigger continuous confetti blasts and fireworks
  const triggerCelebration = () => {
    playSynthSound('success');
    setShowCelebration(true);

    // Initial confetti burst
    const end = Date.now() + 6 * 1000; // 6 seconds duration
    const colors = ["#ec4899", "#d946ef", "#fbbf24", "#f43f5e", "#a855f7"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // HTML5 Canvas Fireworks Simulator
  useEffect(() => {
    if (!showCelebration) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      gravity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
        this.color = color;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.gravity = 0.08;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.alpha -= this.decay;
      }
    }

    class Firework {
      x: number;
      y: number;
      color: string;
      sparks: Spark[];

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        const colors = ["#f43f5e", "#ec4899", "#d946ef", "#fbbf24", "#38bdf8", "#34d399"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.sparks = [];

        const targetY = Math.random() * (height * 0.5) + height * 0.1;
        const duration = 40 + Math.random() * 20;
        let count = 0;
        const vy = -(height - targetY) / duration;

        const launch = () => {
          if (count >= duration) {
            for (let i = 0; i < 50; i++) {
              this.sparks.push(new Spark(this.x, targetY, this.color));
            }
            return;
          }
          this.y += vy;
          count++;
          if (ctx) {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          requestAnimationFrame(launch);
        };
        launch();
      }

      update() {
        this.sparks.forEach((spark) => spark.update());
        this.sparks = this.sparks.filter((spark) => spark.alpha > 0);
      }

      draw() {
        this.sparks.forEach((spark) => spark.draw());
      }
    }

    const fireworksList: Firework[] = [];
    let animationFrameId: number;

    const loop = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.04 && fireworksList.length < 5) {
        fireworksList.push(new Firework());
      }

      fireworksList.forEach((fw) => {
        fw.update();
        fw.draw();
      });

      for (let i = fireworksList.length - 1; i >= 0; i--) {
        if (fireworksList[i].sparks.length === 0 && fireworksList[i].y < height) {
          fireworksList.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showCelebration]);

  if (!isUnlocked) return null;

  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      
      {/* Absolute canvas for rendering canvas fireworks */}
      {showCelebration && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-30" 
        />
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeVideoModal(); }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.25)]"
            >
              {/* Ambient glow rim */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/5 via-transparent to-pink-500/5 pointer-events-none z-10" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-pink-500 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Video Message 🎥</p>
                    <p className="text-neutral-500 text-xs">A special message just for you, Bhalu 🐻</p>
                  </div>
                </div>
                <button
                  onClick={closeVideoModal}
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-pink-500/40 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player */}
              <div className="bg-black aspect-video relative">
                <video
                  ref={videoRef}
                  src={birthdayConfig.finalVideoUrl}
                  controls
                  className="w-full h-full object-contain"
                  onError={() => {
                    // Fallback handled by the error overlay
                  }}
                >
                  Your browser does not support the video tag.
                </video>
                {/* Fallback overlay if video fails to load */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/95 text-center p-8 pointer-events-none"
                  style={{ display: "none" }}
                  id="video-fallback"
                >
                  <span className="text-5xl mb-4">🎥</span>
                  <p className="text-white font-bold text-lg">Video Coming Soon!</p>
                  <p className="text-neutral-400 text-sm mt-2">Place your video at <code className="text-amber-400">public/video/birthday_message.mp4</code></p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-neutral-950/80 border-t border-white/5 text-center">
                <p className="text-xs text-neutral-500 italic">Made with infinite love ❤️ — just for you</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Handwritten Note Modal */}
      <AnimatePresence>
        {noteModal && (
          <motion.div
            key="note-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeNoteModal(); }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.25)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm">
                    ✍️
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Handwritten Note ✍️</p>
                    <p className="text-neutral-500 text-xs">Words from the heart, written just for you</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNoteZoom(!noteZoom)}
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-pink-500/40 transition-all cursor-pointer"
                    title="Toggle Zoom"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={closeNoteModal}
                    className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-pink-500/40 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Parchment Note Image */}
              <div
                className="bg-[#f5f0e8] relative overflow-hidden"
                style={{ minHeight: "400px" }}
              >
                {/* Paper texture decoration */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #c4a882 28px)",
                    backgroundSize: "100% 28px"
                  }}
                />
                <div className="absolute left-10 top-0 bottom-0 w-px bg-rose-300/40 pointer-events-none" />

                <motion.div
                  animate={{ scale: noteZoom ? 1.5 : 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  className="relative z-10 flex items-center justify-center p-4 cursor-zoom-in"
                  onClick={() => setNoteZoom(!noteZoom)}
                >
                  {/* Envelope open animation wrapper */}
                  <motion.img
                    initial={{ opacity: 0, rotateX: -15, y: 20 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                    src={birthdayConfig.finalHandwrittenNote}
                    alt="Handwritten note for Bhalu 🐻"
                    className="w-full max-h-[500px] object-contain rounded-xl shadow-2xl"
                    style={{
                      filter: "sepia(15%) brightness(1.02)",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)"
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/500x700/f5f0e8/c4a882?text=Your+Handwritten+Note+Here";
                    }}
                  />
                </motion.div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-neutral-950/80 border-t border-white/5 text-center">
                <p className="text-xs text-neutral-500 italic">Tap the note to zoom in and read every word 🔍</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto text-center relative z-20 space-y-12">
        <AnimatePresence mode="wait">
          {!showCelebration ? (
            <motion.div
              key="trigger-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              className="space-y-8 py-20"
            >
              <div className="space-y-4 max-w-lg mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase">
                  <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  The Climax
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight">
                  One Last Surprise...
                </h2>
                <p className="text-sm md:text-base text-gray-400 font-medium">
                  We have traversed our memories, read our letters, and listed our reasons. Now, click one last time to unlock the moment.
                </p>
              </div>

              {/* Pulser Button */}
              <div className="flex justify-center">
                <button
                  onClick={triggerCelebration}
                  className="relative group w-48 h-48 rounded-full border border-pink-500/40 bg-pink-950/20 text-white font-bold text-lg hover:border-pink-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(236,72,153,0.3)] hover:shadow-[0_0_70px_rgba(236,72,153,0.6)] cursor-pointer flex flex-col items-center justify-center gap-2 select-none"
                >
                  {/* Glowing pulses */}
                  <span className="absolute inset-0 rounded-full bg-pink-500/10 animate-ping pointer-events-none" />
                  <span className="absolute -inset-4 rounded-full bg-pink-500/5 animate-pulse pointer-events-none" style={{ animationDuration: "3s" }} />

                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500 group-hover:scale-125 transition-transform duration-500" />
                  <span className="text-sm tracking-[0.15em] uppercase font-bold text-pink-200">
                    Click Me ❤️
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration-panel"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.3 }}
              className="space-y-12 py-10"
            >
              
              {/* Golden/Pink Glowing Happy Birthday Typography */}
              <div className="space-y-2 relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs font-bold text-amber-400 tracking-[0.3em] uppercase mb-4">
                    Happy 24th Birthday, My Love
                  </span>
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-300 to-amber-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] uppercase">
                    Happy Birthday!
                  </h1>
                </motion.div>
              </div>

              {/* Floating Hearts Row */}
              <div className="flex justify-center gap-2 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      y: [0, -6, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.15
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>

              {/* The Central Heartfelt Editable Letter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="max-w-2xl mx-auto p-8 sm:p-12 rounded-[3rem] bg-neutral-900/60 backdrop-blur-xl border border-pink-500/20 shadow-2xl relative"
              >
                {/* Background overlay flare */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Subtitle */}
                <div className="flex justify-center items-center gap-1.5 text-pink-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  A Letter to Bhalu 🐻
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                {/* Letter Body Paragraph */}
                <p className="text-xl sm:text-2xl text-neutral-100 leading-loose font-handwriting text-left whitespace-pre-line">
                  {birthdayConfig.finalSurpriseMessage}
                </p>

                {/* Signature */}
                <div className="mt-8 text-right space-y-1">
                  <p className="text-xs text-neutral-500 font-medium">With all my love,</p>
                  <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300 font-serif">
                    Your Favorite Person 💑
                  </p>
                </div>
              </motion.div>

              {/* ── Video & Note Card Grid ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {/* Video Card */}
                <button
                  onClick={openVideoModal}
                  className="group relative p-6 rounded-2xl border border-amber-500/20 bg-neutral-900/50 backdrop-blur-xl hover:border-amber-400/50 hover:bg-neutral-900/80 transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base font-serif">Watch My Video</h3>
                      <p className="text-neutral-500 text-xs mt-0.5">A heartfelt message just for you 🎥</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <span>Play Now</span>
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </button>

                {/* Note Card */}
                <button
                  onClick={openNoteModal}
                  className="group relative p-6 rounded-2xl border border-pink-500/20 bg-neutral-900/50 backdrop-blur-xl hover:border-pink-400/50 hover:bg-neutral-900/80 transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-left"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/10 transition-colors" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 text-xl">
                      ✍️
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base font-serif">Handwritten Note</h3>
                      <p className="text-neutral-500 text-xs mt-0.5">Words written from my heart ✍️</p>
                    </div>
                    <div className="flex items-center gap-1 text-pink-400 text-xs font-semibold">
                      <span>Open Note</span>
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Re-trigger Confetti button */}
              <div className="pt-8">
                <button
                  onClick={triggerCelebration}
                  className="px-6 py-2 border border-neutral-800 hover:border-pink-500/40 rounded-full text-xs font-semibold text-neutral-500 hover:text-pink-300 bg-neutral-900/40 backdrop-blur-md transition-all cursor-pointer"
                >
                  🚀 Launch Confetti Again
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
