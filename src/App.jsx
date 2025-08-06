import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Hompage from './pages/Homepage';
import Faq from './pages/Faq';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './user_interface/ProfilePage';
import SubscriptionPage from './user_interface/SubscriptionPage';
import FlashcardApp from './Flip_Card_App/FlashcardApp';
import QuizGame from './games/QuizGame';
import MatchingGame from './games/MatchingGame';
import SpeedQuiz from './games/SpeedQuiz';
import Dictionary from './pages/Dictionary';
import WordChain from './games/WordChain';
import Stories from './english_stories/Stories';
const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* PUBLIC PAGES */}
        <Route path="/" element={<Hompage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='quiz-game' element={<QuizGame/>}/>
        <Route path='matching-game' element={<MatchingGame/>}/>
        <Route path='speed-quiz' element={<SpeedQuiz/>}/>
        <Route path='dictionary' element={<Dictionary/>}/>
        <Route path='word-chain' element={<WordChain/>}/>
        <Route path='stories' element={<Stories/>}/>
        {/* ONLY FOR USERS */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/flashcard' element={<FlashcardApp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;