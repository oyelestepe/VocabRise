import React from 'react';
import  './componentCss/UserTestimonials.css';
const testimonials = [
  {
    name: "Emily Carter",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "VocabRise made learning English vocabulary fun and easy. The games are fantastic!"
  },
  {
    name: "James Smith",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "My vocabulary improved a lot with the quizzes and matching games. Highly recommended!"
  },
  {
    name: "Sophia Lee",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    comment: "The interface is very user-friendly and keeps me motivated. I'm very satisfied!"
  }
];

function UserTestimonials() {
  return (
    <section className="testimonials-section">
      <h2>User Testimonials</h2>
      <div className="testimonials-list">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <img src={t.photo} alt={t.name} className="testimonial-photo" />
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