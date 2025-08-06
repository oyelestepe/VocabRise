import React from 'react'
import Navbar from '../components/Navbar'
import ContactForm from "../components/ContactForm";
import ContactDetails from "../components/ContactDetails";
import Footer from '../components/Footer'
import Pricing from '../components/Pricing';
import UserTestimonials from '../components/UserTestimonials';
import { useNavigate } from 'react-router-dom';
function Homepage() {

  function HeroSection() {
    const navigate = useNavigate();
  
    const handleGetStarted = () => {
      navigate('/signup');
    };
  }
  return (
    <>
    <Navbar/>
    <div className='hero-container'>
      <div className="hero-img-container"> 
        <img src="/hero-img.png" alt="hero-img" className="hero-img" />
      </div>
      <div className="hero-text">
        <h2 className="hero-heading">Oxford 3000 Mastery</h2>
        <p className="hero-subheading">İngilizce'nin temelini keşfedin, ömür boyu erişim</p>
        <button className="cta-button" >Hemen Başla!</button>
      </div>
    </div>
    
    <section className='video-section'>
      <div className='video-container'>
        <video width={600} controls autoPlay loop>
          <source src='speed-quiz.mp4' type='video/mp4'/>
        </video>
        <video width={600} controls autoPlay loop>
          <source src='quiz.mp4' type='video/mp4'/>
        </video>
        <video width={600} controls autoPlay loop>
          <source src='matching-game.mp4' type='video/mp4'/>
        </video>
        <video width={600} controls autoPlay loop>
          <source src='word-chain.mp4' type='video/mp4'/>
        </video>
        <video width={600} controls autoPlay loop>
          <source src='dictionary.mp4' type='video/mp4'/>
        </video>
        <video width={600} controls autoPlay loop>
          <source src='dictionary.mp4' type='video/mp4'/>
        </video>
      </div>
    </section>
    <div className='featured-section'>
      <div className='featured-text'>
        <h2 className='featured-title'>VocabRise ile Kolayca İngilizce Öğrenin</h2>
        <p className='featured-p'>VocabRise, Oxford 3000 kelimelerini eğlenceli ve etkileşimli bir şekilde öğrenmenizi sağlar. Oyunlar, hikayeler ve etkileşimli sözlük ile İngilizce bilginizi geliştirin.</p>
      </div>
      <div className='featured-img'>
        <img src="/chart.png" alt="chart-img" className="chart-img" />
        <img src="/before-after.png" alt="before-after" className="before-after" />
      </div>
    </div>
    <UserTestimonials/>
    <Pricing/>
   
    
    <Footer/>
    </>
  );
}

export default Homepage