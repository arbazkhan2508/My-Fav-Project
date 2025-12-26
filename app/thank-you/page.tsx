"use client";
import React from "react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 p-6">
      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)] border border-white/50 relative overflow-hidden">
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8 animate-pulse">
            Thank You 💖
          </h1>
          
          <div className="space-y-6 text-xl md:text-2xl text-gray-700 font-medium leading-relaxed font-fredoka">
            <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              For making my life so beautiful. ✨
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              For every smile, every laugh, and every moment we share.
            </p>
            <p className="animate-slide-up text-pink-600 font-semibold" style={{ animationDelay: "0.6s" }}>
              You are my favorite notification,<br/>
              my favorite thought,<br/>
              and my favorite person.
            </p>
          </div>

          <div className="pt-12 animate-scale-in" style={{ animationDelay: "0.8s" }}>
            <div className="inline-block p-6 bg-white rounded-full shadow-lg">
              <span className="text-6xl block hover:scale-125 transition-transform cursor-pointer">💑</span>
            </div>
            <p className="mt-4 text-pink-400 font-handwriting text-2xl">Forever Yours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
