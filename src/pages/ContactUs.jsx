import React from "react";
import ContactDetails from "../components/ContactDetails";
import ContactForm from "../components/ContactForm";
import '../style/ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-us">
      <ContactDetails />
      <ContactForm />
    </section>
  );
};

export default ContactUs;
