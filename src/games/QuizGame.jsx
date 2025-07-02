import React, { useState } from 'react';
import oxford3000 from '../Flip_Card_App/oxford3000.json';
import './gamesCss/QuizGame.css';
import Navbar from '../components/Navbar';
import GameRule from '../components/GameRule';
function QuizGame() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [questionCount, setQuestionCount] = useState(10); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  // level selection
  const handleLevelChange = (level) => {
    const newSelectedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(newSelectedLevels);
  };

  // number of questions
  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (count > 0) {
      setQuestionCount(count);
    }
  };

  // start quiz
  const startQuiz = () => {
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
    const shuffledWords = [...selectedWords].sort(() => Math.random() - 0.5).slice(0, questionCount);

    // create questions
    const generatedQuestions = shuffledWords.map(word => {
      const isEnToTr = Math.random() > 0.5; // 50% En → Tr or Tr → En
      const otherWords = selectedWords.filter(w => w !== word);
      const wrongOptions = [...otherWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => isEnToTr ? w.Tr : w.En);

      return {
        question: isEnToTr ? word.En : word.Tr,
        correctAnswer: isEnToTr ? word.Tr : word.En,
        options: [...wrongOptions, isEnToTr ? word.Tr : word.En].sort(() => Math.random() - 0.5)
      };
    });

    setQuestions(generatedQuestions);
    setQuizStarted(true);
    setQuizEnded(false);
    setCurrentQuestion(0);
    setScore({ correct: 0, wrong: 0 });
  };

  
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: isCorrect ? prev.wrong : prev.wrong + 1
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  // reset quiz
  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
    setCurrentQuestion(0);
    setScore({ correct: 0, wrong: 0 });
  };

  return (
    <>
      <Navbar />
      <GameRule 
        title="Quiz Game"
        description="Answer the questions based on the Oxford 3000 words. Choose your level and number of questions."
        example={
          <>
            <div>Question: <b>Refuse</b></div>
            <div>Options: <b>kazak, reddetmek, kişilik, özellik</b></div>
          </>
        }
      />
    <div className="quiz-container">
      <h1>Quiz Game</h1>

      {!quizStarted && (
        <div className="quiz-start">
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

          <div className="question-count">
            <label>
              Number of Questions:
              <input
                type="number"
                value={questionCount}
                onChange={handleQuestionCountChange}
                min="1"
              />
            </label>
          </div>

          <button onClick={startQuiz} className="start-button">
            Start Quiz
          </button>
        </div>
      )}

      {quizStarted && !quizEnded && (
        <div className="quiz-game">
          <div className="quiz-progress">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <h3 className="quiz-question">
            {questions[currentQuestion]?.question}
          </h3>
          <div className="quiz-options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="option-btn"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {quizEnded && (
        <div className="quiz-results">
          <h3>Quiz Result</h3>
          <p>True: {score.correct}</p>
          <p>Wrong: {score.wrong}</p>
          <button onClick={resetQuiz} className="reset-button">
            Play Again
          </button>
        </div>
      )}
    </div>
    </>
  );
}

export default QuizGame;