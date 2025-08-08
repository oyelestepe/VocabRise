import { useEffect, useRef, useState } from 'react';
import './componentCss/WordCounter.css';

const levels = [
  { level: 'A1', count: 898, emoji: '🌱' },
  { level: 'A2', count: 872, emoji: '🚀' },
  { level: 'B1', count: 807, emoji: '🔥' },
  { level: 'B2', count: 720, emoji: '🏆' },
];

const WordCounter = () => {
  const [counts, setCounts] = useState(levels.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounts();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;

    const intervals = levels.map((item, index) => {
      const increment = Math.ceil(item.count / steps);
      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(newCounts[index] + increment, item.count);
          return newCounts;
        });
      }, intervalTime);
    });

    setTimeout(() => {
      intervals.forEach(clearInterval);
    }, duration + 100);
  };

  return (
    <section className="word-counter-container" ref={containerRef}>
      <div className="word-counter-header">
        <h2>Kelime Hedeflerini Seviyelere Göre Keşfet</h2>
        <p>
          <strong>Oxford 3000</strong> temel alınarak seçilen <strong>3297</strong> etkili kelime,
          seviyelere göre senin için ayrıldı. <br />
          Seviyeni seç, kelimeleri fethet! 💪
        </p>
      </div>

      <div className="horizontal-levels">
        {levels.map((item, index) => (
          <div key={item.level} className="level-card">
            <span className="level-emoji">{item.emoji}</span>
            <div className="level-text">
              <h3>{item.level}</h3>
              <p className="big-count">{counts[index]}</p>
              <span className="label">kelime</span>
            </div>
          </div>
        ))}

        {/* C1 coming soon */}
        <div className="level-card coming-soon">
          <span className="level-emoji">🧠</span>
          <div className="level-text">
            <h3>C1</h3>
            <p className="big-count">Yakında...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordCounter;