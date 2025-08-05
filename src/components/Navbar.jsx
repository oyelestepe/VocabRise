import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './componentCss/navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="VocabRise Logo" style={{ height: '36px' }} />
          <span>VocabRise</span>
        </Link>
        <div className="hamburger-menu-icon" onClick={handleMenuToggle}>
          <MenuIcon fontSize="large" />
        </div>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <div className="close-menu-icon" onClick={handleMenuToggle}>
            <CloseIcon fontSize="large" />
          </div>

          <ul className="navbar-ul">
            <li className="navbar-li">
              <Link to="/" onClick={handleMenuToggle}>Home</Link>
            </li>
            <li className="navbar-li">
              <Link to="/about" onClick={handleMenuToggle}>About</Link>
            </li>
            <li className="navbar-li">
              <Link to="/dictionary" onClick={handleMenuToggle}>Dictionary</Link>
            </li>
            <li className="navbar-li">
              <Link to="/stories" onClick={handleMenuToggle}>Stories</Link>
            </li>
            <li
              className="navbar-li navbar-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>Games</span>
              <ul className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                <li><Link to="/matching-game" onClick={handleMenuToggle}>Matching Game</Link></li>
                <li><Link to="/quiz-game" onClick={handleMenuToggle}>Quiz Game</Link></li>
                <li><Link to="/speed-quiz" onClick={handleMenuToggle}>Speed Quiz</Link></li>
                <li><Link to="/word-chain" onClick={handleMenuToggle}>Wordchain</Link></li>
              </ul>
            </li>
          </ul>

          <div className="navbar-auth-buttons">
            {user ? (
              <>
                <button className="nav-icon-button" onClick={() => { navigate('/profile'); setMenuOpen(false); }}>
                  <AccountCircleIcon fontSize="large" />
                </button>
                <button className="nav-logout-button" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/signup" className="signup-button">Sign up</a>
                <a href="/login" className="login-button">Log in</a>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;