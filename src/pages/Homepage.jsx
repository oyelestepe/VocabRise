import React from 'react'
import Navbar from '../components/Navbar'
import ContactForm from "../components/ContactForm";
import ContactDetails from "../components/ContactDetails";
import Faq from './Faq'
import Footer from '../components/Footer'
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials'
import Privacy from './Privacy'
import Pricing from '../components/Pricing';
function Homepage() {

  const servicesData = [
    {id:1, img:'quiz.jpg', title:'Interactive quizzes', exp:'Engage with fun quizzes to enhance your vocabulary.'},
    {id:2, img:'progress.jpg', title:'Progress tracking', exp:'Monitor your learning journey with detailed progress tracking'},
    {id:3, img:'custom.jpg', title:'Customizable learning paths', exp:'Tailolr your vocabulary learning experience to your needs.'},
  ]
  return (
    <div>
      <Navbar />
      <div className='banner'>
          <div className='banner-wrapper'>
            <h2>Unlock your Vocabulary with <span style={{textDecoration:'underline', textDecorationColor:'#6cbd47'}}>VocabRise</span></h2>
            <p>Master English with ease</p>
            <button>VIEW SERVICES</button>
          </div>
      </div>
      
      <section className="about">
        <div className="about-text">
          <span className="highlight">ELEVATE YOUR VOCABULARY</span>
          <h1>Master English with Confidence</h1>
          <p>
            At VocabRise, we empower Turkish speakers to master English vocabulary through a dynamic and engaging platform.
            Our innovative features, including quizzes and progress tracking, make learning effective and enjoyable.
            Based in Istanbul, we are dedicated to helping you expand your language skills and open doors to new opportunities.
            Join our community and watch your vocabulary soar!
          </p>
          <a href="#" className="contact-link">Get in touch</a>
        </div>
        <div className="image-container">
          <img src="about.jpg" alt="Books and papers in a circle"/>
        </div>
  </section>
<Pricing/>
      <div className='services'>
        <div className='services-text'>
          <span>BOOST YOUR VOCABULARY</span>
          <h4>Interactive learning for turkish speakers</h4>
        </div>
       
       <div className='service-wrapper'>
       
        {
          servicesData.map((service)=>(
            <div className='service-card' key={service.id}>
              <img className='service-card-img' src={service.img}/>
              <h5 className='service-card-title'>{service.title}</h5>
              <p className='sevice-card-exp'>{service.exp}</p>
            </div>
          ))
        }
        </div> 
      </div>
      <div className="contact-section">
        <ContactForm />
        <ContactDetails />
      </div>
      <Footer/>
    </div>
  )
}

export default Homepage