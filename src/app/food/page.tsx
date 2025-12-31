'use client';
import { useState } from 'react';
import Link from 'next/link';

interface FoodContribution {
  id: number;
  person: string;
  food: string;
}

const initialContributions: FoodContribution[] = [
  { id: 1, person: 'Grace / Winston', food: 'caldereta kanding' },
  { id: 2, person: 'Cherry / Halan', food: 'lechon & Dinuguan' },
  { id: 3, person: 'Albert', food: 'Transpo plus mag add sa lechon' },
  { id: 4, person: 'Levy', food: 'soft drinks' },
  { id: 5, person: 'Ayen', food: '13 fruits, mango float' },
  { id: 6, person: 'Love', food: 'biko' },
  { id: 7, person: 'Velyn', food: 'chicken curry' },
  { id: 8, person: 'Irish', food: 'pichi pichi, salad' },
  { id: 9, person: 'Pinky', food: 'cajon seafood' },
  { id: 10, person: 'Jr', food: 'cake' },
];

export default function FoodContributions() {
  const [contributions, setContributions] = useState<FoodContribution[]>(initialContributions);
  const [newPerson, setNewPerson] = useState('');
  const [newFood, setNewFood] = useState('');

  const addContribution = () => {
    if (newPerson.trim() && newFood.trim()) {
      const newId = contributions.length > 0 ? Math.max(...contributions.map(c => c.id)) + 1 : 1;
      setContributions([...contributions, {
        id: newId,
        person: newPerson.trim(),
        food: newFood.trim()
      }]);
      setNewPerson('');
      setNewFood('');
    }
  };

  const removeContribution = (id: number) => {
    setContributions(contributions.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4 py-12">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-2 text-center">
          🍽️ Food Contributions 🍽️
        </h1>
        <p className="text-center text-gray-700 mb-8 text-lg">
          Sulat dri mga food inyo i contribute pra dli madoble
        </p>
        
        {/* Add new contribution */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Add Your Contribution</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && newFood && addContribution()}
              placeholder="Your name..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-lg"
            />
            <input
              type="text"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && newPerson && addContribution()}
              placeholder="Food you'll bring..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 text-lg"
            />
            <button
              onClick={addContribution}
              disabled={!newPerson.trim() || !newFood.trim()}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Contributions list */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4">
            <h2 className="text-2xl font-bold text-center">Food List ({contributions.length} items)</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {contributions.map((contribution) => (
              <div 
                key={contribution.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">🍴</span>
                      <span className="font-bold text-lg text-green-700">
                        {contribution.id}. {contribution.person}
                      </span>
                    </div>
                    <p className="text-gray-700 ml-11 text-lg">
                      {contribution.food}
                    </p>
                  </div>
                  {contribution.id > 10 && (
                    <button
                      onClick={() => removeContribution(contribution.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-2xl px-2"
                      title="Remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Note:</p>
          <p>Add your name and the food you'll bring to avoid duplicates. Original entries cannot be removed.</p>
        </div>
      </div>
    </div>
  );
}
