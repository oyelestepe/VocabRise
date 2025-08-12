import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/Faq.css';

function Faq() {
  return (
    <div>
      <Navbar />
      <div className="faq-banner">
        <div className="faq-banner-left">
          <img src='/faq-banner.png' alt="FAQ illustration" />
        </div>
        <div className="faq-banner-right">
          <h2 className="faq-banner-title">Frequently Asked Questions</h2>
          <p className="faq-banner-subtitle">Your questions answered here!</p>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="faq-question">What is VocabRise?</span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="faq-answer">
                VocabRise is an innovative platform tailored for Turkish speakers aiming to enhance their English vocabulary...
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="faq-question">How do the quizzes work?</span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="faq-answer">
                At VocabRise, quizzes are designed to be both fun and educational...
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="faq-question">Can I track my progress?</span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="faq-answer">
                Absolutely! Progress tracking is a key feature of VocabRise...
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="faq-question">
                Is there a mobile app available?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="faq-answer">
                Yes, VocabRise offers a mobile app for both iOS and Android...
              </p>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="faq-question">
                How can I contact support?
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <p className="faq-answer">
                You can reach our support team via the contact form on our website or through our email support...
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;
