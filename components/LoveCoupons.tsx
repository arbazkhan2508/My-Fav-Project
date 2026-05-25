"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Send, Check } from "lucide-react";
import { birthdayConfig } from "@/constants/birthdayConfig";
import { playSynthSound } from "@/components/AudioController";

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState<Record<number, boolean>>({});

  const handleRedeem = (id: number) => {
    if (redeemed[id]) return;
    
    // Play breaking seal chime arpeggio
    playSynthSound('success');
    
    setRedeemed((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  const getWhatsAppUrl = (message: string) => {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-950/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/20 border border-amber-500/20 text-xs font-semibold text-amber-300 tracking-[0.2em] uppercase"
          >
            <Ticket className="w-3.5 h-3.5" />
            Love Vouchers
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Bhalu&apos;s Love Coupons 🎟️
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 font-sans max-w-lg mx-auto"
          >
            A booklet of digital coupons you can redeem anytime in real life. Break the red wax seal to activate, and alert me on WhatsApp to claim!
          </motion.p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {birthdayConfig.coupons.map((coupon) => {
            const isRedeemed = !!redeemed[coupon.id];

            return (
              <div 
                key={coupon.id}
                className="relative h-[320px] w-full rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-white/5 shadow-2xl p-6 flex flex-col justify-between overflow-hidden group select-none"
              >
                {/* Coupon border highlight */}
                <div className="absolute inset-2 rounded-[2rem] border border-dashed border-neutral-800 group-hover:border-pink-500/20 transition-colors" />

                {/* Wax Seal Overlay (If not redeemed) */}
                <AnimatePresence>
                  {!isRedeemed && (
                    <motion.div
                      key="wax-seal"
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleRedeem(coupon.id)}
                      className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer pointer-events-auto"
                    >
                      {/* Wax stamp seal wrapper */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-700 via-red-600 to-rose-800 border-2 border-red-800 flex items-center justify-center shadow-[0_10px_25px_rgba(220,38,38,0.4)]"
                      >
                        {/* Stamp inner heart */}
                        <div className="w-20 h-20 rounded-full border border-red-950/20 flex flex-col items-center justify-center text-center">
                          <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">💝</span>
                          <span className="text-[7px] font-extrabold tracking-[0.25em] text-red-100 uppercase mt-1">
                            BREAK SEAL
                          </span>
                        </div>
                        {/* Outer organic stamp ridges */}
                        <div className="absolute -inset-1 rounded-full border border-dashed border-red-500/20 pointer-events-none" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card Top: Header Icon & ID */}
                <div className="flex justify-between items-center z-10 relative">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-white/5 flex items-center justify-center text-2xl shadow-inner">
                    {coupon.icon}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-black px-2 py-0.5 rounded-full border border-white/5">
                    COUPON 0{coupon.id}
                  </span>
                </div>

                {/* Card Middle: Text info */}
                <div className="space-y-2 z-10 relative px-1 my-4">
                  <h3 className="text-lg font-bold text-white font-serif tracking-tight leading-tight">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-normal leading-relaxed font-sans">
                    {coupon.description}
                  </p>
                </div>

                {/* Card Bottom: WhatsApp trigger button or Redeemed Badge */}
                <div className="z-10 relative w-full">
                  {isRedeemed ? (
                    <div className="space-y-2 w-full">
                      {/* Glowing active stamp */}
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 10 }}
                        className="w-full py-2 bg-gradient-to-r from-amber-500/10 to-pink-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        Seal Broken • Active
                      </motion.div>
                      
                      {/* WhatsApp trigger */}
                      <a
                        href={getWhatsAppUrl(coupon.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSynthSound('click')}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md hover:scale-102 active:scale-98"
                      >
                        <Send className="w-3 h-3" />
                        Redeem on WhatsApp
                      </a>
                    </div>
                  ) : (
                    <div className="w-full py-2 bg-neutral-950 border border-white/5 text-neutral-600 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center">
                      Locked behind wax
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
