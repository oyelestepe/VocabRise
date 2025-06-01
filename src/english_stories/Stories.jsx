import React, { useState, useEffect } from 'react';
import storiesData from './stories.json';
import './stories.css';
import Navbar from '../components/Navbar';

const Stories = () => {
  const [stories, setStories] = useState(storiesData);
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [tooltip, setTooltip] = useState({ 
    visible: false, 
    text: '', 
    position: { x: 0, y: 0 } 
  });

  // update index when story is selected
  const handleStorySelect = (story) => {
    const index = stories[selectedLevel].findIndex(s => s.id === story.id);
    setCurrentStoryIndex(index);
    setSelectedStory(story);
  };

  // next story
  const handleNextStory = () => {
    const nextIndex = currentStoryIndex + 1;
    if (nextIndex < stories[selectedLevel].length) {
      setCurrentStoryIndex(nextIndex);
      setSelectedStory(stories[selectedLevel][nextIndex]);
    }
  };

  // prev story
  const handlePrevStory = () => {
    const prevIndex = currentStoryIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStoryIndex(prevIndex);
      setSelectedStory(stories[selectedLevel][prevIndex]);
    }
  };
  /* reading time calculator*/
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };
  const renderStoryContent = (content, vocabulary) => {
    return content.split(' ').map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      const hasTranslation = vocabulary && vocabulary[cleanWord];

      return (
        <span
          key={index}
          className={hasTranslation ? 'vocab-word' : ''}
          onMouseEnter={(e) => {
            if (hasTranslation) {
              setTooltip({
                visible: true,
                text: vocabulary[cleanWord],
                position: { x: e.clientX, y: e.clientY }
              });
            }
          }}
          onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <>
      <Navbar />
    <div className="story-container">
      {/* Level selection */}
      <div className="level-selector">
        {Object.keys(stories).map(level => (
          <button
            key={level}
            className={selectedLevel === level ? 'active' : ''}
            onClick={() => {
              setSelectedLevel(level);
              setSelectedStory(null);
            }}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Story list */}
      {!selectedStory ? (
        <div className="story-list">
          {stories[selectedLevel]?.map(story => (
            <div 
              key={story.id} 
              className="story-card"
              onClick={() => handleStorySelect(story)}
            >
              <h3>{story.title}</h3>
              <p>{story.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="story-reader">
          <div className="navigation-controls">
            <button onClick={() => setSelectedStory(null)}>
              ← All Stories
            </button>
            <div className="story-nav-buttons">
              <button 
                onClick={handlePrevStory}
                disabled={currentStoryIndex === 0}
              >
                ← Previous
              </button>
              <button 
                onClick={handleNextStory}
                disabled={currentStoryIndex === stories[selectedLevel].length - 1}
              >
                Next →
              </button>
            </div>
          </div>
          {/* reading time calculator*/}
          <div className="meta-info">
            <span>⏳ {calculateReadingTime(selectedStory.content)} mins</span>
            <span>📖 {selectedStory.content.split(/\s+/).length} words</span>
          </div>
          <h1>{selectedStory.title}</h1>
          <div className="story-content">
            {renderStoryContent(selectedStory.content, selectedStory.vocabulary)}
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="tooltip"
          style={{
            left: `${tooltip.position.x + 15}px`,
            top: `${tooltip.position.y - 25}px`
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
    </>
  );
};

export default Stories;