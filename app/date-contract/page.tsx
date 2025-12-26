"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DateContractPage() {
  const [agreed, setAgreed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hearts = React.useMemo(() => {
    if (!isClient) return [];
    return [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 20}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 5}s`,
      char: ['❤️', '💕', '🌹', '✨', '💖'][Math.floor(Math.random() * 5)]
    }));
  }, [isClient]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute animate-float-up opacity-0"
            style={{
              left: heart.left,
              fontSize: heart.fontSize,
              animationDelay: heart.animationDelay,
              animationDuration: heart.animationDuration,
            }}
          >
            {heart.char}
          </div>
        ))}
      </div>

      {/* Glowing Card */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] max-w-2xl w-full">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-8 text-center drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
          Our small cute date contract 🌻
          <div className="text-4xl mt-2 animate-bounce">💌 ✨</div>
        </h1>

        {/* Contract Items */}
        <div className="space-y-6 text-lg md:text-xl font-medium text-gray-200">

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Be ready on time 🙈 👉 😜</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>I’ll bring something cute just for you! 🎁 💖</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <span className="text-pink-500 text-2xl animate-pulse">A little heart just for you 💗</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>No distractions—phone off, focus on us 📵 ✨</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Let’s take a selfie to remember the moment! 🤳 💕</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>’ll make sure we both have an amazing time! 😄 💖</span>
          </div>

        </div>

        {/* Agree Button */}
        <div className="mt-10 flex flex-col items-center gap-6">
          {agreed ? (
            <>
              <div className="text-center animate-stamp">
                <div className="text-3xl font-bold text-pink-500 mb-2 drop-shadow-[0_0_10px_rgba(236,72,153,1)]">YAAAY! Deal Done! 🤝💖</div>
                <p className="text-lg text-pink-200">See you soon! 😘</p>
              </div>
              
              <Link href="/plan" className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-pink-600 font-lg rounded-full hover:bg-pink-700 hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <span>See The Plan 🗺️</span>
                <div className="absolute -inset-3 rounded-full bg-pink-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200 animate-pulse"></div>
              </Link>
            </>
          ) : (
            <button
              onClick={() => setAgreed(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full text-xl shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300 ring-2 ring-pink-300 animate-pulse"
            >
              I Agree 💍
            </button>
          )}
        </div>

      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>
    </div>
  );
}
