'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji?: string;
  image?: string;
  type?: 'multiple-choice' | 'text-input';
}

const questions: Question[] = [
  {
    question: "What time is it in Dubai? (If time in Philippines is 12:00 AM)",
    options: ["8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"],
    correctAnswer: 0,
    emoji: "🕐"
  },
  {
    question: "What time is it in San Francisco? (If time in Philippines is 12:00 AM)",
    options: ["8:00 AM", "9:00 AM", "10:00 AM", "8:00 AM (previous day)"],
    correctAnswer: 3,
    emoji: "🌉"
  },
  {
    question: "What time is it in Ireland? (If time in Philippines is 12:00 AM)",
    options: ["4:00 PM", "5:00 PM", "6:00 PM", "4:00 PM (previous day)"],
    correctAnswer: 3,
    emoji: "🍀"
  },
  {
    question: "Kinsay gi sugo aning baboy? (Who commanded this pig?)",
    options: ["Grace/Winston", "Cherry/Halan", "Levy Tampus", "Jr"],
    correctAnswer: 2,
    emoji: "🐷",
    image: "/images/pig.png"
  },
  {
    question: "Kinsay gi assignan sa caldereta kanding?",
    options: ["Grace/Winston", "Cherry/Halan", "Albert", "Levy"],
    correctAnswer: 0,
    emoji: "🍖"
  },
  {
    question: "Kinsay gi assignan sa lechon & Dinuguan?",
    options: ["Grace/Winston", "Cherry/Halan", "Albert", "Love"],
    correctAnswer: 1,
    emoji: "🐖"
  },
  {
    question: "Kinsa ang nag transpo plus mag add sa lechon?",
    options: ["Levy", "Albert", "Ayen", "Velyn"],
    correctAnswer: 1,
    emoji: "🚗"
  },
  {
    question: "Kinsay gi assignan sa soft drinks?",
    options: ["Levy", "Albert", "Love", "Irish"],
    correctAnswer: 0,
    emoji: "🥤"
  },
  {
    question: "Kinsay mag dala ug 13 fruits ug mango float?",
    options: ["Ayen", "Love", "Velyn", "Irish"],
    correctAnswer: 0,
    emoji: "🥭"
  },
  {
    question: "Kinsay gi assignan sa biko?",
    options: ["Love", "Velyn", "Irish", "Pinky"],
    correctAnswer: 0,
    emoji: "🍚"
  },
  {
    question: "Kinsay mag dala ug chicken curry?",
    options: ["Velyn", "Irish", "Pinky", "Love"],
    correctAnswer: 0,
    emoji: "🍛"
  },
  {
    question: "Kinsay gi assignan sa pichi pichi ug salad?",
    options: ["Irish", "Pinky", "Love", "Ayen"],
    correctAnswer: 0,
    emoji: "🥗"
  },
  {
    question: "Kinsay mag dala ug cajon seafood?",
    options: ["Pinky", "Irish", "Velyn", "Jr"],
    correctAnswer: 0,
    emoji: "🦐"
  },
  {
    question: "Kinsay gi assignan sa cake?",
    options: ["Jr", "Pinky", "Love", "Irish"],
    correctAnswer: 0,
    emoji: "🎂"
  },
  {
    question: "What year was the first Christmas celebrated?",
    options: ["336 AD", "100 AD", "1 AD", "500 AD"],
    correctAnswer: 0,
    emoji: "🎄"
  },
  {
    question: "In the song '12 Days of Christmas', what gift is given on the 7th day?",
    options: ["Seven swans a-swimming", "Seven geese a-laying", "Seven lords a-leaping", "Seven maids a-milking"],
    correctAnswer: 0,
    emoji: "🦢"
  },
  {
    question: "Which country started the tradition of putting up a Christmas tree?",
    options: ["Germany", "United States", "England", "France"],
    correctAnswer: 0,
    emoji: "🎄"
  },
  {
    question: "What are you supposed to do when you find yourself under the mistletoe?",
    options: ["Kiss", "Dance", "Sing", "Make a wish"],
    correctAnswer: 0,
    emoji: "💋"
  },
  {
    question: "What is the name of the Grinch's dog?",
    options: ["Max", "Buddy", "Charlie", "Rex"],
    correctAnswer: 0,
    emoji: "🐕"
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Start timer when quiz begins
  useEffect(() => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
  }, []);

  // Update elapsed time every second
  useEffect(() => {
    if (startTime && !quizComplete) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, quizComplete]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalTime = Date.now();
      setEndTime(finalTime);
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
    setStartTime(Date.now());
    setEndTime(null);
    setElapsedTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const totalSeconds = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : elapsedTime;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            🎉 Quiz Complete! 🎉
          </h1>
          <div className="text-6xl md:text-8xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '🎁'}
          </div>
          <p className="text-3xl font-bold text-red-700 mb-2">
            Your Score: {score} / {questions.length}
          </p>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <p className="text-sm text-gray-600 mb-1">⏱️ Time Taken:</p>
            <p className="text-4xl font-bold text-blue-700">
              {formatTime(totalSeconds)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ({totalSeconds} seconds)
            </p>
          </div>
          <p className="text-xl text-gray-700 mb-8">
            {percentage >= 80 ? 'Amazing! You\'re a Christmas expert! 🎅' :
             percentage >= 60 ? 'Great job! You know your Christmas trivia! 🎄' :
             'Good try! Learn more about Christmas traditions! ❄️'}
          </p>
          
          {/* Screenshot reminder */}
          <div className="mb-8 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg animate-pulse">
            <p className="text-lg font-bold text-yellow-900 mb-2">
              📸 Important! 📸
            </p>
            <p className="text-base text-yellow-800">
              Please screenshot this result and send it to the GC!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Play Again
            </button>
            <Link
              href="/"
              className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 via-green-100 to-red-100 p-4">
      <Link href="/" className="absolute top-4 left-4 text-green-700 hover:text-green-900 underline">
        ← Back to Home
      </Link>
      
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Progress Bar and Timer */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="flex items-center gap-3">
              <span>⏱️ {formatTime(elapsedTime)}</span>
              <span>Score: {score}</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          {q.emoji && <div className="text-6xl mb-4">{q.emoji}</div>}
          {q.image && (
            <div className="mb-4 flex justify-center">
              <img src={q.image} alt="Question" className="max-w-xs rounded-lg shadow-lg" />
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-red-700">
            {q.question}
          </h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {q.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === q.correctAnswer;
            const showCorrectAnswer = showResult && isCorrect;
            const showWrongAnswer = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100
                  ${showCorrectAnswer ? 'bg-green-500 text-white border-4 border-green-700' :
                    showWrongAnswer ? 'bg-red-500 text-white border-4 border-red-700' :
                    isSelected ? 'bg-blue-500 text-white' :
                    'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-300'
                  }`}
              >
                {option}
                {showCorrectAnswer && ' ✓'}
                {showWrongAnswer && ' ✗'}
              </button>
            );
          })}
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg mb-4 ${
            selectedAnswer === q.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <p className="text-xl font-bold">
              {selectedAnswer === q.correctAnswer ? '🎉 Correct!' : '❌ Wrong!'}
            </p>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <button
            onClick={nextQuestion}
            className="w-full px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-105"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎊'}
          </button>
        )}
      </div>
    </div>
  );
}
