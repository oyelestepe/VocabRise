import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './componentCss/navbar.css'

function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <span className="brand">
        <img src="/logo.png" alt="VocabRise Logo" style={{height:'36px'}}></img>
        <span s>VocabRise</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="navbar-ul">
            <li className="navbar-li">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-li">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar-li">
              <Link to="/services">Services</Link>
            </li>
          </ul>
          {user ? ( // Kullanıcı giriş yapmışsa
            <>
              <IconButton
                color="inherit"
                onClick={() => navigate('/profile')} // Profil sayfasına yönlendir
                sx={{ margin: '0 10px' }}
              >
                <AccountCircleIcon fontSize="large" /> {/* Kullanıcı ikonu */}
              </IconButton>
              <Button
                variant="contained"
                size="small"
                style={{ margin: '5px', backgroundColor: '#ff4d4d', color: 'white' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : ( // Kullanıcı giriş yapmamışsa
            <>
              <Button variant="contained" size="small" style={{ margin: '5px' }}>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sign up
                </Link>
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  margin: '5px',
                  backgroundColor: '#ececec',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Log in
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;