import React from 'react';
import './componentCss/Pricing.css';
import { FaCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Pricing() {
  const prices = [
    {
      id: 1,
      title: 'Pro',
      price: '$9.99 / month',
      btn: 'Go Pro',
      points: [
        'Unlimited flashcards',
        'Learn words in context',
        'Practice pronunciation',
        'Access to all games',
        'No ads',
        'Downloadable word list',
      ],
    },
    {
      id: 2,
      title: 'Lifetime',
      price: '$199.99 / one-time purchase',
      btn: 'Unlock Lifetime',
      points: [
        'All Pro features for life',
        'Unlimited user accounts',
        'Unlimited word lists',
      ],
    },
    {
      id: 3,
      title: 'Family',
      price: '$19.99 / month',
      btn: 'Get Family',
      points: [
        'All Pro features for up to 5 users',
        'Progress tracking and shared lists',
        'Customizable practice sessions',
      ],
    },
  ];

  return (
    <div className="price-cards">
      <h1 className="pricing-title">Choose Your Plan</h1>
      <div className="price-cards-wrapper">
        {prices.map((price, index) => (
          <div
            className={`price-card ${index === 1 ? 'featured' : ''}`}
            key={price.id}
          >
            <span className="price-card-title">{price.title}</span>
            <span className="price-card-price">
              <span className="price-amount">{price.price.split(' ')[0]}</span>
              <span className="price-duration">
                {' '}{price.price.split(' ').slice(1).join(' ')}
              </span>
            </span>

            <ul className="prices-ul">
              {price.points.map((point, i) => (
                <li className="prices-li" key={i}>
                  <FaCheck className="check-icon" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="price-card-btn-wrapper">
              <Link
                to="/subscription"
                state={{ selectedPlan: price.title, price: price.price }}
              >
                <button className={`price-card-btn ${index === 1 ? 'btn-light' : ''}`}>
                  {price.btn}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;