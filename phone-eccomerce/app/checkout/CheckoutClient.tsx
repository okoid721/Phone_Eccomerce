'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useCart } from '../hooks/useCart';
import { PaystackButton } from 'react-paystack';
import Paystack from '../components/PaystackButton';

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
  }, [cartProducts, paymentIntent]);

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="">
      <Paystack
        amount={0}
        email={''}
        onSuccess={function (): void {
          throw new Error('Function not implemented.');
        }}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default CheckoutClient;
