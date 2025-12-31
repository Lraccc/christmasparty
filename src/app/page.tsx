
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const GAMES = [
  { name: "Spin the Wheel", path: "/spin" },
  { name: "Quiz", path: "/quiz" },
];

const NEXT_GAME_TIME = new Date(new Date().getFullYear(), 11, 31, 20, 0, 0); // Dec 31, 8:00 PM

function getCountdown() {
  const now = new Date();
  const diff = NEXT_GAME_TIME.getTime() - now.getTime();
  if (diff <= 0) return "It's game time!";
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

export default function Home() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (musicOn) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [musicOn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-200 to-green-100 font-sans relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-red-500 to-transparent z-0" />
      <main className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4 py-8">
        <div className="text-8xl mb-4 animate-bounce">🎅</div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 drop-shadow mb-2 text-center">🎄 Christmas Party Games 🎄</h1>
        <p className="text-lg text-green-800 mb-6 text-center">Welcome! Choose a game below and join the fun!</p>
        <div className="flex flex-wrap gap-4 justify-center mb-8 w-full">
          {GAMES.map((game) => (
            <Link key={game.name} href={game.path} className="bg-white/90 hover:bg-green-200 text-red-700 font-semibold py-4 px-6 rounded-xl shadow-md transition-all w-40 text-center text-lg border-2 border-green-300">
              {game.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="text-green-900 font-medium text-xl">⏰ Next Game Countdown:</span>
          <span className="text-2xl font-mono text-red-700 bg-white/80 px-4 py-2 rounded-lg shadow-inner">{countdown}</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <button
            className={`rounded-full px-6 py-2 font-bold text-lg shadow transition-all ${musicOn ? "bg-green-400 text-white" : "bg-white text-green-700 border border-green-400"}`}
            onClick={() => setMusicOn((m) => !m)}
          >
            {musicOn ? "Pause Music 🎶" : "Play Christmas Music 🎶"}
          </button>
          <audio ref={audioRef} loop src="/music/christmas.mp3" />
        </div>
        <Link href="/scoreboard" className="mt-2 underline text-green-900 font-semibold text-lg">🏆 View Live Scoreboard</Link>
      </main>
      <footer className="w-full text-center py-4 text-green-900 font-medium opacity-80">&copy; {new Date().getFullYear()} Christmas Party</footer>
    </div>
  );
}
