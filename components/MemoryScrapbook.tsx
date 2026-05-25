"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, Sparkles } from "lucide-react";
import { birthdayConfig, PolaroidMemory } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

export default function MemoryScrapbook() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidMemory | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const handleTap = (photo: PolaroidMemory) => {
    playSynthSound('pop');
    setSelectedPhoto(photo);
  };

  const handleDragStart = (e: any) => {
    // Increase z-index of dragged item so it stacks on top
    setZIndexCounter((prev) => prev + 1);
    e.target.style.zIndex = zIndexCounter.toString();
  };

  return (
    <section className="relative bg-black py-32 px-6 overflow-hidden select-none">
      
      {/* Background styling elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase"
          >
            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
            Scrapbook
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Draggable Polaroids 📸
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400"
          >
            Click to expand and read the memories, or drag them around to rearrange our scrapbook stack. It is alive!
          </motion.p>
        </div>

        {/* Polaroid Scrapbook Area */}
        <div 
          ref={containerRef} 
          className="relative w-full h-[600px] md:h-[700px] rounded-[3rem] bg-neutral-950/40 backdrop-blur-md border border-white/5 overflow-hidden shadow-inner p-8"
        >
          {/* Subtle instructions watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-4xl md:text-6xl font-bold text-white uppercase tracking-widest">
              OUR MEMORIES
            </span>
          </div>

          {birthdayConfig.polaroids.map((photo, index) => {
            // Generate pseudo-random coordinates distributed within bounds for initial layouts
            const leftOffset = 10 + (index % 4) * 22; // 10% to 76%
            const topOffset = 15 + Math.floor(index / 4) * 35; // 15% to 50%

            return (
              <motion.div
                key={photo.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.05}
                dragMomentum={true}
                onDragStart={handleDragStart}
                onTap={() => handleTap(photo)}
                initial={{ 
                  opacity: 0, 
                  scale: 0.7, 
                  rotate: photo.rotation,
                  x: 0,
                  y: 0
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 50, damping: 10, delay: index * 0.1 }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: photo.rotation * 0.5,
                  boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
                  zIndex: 99
                }}
                whileDrag={{ 
                  scale: 1.1,
                  boxShadow: "0 30px 60px -15px rgba(236, 72, 153, 0.6)",
                  zIndex: 999
                }}
                className="absolute w-[160px] sm:w-[200px] bg-white p-3 rounded-md shadow-2xl border border-gray-200/50 cursor-grab active:cursor-grabbing pointer-events-auto"
                style={{
                  left: `${leftOffset}%`,
                  top: `${topOffset}%`,
                  zIndex: index + 1
                }}
              >
                {/* Polaroid Image */}
                <div className="relative w-full aspect-square bg-gray-100 rounded-sm overflow-hidden mb-3 border border-gray-100 select-none">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.02]"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                </div>

                {/* Polaroid Caption */}
                <p className="text-center text-sm md:text-base font-semibold text-neutral-700 tracking-tight select-none font-handwriting truncate">
                  {photo.caption}
                </p>

                {/* Scrapbook Sticky Tape Overlay */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-pink-100/30 backdrop-blur-[1px] border-l border-r border-white/30 shadow-sm pointer-events-none select-none"
                  style={{
                    transform: `rotate(${photo.rotation * -0.7}deg)`,
                    backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)"
                  }}
                />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white p-4 md:p-6 rounded-3xl max-w-2xl w-full border border-pink-500/20 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // Stop closing on card click
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo */}
              <div className="w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption details */}
              <div className="mt-6 text-center space-y-3">
                <div className="flex justify-center items-center gap-1 text-pink-500 text-sm font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bhalu 🐻 & Me
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <p className="text-2xl md:text-3xl text-neutral-800 font-semibold font-handwriting leading-relaxed px-4">
                  &ldquo;{selectedPhoto.caption}&rdquo;
                </p>
                <p className="text-xs text-neutral-400 font-medium">
                  Click anywhere outside to return to scrapbook.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
