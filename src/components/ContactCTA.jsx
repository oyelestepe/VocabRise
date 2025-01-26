import React from 'react';

function ContactCTA({ backgroundColor = '#111'}) {
  return (
    <div className='getin-touch' style={{ backgroundColor }}>
      <div className='text'>
        <p>GET IN TOUCH</p>
        <h4>We're here to help you succeed!</h4>
      </div>
      <button>GET IN TOUCH</button>
    </div>
  );
}

export default ContactCTA;