import React, { useState, useEffect, useRef } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './componentCss/GameRule.css';

function GameRule({ title, description, example }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  // Check if the device is touch
  const isTouchDevice = () =>
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // Close when clicking out
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle on mobile, hover on the desktop
  const handleClick = () => {
    if (isTouchDevice()) {
      setVisible((prev) => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice()) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice()) {
      setVisible(false);
    }
  };

  return (
    <div
      className="game-rule-tooltip-wrapper game-rule-fixed-top-right"
      ref={wrapperRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="show-rules-tooltip-label">
        <InfoOutlinedIcon style={{ verticalAlign: 'middle', marginRight: 6, fontSize: 26 }} />
        How to Play
      </span>
      {visible && (
        <div className="game-rule-tooltip-content">
          <aside className="game-rule">
            <h3>How to Play: {title}</h3>
            <p>{description}</p>
            {example && (
              <div className="game-rule-example">
                <strong>Example:</strong>
                <div>{example}</div>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default GameRule;
