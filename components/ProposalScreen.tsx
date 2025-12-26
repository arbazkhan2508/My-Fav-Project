"use client";
import { useState } from "react";

export default function ProposalScreen() {
  const [step, setStep] = useState<"proposal" | "thinking" | "accepted">("proposal");

  const handleYes = () => {
    if (step === "proposal") {
      setStep("thinking");
    } else if (step === "thinking") {
      setStep("accepted");
    }
  };

  const handleNo = () => {
    // Basic "No" logic - just an alert for now
    alert("You can't say no! 😜");
  };

  if (step === "accepted") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 animate-bounce text-center">
          Yay! I knew it! 💖
        </h1>
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Bear Kiss"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  if (step === "thinking") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-sm">
            Achee se soch lo.. 🙈 💝
          </h1>
          
          <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://media.tenor.com/nKC1oG51C1EAAAAM/kid-side-eye.gif"
              alt="Think carefully"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={handleYes}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-pink-500/30 transition-all duration-300"
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
        <h1 className="text-3xl font-bold text-pink-600 mb-8 drop-shadow-sm">
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
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-pink-500/30 transition-all duration-300"
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
