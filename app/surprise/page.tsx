import Link from "next/link";

export default function Surprise() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-12 animate-bounce text-center drop-shadow-sm">
        Here a surprise for you 💖
      </h1>
      
      <div className="relative group cursor-pointer transition-transform hover:scale-110 duration-500 animate-bounce">
        {/* Animated glow effect behind the gift */}
        <div className="absolute -inset-10 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-full opacity-50 blur-2xl group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
        
        <Link href="/gift-reveal" className="relative z-10 block text-[150px] md:text-[200px] leading-none select-none drop-shadow-2xl filter hover:brightness-110 transition-all">
           🎁
        </Link>
      </div>

      <p className="mt-12 text-pink-500 font-bold text-xl animate-pulse tracking-wide">
        Tap the gift to open! 🎁 ✨
      </p>
    </div>
  );
}
