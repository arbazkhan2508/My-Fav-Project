"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function GiftRevealPage() {
  const [date, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (date) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 p-4 text-center">
      
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-6 drop-shadow-sm">
        Let&apos;s go for a date! <span className="text-red-500">❤️</span>
      </h1>

      {/* Emoji/Image */}
      <div className="mb-8 animate-bounce">
        <span className="text-8xl">😘</span>
      </div>

      {/* Date Picker Section */}
      <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">
        <label className="block text-xl md:text-2xl text-pink-700 font-semibold mb-4">
          Pick our special day 📅
        </label>
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-4 text-lg border-2 border-pink-300 rounded-xl focus:outline-none focus:border-pink-500 text-pink-600 bg-white/80 transition-colors mb-6 cursor-pointer"
        />

        <button
          onClick={handleSubmit}
          disabled={!date || isSubmitted}
          className={`w-full py-3 px-6 rounded-full text-white font-bold text-lg transition-all transform duration-200 shadow-lg
            ${!date 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 hover:shadow-xl"
            }
          `}
        >
          Let&apos;s Make This Special 💕
        </button>
      </div>

      {/* Success Message - Animated In */}
      {isSubmitted && (
        <div className="mt-8 space-y-6 animate-pulse">
          <div className="text-2xl md:text-3xl font-bold text-pink-600">
            I&apos;m already excited... our special day will be magical ✨ 💖
          </div>
          
          <Link href="/date-contract">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl hover:scale-110 transition-transform duration-300 hover:shadow-2xl ring-4 ring-pink-200">
              Let&apos;s go for a plan! 🌻
            </button>
          </Link>
        </div>
      )}

      {/* Floating hearts background elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-[-50px] text-pink-500 animate-float-up opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {['❤️', '💕', '🌹', '✨', '💖'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    </div>
  );
}
