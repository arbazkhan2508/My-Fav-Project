"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playSynthSound } from "@/components/AudioController";

const TOTAL_CANDLES = 24;

// Light a birthday candle chime
const playCandleChime = (index: number) => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    // Slight pitch variation per candle for a twinkle effect
    const baseFreq = 880 + index * 18;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.04);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) { /* silent */ }
};

const playBlowSound = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    // White noise for wind effect
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 600;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
    source.stop(now + 0.6);
  } catch (e) { /* silent */ }
};

interface CandleProps {
  index: number;
  isLit: boolean;
  isBlown: boolean;
  onClick: (index: number) => void;
}

function Candle({ index, isLit, isBlown, onClick }: CandleProps) {
  // Hue cycling for rainbow candles
  const hue = (index * (360 / TOTAL_CANDLES)) % 360;
  const candleColor = `hsl(${hue}, 70%, 65%)`;
  const flameColors = ["#fde68a", "#fbbf24", "#f97316", "#ef4444"];

  return (
    <motion.div
      key={index}
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`Candle ${index + 1}`}
    >
      {/* Flame */}
      <div className="relative w-4 h-6 flex items-end justify-center mb-0.5">
        <AnimatePresence>
          {isLit && !isBlown && (
            <motion.div
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
                opacity: 1,
                y: [0, -1, 1, -1, 0],
              }}
              exit={{ scale: 0, opacity: 0, y: -4 }}
              transition={{
                duration: 0.4,
                y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
                scale: { repeat: Infinity, duration: 0.9, ease: "easeInOut" },
              }}
              className="absolute bottom-0 w-3 h-5 rounded-full"
              style={{
                background: `radial-gradient(ellipse at 50% 80%, ${flameColors[0]}, ${flameColors[1]} 40%, ${flameColors[2]} 70%, ${flameColors[3]})`,
                boxShadow: `0 0 6px 2px ${flameColors[1]}88, 0 0 12px 4px ${flameColors[2]}44`,
                filter: "blur(0.5px)",
              }}
            />
          )}
          {isBlown && (
            <motion.div
              key="smoke"
              initial={{ opacity: 0.7, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -14, scale: 1.5, x: [0, 2, -2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute bottom-0 w-3 h-4 rounded-full bg-gray-400/40 blur-sm"
            />
          )}
        </AnimatePresence>
        {!isLit && !isBlown && (
          <div
            className="absolute bottom-0 w-0.5 h-2 rounded-full"
            style={{ backgroundColor: "#d97706", opacity: 0.6 }}
          />
        )}
      </div>

      {/* Wax stick */}
      <div
        className="rounded-t-sm rounded-b-md shadow-sm"
        style={{
          width: "10px",
          height: "28px",
          backgroundColor: candleColor,
          boxShadow: isLit ? `0 0 6px ${candleColor}88` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      />
      {/* Drip */}
      <div
        className="w-3.5 h-1.5 rounded-full"
        style={{ backgroundColor: candleColor, opacity: 0.7, marginTop: "-1px" }}
      />
    </motion.div>
  );
}

export default function BirthdayCake() {
  const [litCandles, setLitCandles] = useState<Set<number>>(new Set());
  const [blownOut, setBlownOut] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState(false);
  const [isLightingAll, setIsLightingAll] = useState(false);

  const allLit = litCandles.size === TOTAL_CANDLES;

  const toggleCandle = useCallback((index: number) => {
    if (blownOut) return;
    setLitCandles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        playCandleChime(index);
      }
      return next;
    });
  }, [blownOut]);

  const lightAllCandles = async () => {
    if (isLightingAll || blownOut) return;
    setIsLightingAll(true);
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      await new Promise((res) => setTimeout(res, 60));
      setLitCandles((prev) => {
        const next = new Set(prev);
        next.add(i);
        return next;
      });
      playCandleChime(i);
    }
    setIsLightingAll(false);
  };

  const blowOutCandles = () => {
    if (!allLit || blownOut) return;
    playBlowSound();
    playSynthSound('success');
    setBlownOut(true);

    // Mega confetti burst
    const colors = ["#ec4899", "#d946ef", "#fbbf24", "#f43f5e", "#a855f7", "#38bdf8"];
    confetti({ particleCount: 80, spread: 100, origin: { x: 0.5, y: 0.5 }, colors });
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors }), 300);
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors }), 500);

    setTimeout(() => setCelebrationMsg(true), 600);
  };

  return (
    <section className="relative bg-black py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.04),transparent_65%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">

        {/* Section Header */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/20 border border-amber-500/20 text-xs font-semibold text-amber-300 tracking-[0.2em] uppercase"
          >
            🎂 Make a Wish
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Blow Out Your 24 Candles! 🕯️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            Light all {TOTAL_CANDLES} candles first, then blow them out together — and make a wish! ✨
          </motion.p>
        </div>

        {/* Birthday Cake */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
          className="flex flex-col items-center"
        >
          {/* Candles Row */}
          <div className="flex flex-wrap justify-center gap-1.5 px-8 mb-1" style={{ maxWidth: "500px" }}>
            {[...Array(TOTAL_CANDLES)].map((_, i) => (
              <Candle
                key={i}
                index={i}
                isLit={litCandles.has(i)}
                isBlown={blownOut && litCandles.has(i)}
                onClick={toggleCandle}
              />
            ))}
          </div>

          {/* Cake Body */}
          <div className="relative w-[340px] sm:w-[440px]">
            {/* Top tier */}
            <div
              className="mx-auto rounded-2xl flex items-center justify-center border border-pink-400/30 relative overflow-hidden"
              style={{
                width: "55%",
                height: "56px",
                background: "linear-gradient(135deg, #831843 0%, #9d174d 40%, #be185d 80%, #831843 100%)",
                boxShadow: "0 4px 20px rgba(190,24,93,0.3)",
              }}
            >
              <span className="text-pink-200 text-xs font-bold tracking-widest uppercase opacity-80">24 Years</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              {/* Frosting drips */}
              {[15, 30, 50, 68, 82].map((left, i) => (
                <div key={i} className="absolute -bottom-3 h-4 w-2 rounded-b-full bg-pink-200/40"
                  style={{ left: `${left}%` }} />
              ))}
            </div>

            {/* Middle tier */}
            <div
              className="mx-auto rounded-2xl border border-purple-400/30 relative overflow-hidden mt-1"
              style={{
                width: "78%",
                height: "64px",
                background: "linear-gradient(135deg, #4a1d96 0%, #5b21b6 50%, #6d28d9 100%)",
                boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-30">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-lg">💖</span>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              {[10, 25, 40, 55, 70, 85].map((left, i) => (
                <div key={i} className="absolute -bottom-3 h-4 w-2 rounded-b-full bg-purple-200/40"
                  style={{ left: `${left}%` }} />
              ))}
            </div>

            {/* Bottom tier */}
            <div
              className="w-full rounded-2xl border border-rose-400/30 relative overflow-hidden mt-1"
              style={{
                height: "72px",
                background: "linear-gradient(135deg, #881337 0%, #9f1239 50%, #be123c 100%)",
                boxShadow: "0 4px 20px rgba(159,18,57,0.3)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-rose-200/50 font-serif italic text-sm font-medium tracking-wide">
                  Happy Birthday, Bhalu 🐻
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              {[5, 17, 29, 41, 53, 65, 77, 89].map((left, i) => (
                <div key={i} className="absolute -bottom-3.5 h-5 w-2.5 rounded-b-full bg-rose-200/40"
                  style={{ left: `${left}%` }} />
              ))}
            </div>

            {/* Cake plate */}
            <div
              className="w-full rounded-full mt-1 h-3"
              style={{
                background: "linear-gradient(90deg, #fef3c7, #fde68a, #fbbf24, #fde68a, #fef3c7)",
                boxShadow: "0 2px 10px rgba(251,191,36,0.3)",
              }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!blownOut && (
            <motion.button
              onClick={lightAllCandles}
              disabled={isLightingAll || allLit}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide border transition-all duration-300 cursor-pointer
                ${allLit
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300 opacity-60 cursor-not-allowed"
                  : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                }`}
            >
              {isLightingAll ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin text-base">🕯️</span> Lighting Candles...
                </span>
              ) : allLit ? (
                "✅ All 24 Candles Lit!"
              ) : (
                `🕯️ Light All ${TOTAL_CANDLES} Candles`
              )}
            </motion.button>
          )}

          {allLit && !blownOut && (
            <motion.button
              onClick={blowOutCandles}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 14 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-3 rounded-full font-black text-base text-white border border-pink-500/50 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full animate-ping bg-pink-500/20 pointer-events-none" />
              🌬️ Blow Out Candles!
            </motion.button>
          )}
        </div>

        {/* Hint text */}
        {!allLit && !isLightingAll && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-500"
          >
            Tip: Click individual candles to light them, or use the button above ↑
          </motion.p>
        )}

        {/* Celebration message */}
        <AnimatePresence>
          {celebrationMsg && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              className="max-w-lg mx-auto p-8 rounded-3xl bg-neutral-900/60 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.12)] space-y-3"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-5xl"
              >
                🎂
              </motion.div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 font-serif">
                Happy 24th Birthday, Bhalu! 🐻
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Close your eyes, make your most beautiful wish, and know that I am holding space for every dream of yours. You deserve the entire universe. 🌠
              </p>
              <div className="flex justify-center gap-3 text-xl pt-2">
                {["🎉", "🥳", "💖", "✨", "🎊"].map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.18 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
