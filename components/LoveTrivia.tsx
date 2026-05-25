"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Check, X, Star, Trophy, Ticket } from "lucide-react";
import confetti from "canvas-confetti";
import { playSynthSound } from "@/components/AudioController";

interface TriviaQuestion {
  id: number;
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
  funFact: string; // shown after answering
}

const QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: "Who is the sleepier one between us? 😴",
    emoji: "💤",
    options: ["Definitely you, Bhalu!", "Obviously him!", "We're equally drowsy", "Neither — we're night owls"],
    correctIndex: 0,
    funFact: "You could sleep through a thunderstorm and still look adorable. It's one of my favorite things about you! 🌙"
  },
  {
    id: 2,
    question: "Where did we first meet? 💬",
    emoji: "🤝",
    options: ["WhatsApp", "Instagram", "Snapchat", "In person"],
    correctIndex: 3,
    funFact: "We met in person first — and I knew from that very moment there was something special about you! ❤️"
  },
  {
    id: 3,
    question: "What is the cheeky nickname I call you the most? 😜",
    emoji: "🥰",
    options: ["Bhalu", "Mau", "Chor", "Adrak"],
    correctIndex: 2,
    funFact: "Chor! 😂 Because you've completely stolen my heart and never gave it back. Biggest thief ever, and I love you for it! 💖"
  },
  {
    id: 4,
    question: "What is the one thing you do that ALWAYS makes me smile? 😊",
    emoji: "✨",
    options: ["Your little angry pout", "When you send good morning texts", "When you pamper me", "All of the above"],
    correctIndex: 3,
    funFact: "Honestly? Everything you do melts my heart. But that pout... that pout is absolutely unmatched. 🥺💕"
  },
];

const SUPER_COUPON = {
  title: "Infinite Kisses Card 💋",
  description: "Redeemable anytime, anywhere, for absolutely zero cost. You've earned infinite kisses — no expiry, ever.",
  icon: "💋",
  whatsappMessage: "Hey!! 💋 I just won the trivia and unlocked my 'Infinite Kisses Card'! Time to collect! 😘❤️"
};

interface AnswerState {
  selectedIndex: number;
  isCorrect: boolean;
}

export default function LoveTrivia() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [superCouponRevealed, setSuperCouponRevealed] = useState(false);
  const [shakeOption, setShakeOption] = useState<number | null>(null);

  const question = QUESTIONS[currentQ];
  const currentAnswer = answers[question.id];
  const totalCorrect = Object.values(answers).filter((a) => a.isCorrect).length;
  const isPerfect = totalCorrect === QUESTIONS.length;

  const handleAnswer = (optionIndex: number) => {
    if (currentAnswer !== undefined) return; // already answered

    const isCorrect = optionIndex === question.correctIndex;

    if (isCorrect) {
      playSynthSound('success');
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#ec4899", "#fbbf24", "#a855f7"],
      });
    } else {
      playSynthSound('pop');
      setShakeOption(optionIndex);
      setTimeout(() => setShakeOption(null), 600);
    }

    setAnswers((prev) => ({
      ...prev,
      [question.id]: { selectedIndex: optionIndex, isCorrect },
    }));
  };

  const goNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setGameComplete(true);
      if (isPerfect) {
        playSynthSound('success');
        const colors = ["#ec4899", "#d946ef", "#fbbf24", "#f43f5e", "#a855f7"];
        confetti({ particleCount: 80, spread: 100, origin: { x: 0.5, y: 0.5 }, colors });
        setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors }), 400);
        setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors }), 700);
      }
    }
  };

  const getWhatsAppUrl = (msg: string) =>
    `https://wa.me/?text=${encodeURIComponent(msg)}`;

  const progressPct = (currentQ / QUESTIONS.length) * 100;

  return (
    <section className="relative bg-neutral-950 py-32 px-6 overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-950/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-950/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-10">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/20 border border-purple-500/20 text-xs font-semibold text-purple-300 tracking-[0.2em] uppercase"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            Mini Game
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-serif"
          >
            Bhalu &amp; Me Trivia 🐻
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-400 max-w-md mx-auto"
          >
            Answer {QUESTIONS.length} fun questions about us. Get them all right and unlock a secret super coupon! 🎁
          </motion.p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── Active Quiz ── */}
          {!gameComplete && (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
              className="space-y-6"
            >
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                  <span>{totalCorrect} correct so far ✨</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: `${progressPct}%` }}
                    animate={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/5 shadow-2xl space-y-6">
                {/* Question header */}
                <div className="space-y-3 text-center">
                  <motion.div
                    animate={{ rotate: [0, -8, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="text-5xl"
                  >
                    {question.emoji}
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif leading-snug">
                    {question.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((option, i) => {
                    const isSelected = currentAnswer?.selectedIndex === i;
                    const isCorrect = i === question.correctIndex;
                    const answered = currentAnswer !== undefined;
                    const isShaking = shakeOption === i;

                    let borderClass = "border-white/5 hover:border-purple-500/40 hover:bg-purple-950/20";
                    let iconEl = null;

                    if (answered) {
                      if (isCorrect) {
                        borderClass = "border-emerald-500/50 bg-emerald-950/20";
                        iconEl = <Check className="w-4 h-4 text-emerald-400 shrink-0" />;
                      } else if (isSelected) {
                        borderClass = "border-rose-500/50 bg-rose-950/20";
                        iconEl = <X className="w-4 h-4 text-rose-400 shrink-0" />;
                      }
                    }

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answered}
                        animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`relative p-4 rounded-2xl border text-left text-sm font-medium transition-all duration-200 cursor-pointer
                          ${borderClass}
                          ${!answered ? "cursor-pointer active:scale-95 hover:scale-[1.02]" : "cursor-default"}
                          bg-neutral-900/40 backdrop-blur-sm text-neutral-200
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex-1">{option}</span>
                          {iconEl}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Fun fact reveal */}
                <AnimatePresence>
                  {currentAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-sm leading-relaxed
                        ${currentAnswer.isCorrect
                          ? "border-emerald-500/20 bg-emerald-950/20 text-emerald-200"
                          : "border-rose-500/20 bg-rose-950/20 text-rose-200"
                        }`}
                    >
                      <span className="font-bold mr-2">
                        {currentAnswer.isCorrect ? "✅ Yes!" : "❌ Oops!"}
                      </span>
                      {question.funFact}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                <AnimatePresence>
                  {currentAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <button
                        onClick={goNext}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm hover:from-purple-500 hover:to-pink-500 transition-all cursor-pointer shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        {currentQ < QUESTIONS.length - 1 ? "Next Question →" : "See Results 🎉"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── Game Complete ── */}
          {gameComplete && (
            <motion.div
              key="game-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              className="space-y-8"
            >
              {/* Score card */}
              <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-white/5 shadow-2xl text-center space-y-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-6xl"
                >
                  {isPerfect ? "🏆" : "🎯"}
                </motion.div>

                <div className="space-y-2">
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Final Score</p>
                  <div className="flex justify-center items-end gap-2">
                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {totalCorrect}
                    </span>
                    <span className="text-2xl text-neutral-500 mb-2">/ {QUESTIONS.length}</span>
                  </div>
                  <p className="text-white font-serif font-bold text-xl">
                    {isPerfect
                      ? "You know us perfectly! 💖"
                      : totalCorrect >= 2
                      ? "You know us so well! 😊"
                      : "I'll quiz you again soon! 😄"}
                  </p>
                  {isPerfect && (
                    <p className="text-pink-300 text-sm">
                      Perfect score! You've unlocked a secret super coupon! 🎁
                    </p>
                  )}
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2">
                  {[...Array(QUESTIONS.length)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
                    >
                      <Star
                        className={`w-7 h-7 ${i < totalCorrect ? "fill-amber-400 text-amber-400" : "fill-neutral-700 text-neutral-700"}`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Correct/Wrong answer review */}
                <div className="space-y-2 text-left">
                  {QUESTIONS.map((q) => {
                    const ans = answers[q.id];
                    return (
                      <div key={q.id} className={`flex items-start gap-2 text-xs p-2 rounded-xl 
                        ${ans?.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {ans?.isCorrect ? <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" /> : <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                        <span className="text-neutral-400">{q.question}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Super Coupon (only if perfect) */}
              {isPerfect && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-amber-400 tracking-[0.2em] uppercase mb-1">🔓 Secret Unlocked</p>
                    <h3 className="text-white font-serif font-bold text-2xl">Your Super Coupon! 🎁</h3>
                  </div>

                  <div className="relative p-6 rounded-[2.5rem] bg-neutral-900/40 backdrop-blur-xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)] overflow-hidden">
                    {/* Dashed inner border */}
                    <div className="absolute inset-2 rounded-[2rem] border border-dashed border-amber-500/20 pointer-events-none" />

                    {/* Wax seal overlay */}
                    <AnimatePresence>
                      {!superCouponRevealed && (
                        <motion.div
                          key="super-seal"
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4 }}
                          onClick={() => {
                            playSynthSound('success');
                            setSuperCouponRevealed(true);
                          }}
                          className="absolute inset-0 z-30 bg-black/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer rounded-[2.5rem]"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 border-2 border-amber-800 flex items-center justify-center shadow-[0_10px_25px_rgba(217,119,6,0.5)]"
                          >
                            <div className="w-20 h-20 rounded-full border border-amber-950/20 flex flex-col items-center justify-center text-center">
                              <span className="text-2xl">🏆</span>
                              <span className="text-[7px] font-extrabold tracking-[0.2em] text-amber-100 uppercase mt-1">
                                BREAK SEAL
                              </span>
                            </div>
                            <div className="absolute -inset-1 rounded-full border border-dashed border-amber-400/30 pointer-events-none" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-white/5 flex items-center justify-center text-2xl shadow-inner">
                          {SUPER_COUPON.icon}
                        </div>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest bg-black px-2 py-0.5 rounded-full border border-white/5">
                          SUPER COUPON
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white font-serif">{SUPER_COUPON.title}</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">{SUPER_COUPON.description}</p>
                      </div>

                      {superCouponRevealed && (
                        <motion.a
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          href={getWhatsAppUrl(SUPER_COUPON.whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSynthSound('click')}
                          className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                        >
                          <Trophy className="w-3 h-3" />
                          Redeem on WhatsApp
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Play again */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setCurrentQ(0);
                    setAnswers({});
                    setGameComplete(false);
                    setSuperCouponRevealed(false);
                    playSynthSound('click');
                  }}
                  className="px-6 py-2 border border-neutral-800 hover:border-purple-500/40 rounded-full text-xs font-semibold text-neutral-500 hover:text-purple-300 bg-neutral-900/40 backdrop-blur-md transition-all cursor-pointer"
                >
                  🔄 Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
