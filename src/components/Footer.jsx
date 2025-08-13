import React from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import '../components/componentCss/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-section">
          <div className="footer-logo">
            <img src="/logo.png" alt="VocabRise Logo" style={{ height: '36px', marginRight: '5px' }} />
            VocabRise
          </div>
          <p className="footer-description">
            Learn English interactively with fun games and smart tools.
          </p>
          <div className="footer-socials">
            <a href="#" title="Instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" title="Twitter" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" title="YouTube" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h2 className="footer-title underline">Games</h2>
          <ul>
            <li><a href="/matching-game">Matching Game</a></li>
            <li><a href="/speed-quiz">Speed Quiz</a></li>
            <li><a href="/word-chain">Wordchain</a></li>
            <li><a href="/quiz-game">Quiz Game</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title underline">Learning Tools</h2>
          <ul>
            <li><a href="/flashcard">Flashcard</a></li>
            <li><a href="/dictionary">Dictionary</a></li>
            <li><a href="/stories">Stories</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title underline">Support</h2>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} VocabRise. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;