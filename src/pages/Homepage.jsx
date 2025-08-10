import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pricing from '../components/Pricing';
import UserTestimonials from '../components/UserTestimonials';
import { useNavigate } from 'react-router-dom';
import WordCounter from '../components/WordCounter';
import EmailSubscribe from '../components/EmailSubscribe';
import ContactUs from './ContactUs';
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
   <section className="games-section">
  <h2 className="games-title">Kelime Oyunlarımız</h2>
  <p className="games-subtitle">
    İngilizce kelime öğrenimini eğlenceli hale getiren oyunlarımızla, hem pratik yapın hem de öğrenmenizi pekiştirin.
  </p>
  <div className="games-grid">
    {[
      { src: 'speed-quiz.mp4', title: 'Speed Quiz', desc: 'Zamana karşı yarış! Hızlı cevap ver, reflekslerini ve kelime bilginin sınırlarını zorla.' },
      { src: 'quiz.mp4', title: 'Quiz Game', desc: 'Çoktan seçmeli sorularla bilginizi test edin, yanlışlarınızı görün ve hemen öğrenin.' },
      { src: 'matching-game.mp4', title: 'Matching Game', desc: 'Kelime ve anlamlarını eşleştirerek hafızanı güçlendir. Eğlenceli ve öğretici bir deneyim!' },
      { src: 'word-chain.mp4', title: 'Word Chain', desc: 'Verilen harfle başlayan kelimeleri sırayla ekle, zinciri bozmadan ne kadar ilerleyebileceğini gör.' },
      { src: 'dictionary.mp4', title: 'Sözlük', desc: 'Her kelimenin anlamını, telaffuzunu ve örnek cümlelerini anında keşfet.' },
      { src: 'dictionary.mp4', title: 'Favori Listem', desc: 'Öğrenmek istediğin kelimeleri kendi listene ekle ve dilediğin zaman tekrar et.' },

    ].map((game, i) => (
      <div key={i} className="game-card">
        <div className="card-inner">
          <div className="card-front">
            <video src={game.src} autoPlay loop muted />
            <div className="card-title">{game.title}</div>
          </div>
          <div className="card-back">
            <p>{game.desc}</p>
          </div>
        </div>
      </div>
    ))}
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
    <WordCounter/>
    <UserTestimonials/>
    <Pricing/>
    <EmailSubscribe/>
    <ContactUs/>
    <Footer/>
    </>
  );
}

export default Homepage