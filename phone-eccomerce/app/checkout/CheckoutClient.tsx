import React, { useEffect, useState } from 'react';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/navigation';

const Paystack = ({ email, amount, publicKey, charge, onSuccess }) => {
  return (
    <PaystackButton
      email={email}
      amount={amount}
      publicKey={publicKey}
      text="Pay Now" // You can customize the button text here
      metadata={{
        custom_fields: [
          {
            display_name: 'Email',
            variable_name: 'email',
            value: email,
          },
        ],
      }}
      channels={['card', 'bank']} // You can specify the payment channels here
      onSuccess={onSuccess}
      onClose={() => toast.error('Payment canceled')}
    />
  );
};

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paystackEmail, setPaystackEmail] = useState('');
  const [paystackAmount, setPaystackAmount] = useState(0);
  const router = useRouter();

  const publicKey = 'pk_live_b362b66abe1bf71f85ee09eb67637af693c2888a '; // Replace with your Paystack public key

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      // Fetch client secret and other necessary data for Paystack integration
      // You'll need to implement this logic according to your server-side setup
    }
  }, [cartProducts, paymentIntent]);

  return (
    <>
      <div>
        {clientSecret && (
          <Paystack
            email={paystackEmail}
            amount={paystackAmount}
            publicKey={publicKey}
            charge={{
              email: paystackEmail,
              amount: paystackAmount,
            }}
            onSuccess={() => {
              // Handle success event, e.g., redirect to thank you page
              router.push('/thank-you');
            }}
          />
        )}
      </div>
    </>
  );
};

export default CheckoutClient;
