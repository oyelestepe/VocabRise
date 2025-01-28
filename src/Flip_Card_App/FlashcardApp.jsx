import React, { useState, useEffect } from 'react';
import oxford3000 from './oxford3000.json';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import './FlashcardApp.css';

function FlashcardApp() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
      selectedWords = selectedWords.sort(() => Math.random() - 0.5); // Random
    }
    setWords(selectedWords);
    setCurrentIndex(0); // Reset to first word
    setIsFlipped(false); // Reset card flip
  };

  // Previous button
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false); // Reset card flip
    }
  };

  // Next button
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // Reset card flip
    }
  };

  // Flip the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    handleLevelChange('A1'); // Set A1 selected by default on load
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flashcard Uygulaması</h1>
      <div>
        {['A1', 'A2', 'B1', 'B2', 'Karışık'].map(level => (
          <label
            key={level}
            className={`level-label ${selectedLevels.includes(level) ? `selected-${level}` : ''}`}
            style={{ margin: '0 10px' }}
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

      {words.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="front">
              <h2>{words[currentIndex].En}</h2>
            </div>
            <div className="back">
              <h2>{words[currentIndex].Tr}</h2>
            </div>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="prev-btn" onClick={handlePrevious} disabled={currentIndex === 0}>
              <WestIcon fontSize="large" />
            </button>
            <span style={{ margin: '0 20px', fontSize: '18px' }}>
              {currentIndex + 1} / {words.length}
            </span>
            <button className="next-btn" onClick={handleNext} disabled={currentIndex === words.length - 1}>
              <EastIcon fontSize="large" />
            </button>
          </div>
        </div>
      )}

      {selectedLevels.length === 0 && <p>Lütfen seviye seçin.</p>}
    </div>
  );
}

export default FlashcardApp;