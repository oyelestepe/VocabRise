import React, { useState, useEffect } from 'react';
import oxford3000 from '../Flip_Card_App/oxford3000.json';
import './gamesCss/SpeedQuiz.css';

function SpeedQuiz() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // level selection
  const handleLevelChange = (level) => {
    const newSelectedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(newSelectedLevels);
  };

  // start game
  const startGame = () => {
    if (selectedLevels.length === 0) {
      alert('Lütfen en az bir seviye seçin.');
      return;
    }

    // fetch words from selected levels
    let selectedWords = [];
    if (selectedLevels.includes('Karışık')) {
      selectedWords = Object.values(oxford3000).flat();
    } else {
      selectedWords = selectedLevels.flatMap(l => oxford3000[l] || []);
    }

    const shuffledWords = [...selectedWords].sort(() => Math.random() - 0.5);

    setWords(shuffledWords);
    setCurrentWordIndex(0);
    setScore(0);
    setTimeLeft(60);
    setGameStarted(true);
    setGameEnded(false);
    setUserInput('');
    setShowCorrectAnswer(false);
    setCorrectAnswer('');
  };

  const checkAnswer = () => {
    const currentWord = words[currentWordIndex];
    if (userInput.trim().toLowerCase() === currentWord.Tr.toLowerCase()) {
      setScore(score + 1);
    } else {
      setShowCorrectAnswer(true);
      setCorrectAnswer(currentWord.Tr);
    }
    setUserInput('');
    setCurrentWordIndex(currentWordIndex + 1);

    if (currentWordIndex >= words.length - 1) {
      setGameEnded(true);
      setGameStarted(false);
    }
  };

  const handleSkip = () => {
    setShowCorrectAnswer(true);
    setCorrectAnswer(words[currentWordIndex].Tr);
    setCurrentWordIndex(currentWordIndex + 1);
    setUserInput('');

    if (currentWordIndex >= words.length - 1) {
      setGameEnded(true);
      setGameStarted(false);
    }
  };

  const finishGame = () => {
    setGameEnded(true);
    setGameStarted(false);
  };

  // timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [gameStarted, timeLeft]);

  // reset
  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setScore(0);
    setTimeLeft(60);
    setUserInput('');
    setShowCorrectAnswer(false);
    setCorrectAnswer('');
  };

  return (
    <div className="speed-quiz-container">
      <h1>Speed Quiz</h1>

      {!gameStarted && !gameEnded && (
        <div className="game-start">
          <h3>Seviye Seçin</h3>
          <div className="level-selection">
            {['A1', 'A2', 'B1', 'B2', 'Karışık'].map(level => (
              <label
                key={level}
                className={`level-label ${selectedLevels.includes(level) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(level)}
                  onChange={() => handleLevelChange(level)}
                />
                {level}
              </label>
            ))}
          </div>
          <button onClick={startGame} className="start-button">
            Oyunu Başlat
          </button>
        </div>
      )}

      {gameStarted && !gameEnded && (
        <div className="game-board">
          <div className="game-info">
            <p>Kalan Süre: {timeLeft} saniye</p>
            <p>Puan: {score}</p>
          </div>
          <div className="quiz-question">
            <h3>{words[currentWordIndex]?.En}</h3>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Türkçe anlamını yazın..."
              autoFocus
            />
            {showCorrectAnswer && (
              <p className="correct-answer">Doğru Cevap: {correctAnswer}</p>
            )}
          </div>
          <div className="action-buttons">
            <button onClick={handleSkip} className="skip-button">
              Pas Geç
            </button>
            <button onClick={finishGame} className="finish-button">
              Bitir
            </button>
          </div>
        </div>
      )}

      {gameEnded && (
        <div className="game-results">
          <h3>Oyun Bitti!</h3>
          <p>Toplam Puan: {score}</p>
          <button onClick={resetGame} className="reset-button">
            Tekrar Dene
          </button>
        </div>
      )}
    </div>
  );
}

export default SpeedQuiz;