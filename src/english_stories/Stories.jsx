import React, { useState, useEffect } from 'react';
import storiesData from './stories.json';
import './stories.css';

const Stories = () => {
  const [stories, setStories] = useState(storiesData);
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedStory, setSelectedStory] = useState(null);
  const [tooltip, setTooltip] = useState({ 
    visible: false, 
    text: '', 
    position: { x: 0, y: 0 } 
  });

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
              onClick={() => setSelectedStory(story)}
            >
              <h3>{story.title}</h3>
              <p>{story.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="story-reader">
          <button onClick={() => setSelectedStory(null)}>
            ← Back to Stories
          </button>
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
  );
};

export default Stories;