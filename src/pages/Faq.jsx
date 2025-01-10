import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import ContactCTA from '../components/ContactCTA';
import Hero from '../components/Hero';
function Faq() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <div className='hero-wrapper'>
            <p>LEARNING MADE EASY</p>
            <h3>Your questions answered here!</h3>
        </div>
        <div className='faq'>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>What is VocabRise?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          VocabRise is an innovative platform tailored for Turkish speakers aiming to enhance their English vocabulary. With a user-friendly interface, VocabRise offers a range of interactive features, including engaging quizzes and personalized progress tracking. Users can learn at their own pace, ensuring a comprehensive understanding of English words. Whether you are a beginner or looking to refine your skills, VocabRise provides the tools needed to succeed in mastering English vocabulary. Join a community of learners today and start your journey toward fluency.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>How do the quizzes work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          At VocabRise, quizzes are designed to be both fun and educational. Each quiz focuses on different aspects of vocabulary, from definitions to usage in sentences. Users can test their knowledge and reinforce learning through various question formats, making vocabulary acquisition enjoyable. The quizzes adapt to your learning pace, ensuring you challenge yourself appropriately. After each quiz, you receive instant feedback, allowing you to identify areas for improvement. This interactive approach keeps you engaged and motivated as you build your English vocabulary.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Can I track my progress?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Absolutely! Progress tracking is a key feature of VocabRise. Users can monitor their learning journey through detailed statistics that showcase vocabulary improvement over time. This feature allows you to see which words you've mastered and which areas need further attention. By visualizing your progress, you can set achievable goals and stay motivated. Whether you're learning sporadically or consistently, VocabRise ensures that you have a clear understanding of your advancements. Celebrate your achievements and stay committed to your language learning journey.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    <ContactCTA/>
    <Footer/>
    </div>
  )
}

export default Faq