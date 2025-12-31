'use client';
import { useState } from 'react';
import Link from 'next/link';

const prizes = [
  'Ai Reen',
  'Aiyesh Sachi',
  'Albert Enero Tampus',
  'Alina Satorre-Enero Tampus',
  'Carl Janssen Tampus',
  'Dave John Tampus Ferras',
  'Divine Grace S. Tampus',
  'Earl Andrew',
  'Ecarg Orene Supmat',
  'Halan Llano',
  'Iɐ Drey',
  'Itsreal Mhe',
  'Jannah Lev S. Tampus',
  'Jay Ar',
  'John Lemar S. Tampus',
  'Le V Lyn Tampus',
  'Levilyn Velyn',
  'Levy Estremos Tampus',
  'Maribel Omega Seismundo',
  'Pinkish Enero Supmat',
  'Shane Ferras',
  'Supmat Love Mae',
  'Trisha Nicole T. Zulita',
  'YrrelC SupmaT OnalL',
];

export default function Spin() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    // Random spins between 5-10 full rotations plus random segment
    const spins = 5 + Math.floor(Math.random() * 5);
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * spins) + randomDegree;
    
    setRotation(totalRotation);
    
    setTimeout(() => {
      const finalAngle = totalRotation % 360;
      const segmentAngle = 360 / prizes.length;
      const prizeIndex = Math.floor((360 - finalAngle) / segmentAngle) % prizes.length;
      setResult(prizes[prizeIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-8 text-center">
        🎡 Spin the Wheel 🎡
      </h1>
      
      <div className="relative mb-8">
        {/* Pointer */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-600"></div>
        </div>
        
        {/* Wheel */}
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <div 
            className="w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden transition-transform duration-[4000ms] ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                from 0deg,
                ${prizes.map((_, i) => {
                  const start = (i * 360 / prizes.length);
                  const end = ((i + 1) * 360 / prizes.length);
                  const colors = ['#dc2626', '#16a34a', '#2563eb', '#9333ea', '#ea580c', '#0891b2'];
                  const color = colors[i % colors.length];
                  return `${color} ${start}deg ${end}deg`;
                }).join(', ')}
              )`
            }}
          >
            {prizes.map((prize, i) => {
              const angle = (360 / prizes.length) * i;
              const firstName = prize.split(' ')[0];
              return (
                <div
                  key={i}
                  className="absolute w-full h-full flex items-start justify-center"
                  style={{
                    transform: `rotate(${angle + (180 / prizes.length)}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <span className="text-white font-bold text-[10px] md:text-xs mt-4 transform -rotate-90 whitespace-nowrap">
                    {firstName}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Center button */}
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-400 rounded-full border-4 border-white shadow-lg hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-bold text-red-700 text-sm"
          >
            {spinning ? '...' : 'SPIN'}
          </button>
        </div>
      </div>
      
      {result && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-xl border-4 border-green-500 animate-bounce">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
            🎉 Winner! 🎉
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-red-700 text-center mt-2">
            {result}
          </p>
        </div>
      )}
      
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-8 px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
      >
        {spinning ? 'Spinning...' : 'Spin Again!'}
      </button>
    </div>
  );
}
