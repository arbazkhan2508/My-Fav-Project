"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound, startBackgroundMusic } from "@/components/AudioController";

interface CinematicLoadingProps {
  onComplete: () => void;
}

export default function CinematicLoading({ onComplete }: CinematicLoadingProps) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating particles inside the loading screen using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Star particle system
    const stars: { x: number; y: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random(),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        star.alpha += Math.random() * 0.05 - 0.025;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 0.9) star.alpha = 0.9;

        ctx.fillStyle = `rgba(251, 191, 36, ${star.alpha})`; // Amber/Gold color
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(251, 191, 36, 0.6)";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset shadow blur
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Loading progress simulation
  useEffect(() => {
    const duration = 2500; // 2.5s loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextPercent = Math.min(Math.round((stepCount / steps) * 100), 100);
      setPercent(nextPercent);
      if (nextPercent === 100) {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    playSynthSound("success");
    startBackgroundMusic();
    onComplete();
  };

  // Split name correctly for staggered animations (supports UTF-16 surrogate pairs like emojis)
  const nameChars = Array.from(birthdayConfig.girlfriendName);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black select-none overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Sparkle Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <Sparkles className="w-8 h-8 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </motion.div>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base font-medium tracking-[0.25em] uppercase mb-4"
        >
          Something special is waiting for you...
        </motion.p>

        {/* Her Name (Letter-by-Letter Reveal) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-2 justify-center mb-8"
        >
          {nameChars.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-5xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-300 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Loading Progress or Enter Trigger */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isLoaded ? (
              <motion.div
                key="loading-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 w-48"
              >
                <div className="w-full bg-neutral-900 h-[3px] rounded-full overflow-hidden border border-neutral-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-amber-400"
                    animate={{ width: `${percent}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-gray-500 tracking-widest uppercase">{percent}% Loaded</span>
              </motion.div>
            ) : (
              <motion.button
                key="enter-button"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="px-8 py-3 bg-gradient-to-r from-pink-600 via-pink-500 to-amber-500 text-white rounded-full font-semibold text-base shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/40 hover:border-pink-300 transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span>Open the Magic</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  ✨
                </motion.span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Headphone Advice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs text-neutral-600 mt-12 tracking-wide font-medium"
        >
          🎵 Please turn on your sound for the best experience.
        </motion.p>

      </div>
    </div>
  );
}
