import React from 'react'
import Navbar from '../components/Navbar'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'
function Testimonials() {
    const reviews = [
        {id:1, img:'review1.jpg', name:'Brandon Vega', title:'Freelancer', comment:"VocabRise has transformed my English learning experience. The platform's interactive quizzes and progress tracking features have made it easier for me to remember new words and use them in everyday conversations. I can see my vocabulary growing day by day, and I feel more confident speaking English now. Thanks to VocabRise, I am not just learning words; I am truly understanding how to use them effectively."},
        {id:2, img:'review2.jpg', name:'Chris Wei', title:'Tech Innovations', comment:"As a busy professional, I needed a flexible way to improve my English vocabulary. VocabRise's user-friendly platform allowed me to learn at my own pace. The quizzes are engaging and challenge me to apply what I've learned. I've noticed a significant improvement in my language skills, which has boosted my confidence during meetings with international clients. I'm grateful for this invaluable tool."},
        {id:3, img:'review3.jpg', name:'Karen Weiss', title:'Student', comment:"I was struggling to expand my English vocabulary until I discovered VocabRise. The platform's structured approach to learning and the variety of quizzes have kept me motivated. I appreciate how it tracks my progress, allowing me to see the areas I need to improve. My ability to communicate in English has greatly improved, and I feel more prepared for my studies abroad. VocabRise is a game-changer!"},
    ]
  return (
    <div>
        <Navbar/>
        <div className='testimonial-hero'>
            <h2>Real success stories</h2>
            <p>See how VocabRise transforms lives</p>
        </div>
        <div className='reviews-wrapper'>
            <span>WHAT USERS SAY</span>
            <h3>Discover how VocabRise transforms vocabulary learning.</h3>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'30px',}}>
            { reviews.map((review)=>(
                <div className='reviews' key={review.id}>
                    <img src={review.img} className='reviews-img'/>
                    <h4 className='reviews-name'>{review.name}</h4>
                    <h5 className='reviews-title'>{review.title}</h5>
                    <p className='reviews-comment'>{review.comment}</p>
                </div>
            ))
            }
            </div>
        </div>
        <ContactCTA/>
        <Footer/>
    </div>
  )
}

export default Testimonials