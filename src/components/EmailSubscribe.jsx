import React, { useState } from 'react';
import './componentCss/EmailSubscribe.css';
import { db, doc, setDoc } from '../firebase';

const EmailSubscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save email to "subscribers" collection in Firestore
      await setDoc(doc(db, 'subscribers', email), {
        email,
        subscribedAt: new Date().toISOString(),
      });
      setMessage('Thanks for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <section className="subscribe-section">
      <div className="subscribe-left">
        <h2>Join 2,000+ subscribers</h2>
        <p>Stay in the loop with everything you need to know.</p>
      </div>

      <div className="subscribe-right">
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className='subscribe-submit'>Subscribe</button>
        </form>
        {message && <span className="subscribe-message">{message}</span>}
        <p className="privacy-text">
          We care about your data in our <a href="/privacy">privacy policy</a>.
        </p>
      </div>
    </section>
  );
};

export default EmailSubscribe;
