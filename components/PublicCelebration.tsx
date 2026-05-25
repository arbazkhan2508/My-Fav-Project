"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Heart, Volume2, VolumeX, Flame, ChevronLeft, ChevronRight, MessageSquare, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { playSynthSound } from "@/components/AudioController";

const bdayImages = [
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM.jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (1).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (2).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (3).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (4).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (5).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (6).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (7).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.12.09 AM (8).jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 10.13.20 AM.jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 9.33.30 AM.jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM.jpeg",
  "/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM (1).jpeg"
];

const publicWishes = [
  {
    from: "Dearest Bestie 🌸",
    relation: "Friend",
    message: "Happy 23rd Birthday, Bhalu! 🎂 Having you in my life is a true blessing. You bring so much positive energy, warmth, and brightness to everyone around you. Wishing you a year ahead filled with infinite happiness, success, and beautiful adventures! Keep shining and smiling always! 💖",
    color: "from-pink-500/20 via-purple-500/10 to-amber-500/20 border-pink-500/35 text-neutral-100"
  }
];

export default function PublicCelebration() {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [step, setStep] = useState<"welcome" | "cake" | "celebrate">("welcome");
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCut, setCakeCut] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set isMounted to true on client-side load
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Background music handler
  useEffect(() => {
    if (isPlayingMusic) {
      if (!audioRef.current) {
        audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => { });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlayingMusic]);

  // Slideshow interval
  useEffect(() => {
    if (step !== "celebrate" || !isSlidePlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % bdayImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [step, isSlidePlaying]);

  const handleStart = () => {
    playSynthSound("success");
    setIsPlayingMusic(true);
    setStep("cake");
  };

  const handleBlowCandles = () => {
    playSynthSound("pop");
    setCandlesLit(false);
    // Blast light confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCutCake = () => {
    playSynthSound("success");
    setCakeCut(true);
    // Double fireworks bursts
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ec4899", "#f43f5e", "#fbbf24"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ec4899", "#f43f5e", "#fbbf24"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setStep("celebrate");
      }
    }());
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-sans selection:bg-pink-500 selection:text-white flex flex-col">

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating balloons in background - Only render on client to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 20 + 20}px`,
                height: `${Math.random() * 30 + 30}px`,
                left: `${Math.random() * 95}%`,
                bottom: "-10%",
                backgroundColor: ["#ec4899", "#f43f5e", "#a855f7", "#fbbf24"][i % 4]
              }}
              animate={{
                y: ["-10vh", "-110vh"],
                x: ["0px", `${Math.random() * 50 - 25}px`],
                rotate: [0, 360]
              }}
              transition={{
                duration: 12 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      {/* Music HUD Controls */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-12 h-12 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-pink-500/30 flex items-center justify-center text-pink-400 hover:text-pink-300 transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 text-neutral-500" />}
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* Step 1: Welcome Splash */}
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-6 max-w-2xl mx-auto z-10 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-bold text-pink-300 tracking-[0.2em] uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" />
                The Celebration Awaits
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-6xl font-black font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-300 to-amber-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
              >
                HAPPY 23rd BIRTHDAY,<br />BHALU! 🐻👑
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                transition={{ delay: 0.6 }}
                className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto"
              >
                Welcome to your digital birthday surprise arena. Tap the gift box below to start the celebration! 🎁
              </motion.p>
            </div>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-pink-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 flex flex-col items-center justify-center gap-2 border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.35)] cursor-pointer group"
            >
              <Gift className="w-12 h-12 text-white animate-bounce" />
              <span className="text-xs font-black tracking-widest text-pink-100 group-hover:text-white">OPEN ME</span>
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Virtual Cake Cutting */}
        {step === "cake" && (
          <motion.div
            key="cake"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex-1 flex flex-col items-center justify-center p-6 z-10 max-w-xl mx-auto space-y-12 text-center"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 tracking-[0.2em] uppercase">Interactive Stage</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
                {cakeCut
                  ? "Cutting the Cake! 🎂🔪"
                  : !candlesLit
                    ? "Time to Cut the Cake! 🍰"
                    : "Blow out the Candles 🕯️"
                }
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
                {!candlesLit
                  ? "Now, press the button below to cut the birthday cake and release the celebration! 🎉"
                  : "Make a beautiful wish inside your heart, then tap the candles to blow them out."
                }
              </p>
            </div>

            {/* Virtual Cake SVG Illustration */}
            <div className="relative w-64 h-64 flex items-center justify-center select-none">
              <svg className="w-56 h-56" viewBox="0 0 200 200">
                {/* Stand */}
                <path d="M 50 160 L 150 160 L 130 180 L 70 180 Z" fill="#333" />
                <rect x="95" y="150" width="10" height="20" fill="#222" />
                <ellipse cx="100" cy="150" rx="60" ry="10" fill="#444" />

                {/* Cake Body */}
                <rect x="45" y="90" width="110" height="60" fill="#881337" rx="6" /> {/* Rose cake base */}
                <ellipse cx="100" cy="90" rx="55" ry="12" fill="#be123c" /> {/* Rose cake top */}
                <rect x="45" y="115" width="110" height="10" fill="#fda4af" /> {/* Frosting stripe */}

                {/* Drips */}
                <path d="M 45 92 Q 55 105 60 92 Q 70 108 75 92 Q 90 110 100 92 Q 115 108 120 92 Q 135 105 140 92 Q 150 105 155 92" fill="none" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />

                {/* Candles */}
                {[70, 85, 100, 115, 130].map((x, idx) => (
                  <g key={idx}>
                    {/* Wax stick */}
                    <rect x={x - 2} y="60" width="4" height="25" fill={["#ec4899", "#fbbf24", "#a855f7"][idx % 3]} rx="1" />
                    {/* Flame */}
                    {candlesLit && (
                      <motion.circle
                        cx={x}
                        cy="52"
                        r="3"
                        fill="#f59e0b"
                        animate={{ scale: [1, 1.3, 1], y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: idx * 0.1 }}
                      />
                    )}
                  </g>
                ))}

                {/* Knife (when cutting) */}
                {cakeCut && (
                  <motion.g
                    initial={{ rotate: -45, x: 20, y: -20 }}
                    animate={{ rotate: 10, x: -10, y: 15 }}
                    transition={{ duration: 0.8 }}
                  >
                    <path d="M 140 60 L 160 40 L 170 45 L 145 70 Z" fill="#999" />
                    <rect x="165" y="35" width="15" height="6" fill="#8b5cf6" transform="rotate(45 165 35)" />
                  </motion.g>
                )}
              </svg>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-col items-center gap-3 w-full">
              {candlesLit ? (
                <button
                  onClick={handleBlowCandles}
                  className="px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] cursor-pointer active:scale-95 transition-all text-sm tracking-wider uppercase inline-flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-orange-400" />
                  Blow out Candles 🌬️
                </button>
              ) : !cakeCut ? (
                <button
                  onClick={handleCutCake}
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer active:scale-95 transition-all text-sm tracking-wider uppercase inline-flex items-center gap-2"
                >
                  Cut Birthday Cake 🔪🍰
                </button>
              ) : null}
            </div>
          </motion.div>
        )}

        {/* Step 3: Celebration Slideshow + Wishes Wall */}
        {step === "celebrate" && (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-6 py-12 space-y-16 z-10"
          >

            {/* Header banner */}
            <div className="text-center space-y-3">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/20 border border-amber-500/20 text-xs font-bold text-amber-300 tracking-[0.25em] uppercase"
              >
                🎉 23 years of magic
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-black font-serif tracking-tight uppercase">
                Happy Birthday! 👑🎂
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
                Celebrating Bhalu's 23rd birthday in public. Here is a gallery of your beautiful memories and heartfelt greetings!
              </p>
            </div>

            {/* Photo Slideshow Carousel */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-pink-400 text-sm font-bold uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
                  Memory Lane Reel
                </div>
                <button
                  onClick={() => setIsSlidePlaying(!isSlidePlaying)}
                  className="text-xs border border-white/10 hover:border-pink-500/40 text-neutral-400 hover:text-white px-3 py-1 rounded-full bg-neutral-900/50 backdrop-blur-md transition-all cursor-pointer"
                >
                  {isSlidePlaying ? "Pause Loop ⏸️" : "Auto Loop ▶️"}
                </button>
              </div>

              {/* Slider viewport */}
              <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl h-[450px] relative overflow-hidden flex items-center justify-center shadow-2xl">
                {/* Backdrop Blur Reflection */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-105 transition-all duration-1000"
                  style={{ backgroundImage: `url(${bdayImages[currentSlideIndex]})` }}
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlideIndex}
                    src={bdayImages[currentSlideIndex]}
                    alt={`Slideshow ${currentSlideIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="max-h-[85%] max-w-[85%] object-contain relative z-10 p-2 shadow-xl rounded-2xl border border-white/5 bg-neutral-950/60"
                  />
                </AnimatePresence>

                {/* Arrow navigation triggers */}
                <button
                  onClick={() => {
                    playSynthSound("click");
                    setCurrentSlideIndex((prev) => (prev - 1 + bdayImages.length) % bdayImages.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    playSynthSound("click");
                    setCurrentSlideIndex((prev) => (prev + 1) % bdayImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Position text indicator */}
                <div className="absolute bottom-4 right-6 z-20 text-[10px] text-neutral-400 font-bold bg-black/50 px-3 py-1 rounded-full border border-white/10">
                  {currentSlideIndex + 1} / {bdayImages.length}
                </div>
              </div>
            </div>

            {/* Wishes Wall Board */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Wishes & Greetings Board
              </div>

              {/* Centered single wish card */}
              <div className="max-w-lg mx-auto w-full">
                {publicWishes.map((wish, index) => (
                  <motion.div
                    key={wish.from}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 80 }}
                    whileHover={{ y: -5 }}
                    className={`p-8 rounded-3xl border bg-gradient-to-b ${wish.color} backdrop-blur-md shadow-2xl flex flex-col justify-between relative group overflow-hidden min-h-[220px]`}
                  >
                    {/* Background faint sparkle overlay */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-white/10 transition-colors" />

                    <div className="space-y-4">
                      {/* Body Message */}
                      <p className="text-base leading-relaxed text-neutral-100 font-sans italic">
                        "{wish.message}"
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                      <span className="font-bold text-sm text-white font-serif">{wish.from}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-white/5 text-neutral-400">{wish.relation}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Launcher confetti action */}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  playSynthSound("success");
                  confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ["#ec4899", "#fbbf24", "#3b82f6", "#10b981"]
                  });
                }}
                className="px-8 py-3 bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-black rounded-full shadow-[0_0_25px_rgba(236,72,153,0.3)] cursor-pointer active:scale-95 transition-all text-xs tracking-widest uppercase inline-flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
                Launch Confetti Burst 🎉
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
