/* eslint-disable react/jsx-no-undef */
'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import PaystackCheckout from './PaystackCheckout';

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

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push('/login');
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log('Error', error);
          toast.error('Something went wrong');
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
      {error && (
        <div className="text-center text-red-500">Something went wrong</div>
      )}
    </div>
  );
};

export default CheckoutClient;
