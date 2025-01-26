import React from "react";

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12093.1234!2d29.0123989!3d41.045504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba9c7b61d6cd%3A0x391ecb6a48a8c83a!2sIstanbul!5e0!3m2!1sen!2str!4v1681113931513!5m2!1sen!2str"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <div className="details">
        <p>
          <strong>Get in touch</strong>
        </p>
        <p>
          📧 <a href="mailto:vocabrise@gmail.com">vocabrise@gmail.com</a>
        </p>
        <p>
          <strong>Location</strong>
        </p>
        <p>📍 Istanbul, 34 TR</p>
        <p>
          <strong>Hours</strong>
        </p>
        <p>
          Monday - Friday: 9:00am – 10:00pm
          <br />
          Saturday: 9:00am – 6:00pm
          <br />
          Sunday: 9:00am – 12:00pm
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;
