"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  char: string;
  angle: number;
  distance: number;
  scale: number;
}

const EMOJIS = ["❤️", "💖", "💕", "✨", "🐻", "🌸", "🌹"];

export default function PageClickHearts() {
  const [hearts, setHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Don't spawn hearts on interactive inputs or textareas to avoid cluttering typing cursor
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) {
        return;
      }

      const spawnCount = 4 + Math.floor(Math.random() * 3); // Spawn 4-6 particles per click
      const clickX = e.clientX;
      const clickY = e.clientY;
      const clickTime = Date.now();

      const newHearts = Array.from({ length: spawnCount }).map((_, i) => ({
        id: clickTime + i,
        x: clickX,
        y: clickY,
        char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        angle: Math.random() * Math.PI * 2, // Random radial direction
        distance: 30 + Math.random() * 50, // Expansion radius
        scale: 0.7 + Math.random() * 0.6
      }));

      setHearts((prev) => [...prev, ...newHearts]);

      // Clean up after animation finishes (1.2s)
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 1200);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => {
          // Calculate delta offset based on angle and radius
          const targetX = Math.cos(heart.angle) * heart.distance;
          const targetY = Math.sin(heart.angle) * heart.distance - 60; // Offset upwards due to gravity lift

          return (
            <motion.span
              key={heart.id}
              initial={{ 
                x: heart.x - 12, // Center the emoji
                y: heart.y - 12, 
                opacity: 1, 
                scale: 0.2, 
                rotate: 0 
              }}
              animate={{
                x: heart.x - 12 + targetX,
                y: heart.y - 12 + targetY,
                opacity: 0,
                scale: heart.scale,
                rotate: Math.random() * 180 - 90 // Random spin
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute text-lg select-none"
            >
              {heart.char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
