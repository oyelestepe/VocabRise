import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Privacy() {
  return (
    <div>
        <Navbar/>
        <div className='privacy-hero'>
            <h2>Your data matters</h2>
            <span>We prioritize your information security.</span>
        </div>
        <div className='privacy-section'>
        <span>Your data matters</span>
        <h3>Understanding how we handle your information.</h3>
        </div>
        <Footer/>
    </div>
  )
}

export default Privacy