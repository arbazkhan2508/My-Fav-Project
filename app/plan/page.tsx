"use client";
import React from "react";
import Link from "next/link";

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 drop-shadow-sm animate-bounce">
          The Plan 🗺️ ✨
        </h1>
        <p className="text-xl text-pink-400 font-medium">
          Get ready for a magical day! 💖
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">

        {/* Timeline Item 1: Lake View */}
        <div className="relative group">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-pink-200 group-last:hidden"></div>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-pink-100">
            <div className="w-full md:w-1/2 h-64 overflow-hidden rounded-2xl relative">
              <img
                src="/images/lakeview.jpg"
                alt="Lake View"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">Lake View 🌊</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Stop 1
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Beautiful Lake View</h2>
              <p className="text-gray-600">
                Starting our day with some peace, water, and beautiful vibes. Perfect for some photos! 📸
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 2: Bhopal & Juhnuhnee */}
        <div className="relative group">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-pink-200 group-last:hidden"></div>
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-pink-100">
            <div className="w-full md:w-1/2 h-64 overflow-hidden rounded-2xl relative">
               <img 
                src="/images/chailila.webp" 
                alt="Chai Lila" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-lg">Chai Lila Vibes ☕✨</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right">
              <div className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Stop 2
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Chai Lila & Chill</h2>
              <p className="text-gray-600">
                 Enjoying the "Juhnuhnee" vibes with some chai and making memories! 🚶‍♂️🚶‍♀️
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Item 3: Dinner */}
        <div className="relative group">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-pink-100">
            <div className="w-full md:w-1/2 h-64 overflow-hidden rounded-2xl relative grid grid-cols-2 gap-2">
              <img
                src="/images/location-2.webp"
                alt="Bhopal Location"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 rounded-l-xl"
              />
              <img
                src="/images/location-3.webp"
                alt="Juhnuhnee"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 rounded-r-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 pointer-events-none">
                <span className="text-white font-bold text-lg">Juhnuhnee Bhopal 🏙️</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                Grand Finale
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dinner Date</h2>
              <p className="text-gray-600">
                Ending the perfect day with some delicious food and even better company. 🍝🍷
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center pb-12">
        <Link 
          href="/memories"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-pink-500 font-lg rounded-full hover:bg-pink-600 hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
        >
          <span className="text-xl mr-2">📸</span>
          <span className="text-xl">View Our Memories</span>
          <div className="absolute -inset-3 rounded-full bg-pink-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200 animate-pulse"></div>
        </Link>
        <p className="mt-10 text-2xl font-bold text-pink-500 animate-pulse">
          Can't wait! ❤️
        </p>
      </div>

    </div >
  );
}
