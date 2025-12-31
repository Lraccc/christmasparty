'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Player {
  name: string;
  spinWins: number;
  quizScore: number;
  bingoWins: number;
  totalPoints: number;
}

function loadPlayers(): Player[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('christmasPartyScores');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export default function Scoreboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortBy, setSortBy] = useState<'total' | 'spin' | 'quiz' | 'bingo'>('total');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  useEffect(() => {
    // Load players from localStorage
    const loadedPlayers = loadPlayers();
    const sorted = [...loadedPlayers].sort((a, b) => b.totalPoints - a.totalPoints);
    setPlayers(sorted);
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      const refreshedPlayers = loadPlayers();
      const sorted = [...refreshedPlayers].sort((a, b) => b.totalPoints - a.totalPoints);
      setPlayers(sorted);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const sortPlayers = (criterion: 'total' | 'spin' | 'quiz' | 'bingo') => {
    setSortBy(criterion);
    const sorted = [...players].sort((a, b) => {
      switch (criterion) {
        case 'total':
          return b.totalPoints - a.totalPoints;
        case 'spin':
          return b.spinWins - a.spinWins;
        case 'quiz':
          return b.quizScore - a.quizScore;
        case 'bingo':
          return b.bingoWins - a.bingoWins;
        default:
          return 0;
      }
    });
    setPlayers(sorted);
  };

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    
    const newPlayer: Player = {
      name: newPlayerName.trim(),
      spinWins: 0,
      quizScore: 0,
      bingoWins: 0,
      totalPoints: 0,
    };
    
    const updatedPlayers = [...players, newPlayer];
    localStorage.setItem('christmasPartyScores', JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
    setNewPlayerName('');
    setShowAddPlayer(false);
  };

  const updatePlayerScore = (playerName: string, field: 'spinWins' | 'quizScore' | 'bingoWins', value: number) => {
    const updatedPlayers = players.map(p => {
      if (p.name === playerName) {
        const updated = { ...p, [field]: Math.max(0, p[field] + value) };
        // Recalculate total points
        updated.totalPoints = updated.spinWins * 10 + updated.quizScore * 5 + updated.bingoWins * 15;
        return updated;
      }
      return p;
    });
    
    localStorage.setItem('christmasPartyScores', JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
  };

  const deletePlayer = (playerName: string) => {
    const updatedPlayers = players.filter(p => p.name !== playerName);
    localStorage.setItem('christmasPartyScores', JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
  };

  const resetScores = () => {
    if (confirm('Are you sure you want to reset all scores? This cannot be undone.')) {
      localStorage.removeItem('christmasPartyScores');
      setPlayers([]);
    }
  };

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4 py-12">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-2 text-center">
          🏆 Live Scoreboard 🏆
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Track everyone's progress and see who's winning! (Auto-refreshes every 5 seconds)
        </p>

        {/* Admin controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <button
              onClick={() => setShowAddPlayer(!showAddPlayer)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition-all"
            >
              {showAddPlayer ? 'Cancel' : '+ Add Player'}
            </button>
            <button
              onClick={resetScores}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition-all"
            >
              🔄 Reset All Scores
            </button>
          </div>

          {showAddPlayer && (
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                placeholder="Enter player name"
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addPlayer}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-all"
              >
                Add
              </button>
            </div>
          )}
        </div>
        
        {/* Sort buttons */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">Sort by:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => sortPlayers('total')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                sortBy === 'total' 
                  ? 'bg-yellow-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏆 Total Points
            </button>
            <button
              onClick={() => sortPlayers('spin')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                sortBy === 'spin' 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎡 Spin Wins
            </button>
            <button
              onClick={() => sortPlayers('quiz')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                sortBy === 'quiz' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📝 Quiz Score
            </button>
            <button
              onClick={() => sortPlayers('bingo')}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                sortBy === 'bingo' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎄 Bingo Wins
            </button>
          </div>
        </div>
        
        {/* Scoreboard table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Desktop view */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-600 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-bold">Rank</th>
                  <th className="px-6 py-4 text-left text-lg font-bold">Player</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">🎡 Spin</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">📝 Quiz</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">🎄 Bingo</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">🏆 Total</th>
                  <th className="px-6 py-4 text-center text-lg font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-xl">
                      {getMedalEmoji(index) || `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-semibold text-gray-800">
                        {player.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">{player.spinWins}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{player.quizScore}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{player.bingoWins}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xl font-bold text-green-700">
                        {player.totalPoints}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile view */}
          <div className="md:hidden">
            {players.map((player, index) => (
              <div 
                key={index}
                className={`p-4 border-b border-gray-200 ${
                  index === 0 ? 'bg-yellow-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">
                      {getMedalEmoji(index) || `#${index + 1}`}
                    </span>
                    <span className="text-xl font-semibold text-gray-800">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">
                    {player.totalPoints}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-red-50 rounded p-2">
                    <div className="text-lg">🎡</div>
                    <div className="font-semibold">{player.spinWins}</div>
                  </div>
                  <div className="bg-blue-50 rounded p-2">
                    <div className="text-lg">📝</div>
                    <div className="font-semibold">{player.quizScore}</div>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-lg">🎄</div>
                    <div className="font-semibold">{player.bingoWins}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Winner podium */}
        {players.length >= 3 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🎊 Top 3 Players 🎊
            </h2>
            <div className="flex justify-center items-end gap-4">
              {/* Second place */}
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-2">🥈</div>
                <div className="bg-gray-300 rounded-lg p-4 text-center min-w-[100px]">
                  <p className="font-bold text-lg">{players[1].name}</p>
                  <p className="text-2xl font-bold text-gray-700">{players[1].totalPoints}</p>
                </div>
                <div className="w-24 h-20 bg-gray-300 mt-2 rounded-t-lg"></div>
              </div>
              
              {/* First place */}
              <div className="flex flex-col items-center -mb-4">
                <div className="text-6xl mb-2 animate-bounce">🥇</div>
                <div className="bg-yellow-400 rounded-lg p-4 text-center min-w-[100px] border-4 border-yellow-600">
                  <p className="font-bold text-xl">{players[0].name}</p>
                  <p className="text-3xl font-bold text-yellow-900">{players[0].totalPoints}</p>
                </div>
                <div className="w-24 h-28 bg-yellow-400 mt-2 rounded-t-lg"></div>
              </div>
              
              {/* Third place */}
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-2">🥉</div>
                <div className="bg-orange-300 rounded-lg p-4 text-center min-w-[100px]">
                  <p className="font-bold text-lg">{players[2].name}</p>
                  <p className="text-2xl font-bold text-orange-900">{players[2].totalPoints}</p>
                </div>
                <div className="w-24 h-16 bg-orange-300 mt-2 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
