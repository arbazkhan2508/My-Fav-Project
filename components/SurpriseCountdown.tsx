"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SurpriseCountdownProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function SurpriseCountdown({ onUnlock, isUnlocked }: SurpriseCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCelebrationDay, setIsCelebrationDay] = useState(false);
  const [debugClicks, setDebugClicks] = useState(0);

  const onUnlockRef = React.useRef(onUnlock);
  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const targetDate = new Date(birthdayConfig.birthdayDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsCelebrationDay(true);
        onUnlockRef.current(); // Call callback to unlock final surprise
        return true; // Stop interval
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        return false;
      }
    };

    // Calculate once on mount
    const isDone = calculateTime();
    if (isDone) return;

    const timer = setInterval(() => {
      const isDone = calculateTime();
      if (isDone) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sync isCelebrationDay with parent bypass
  useEffect(() => {
    if (isUnlocked) {
      setIsCelebrationDay(true);
    }
  }, [isUnlocked]);

  // Dev bypass trigger: click title 5 times to force unlock
  const handleTitleClick = () => {
    setDebugClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        playSynthSound('success');
        setIsCelebrationDay(true);
        onUnlock();
        return 0;
      } else {
        playSynthSound('click');
        return next;
      }
    });
  };

  const formatNum = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-pink-500/10 to-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
        
        {/* Section Title */}
        <div className="space-y-4">
          <motion.div
            onClick={handleTitleClick}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/20 border border-amber-500/20 text-xs font-semibold text-amber-300 tracking-[0.2em] uppercase cursor-pointer select-none active:scale-95 transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            Countdown
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            {isCelebrationDay ? "Your Special Day is Here! 🎉" : "Every Second Brings Us Closer ✨"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-sans"
          >
            {isCelebrationDay 
              ? "The stars have aligned. It is 28th May. Your 24th chapter has officially unlocked... 💖" 
              : "Counting down the moments until the clock strikes midnight on May 28th to celebrate your 24th birthday. 👑"
            }
          </motion.p>
        </div>

        {/* Countdown Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            { label: "Days", value: isCelebrationDay ? 0 : timeLeft.days },
            { label: "Hours", value: isCelebrationDay ? 0 : timeLeft.hours },
            { label: "Minutes", value: isCelebrationDay ? 0 : timeLeft.minutes },
            { label: "Seconds", value: isCelebrationDay ? 0 : timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
              className="w-20 h-24 sm:w-28 sm:h-32 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/5 flex flex-col items-center justify-center shadow-xl relative overflow-hidden group"
            >
              {/* Digit Glow overlay */}
              <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%) pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Number */}
              <span className="text-3xl sm:text-5xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] group-hover:from-pink-300 group-hover:to-rose-100 transition-colors">
                {formatNum(item.value)}
              </span>

              {/* Label */}
              <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-2 group-hover:text-pink-400/80 transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Motivational Status Text */}
        {!isCelebrationDay && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            className="inline-flex items-center gap-1.5 justify-center text-xs font-semibold text-pink-400 tracking-wider"
          >
            <Star className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Almost there, my love... hang in tight!</span>
            <Star className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
          </motion.div>
        )}

        {/* ── Visible Unlock Button ── */}
        {!isCelebrationDay && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-4 flex flex-col items-center gap-3"
          >
            <motion.button
              onClick={() => {
                playSynthSound('success');
                setIsCelebrationDay(true);
                onUnlock();
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative group px-10 py-4 rounded-full font-black text-base text-white bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-500 hover:via-rose-400 hover:to-amber-400 shadow-[0_0_35px_rgba(236,72,153,0.35)] hover:shadow-[0_0_55px_rgba(236,72,153,0.55)] transition-all duration-300 cursor-pointer border border-white/10"
            >
              <span className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping pointer-events-none" />
              ✨ Unlock Grand Finale
            </motion.button>
            <p className="text-[10px] text-neutral-600 font-medium tracking-wide">
              Click to reveal the final surprise early 💖
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
