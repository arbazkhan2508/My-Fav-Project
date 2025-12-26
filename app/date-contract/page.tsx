"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function DateContractPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {/* Glowing Card */}
      <div className="relative bg-gray-900/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] max-w-lg w-full">
        
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-pink-500 mb-8 text-center drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
          Hamari Chhoti-si Date Contract
          <div className="text-4xl mt-2">💌 ✨</div>
        </h1>

        {/* Contract Items */}
        <div className="space-y-6 text-lg md:text-xl font-medium text-gray-200">
          
          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Tum late nahi aana 🙈 👉 😜</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Main tumhare liye kuch cute launga/laungi 🎁 💖</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
             <span className="text-pink-500 text-2xl animate-pulse">💗</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Phone bilkul kam use hoga 📵 ✨</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Ek selfie pakki end me 🤳 💕</span>
          </div>

          <div className="flex items-start gap-4 hover:translate-x-2 transition-transform duration-300">
            <input type="checkbox" defaultChecked className="mt-1.5 w-5 h-5 accent-pink-500 cursor-pointer" />
            <span>Aur... smile zaroor rakhna 😄 💖</span>
          </div>

        </div>

        {/* Agree Button */}
        <div className="mt-10 flex justify-center">
          {agreed ? (
            <div className="text-center animate-bounce">
              <div className="text-2xl font-bold text-pink-500 mb-2">YAAAY! Deal Done! 🤝💖</div>
              <p className="text-sm text-gray-400">See you soon! 😘</p>
            </div>
          ) : (
            <button
              onClick={() => setAgreed(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-10 rounded-full text-xl shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300 ring-2 ring-pink-300"
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
