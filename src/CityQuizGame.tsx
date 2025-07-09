import React, { useState, useEffect } from 'react';
import cityImageBank from './local_city_image_bank.json';

const CityQuizGame = () => {
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState([]);

  // Large bank of city names for wrong answers
  const cityNameBank = [
    "Madrid", "Barcelona", "Rome", "Milan", "Naples", "Florence", "Venice", "Amsterdam", "Rotterdam", "Brussels",
    "Vienna", "Prague", "Budapest", "Warsaw", "Stockholm", "Oslo", "Copenhagen", "Helsinki", "Dublin", "Edinburgh",
    "Manchester", "Birmingham", "Liverpool", "Glasgow", "Cardiff", "Belfast", "Lyon", "Marseille", "Nice", "Bordeaux",
    "Toulouse", "Strasbourg", "Frankfurt", "Munich", "Hamburg", "Cologne", "Dresden", "Stuttgart", "Dusseldorf", "Leipzig",
    "Zurich", "Geneva", "Basel", "Bern", "Lucerne", "Lausanne", "Athens", "Thessaloniki", "Istanbul", "Ankara",
    "Moscow", "St. Petersburg", "Kiev", "Minsk", "Riga", "Vilnius", "Tallinn", "Zagreb", "Ljubljana", "Belgrade",
    // ... (keeping original city bank but shortened for display)
  ];

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Generate random questions
  const generateQuestions = () => {
    const shuffledImages = shuffleArray(cityImageBank);
    const selectedImages = shuffledImages.slice(0, 10);
    
    return selectedImages.map(cityImage => {
      const availableWrongAnswers = cityNameBank.filter(city => city !== cityImage.correct);
      const shuffledWrongAnswers = shuffleArray(availableWrongAnswers);
      const wrongAnswers = shuffledWrongAnswers.slice(0, 3);
      
      const allOptions = [cityImage.correct, ...wrongAnswers];
      const shuffledOptions = shuffleArray(allOptions);
      
      return {
        image: cityImage.image,
        correct: cityImage.correct,
        options: shuffledOptions
      };
    });
  };

  const [questions, setQuestions] = useState([]);

  const startGame = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setPlayerAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer || showFeedback) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setPlayerAnswers([...playerAnswers, {
      question: currentQuestion,
      selected: answer,
      correct: questions[currentQuestion].correct,
      isCorrect: isCorrect
    }]);
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameState('results');
      }
    }, 1500);
  };

  const getButtonStyle = (option) => {
    if (!showFeedback) {
      return "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border-2 border-slate-600 hover:border-slate-500 text-white shadow-lg hover:shadow-slate-500/25 transform hover:scale-105 hover:-translate-y-1";
    }
    
    if (option === questions[currentQuestion].correct) {
      return "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-2 border-emerald-400 shadow-lg shadow-emerald-500/50 scale-105";
    }
    
    if (option === selectedAnswer && option !== questions[currentQuestion].correct) {
      return "bg-gradient-to-r from-red-500 to-rose-500 text-white border-2 border-red-400 shadow-lg shadow-red-500/50";
    }
    
    return "bg-slate-300 text-slate-600 border-2 border-slate-300 opacity-60";
  };

  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full border border-white/20 relative z-10">
          <div className="mb-8">
            <div className="text-6xl mb-4">🏙️</div>
            <h1 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SKYLINE
            </h1>
            <h2 className="text-3xl font-bold text-white/90 mb-2">QUIZ</h2>
          </div>
          
          <p className="text-white/80 mb-10 text-lg leading-relaxed">
            Test your knowledge of the world's most iconic city skylines! 
            <br />
            <span className="text-cyan-300 font-semibold">10 cities • 4 choices • Endless fun</span>
          </p>
          
          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 border-2 border-white/20"
          >
            START ADVENTURE
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && questions.length > 0) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
            {/* Header with progress */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
              <div className="relative z-10 flex justify-between items-center text-white">
                <div>
                  <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
                  <p className="text-indigo-200">of {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black">{score}</div>
                  <p className="text-indigo-200">Score</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 relative">
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-400 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {/* Image container with enhanced styling */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <img 
                  src={questions[currentQuestion].image} 
                  alt="City skyline"
                  className="relative w-full h-80 object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
              
              <h3 className="text-3xl font-bold text-center mb-8 text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Which city is this?
                </span>
              </h3>
              
              {/* Answer buttons with enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    className={`p-6 rounded-2xl font-bold text-lg transition-all duration-300 ${getButtonStyle(option)} ${
                      showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Feedback with enhanced styling */}
              {showFeedback && (
                <div className="mt-8 text-center">
                  <div className={`inline-flex items-center px-6 py-3 rounded-2xl text-xl font-bold ${
                    selectedAnswer === questions[currentQuestion].correct 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/50' 
                      : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/50'
                  }`}>
                    {selectedAnswer === questions[currentQuestion].correct ? (
                      <>
                        <span className="text-2xl mr-2">🎉</span>
                        Correct! Amazing!
                      </>
                    ) : (
                      <>
                        <span className="text-2xl mr-2">🤔</span>
                        It was {questions[currentQuestion].correct}!
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    const getResultMessage = () => {
      if (score === questions.length) return { text: "PERFECT SCORE! 🏆", color: "from-yellow-400 to-orange-500" };
      if (score >= 8) return { text: "SKYLINE MASTER! 🌟", color: "from-emerald-400 to-green-500" };
      if (score >= 6) return { text: "CITY EXPLORER! 🗺️", color: "from-blue-400 to-purple-500" };
      if (score >= 4) return { text: "GETTING THERE! 🚀", color: "from-indigo-400 to-purple-500" };
      return { text: "KEEP EXPLORING! 🌍", color: "from-slate-400 to-slate-500" };
    };

    const result = getResultMessage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
        {/* Animated celebration background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20">
            {/* Results header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className={`text-5xl font-black mb-4 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                {result.text}
              </h1>
              
              <div className="relative inline-block">
                <div className="text-8xl font-black text-white mb-4">
                  {score}<span className="text-white/60">/{questions.length}</span>
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                  {percentage}% Accuracy
                </div>
              </div>
            </div>
            
            {/* Results breakdown */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Journey</h2>
              <div className="grid gap-4 max-h-80 overflow-y-auto">
                {playerAnswers.map((answer, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    answer.isCorrect 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100' 
                      : 'bg-red-500/20 border-red-500/50 text-red-100'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        answer.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                      }`}>
                        {answer.isCorrect ? '✓' : '✗'}
                      </div>
                      <span className="font-bold text-lg">Question {index + 1}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{answer.correct}</div>
                      {!answer.isCorrect && (
                        <div className="text-sm opacity-75">You: {answer.selected}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Play again button */}
            <div className="text-center">
              <button 
                onClick={startGame}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 border-2 border-white/20"
              >
                🚀 PLAY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CityQuizGame;