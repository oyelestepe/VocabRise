import React, { useState, useEffect } from 'react';
import oxford3000 from '../Flip_Card_App/oxford3000.json';
import './gamesCss/MatchingGame.css'; 
import Navbar from '../components/Navbar';
import GameRule from '../components/GameRule';
function MatchingGame() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);

  // level selection
  const handleLevelChange = (level) => {
    const newSelectedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(newSelectedLevels);
  };

  const startGame = () => {
    if (selectedLevels.length === 0) {
      alert('Please select at least one level.');
      return;
    }

    // fetch words from selected levels
    let selectedWords = [];
    if (selectedLevels.includes('Mixed')) {
      selectedWords = Object.values(oxford3000).flat();
    } else {
      selectedWords = selectedLevels.flatMap(l => oxford3000[l] || []);
    }
    const shuffled = [...selectedWords].sort(() => Math.random() - 0.5).slice(0, 8);

    // creating cards
    const wordPairs = shuffled.flatMap(word => [
      { id: `${word.En}-en`, text: word.En, type: 'en', matchId: word.Tr },
      { id: `${word.Tr}-tr`, text: word.Tr, type: 'tr', matchId: word.En }
    ]).sort(() => Math.random() - 0.5);

    setShuffledWords(wordPairs);
    setGameStarted(true);
    setGameEnded(false);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(60);
  };

  const handleCardClick = (card) => {
    if (selectedCard) {
      if (selectedCard.matchId === card.text || selectedCard.text === card.matchId) {
        setMatchedPairs([...matchedPairs, selectedCard.id, card.id]);
        setScore(score + 1);
      }
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  // timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      // End game if all pairs are matched
      if (matchedPairs.length === shuffledWords.length && shuffledWords.length > 0) {
        setGameEnded(true);
        setGameStarted(false);
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [gameStarted, timeLeft, matchedPairs, shuffledWords.length]);

  // reset
  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(60);
  };

  return (
    <>
      <Navbar />
      <GameRule 
        title="Matching Game"
        description={"Match the English and Turkish words by clicking on the cards. You have 60 seconds to match as many pairs as possible."}
        example={
          <>
            <div>English: <b>apple</b></div>
            <div>Turkish: <b>elma</b></div>
          </>
        }
        />
    <div className="matching-game-container">
      <h1>Matching Game</h1>

      {!gameStarted && !gameEnded && (
        <div className="game-start">
          <h3>Choose Level</h3>
          <div className="level-selection">
            {['A1', 'A2', 'B1', 'B2', 'Mixed'].map(level => (
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
            Play
          </button>
        </div>
      )}

      {gameStarted && !gameEnded && (
        <div className="game-board">
          <div className="game-info">
            <p>Remaining Time: {timeLeft} seconds</p>
            <p>Points: {score}</p>
          </div>
          <div className="cards-grid">
            {shuffledWords.map((card) => (
              <div
                key={card.id}
                className={`card ${
                  matchedPairs.includes(card.id) ? 'matched' : ''
                } ${selectedCard?.id === card.id ? 'selected' : ''}`}
                onClick={() => !matchedPairs.includes(card.id) && handleCardClick(card)}
              >
                {card.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameEnded && (
        <div className="game-results">
          <h3>Game Over!</h3>
          <p>Total Points: {score}</p>
          <button onClick={resetGame} className="reset-button">
            Play Again
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default MatchingGame;