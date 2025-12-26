"use client";
import React from "react";
import Link from "next/link";

export default function MemoriesPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
       {/* Header with Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/plan" className="inline-flex items-center text-pink-600 hover:text-pink-800 transition-colors font-semibold">
          <span className="text-2xl mr-2">←</span> Back to Plan
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 drop-shadow-sm animate-bounce">
            Our Beautiful Memories 💖
          </h1>
          <p className="text-xl text-pink-400 font-medium">
            Every moment with you is a treasure ✨
          </p>
        </div>
        
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[
            { type: 'video', src: '/images/us/us29.mp4' },
            { type: 'video', src: '/images/us/us30.mp4' },
            ...Array.from({ length: 28 }, (_, i) => ({ type: 'image', src: `/images/us/us${i + 1}.jpeg` }))
          ].map((item, index) => (
            <div 
              key={index} 
              className="break-inside-avoid bg-white p-2 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-100 group"
            >
              {item.type === 'video' ? (
                <video 
                  src={item.src} 
                  controls 
                  className="w-full h-auto rounded-xl"
                />
              ) : (
                <img 
                  src={item.src} 
                  alt={`Memory ${index + 1}`} 
                  className="w-full h-auto rounded-xl group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
       <div className="mt-16 text-center pb-12 space-y-8">
        <p className="text-2xl font-bold text-pink-500 animate-pulse">
          I love you! ❤️
        </p>

        <Link 
          href="/thank-you"
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)]"
        >
          <span className="text-xl mr-2">✨</span>
          <span className="text-xl">One Last Surprise...</span>
          <span className="text-xl ml-2">➡️</span>
          <div className="absolute -inset-1 rounded-full bg-white opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-200"></div>
        </Link>
      </div>
    </div>
  );
}
