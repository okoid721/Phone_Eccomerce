'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';
import { useCart } from '../hooks/useCart';
import { useRouter } from 'next/navigation';

const Paystack = () => {
  const publicKey = 'pk_test_cbdbef83d1ee1286e06785b2dc77986078a65123'; // Ensure there are no extra spaces
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { cartTotalAmount } = useCart();
  const router = useRouter();

  // Validate amount and convert to smallest currency unit
  const calculateAmount = (amount: number | null) => {
    if (amount && !isNaN(amount)) {
      return Math.round(amount * 100);
    }
    return 0;
  };

  const componentProps = {
    email,
    amount: calculateAmount(cartTotalAmount), // Use calculated amount
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => {
      toast.success('payment successful');
      router.push('/cart');
      router.refresh();
      toast.success('Back to cart');
    },
    onClose: () => toast.error('payment failed'), // Corrected property name
  };

  return (
    <div>
      <div className="w-full">
        <div className=" bg-white  h-full mx-auto items-center justify-center ">
          <form className=" flex flex-col items-center justify-center w-full  gap-[10px] ">
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className=" w-full p-2 border-[1px] "
            />

            <input
              type="email"
              placeholder=" Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full p-2 border-[1px] "
            />
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className=" w-full p-2 border-[1px] "
            />

            <input
              type="number"
              placeholder="Amount (in Naira)"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              className=" w-full p-2 border-[1px] "
            />
          </form>
          <PaystackButton
            {...componentProps}
            className="w-full text-center border-[1px] mt-2 p-2 bg-green-500 "
          />
        </div>
      </div>
    </div>
  );
};

export default Paystack;
