'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';

const Paystack = () => {
  const publicKey = 'pk_live_b362b66abe1bf71f85ee09eb67637af693c2888a'; // Ensure there are no extra spaces
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Validate amount and convert to smallest currency unit
  const calculateAmount = (amount: string | number) => {
    if (amount && !isNaN(amount)) {
      return Math.round(amount * 100);
    }
    return 0;
  };

  const componentProps = {
    email,
    amount: calculateAmount(amount), // Use calculated amount
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => toast.success('payment successful'),
    onClose: () => toast.error('payment failed'), // Corrected property name
  };

  return (
    <div>
      <div className="w-full">
        <div className=" bg-white w-full h-full mx-auto items-center justify-center ">
          <form className=" flex flex-col items-center justify-center ">
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className=" w-full p-2 border-[1px]   "
            />

            <input
              type="email"
              placeholder=" Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-2 border-[1px]   "
            />

            <input
              type="text"
              placeholder="Phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className=" w-full p-2 border-[1px]   "
            />

            <input
              type="number"
              placeholder="Amount (in Naira)"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              className=" w-full p-2 border-[1px]   "
            />
          </form>
          <PaystackButton {...componentProps} />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
