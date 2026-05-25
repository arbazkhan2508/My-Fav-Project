"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for tracking cursor coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end cinematic trailing feel
  const springConfig = { damping: 45, stiffness: 250, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch (mobile-first optimization)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the glow width/height (150px) to center it
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none w-[300px] h-[300px] rounded-full blur-[80px] z-[99] opacity-40 mix-blend-screen bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
}
