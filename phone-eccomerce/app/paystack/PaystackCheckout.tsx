'use client';
import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { formatPrice } from '@/utils/formatPrice';
import { useCart } from '../hooks/useCart';
import Input from '../components/inputs/Input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const PaystackCheckout = ({
  paymentSuccess,
  handleSetPaymentSuccess,
}: {
  paymentSuccess: boolean;
  handleSetPaymentSuccess: (value: boolean) => void;
}) => {
  const publicKey = 'pk_test_cbdbef83d1ee1286e06785b2dc77986078a65123';
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { cartproduct, handleClearCart, cartTotalAmount: amount } = useCart();
  const router = useRouter();

  const handlePaymentSuccess = () => {
    toast.success(`Your purchase was successful! `);
    resetForm();
    handleClearCart();
    handleSetPaymentSuccess(true);
  };

  const handlePaymentClose = () => {
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can add any form validation logic here

    // Call the Paystack payment API

    axios
      .post('/api/create-payment-intent', { amount, status, currency: 'NGN' })
      .then(() => {
        toast.success('Product created');
        handlePaymentSuccess();
        router.refresh();
      })
      .catch((error) => {
        toast.error('Something went wrong saving the product to the db');
      })
      .finally(() => {
        handlePaymentClose();
      });
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setPhone('');
  };

  return (
    <div>
      <div>
        <div>
          <div className=" flex gap-2 flex-col">
            <div className=" w-full relative ">
              <label className="absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
              />
            </div>
            <div className=" w-full relative ">
              <label className="absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
              />
            </div>
            <div className="w-full relative ">
              <label className=" absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
              />
            </div>
            <PaystackButton
              publicKey={publicKey}
              text="Pay Now"
              className="bg-[#333] p-3 text-white rounded-md "
              amount={Math.round(amount * 100)} // Convert amount to the smallest currency unit (kobo)
              email={email}
              onSuccess={handlePaymentSuccess}
              onClose={handlePaymentClose}
            />
          </div>
        </div>
        <div className="">
          <p className="text-3xl font-bold text-black">{formatPrice(amount)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaystackCheckout;
function createPayment(
  paymentId: any
): { data: any } | PromiseLike<{ data: any }> {
  throw new Error('Function not implemented.');
}
function setReference(reference: any) {
  throw new Error('Function not implemented.');
}
