import React from 'react'
import { FaCheck } from "react-icons/fa6";

function Pricing() {
    const prices = [{id:1, title:'Pro', price:'$9.99 / month',btn:'Go Pro', points:['Unlimited flashcards','Learn words in context','Practice pronunciation','Access to all games','No ads','Downloadable word list']},
                    {id:2, title:'Family', price:'$11.99 / month',btn:'Get Family', points:['All Pro features for up to 5 users','Progress tracking and shared lists','Customizable practice sessions']},
                    {id:3, title:'Lifetime', price:'$199.99 / one time purchase', btn: 'Unlock Lifetime', points:['All Pro features for life','Unlimited user accounts','Unlimited word lists']}
]
  return (
    <div className='price-cards'>
        <div className='price-cards-wrapper'>
            {
                prices.map((price)=>(
                    <div className='price-card' key={price.id}>
                    <span className='price-card-title'>{price.title}</span>
                    <span className='price-card-price'>{price.price}</span>
                    <button className='price-card-btn'>{price.btn}</button>
                    <ul className="prices-ul">
                    {price.points.map((point, index) => (
                        <li className="prices-li" key={index}>
                        <FaCheck style={{marginRight:'5px', fontSize:'20px', color:'#47812d'}}/>
                        {point}
                        </li>
                    ))}
                    </ul>
                    </div>
                ))
            }
        </div>
       
    </div>
  )
}

export default Pricing