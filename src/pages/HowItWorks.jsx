import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'
function HowItWorks() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <div className='information'>
            <img src='info.jpg'/>
            <div className='info-text'>
                <span>BOOST YOUR VOCABULARY</span>
                <h3>Transform your english skills today</h3>
            </div>
        </div>
        <ContactCTA style={{backgroundColor:'#1285'}}/>
        <Footer/>
    </div>
  )
}

export default HowItWorks