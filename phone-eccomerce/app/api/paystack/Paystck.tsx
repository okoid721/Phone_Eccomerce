import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';

const Paystck = () => {
  const publicKey = 'pk_live_b362b66abe1bf71f85ee09eb67637af693c2888a ';
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => toast.success('payment successful'),
    onclose: () => toast.error('payment failed'),
  };

  return (
    <div>
      <div className=" flex justify-center items-center h-screen w-full">
        <div className="checkout-form">
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default Paystck;
