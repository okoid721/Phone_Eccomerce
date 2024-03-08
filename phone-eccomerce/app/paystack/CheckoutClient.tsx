/* eslint-disable react/jsx-no-undef */
'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import PaystackCheckout from './PaystackCheckout';
import Button from '../components/Button';
import axios from 'axios';

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  console.log('paymentIntent', paymentIntent);
  console.log('clientSecret', clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      axios
        .post('/api/create-payment-intent', { status, currency: 'NGN' })
        .then(() => {
          toast.success('Product created');
          setPaymentSuccess(true);
          router.refresh();
        })
        .catch((error) => {
          toast.error('Something went wrong saving the product to the db');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="">
      {cartProducts && (
        <PaystackCheckout
          cartProducts={cartProducts}
          paymentSuccess={paymentSuccess}
          handleSetPaymentSuccess={handleSetPaymentSuccess}
          onPaymentSuccess={handleSetPaymentSuccess}
          onPaymentClose={() => setPaymentSuccess(false)}
        />
      )}
      {loading && <div className="text-center">Loading Checkout....</div>}
      {paymentSuccess && (
        <div className=" flex items-center flex-col gap-4">
          <div className=" text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full ">
            <Button
              label="View Your Order"
              onClick={() => router.push('/order')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
