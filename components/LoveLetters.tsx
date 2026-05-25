"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, X, Sparkles, Play, Pause, MessageSquare } from "lucide-react";
import { birthdayConfig, OpenWhenLetter } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

export default function LoveLetters() {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const voiceIntervalRef = React.useRef<any>(null);

  const handleEnvelopeClick = (letter: OpenWhenLetter) => {
    playSynthSound('chime');
    setSelectedLetter(letter);
    setIsVoicePlaying(false);
    setVoiceProgress(0);
  };

  const handleClose = () => {
    playSynthSound('pop');
    setSelectedLetter(null);
    setIsVoicePlaying(false);
    if (voiceIntervalRef.current) {
      clearInterval(voiceIntervalRef.current);
    }
  };

  const toggleVoiceNote = () => {
    playSynthSound('click');
    if (isVoicePlaying) {
      setIsVoicePlaying(false);
      if (voiceIntervalRef.current) clearInterval(voiceIntervalRef.current);
    } else {
      setIsVoicePlaying(true);
      voiceIntervalRef.current = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 100) {
            setIsVoicePlaying(false);
            clearInterval(voiceIntervalRef.current);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/20 border border-pink-500/20 text-xs font-semibold text-pink-300 tracking-[0.2em] uppercase"
          >
            <Mail className="w-3.5 h-3.5 text-pink-400" />
            Open When...
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Letters For Every Mood 💌
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400"
          >
            Envelopes for whenever life gets a little loud, you need a reminder, or you just want to hear my voice.
          </motion.p>
        </div>

        {/* Envelopes list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {birthdayConfig.letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60, damping: 12, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.3)" 
              }}
              onClick={() => handleEnvelopeClick(letter)}
              className="flex flex-col items-center justify-between p-6 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 hover:border-pink-500/30 transition-all cursor-pointer text-center relative group min-h-[220px]"
            >
              {/* Envelope Icon */}
              <div className="w-16 h-16 rounded-full bg-pink-950/40 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                <Mail className="w-7 h-7 group-hover:hidden" />
                <MailOpen className="w-7 h-7 hidden group-hover:block text-pink-300" />
              </div>

              {/* Title & Trigger */}
              <div className="space-y-2 mt-4">
                <p className="text-xs text-pink-400 font-bold uppercase tracking-wider">
                  Open when...
                </p>
                <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-pink-300 transition-colors leading-snug">
                  {letter.trigger}
                </h3>
              </div>

              {/* Tap Indicator */}
              <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 uppercase tracking-widest mt-4">
                Open Letter 💌
              </span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Letter Overlay Card */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-[#fcfbf9] text-neutral-800 p-6 md:p-10 rounded-[2.5rem] max-w-2xl w-full border border-pink-300/40 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header */}
              <div className="text-center space-y-2 pb-6 border-b border-neutral-200">
                <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold tracking-widest uppercase">
                  {selectedLetter.title}
                </span>
                <p className="text-xs text-neutral-400 tracking-wider">
                  Handcrafted with Love for Bhalu 🐻
                </p>
              </div>

              {/* Letter Body (Simulated Parchment Card) */}
              <div className="py-6 space-y-6">
                <p className="text-xl sm:text-2xl leading-loose font-handwriting text-neutral-800 whitespace-pre-line">
                  &ldquo;{selectedLetter.letter}&rdquo;
                </p>

                {/* Simulated Voice Note for "You miss me" letter */}
                {selectedLetter.id === "miss-me" && (
                  <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleVoiceNote}
                        className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        {isVoicePlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white pl-0.5" />}
                      </button>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-pink-700 block">Voice Note.mp3</span>
                        <span className="text-[10px] text-neutral-400">Duration: 0:48s • Recorded yesterday</span>
                      </div>
                    </div>
                    {/* Interactive progress bar */}
                    <div className="relative w-full h-[6px] bg-pink-200/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-pink-500"
                        animate={{ width: `${voiceProgress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                    {/* Simulated Voice visualizer lines */}
                    <div className="flex justify-between items-center gap-[2px] h-6 px-2">
                      {[...Array(30)].map((_, i) => {
                        const randomHeight = isVoicePlaying 
                          ? 20 + Math.sin(i + voiceProgress * 0.2) * 15 + Math.random() * 5
                          : 4 + (i % 3) * 2;
                        return (
                          <motion.div
                            key={i}
                            className="w-[3px] bg-pink-300 rounded-full"
                            style={{ height: `${Math.max(4, Math.min(24, randomHeight))}px` }}
                            animate={isVoicePlaying ? {
                              scaleY: [1, 1.5, 0.8, 1.2, 1]
                            } : {}}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8 + Math.random() * 0.4,
                              delay: i * 0.03
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Media attachments */}
                {selectedLetter.mediaSrc && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-200 mt-4 relative max-h-[300px]">
                    <img
                      src={selectedLetter.mediaSrc}
                      alt="Attachment"
                      className="w-full h-full object-cover"
                    />
                    {selectedLetter.mediaType === "chat" && (
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Inside Chat Screenshot
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Letter Footer */}
              <div className="pt-6 border-t border-neutral-200 flex justify-between items-center text-xs font-semibold text-neutral-400">
                <span>Forever Yours</span>
                <span className="flex items-center gap-1 text-pink-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  Happy Birthday
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
