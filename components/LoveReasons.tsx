"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { birthdayConfig, LoveReason } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

interface HeartExplosion {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function LoveReasons() {
  const [flippedIds, setFlippedIds] = useState<Record<number, boolean>>({});
  const [explosions, setExplosions] = useState<HeartExplosion[]>([]);

  const handleCardClick = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    // Check if card is flipping face-up
    const willBeFlipped = !flippedIds[id];
    
    // Play chime sound if flipping open
    if (willBeFlipped) {
      playSynthSound('chime');
      
      // Trigger local heart particle explosion at click coordinates relative to card
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const newParticles = [...Array(12)].map((_, i) => ({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
        emoji: ["❤️", "💖", "💕", "🌸", "✨", "🌹"][Math.floor(Math.random() * 6)]
      }));

      setExplosions((prev) => [...prev, ...newParticles]);

      // Cleanup particles after 1.5s
      setTimeout(() => {
        setExplosions((prev) => prev.filter((p) => !newParticles.includes(p)));
      }, 1500);
    } else {
      playSynthSound('pop');
    }

    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/5 to-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/5 to-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3 h-3 text-pink-400" />
            Reasons Why
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Why I Love You ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400"
          >
            A tiny list of the million reasons why you make my world complete. Tap each card to reveal the secret.
          </motion.p>
        </div>

        {/* Reasons Grid (3D Card flips) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {birthdayConfig.reasons.map((reason) => {
            const isFlipped = !!flippedIds[reason.id];

            return (
              <div
                key={reason.id}
                className="h-[300px] relative w-full perspective group cursor-pointer"
                onClick={(e) => handleCardClick(reason.id, e)}
              >
                {/* 3D Card Rotator */}
                <motion.div
                  className="w-full h-full relative preserve-3d transition-shadow duration-500 rounded-[2.5rem]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  {/* Card Front face */}
                  <div className="absolute inset-0 backface-hidden bg-neutral-900/40 backdrop-blur-xl border border-white/5 group-hover:border-pink-500/20 shadow-2xl p-8 rounded-[2.5rem] flex flex-col justify-between items-start overflow-hidden">
                    {/* Background gold flare on hover */}
                    <div className="absolute -inset-10 bg-radial-gradient(circle_at_center,rgba(251,191,36,0.06)_0%,transparent_70%) opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Floating Heart explosion elements inside the card boundaries */}
                    <AnimatePresence>
                      {explosions
                        .filter((p) => p.x > 0) // Filtering logic to display particles only on active cards
                        .map((p) => (
                          <motion.span
                            key={p.id}
                            className="absolute pointer-events-none text-2xl z-30"
                            initial={{ x: p.x - 12, y: p.y - 12, opacity: 1, scale: 0.5 }}
                            animate={{
                              x: p.x - 12 + (Math.random() * 160 - 80),
                              y: p.y - 12 - (Math.random() * 150 + 50),
                              opacity: 0,
                              scale: 1.5,
                              rotate: Math.random() * 90 - 45
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          >
                            {p.emoji}
                          </motion.span>
                        ))}
                    </AnimatePresence>

                    {/* Top Row: Icon Emoji with Gold backdrops */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/10 to-amber-500/10 border border-pink-500/20 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(236,72,153,0.1)] group-hover:scale-110 transition-transform duration-500">
                      {reason.icon}
                    </div>

                    {/* Bottom Row: Text */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-pink-400 tracking-widest uppercase">
                        Reason 0{reason.id}
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-neutral-400 font-medium">
                        {reason.shortDesc}
                      </p>
                    </div>

                    {/* Tap Indicator */}
                    <span className="absolute bottom-6 right-8 text-xs font-semibold text-neutral-600 group-hover:text-pink-300 transition-colors uppercase tracking-widest">
                      Tap ✨
                    </span>
                  </div>

                  {/* Card Back face */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-pink-950/20 backdrop-blur-xl border border-pink-500/30 p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center overflow-hidden rotateY-180">
                    <div className="absolute top-6 left-6 text-[10px] font-bold text-pink-400/60 uppercase tracking-widest">
                      Reason 0{reason.id}
                    </div>
                    
                    <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed italic max-w-sm">
                      &ldquo;{reason.fullReason}&rdquo;
                    </p>

                    <div className="mt-6 text-2xl animate-pulse">💖</div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
