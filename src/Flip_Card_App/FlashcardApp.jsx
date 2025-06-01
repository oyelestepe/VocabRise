import React, { useState, useEffect } from 'react';
import oxford3000 from './oxford3000.json';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './FlashcardApp.css';
import Navbar from '../components/Navbar';

function FlashcardApp() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  const handleLevelChange = (level) => {
    const newSelectedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(newSelectedLevels);

    let selectedWords = [];
    if (newSelectedLevels.length === 0) {
      selectedWords = [];
    } else {
      selectedWords = newSelectedLevels.flatMap(l => oxford3000[l] || []);
      selectedWords = selectedWords.sort(() => Math.random() - 0.5);
    }
    setWords(selectedWords);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const pronounceWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speechRate;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB');
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeechRateChange = (event) => {
    setSpeechRate(parseFloat(event.target.value));
  };

  useEffect(() => {
    handleLevelChange('A1');
  }, []);

  return (
    <>
      <Navbar />
    <div className="flashcard-app">
      <h1 className="app-title">Flashcard App</h1>
      
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
              hidden
            />
            {level}
          </label>
        ))}
      </div>

      <div className="speech-rate-container">
        <label>
          Speech Rate:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={handleSpeechRateChange}
          />
          <span>{speechRate.toFixed(1)}</span>
        </label>
      </div>

      {words.length > 0 && (
        <div>
          <div className="flashcard-container">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="front">
                <button 
                  className="volume-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    pronounceWord(words[currentIndex].En);
                  }}
                >
                  <VolumeUpIcon fontSize="medium" />
                </button>
                <h2>{words[currentIndex].En}</h2>
              </div>
              <div className="back">
                <h2>{words[currentIndex].Tr}</h2>
              </div>
            </div>
          </div>
          
          <div className="navigation-container">
            <button className="nav-button" onClick={handlePrevious} disabled={currentIndex === 0}>
              <WestIcon fontSize="large" />
            </button>
            <span className="pagination">
              {currentIndex + 1} / {words.length}
            </span>
            <button className="nav-button" onClick={handleNext} disabled={currentIndex === words.length - 1}>
              <EastIcon fontSize="large" />
            </button>
          </div>
        </div>
      )}

      {selectedLevels.length === 0 && <p>Please select a level.</p>}
    </div>
    </>
  );
}

export default FlashcardApp;