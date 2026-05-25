"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

export default function CinematicHero() {
  const handleScrollDown = () => {
    playSynthSound('click');
    const timelineSec = document.getElementById("our-story");
    if (timelineSec) {
      timelineSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-20 px-6">
      
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Floating particles background (Subtle CSS Stars) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-col-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Cinematic Typographic Message */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6 flex flex-col justify-center">
          
          {/* Subtle Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-950/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase"
          >
            ✨ 28th MAY 2026
          </motion.div>

          {/* Giant Premium Happy Birthday Wish Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-300 to-amber-300 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-serif drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] mb-2"
          >
            Happy 23rd Birthday, Bhalu! 🐻
          </motion.h2>

          {/* Primary Cinematic Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-serif"
          >
            {birthdayConfig.heroHeading}
          </motion.h1>

          {/* Secondary Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 tracking-wide font-sans italic"
          >
            {birthdayConfig.heroSubheading}
          </motion.p>

          {/* Typewriter Rotator lines */}
          <div className="h-12 flex items-center justify-center lg:justify-start">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-base md:text-lg text-neutral-400 font-medium tracking-wide"
            >
              To the girl who holds my heart... Bhalu 🐻. 💖
            </motion.p>
          </div>

        </div>

        {/* Right Side: Photo Reveal (Apple-style particle glow frame) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.6 }}
            className="relative w-[280px] sm:w-[340px] aspect-[3/4] group cursor-pointer"
          >
            {/* Multi-layered glows */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-[2.2rem] opacity-40 group-hover:opacity-100 blur-[3px] transition-opacity duration-700 pointer-events-none" />

            {/* Inner Glass Frame */}
            <div className="relative w-full h-full bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <motion.img
                src={birthdayConfig.heroPhoto}
                alt={birthdayConfig.girlfriendName}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-1000"
                whileHover={{ scale: 1.05 }}
              />
              
              {/* Overlay Glass Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Tag overlay inside the frame */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <span className="text-sm font-semibold tracking-widest text-white/80 uppercase">
                  My Universe 🌌
                </span>
              </div>
            </div>

            {/* Floating micro hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-xl pointer-events-none"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
              >
                {["❤️", "💖", "✨", "💕"][i % 4]}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20"
      >
        <span className="text-xs tracking-[0.3em] text-neutral-400 group-hover:text-pink-300 transition-colors uppercase font-semibold">
          Scroll to Begin
        </span>
        <div className="w-8 h-8 rounded-full border border-neutral-700 group-hover:border-pink-500/50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all">
          <ArrowDown className="w-4 h-4 text-neutral-500 group-hover:text-pink-400 transition-colors" />
        </div>
      </motion.div>

    </section>
  );
}
