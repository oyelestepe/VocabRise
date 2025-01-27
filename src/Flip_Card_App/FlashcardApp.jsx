import React, { useState, useEffect } from 'react';
import oxford3000 from './oxford3000.json';
import './FlashcardApp.css';

function FlashcardApp() {
  const [level, setLevel] = useState('');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  
  const handleLevelChange = (selectedLevel) => {
    setLevel(selectedLevel);
    let selectedWords = [];
    if (selectedLevel === 'Karışık') {
      // All levels
      selectedWords = Object.values(oxford3000).flat();
      selectedWords = selectedWords.sort(() => Math.random() - 0.5); // Random
    } else {
      // Selected Level
      selectedWords = oxford3000[selectedLevel];
    }
    setWords(selectedWords);
    setCurrentIndex(0); // İlk kelimeye resetle
    setIsFlipped(false); // Kartı resetle
  };

  // Prev
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false); // Kartı resetle
    }
  };

  // Next 
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // Kartı resetle
    }
  };

  // Flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  useEffect(() => {
    handleLevelChange('Karışık'); 
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flashcard Uygulaması</h1>
      <div>
        <button onClick={() => handleLevelChange('A1')}>A1</button>
        <button onClick={() => handleLevelChange('A2')}>A2</button>
        <button onClick={() => handleLevelChange('B1')}>B1</button>
        <button onClick={() => handleLevelChange('B2')}>B2</button>
        <button onClick={() => handleLevelChange('Karışık')}>Karışık</button>
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
          <div style={{ marginTop: '20px' }}>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Önceki
            </button>
            <button onClick={handleNext} disabled={currentIndex === words.length - 1}>
              Sonraki
            </button>
          </div>
          <p>
            {currentIndex + 1} / {words.length}
          </p>
        </div>
      )}

      {words.length === 0 && level && <p>Seçilen seviyede kelime bulunamadı.</p>}
    </div>
  );
}

export default FlashcardApp;