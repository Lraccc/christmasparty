'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecretSanta() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [assignments, setAssignments] = useState<{from: string, to: string}[]>([]);
  const [showAssignments, setShowAssignments] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  const addParticipant = () => {
    if (currentName.trim() && !participants.includes(currentName.trim())) {
      setParticipants([...participants, currentName.trim()]);
      setCurrentName('');
    }
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const generateAssignments = () => {
    if (participants.length < 2) {
      alert('You need at least 2 participants!');
      return;
    }

    // Shuffle and create circular assignment
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const pairs: {from: string, to: string}[] = [];
    
    for (let i = 0; i < shuffled.length; i++) {
      pairs.push({
        from: shuffled[i],
        to: shuffled[(i + 1) % shuffled.length]
      });
    }
    
    setAssignments(pairs);
    setShowAssignments(true);
    setRevealedIndex(null);
  };

  const reset = () => {
    setParticipants([]);
    setAssignments([]);
    setShowAssignments(false);
    setRevealedIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4 text-center">
        🎅 Secret Santa 🎁
      </h1>
      
      {!showAssignments ? (
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Add Participants
          </h2>
          
          {/* Add participant form */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
              placeholder="Enter name..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-lg"
            />
            <button
              onClick={addParticipant}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
            >
              Add
            </button>
          </div>
          
          {/* Participants list */}
          {participants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                Participants ({participants.length}):
              </h3>
              <div className="space-y-2">
                {participants.map((name, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-lg">🎄 {name}</span>
                    <button
                      onClick={() => removeParticipant(index)}
                      className="text-red-600 hover:text-red-800 font-bold text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Generate button */}
          <button
            onClick={generateAssignments}
            disabled={participants.length < 2}
            className="w-full px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            Generate Secret Santa Pairs! 🎁
          </button>
          
          {participants.length < 2 && (
            <p className="text-center text-gray-500 mt-4 text-sm">
              Add at least 2 participants to start
            </p>
          )}
        </div>
      ) : (
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Secret Santa Assignments 🎁
          </h2>
          
          <p className="text-center text-gray-600 mb-6">
            Click each person's card to reveal who they should give a gift to!
          </p>
          
          <div className="space-y-3 mb-6">
            {assignments.map((pair, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-xl border-2 border-green-300 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setRevealedIndex(revealedIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎅</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {pair.from}
                    </span>
                  </div>
                  
                  {revealedIndex === index ? (
                    <div className="flex items-center gap-3 animate-fadeIn">
                      <span className="text-2xl">→</span>
                      <span className="text-2xl">🎁</span>
                      <span className="text-lg font-bold text-red-700">
                        {pair.to}
                      </span>
                    </div>
                  ) : (
                    <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Click to Reveal
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="flex-1 px-6 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700 transition-all"
            >
              Start Over
            </button>
            <button
              onClick={generateAssignments}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-gray-600 max-w-md">
        <p className="font-semibold mb-2">How it works:</p>
        <p>Add all participants, then generate assignments. Each person will be secretly assigned someone to give a gift to!</p>
      </div>
    </div>
  );
}
