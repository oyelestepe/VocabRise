import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../style/SubscriptionPage.css';

const SubscriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      console.error('No state data found. Redirecting to pricing page...');
      navigate('/');
    }
  }, [location.state, navigate]);

  const { selectedPlan = 'Pro', price = '$9.99 / month' } = location.state || {};
  console.log('Location State:', location.state);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Kart numarasını formatlama ve doğrulama
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1-');
    setCardNumber(formatted);

    if (value.length !== 16 || !isValidCardNumber(value)) {
      setErrors((prev) => ({ ...prev, cardNumber: 'Invalid card number.' }));
    } else {
      setErrors((prev) => ({ ...prev, cardNumber: '' }));
    }
  };

  // Son kullanma tarihini formatlama ve doğrulama
  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
    setExpiryDate(formatted);

    const [month, year] = formatted.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (!month || !year || month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
      setErrors((prev) => ({ ...prev, expiryDate: 'Invalid expiry date.' }));
    } else {
      setErrors((prev) => ({ ...prev, expiryDate: '' }));
    }
  };

  // CVV doğrulama
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);

    if (value.length !== 3) {
      setErrors((prev) => ({ ...prev, cvv: 'CVV must be 3 digits.' }));
    } else {
      setErrors((prev) => ({ ...prev, cvv: '' }));
    }
  };

  // Luhn algoritması ile kart numarası doğrulama
  const isValidCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\D/g, '');
    let sum = 0;
    for (let i = 0; i < cleaned.length; i++) {
      let digit = parseInt(cleaned[i], 10);
      if ((cleaned.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // Ödeme işlemi simülasyonu
  const handlePayment = async () => {
    const newErrors = {};
    if (!isValidCardNumber(cardNumber)) newErrors.cardNumber = 'Invalid card number.';
    if (cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits.';
    if (errors.expiryDate) newErrors.expiryDate = 'Invalid expiry date.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Payment failed. Please check the details.');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        console.log('Updating subscription data in Firestore...');
        console.log('Selected Plan:', selectedPlan);
        console.log('Price:', price);

        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          subscriptionPlan: selectedPlan,
          subscriptionPrice: price,
          subscriptionStatus: 'active',
        });

        console.log('Subscription data successfully updated in Firestore.');
        toast.success('Payment successful!');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating subscription data in Firestore:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment for {selectedPlan} Plan</h1>
      <p>Price: {price}</p>

      <div>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234-5678-9012-3456"
          />
          {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
        </label>
      </div>

      <div>
        <label>
          Expiry Date (MM/YY):
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
        </label>
      </div>

      <div>
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
          />
          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
        </label>
      </div>

      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Confirm Payment'}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SubscriptionPage;