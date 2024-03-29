'use client';
import React, { useEffect, useState } from 'react';

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import toast from 'react-hot-toast';

import Button from '../components/Button';
import { formatPrice } from '@/utils/formatPrice';
import Haeding from '../components/Haeding';
import { useCart } from '../hooks/useCart';

interface CheckOutFormProps {
  clientSecret: string;
  handlesetPaymentSuccess: (value: boolean) => void;
}
const CheckOutForm: React.FC<CheckOutFormProps> = ({
  clientSecret,
  handlesetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handlesetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Chekout Success');

          handleClearCart();
          handlesetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6 ">
          <Haeding title="Enter your details to complete checkout" />
        </div>
        <h2 className=" font-semibold mb-2">Address Information</h2>
        <AddressElement
          options={{
            mode: 'shipping',
          }}
        />
        <h2 className=" font-semibold mt-4 mb-2">Payment Information</h2>

        <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
        <div className="py-4 text-center text-slate-700 text-4xl font-bold">
          Total: {formattedPrice}
        </div>
        <Button
          label={loading ? 'Processing...' : 'Pay now!'}
          disabled={loading || !stripe || !elements}
          onClick={() => {}}
        />
      </form>
    </>
  );
};

export default CheckOutForm;
