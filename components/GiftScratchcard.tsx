"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

export default function GiftScratchcard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize Canvas paint layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // Set dimensions based on container parent
    const width = 340;
    const height = 440;
    canvas.width = width;
    canvas.height = height;

    // Draw beautiful rose-gold glitter gradient paint
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#db2777"); // Deep pink
    grad.addColorStop(0.3, "#ec4899"); // Pink
    grad.addColorStop(0.6, "#fbbf24"); // Amber/Gold
    grad.addColorStop(0.8, "#d946ef"); // Fuchsia
    grad.addColorStop(1, "#c084fc"); // Purple

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw luxury borders
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, width - 10, height - 10);

    // Add pattern-like sparkles to canvas background
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 4 + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add Text overlay: "Scratch with Love"
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 8;
    
    // Draw Subtext
    ctx.font = "bold 10px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("BHALU'S BIRTHDAY SURPRISE", width / 2, height / 2 - 40);

    // Draw main label
    ctx.font = "bold 24px Playfair Display, serif";
    ctx.fillText("Scratch Me 🐻", width / 2, height / 2);

    ctx.font = "italic 11px Playfair Display, serif";
    ctx.fillText("Swipe to reveal your gift...", width / 2, height / 2 + 30);

    // Reset shadow
    ctx.shadowBlur = 0;
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Check if touch or mouse event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (e: any) => {
    e.preventDefault();
    setIsDrawing(true);
    playSynthSound('click');
  };

  const handleMove = (e: any) => {
    if (!isDrawing || isScratched) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);

    // Erase path composite operation
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    // Debounce the percentage calculations for smooth swiping performance
    if (Math.random() < 0.15) {
      calculateProgress(canvas, ctx);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const calculateProgress = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let cleared = 0;
    const sampleRate = 32; // check every 32nd pixel to optimize CPU usage
    let totalChecked = 0;

    for (let i = 3; i < pixels.length; i += sampleRate * 4) {
      totalChecked++;
      if (pixels[i] === 0) {
        cleared++;
      }
    }

    const pct = Math.round((cleared / totalChecked) * 100);
    setScratchProgress(pct);

    if (pct > 50 && !isScratched) {
      setIsScratched(true);
      playSynthSound('success');
    }
  };

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase"
          >
            <Gift className="w-3.5 h-3.5" />
            Surprise Card
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            A Gift Made For You 🎁
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-lg mx-auto font-sans"
          >
            Scratch the golden card below by swiping your cursor or finger to reveal your special birthday surprise.
          </motion.p>
        </div>

        {/* Scratchcard Container */}
        <div className="flex flex-col items-center justify-center">
          <div 
            ref={containerRef}
            className="relative w-[340px] h-[440px] rounded-[2.5rem] overflow-hidden bg-neutral-900/60 backdrop-blur-xl border border-white/5 shadow-2xl flex items-center justify-center cursor-crosshair group"
          >
            
            {/* 1. Underlying revealed Gift Voucher Card */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
              
              {/* Gold Border Highlight */}
              <div className="absolute inset-2 rounded-[2rem] border border-amber-500/20 pointer-events-none" />

              {/* Header */}
              <div className="space-y-1 mt-4">
                <span className="text-[10px] font-bold text-amber-400 tracking-[0.25em] uppercase block">
                  Surprise Voucher 🎫
                </span>
                <h3 className="text-xl font-bold text-white font-serif">
                  Redeemable for Bhalu 🐻
                </h3>
              </div>

              {/* Photo Frame */}
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden border border-amber-500/30 p-1 bg-neutral-950 shadow-inner group">
                <img
                  src={birthdayConfig.scratchcardGiftPhoto}
                  alt="Surprise Gift"
                  className="w-full h-full object-cover rounded-full filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Gift Title & Description */}
              <div className="space-y-2 px-2 pb-4">
                <h4 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300 font-sans tracking-wide">
                  {birthdayConfig.scratchcardGiftTitle}
                </h4>
                <p className="text-xs text-neutral-400 font-normal leading-relaxed max-w-[250px] mx-auto font-sans">
                  {birthdayConfig.scratchcardGiftDesc}
                </p>
              </div>

              {/* Ribbon */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Redeemed Forever
              </div>

            </div>

            {/* 2. Top Canvas scratch layer */}
            <AnimatePresence>
              {!isScratched && (
                <motion.canvas
                  ref={canvasRef}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                  transition={{ duration: 0.6 }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}
                  className="absolute inset-0 z-30 pointer-events-auto touch-none"
                />
              )}
            </AnimatePresence>

          </div>

          {/* Progress display */}
          <div className="h-8 mt-4 flex items-center justify-center font-sans">
            {scratchProgress > 0 && !isScratched && (
              <span className="text-xs font-semibold text-pink-400 tracking-widest uppercase animate-pulse">
                Scratched {scratchProgress}% • Keep going! ✨
              </span>
            )}
            {isScratched && (
              <span className="text-xs font-bold text-amber-400 tracking-[0.2em] uppercase flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                SURPRISE UNLOCKED! Enjoy Your Gift 💖
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
