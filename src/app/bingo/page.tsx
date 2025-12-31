'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const christmasItems = [
  '🎅', '🎄', '⭐', '🎁', '🔔', '❄️', '🦌', '🕯️',
  '🧦', '🎀', '🍪', '☃️', '🎊', '🎉', '🌟', '🎶',
  '🏠', '🔥', '🥛', '🍬', '🎺', '👼', '🌲', '✨'
];

function generateBingoCard() {
  const shuffled = [...christmasItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 25);
}

export default function Bingo() {
  const [card, setCard] = useState<string[]>([]);
  const [marked, setMarked] = useState<boolean[]>(Array(25).fill(false));
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    setCard(generateBingoCard());
  }, []);

  const toggleCell = (index: number) => {
    if (hasWon) return;
    
    const newMarked = [...marked];
    newMarked[index] = !newMarked[index];
    setMarked(newMarked);
    
    // Check for win
    checkWin(newMarked);
  };

  const checkWin = (marked: boolean[]) => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (marked.slice(i * 5, i * 5 + 5).every(m => m)) {
        setHasWon(true);
        return;
      }
    }
    
    // Check columns
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every(j => marked[i + j * 5])) {
        setHasWon(true);
        return;
      }
    }
    
    // Check diagonals
    if ([0, 6, 12, 18, 24].every(i => marked[i]) ||
        [4, 8, 12, 16, 20].every(i => marked[i])) {
      setHasWon(true);
      return;
    }
  };

  const resetGame = () => {
    setCard(generateBingoCard());
    setMarked(Array(25).fill(false));
    setHasWon(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4 text-center">
        🎄 Christmas Bingo 🎄
      </h1>
      
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Click the items as they are called out. Get 5 in a row to win!
      </p>
      
      {hasWon && (
        <div className="mb-6 p-6 bg-yellow-400 rounded-2xl shadow-xl border-4 border-yellow-600 animate-bounce">
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 text-center">
            🎉 BINGO! 🎉
          </h2>
          <p className="text-xl text-center mt-2">You won!</p>
        </div>
      )}
      
      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-2xl mb-6">
        <div className="grid grid-cols-5 gap-2 md:gap-3 w-full max-w-lg">
          {card.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleCell(index)}
              className={`
                aspect-square flex items-center justify-center text-3xl md:text-4xl
                rounded-lg transition-all transform hover:scale-105 border-4
                ${marked[index] 
                  ? 'bg-red-500 border-red-700 shadow-inner' 
                  : 'bg-green-50 border-green-300 hover:bg-green-100 shadow-lg'
                }
                ${hasWon && marked[index] ? 'animate-pulse' : ''}
              `}
            >
              <span className={marked[index] ? 'opacity-50' : ''}>{item}</span>
              {marked[index] && (
                <span className="absolute text-yellow-400 text-5xl font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={resetGame}
          className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
        >
          New Card
        </button>
        
        <button
          onClick={() => setMarked(Array(25).fill(false))}
          className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
        >
          Clear Marks
        </button>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600 max-w-md">
        <p className="font-semibold mb-2">How to Play:</p>
        <p>Click on items as they are called. Complete a row, column, or diagonal to win BINGO!</p>
      </div>
    </div>
  );
}
