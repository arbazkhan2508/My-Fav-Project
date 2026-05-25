"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, MessageCircle, Heart, Flame, Sparkles } from "lucide-react";
import { birthdayConfig, TimelineEvent } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

const getIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'chat': return <MessageCircle className="w-5 h-5 text-indigo-400" />;
    case 'date': return <Calendar className="w-5 h-5 text-emerald-400" />;
    case 'joke': return <Flame className="w-5 h-5 text-amber-400" />;
    case 'support': return <Heart className="w-5 h-5 text-pink-400" />;
    default: return <Sparkles className="w-5 h-5 text-purple-400" />;
  }
};

export default function CinematicTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  // Track scroll progress of this timeline section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the scroll progress for Awwwards-grade motion
  const scrollYScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Stagger animation variants for chat bubbles popping up
  const chatContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2
      }
    }
  };

  const chatBubbleVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 10 }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="our-story" 
      className="relative bg-black py-32 px-6 overflow-hidden"
    >
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-24 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-xs tracking-[0.25em] text-pink-400 font-bold uppercase"
        >
          Our Story
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white font-serif"
        >
          Our Story & Her 24th Chapter 🌸
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-gray-400 font-sans"
        >
          Every timeline led me to you, and I wouldn&apos;t change a single second.
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        
        {/* Background static line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-900 -translate-x-[1px]" />
        
        {/* Glowing scroll-linked active path tracker */}
        <motion.div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-amber-400 origin-top shadow-[0_0_15px_rgba(236,72,153,0.6)] z-10 -translate-x-[1px]"
          style={{ scaleY: scrollYScale }}
        />

        {/* Timeline Cards */}
        <div className="space-y-20">
          {birthdayConfig.timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[15px] z-20 flex items-center justify-center w-8 h-8 rounded-full border border-neutral-700 bg-neutral-900 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  {getIcon(event.type)}
                </div>

                {/* Alternating Empty Space on Large Screens */}
                <div className="hidden md:block w-1/2" />

                {/* Content Card Container */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 60, damping: 14 }}
                    whileHover={{ y: -5 }}
                    onClick={() => playSynthSound('click')}
                    className="p-6 md:p-8 rounded-[2rem] bg-neutral-900/60 backdrop-blur-xl border border-white/5 shadow-2xl hover:border-pink-500/20 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all cursor-pointer relative group overflow-hidden"
                  >
                    {/* Background glow vignette */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/10 transition-colors" />

                    {/* Metadata Header */}
                    <div className="flex items-center justify-between mb-4 font-sans">
                      <span className="text-xs font-semibold tracking-wider text-pink-400 uppercase">
                        {event.date}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest bg-neutral-950 px-2 py-0.5 rounded-full border border-white/5">
                        {event.type}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4 font-serif">
                      {event.title}
                    </h4>

                    {/* Custom Chat message styling with staggered pop-ups */}
                    {event.type === 'chat' && event.chatMessages && (
                      <motion.div 
                        variants={chatContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="space-y-3 mb-6 p-4 rounded-2xl bg-black/40 border border-neutral-800 font-sans"
                      >
                        {event.chatMessages.map((msg, i) => (
                          <motion.div
                            key={i}
                            variants={chatBubbleVariants}
                            className={`flex flex-col ${
                              msg.sender === 'me' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <span className="text-[10px] text-neutral-500 mb-1 px-1 font-bold">
                              {msg.sender === 'me' ? 'Me' : birthdayConfig.girlfriendName}
                            </span>
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-2 text-xs md:text-sm font-medium
                                ${msg.sender === 'me' 
                                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-br-none shadow-[0_0_10px_rgba(219,39,119,0.2)]'
                                  : 'bg-neutral-800 text-neutral-200 rounded-bl-none'
                                }
                              `}
                            >
                              {msg.text}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Media attachments */}
                    {event.image && (
                      <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 border border-neutral-800 relative bg-neutral-950">
                        <motion.img
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 1.2 }}
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {event.video && (
                      <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 border border-neutral-800 relative bg-neutral-950">
                        <video
                          src={event.video}
                          controls
                          className="w-full h-full object-cover"
                          poster="/images/bday/WhatsApp Image 2026-05-25 at 9.33.31 AM.jpeg"
                        />
                      </div>
                    )}

                    {/* Description Paragraph */}
                    <p className="text-sm md:text-base text-neutral-400 font-normal leading-relaxed font-sans">
                      {event.description}
                    </p>

                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-pink-900/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
