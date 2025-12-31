
"use client";
import Image from "next/image";
import Link from "next/link";

const GAMES = [
  { name: "Spin the Wheel", path: "/spin" },
  { name: "Quiz", path: "/quiz" },
];

const FLOATING_IMAGES = [
  { src: "/images/tampusfam.png", size: 120, duration: 25, delay: 0, left: 5, top: 10 },
  { src: "/images/tampusfam1.jpg", size: 100, duration: 30, delay: 5, left: 85, top: 15 },
  { src: "/images/tampusfam2.png", size: 110, duration: 28, delay: 10, left: 15, top: 75 },
  { src: "/images/tampusfam.png", size: 90, duration: 32, delay: 15, left: 75, top: 70 },
  { src: "/images/tampusfam2.png", size: 105, duration: 27, delay: 20, left: 50, top: 8 },
  { src: "/images/tampusfam1.jpg", size: 95, duration: 29, delay: 8, left: 90, top: 50 },
  { src: "/images/tampusfam.png", size: 115, duration: 26, delay: 12, left: 8, top: 45 },
  { src: "/images/tampusfam2.png", size: 85, duration: 31, delay: 18, left: 65, top: 85 },
  { src: "/images/tampusfam1.jpg", size: 108, duration: 28, delay: 3, left: 30, top: 25 },
  { src: "/images/tampusfam.png", size: 92, duration: 30, delay: 22, left: 45, top: 65 },
  { src: "/images/tampusfam2.png", size: 112, duration: 27, delay: 6, left: 80, top: 32 },
  { src: "/images/tampusfam1.jpg", size: 98, duration: 33, delay: 14, left: 20, top: 55 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-200 to-green-100 font-sans relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-red-500 to-transparent z-0" />
      
      {/* Floating Family Photos */}
      {FLOATING_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className="absolute z-0 opacity-30 rounded-full overflow-hidden shadow-lg"
          style={{
            width: `${img.size}px`,
            height: `${img.size}px`,
            left: `${img.left}%`,
            top: `${img.top}%`,
            animation: `float ${img.duration}s ease-in-out infinite`,
            animationDelay: `${img.delay}s`,
          }}
        >
          <Image src={img.src} alt="Tampus Family" width={img.size} height={img.size} className="object-cover w-full h-full" />
        </div>
      ))}
      
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4 py-8">
        <div className="text-8xl mb-4 animate-bounce">🎅</div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-5xl">🎄</span>
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 drop-shadow text-center">Tampus Family Christmas</h1>
          <span className="text-5xl">🎄</span>
        </div>
        <p className="text-2xl font-semibold text-red-700 mb-2 text-center">Party Games 2025</p>
        <p className="text-lg text-green-800 mb-6 text-center">Welcome to the Tampus Family celebration! Choose a game below and join the fun!</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8 w-full">
          {GAMES.map((game) => (
            <Link key={game.name} href={game.path} className="bg-white/90 hover:bg-green-200 text-red-700 font-semibold py-4 px-6 rounded-xl shadow-md transition-all w-40 text-center text-lg border-2 border-green-300">
              {game.name}
            </Link>
          ))}
        </div>
      </main>
      <footer className="w-full text-center py-4 text-green-900 font-medium opacity-80">&copy; {new Date().getFullYear()} Tampus Family Christmas Party</footer>
    </div>
  );
}
