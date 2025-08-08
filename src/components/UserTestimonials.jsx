import React, { useEffect, useRef, useState } from 'react';
import './componentCss/UserTestimonials.css';

const testimonials = [
  {
    name: "Emily Carter",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "VocabRise made learning English vocabulary fun and easy. The games are fantastic!",
    rating: 5
  },
  {
    name: "James Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "My vocabulary improved a lot with the quizzes and matching games. Highly recommended!",
    rating: 5
  },
  {
    name: "Sophia Lee",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    comment: "The interface is very user-friendly and keeps me motivated. I'm very satisfied!",
    rating: 5
  }
];

function StarRating({ count }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">&#9733;</span>
      ))}
    </div>
  );
}

function UserTestimonials() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
  }, []);

  return (
    <section className="testimonials-section" ref={containerRef}>
      <h2>User Testimonials</h2>
      <div className="testimonials-list">
        {testimonials.map((t, idx) => (
          <div
            className={`testimonial-card ${isVisible ? 'animate' : ''}`}
            key={idx}
            style={{ animationDelay: `${0.2 + idx * 0.2}s` }}
          >
            <img src={t.photo} alt={t.name} className="testimonial-photo" />
            <StarRating count={t.rating} />
            <div className="testimonial-info">
              <span className="testimonial-name">{t.name}</span>
              <p className="testimonial-comment">"{t.comment}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserTestimonials;
