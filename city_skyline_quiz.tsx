import React, { useState, useEffect } from 'react';

const CityQuizGame = () => {
  const [gameState, setGameState] = useState('welcome'); // 'welcome', 'playing', 'results'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState([]);

  // City skylines with images, difficulty, and country
  const cityImageBank = [
    // EASY - Major world cities with iconic, recognizable skylines
    {
      image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "New York City",
      difficulty: "easy",
      country: "United States"
    },
    {
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "London",
      difficulty: "easy",
      country: "United Kingdom"
    },
    {
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Dubai",
      difficulty: "easy",
      country: "United Arab Emirates"
    },
    {
      image: "https://images.pexels.com/photos/2346091/pexels-photo-2346091.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Tokyo",
      difficulty: "easy",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Singapore",
      difficulty: "easy",
      country: "Singapore"
    },
    {
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Paris",
      difficulty: "easy",
      country: "France"
    },
    {
      image: "https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Hong Kong",
      difficulty: "easy",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Los Angeles",
      difficulty: "easy",
      country: "United States"
    },
    {
      image: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Chicago",
      difficulty: "easy",
      country: "United States"
    },
    {
      image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Sydney",
      difficulty: "easy",
      country: "Australia"
    },
    {
      image: "https://images.pexels.com/photos/210012/pexels-photo-210012.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Miami",
      difficulty: "easy",
      country: "United States"
    },
    {
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Shanghai",
      difficulty: "easy",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Vancouver",
      difficulty: "easy",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "San Francisco",
      difficulty: "easy",
      country: "United States"
    },
    {
      image: "https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Barcelona",
      difficulty: "easy",
      country: "Spain"
    },
    {
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Toronto",
      difficulty: "easy",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Rio de Janeiro",
      difficulty: "easy",
      country: "Brazil"
    },
    {
      image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Moscow",
      difficulty: "easy",
      country: "Russia"
    },
    {
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Istanbul",
      difficulty: "easy",
      country: "Turkey"
    },
    
    // MEDIUM - Well-known cities but less iconic skylines
    {
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Berlin",
      difficulty: "medium",
      country: "Germany"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Madrid",
      difficulty: "medium",
      country: "Spain"
    },
    {
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Amsterdam",
      difficulty: "medium",
      country: "Netherlands"
    },
    {
      image: "https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Prague",
      difficulty: "medium",
      country: "Czech Republic"
    },
    {
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Vienna",
      difficulty: "medium",
      country: "Austria"
    },
    {
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Stockholm",
      difficulty: "medium",
      country: "Sweden"
    },
    {
      image: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Brussels",
      difficulty: "medium",
      country: "Belgium"
    },
    {
      image: "https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Rome",
      difficulty: "medium",
      country: "Italy"
    },
    {
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Milan",
      difficulty: "medium",
      country: "Italy"
    },
    {
      image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Munich",
      difficulty: "medium",
      country: "Germany"
    },
    {
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Zurich",
      difficulty: "medium",
      country: "Switzerland"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Oslo",
      difficulty: "medium",
      country: "Norway"
    },
    {
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Copenhagen",
      difficulty: "medium",
      country: "Denmark"
    },
    {
      image: "https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Helsinki",
      difficulty: "medium",
      country: "Finland"
    },
    {
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Dublin",
      difficulty: "medium",
      country: "Ireland"
    },
    {
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Edinburgh",
      difficulty: "medium",
      country: "United Kingdom"
    },
    {
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Geneva",
      difficulty: "medium",
      country: "Switzerland"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Lyon",
      difficulty: "medium",
      country: "France"
    },
    {
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Marseille",
      difficulty: "medium",
      country: "France"
    },
    {
      image: "https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Frankfurt",
      difficulty: "medium",
      country: "Germany"
    },
    {
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Hamburg",
      difficulty: "medium",
      country: "Germany"
    },
    {
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Cologne",
      difficulty: "medium",
      country: "Germany"
    },
    {
      image: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Warsaw",
      difficulty: "medium",
      country: "Poland"
    },
    {
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Budapest",
      difficulty: "medium",
      country: "Hungary"
    },
    {
      image: "https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Bangkok",
      difficulty: "medium",
      country: "Thailand"
    },
    {
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Seoul",
      difficulty: "medium",
      country: "South Korea"
    },
    {
      image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Mumbai",
      difficulty: "medium",
      country: "India"
    },
    {
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "São Paulo",
      difficulty: "medium",
      country: "Brazil"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Mexico City",
      difficulty: "medium",
      country: "Mexico"
    },
    {
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Buenos Aires",
      difficulty: "medium",
      country: "Argentina"
    },

    // HARD - Smaller cities or less recognizable skylines
    {
      image: "https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Wuhan",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Chengdu",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Hangzhou",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Nanjing",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Tianjin",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Dalian",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Xiamen",
      difficulty: "hard",
      country: "China"
    },
    {
      image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Yokohama",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Osaka",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Nagoya",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Fukuoka",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Sapporo",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Kobe",
      difficulty: "hard",
      country: "Japan"
    },
    {
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Adelaide",
      difficulty: "hard",
      country: "Australia"
    },
    {
      image: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Perth",
      difficulty: "hard",
      country: "Australia"
    },
    {
      image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Brisbane",
      difficulty: "hard",
      country: "Australia"
    },
    {
      image: "https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Calgary",
      difficulty: "hard",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Ottawa",
      difficulty: "hard",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Edmonton",
      difficulty: "hard",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Quebec City",
      difficulty: "hard",
      country: "Canada"
    },
    {
      image: "https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
      correct: "Winnipeg",
      difficulty: "hard",
      country: "Canada"
    }
  ];

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