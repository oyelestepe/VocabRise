import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import oxford3000 from '../Flip_Card_App/oxford3000.json';
import Navbar from '../components/Navbar';

function WordChain() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [usedWords, setUsedWords] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  // Level
  const handleSelectAll = () => {
    if (selectedLevels.length === Object.keys(oxford3000).length) {
      setSelectedLevels([]);
    } else {
      setSelectedLevels(Object.keys(oxford3000));
    }
  };

  // fetch words from selected levels
  const getLevelWords = () => {
    return selectedLevels.flatMap((level) =>
      oxford3000[level]?.map((word) => word.En.toLowerCase()) || []
    );
  };

  // Kelimenin hangi seviyeden olduğunu bul
  const findWordLevel = (word) => {
    for (const level in oxford3000) {
      if (oxford3000[level].some((w) => w.En.toLowerCase() === word.toLowerCase())) {
        return level;
      }
    }
    return null;
  };

  // start
  const startGame = () => {
    const levelWords = getLevelWords();
    if (levelWords.length === 0) {
      setMessage('Lütfen en az bir seviye seçin!');
      return;
    }
    const randomWord = levelWords[Math.floor(Math.random() * levelWords.length)];
    setCurrentWord(randomWord);
    setUsedWords([randomWord]);
    setGameStarted(true);
    setGameEnded(false);
    setTimeLeft(30);
    setScore(0);
    setMessage('');
  };

  // check answer
  const checkAnswer = () => {
    const levelWords = getLevelWords();
    const inputWord = userInput.toLowerCase().trim();
    const lastChar = currentWord.slice(-1).toLowerCase();

    if (!inputWord.startsWith(lastChar)) {
      setMessage(`Kelime "${lastChar.toUpperCase()}" harfi ile başlamalı!`);
      return;
    }

    if (usedWords.includes(inputWord)) {
      setMessage('Bu kelime zaten kullanıldı!');
      return;
    }

    const wordLevel = findWordLevel(inputWord);
    if (!wordLevel) {
      setMessage('Bu kelime Oxford 3000 listesinde bulunmuyor!');
      return;
    }

    if (!selectedLevels.includes(wordLevel)) {
      setMessage(`Bu kelime "${wordLevel}" seviyesinden!`);
      return;
    }

    setCurrentWord(inputWord);
    setUsedWords([...usedWords, inputWord]);
    setUserInput('');
    setMessage('');
    setTimeLeft(30);
    setScore(score + 1);
  };

  // timer
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
      setGameStarted(false);
      setMessage('Süre doldu! Oyun bitti.');
    }
  }, [gameStarted, timeLeft, gameEnded]);

  return (
    <>  
    <Navbar />
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Kelime Zinciri
      </Typography>

      {!gameStarted && (
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Seviye Seçin</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedLevels.length === Object.keys(oxford3000).length}
                  indeterminate={
                    selectedLevels.length > 0 &&
                    selectedLevels.length < Object.keys(oxford3000).length
                  }
                  onChange={handleSelectAll}
                />
              }
              label="Tümünü Seç"
            />
            {Object.keys(oxford3000).map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={selectedLevels.includes(level)}
                    onChange={(e) => {
                      const newSelected = e.target.checked
                        ? [...selectedLevels, level]
                        : selectedLevels.filter((l) => l !== level);
                      setSelectedLevels(newSelected);
                    }}
                  />
                }
                label={level}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}

      {gameStarted && !gameEnded && (
        <>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 30) * 100}
            sx={{ height: 10, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Son Kelime: <span style={{ color: '#1976d2' }}>{currentWord}</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Yeni kelime yazın"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={checkAnswer} sx={{ mr: 2 }}>
            Gönder (Enter)
          </Button>
          <Button variant="outlined" color="error" onClick={() => setGameEnded(true)}>
            Oyunu Bitir
          </Button>
        </>
      )}

      {message && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      {gameEnded && (
        <div>
          <Typography variant="h5" sx={{ mt: 3 }}>
            Oyun Bitti! Toplam Puan: {score}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={startGame}>
            Tekrar Oyna
          </Button>
        </div>
      )}

      {!gameEnded && !gameStarted && (
        <Button variant="contained" size="large" onClick={startGame} sx={{ mt: 2 }}>
          Oyunu Başlat
        </Button>
      )}
    </Container>
    </>
  );
}

export default WordChain;