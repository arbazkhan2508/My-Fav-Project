"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProposalScreen() {
  const [step, setStep] = useState<"proposal" | "thinking">("proposal");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hearts = React.useMemo(() => {
    if (!isClient) return [];
    return [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 20}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 5}s`,
      char: ['❤️', '💕', '🌹', '✨', '💖'][Math.floor(Math.random() * 5)]
    }));
  }, [isClient]);

  const handleYes = () => {
    if (step === "proposal") {
      setStep("thinking");
    } else if (step === "thinking") {
      router.push("/surprise");
    }
  };

  const handleNo = () => {
    // Basic "No" logic - just an alert for now
    alert("You can't say no! 😜");
  };

  if (step === "thinking") {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 p-4 overflow-hidden">
        {/* Floating Hearts Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

        <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-sm animate-pulse">
            Are you sure..🙈 💝
          </h1>

          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src="/images/thinking.jpg"
              alt="Think carefully"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={handleYes}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-pink-500/30 transition-all duration-300 animate-wiggle"
            >
              Yes 💘
            </button>
            <button
              onClick={handleNo}
              className="px-8 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300"
            >
              No 😝
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 p-4 overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
        <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-sm animate-pulse">
          Are you ready to go with me in the one more new year? 💖
        </h1>

        <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-md">
          <img
            src="/images/praposal-1.jpg"
            alt="Proposal Image-1"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://media.tenor.com/efbi1EpFlWUAAAAi/cat-flower.gif";
            }}
          />
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={handleYes}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-pink-500/30 transition-all duration-300 animate-wiggle"
          >
            Yes 💘
          </button>
          <button
            onClick={handleNo}
            className="px-8 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300"
          >
            No 😝
          </button>
        </div>
      </div>
    </div>
  );
}
