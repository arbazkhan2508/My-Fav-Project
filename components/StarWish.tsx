"use client";
import React, { useState } from "react";
import { motion as motionFramer, AnimatePresence as AnimatePresenceFramer } from "framer-motion";
import { Send, Star, Sparkles } from "lucide-react";
import { playSynthSound } from "@/components/AudioController";

interface FloatingWish {
  id: number;
  text: string;
  x: number; // percentage
  speed: number;
  scale: number;
}

export default function StarWish() {
  const [wishText, setWishText] = useState("");
  const [wishes, setWishes] = useState<FloatingWish[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    playSynthSound('chime');
    
    const newWish: FloatingWish = {
      id: Date.now(),
      text: wishText.trim(),
      x: 15 + Math.random() * 70, // Start between 15% and 85% width
      speed: 5 + Math.random() * 3, // Floating speed
      scale: 0.8 + Math.random() * 0.4
    };

    setWishes((prev) => [...prev, newWish]);
    setWishText("");
    setIsSuccess(true);

    // Reset success banner after 2s
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);

    // Remove wish from state after animation completes (7s)
    setTimeout(() => {
      setWishes((prev) => prev.filter((w) => w.id !== newWish.id));
    }, 7000);
  };

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden min-h-[600px] flex items-center justify-center">
      
      {/* Floating stars container (covers the entire section) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <AnimatePresenceFramer>
          {wishes.map((wish) => (
            <motionFramer.div
              key={wish.id}
              initial={{ y: 550, x: `${wish.x}%`, opacity: 0, scale: 0.5 }}
              animate={{ 
                y: -100, 
                opacity: [0, 0.9, 0.9, 0], // Fade in, hold, then fade out
                scale: wish.scale,
                x: [
                  `${wish.x}%`, 
                  `${wish.x + (Math.random() * 10 - 5)}%`, 
                  `${wish.x + (Math.random() * 20 - 10)}%`
                ] 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: wish.speed, ease: "easeOut" }}
              className="absolute flex items-center gap-3 select-none"
            >
              {/* Glowing SVG Star */}
              <div className="relative">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <span className="absolute inset-0 bg-amber-400 rounded-full blur-[6px] opacity-60 animate-pulse pointer-events-none" />
              </div>

              {/* Floating Cursive Wish Text */}
              <span className="text-white text-base md:text-lg font-semibold font-handwriting tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap bg-black/35 px-3 py-1 rounded-full border border-white/5 backdrop-blur-[1px]">
                {wish.text}
              </span>
            </motionFramer.div>
          ))}
        </AnimatePresenceFramer>
      </div>

      {/* Decorative Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-20 text-center space-y-8">
        
        {/* Section Header */}
        <div className="space-y-4">
          <motionFramer.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/20 border border-purple-500/20 text-xs font-semibold text-purple-300 tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Make a Wish
          </motionFramer.div>
          
          <motionFramer.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Send a Wish to the Stars ✨
          </motionFramer.h2>
          
          <motionFramer.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 font-sans max-w-lg mx-auto"
          >
            Type your birthday wish into the input below, click send, and see it float up into the galaxy. The universe is listening, Bhalu 🐻.
          </motionFramer.p>
        </div>

        {/* Input Form Card */}
        <motionFramer.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          className="p-8 rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                maxLength={45}
                placeholder="Type your birthday wish here..."
                className="w-full px-5 py-4 bg-black/60 border border-neutral-800 rounded-2xl text-white font-medium placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors pr-12 font-sans"
              />
              <button
                type="submit"
                disabled={!wishText.trim()}
                className={`absolute right-2 top-2 p-2.5 rounded-xl transition-all cursor-pointer
                  ${wishText.trim()
                    ? "bg-purple-600 text-white hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                  }
                `}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              Maximum 45 characters • Swings up on click
            </p>
          </form>

          {/* Glowing particle emitter confirmation */}
          <AnimatePresenceFramer>
            {isSuccess && (
              <motionFramer.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-0 bg-purple-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">💫 🌌</span>
                <h3 className="text-white font-bold font-serif text-lg">Wish Sent to the Stars!</h3>
                <p className="text-xs text-purple-300 font-sans">Watch it float up into the night sky above...</p>
              </motionFramer.div>
            )}
          </AnimatePresenceFramer>

        </motionFramer.div>

      </div>
    </section>
  );
}
