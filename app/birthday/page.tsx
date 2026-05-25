"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Import Components
import AudioController from "@/components/AudioController";
import CursorGlow from "@/components/CursorGlow";
import CinematicLoading from "@/components/CinematicLoading";
import CinematicHero from "@/components/CinematicHero";
import CinematicTimeline from "@/components/CinematicTimeline";
import LoveReasons from "@/components/LoveReasons";
import MemoryScrapbook from "@/components/MemoryScrapbook";
import LoveLetters from "@/components/LoveLetters";
import GiftScratchcard from "@/components/GiftScratchcard";
import StarWish from "@/components/StarWish";
import LoveCoupons from "@/components/LoveCoupons";
import PageClickHearts from "@/components/PageClickHearts";
import SurpriseCountdown from "@/components/SurpriseCountdown";
import GrandFinale from "@/components/GrandFinale";

export default function BirthdaySurprisePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Smooth scrolling using CSS smooth-scroll
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-black text-white min-h-screen selection:bg-pink-500 selection:text-white overflow-x-hidden relative font-sans">
      
      {/* Immersive Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <CinematicLoading onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Experience Layout (revealed only after loading) */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full relative"
        >
          {/* Custom Mouse Follow Spot-glow */}
          <CursorGlow />

          {/* Global Click micro-particle hearts overlay */}
          <PageClickHearts />

          {/* Background Audio control HUD */}
          <AudioController shouldPlay={!isLoading} />

          {/* 1. HERO - Intro Reveal */}
          <CinematicHero />

          {/* Section Divider - Neon Glow */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

          {/* 2. OUR STORY TIMELINE */}
          <CinematicTimeline />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          {/* 3. REASONS WHY I LOVE YOU */}
          <LoveReasons />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

          {/* 4. SCRAPBOOK polaroid dragging */}
          <MemoryScrapbook />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

          {/* 5. LOVE LETTERS "Open When..." Envelopes */}
          <LoveLetters />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

          {/* 5.5. INTERACTIVE GIFT REVEAL SCRATCHCARD */}
          <GiftScratchcard />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          {/* 5.8. SEND A WISH TO THE STARS */}
          <StarWish />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

          {/* 5.9. INTERACTIVE WAX-SEALED LOVE COUPONS */}
          <LoveCoupons />

          {/* Section Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          {/* 6. COUNTDOWN TIMER */}
          <SurpriseCountdown 
            isUnlocked={isUnlocked} 
            onUnlock={() => setIsUnlocked(true)} 
          />

          {/* Section Divider */}
          {isUnlocked && (
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-pulse" />
          )}

          {/* 7. GRAND FINALE fireworks & final letter (Appears only when countdown complete or bypassed) */}
          <GrandFinale isUnlocked={isUnlocked} />

        </motion.div>
      )}
    </div>
  );
}
