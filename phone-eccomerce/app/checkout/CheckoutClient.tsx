'use client';
import { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';

const Paystack = ({ email, amount, publicKey, onSuccess, onClose }) => {
  const componentProps = {
    email,
    amount,
    publicKey,
    text: 'Pay Now',
    onSuccess,
    onClose,
  };

  return <PaystackButton {...componentProps} />;
};

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paystackEmail, setPaystackEmail] = useState('');
  const [paystackAmount, setPaystackAmount] = useState(0);
  const router = useRouter();

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
          setClientSecret(data.transaction.reference);
          handleSetPaymentIntent(data.transaction.reference);
          setPaystackAmount(data.transaction.amount);
          setPaystackEmail(data.transaction.email);
        })
        .catch((error) => {
          setError(true);
          console.log('Error', error);
          toast.error('something went wrong');
        });
    }
  }, [cartProducts, paymentIntent]);

  const publicKey = 'pk_test_cbdbef83d1ee1286e06785b2dc77986078a65123';

  return (
    <>
      <div>
        {clientSecret && (
          <Paystack
            email={paystackEmail}
            amount={paystackAmount}
            publicKey={publicKey}
            onSuccess={() => toast.success('payment successful')}
            onClose={() => toast.error('payment failed')}
          />
        )}
      </div>
    </>
  );
};

export default CheckoutClient;
