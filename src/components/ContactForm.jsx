import React from "react";
import './componentCss/ContactForm.css';
const ContactForm = () => {
  return (
    <div className="contact-form">
      <h2>GET IN TOUCH</h2>
      <h3>We'd love to hear from you!</h3>
      <form>
        <label htmlFor="name">
          Name <span>*</span>
        </label>
        <input type="text" id="name" placeholder="Jane Smith" required />

        <label htmlFor="email">
          Email address <span>*</span>
        </label>
        <input type="email" id="email" placeholder="email@gmail.com" required />

        <label htmlFor="phone">
          Phone number <span>*</span>
        </label>
        <input type="tel" id="phone" placeholder="555-555-5555" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="4" placeholder="Write your message here..."></textarea>

        <div className="checkbox-container">
          <input type="checkbox" id="consent" checked required />
          <label htmlFor="consent">
            I allow this website to store my submission so they can respond to my inquiry.
          </label>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default ContactForm;
