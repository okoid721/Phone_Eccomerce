/* eslint-disable react-hooks/rules-of-hooks */
import useClient from 'next/client';
import { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import prisma from '@/libs/prismadb';
import { useRouter } from 'next/navigation';

type Props = {
  amount: number;
  email: string;
  onPaymentSuccess: () => void;
  onPaymentClose: () => void;
};

const Paystack = ({
  amount,
  email,
  onPaymentSuccess,
  onPaymentClose,
}: Props) => {
  const router = useRouter();

  const [reference, setReference] = useState('');

  const handlePaymentSuccess = async (paymentReference: string) => {
    try {
      const response = await axios.post('/api/paystack/verify-payment', {
        reference: paymentReference,
      });

      if (response.data.status === 'success') {
        onPaymentSuccess();
      } else {
        onPaymentClose();
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      onPaymentClose();
    }
  };

  const handlePaymentClose = () => {
    onPaymentClose();
  };

  const config = {
    reference,
    email,
    amount: Math.round(amount * 100), // Convert amount to the smallest currency unit (kobo)
    publicKey: process.env.PAYSTACK_PUBLIC_KEY as string,
    text: 'Pay Now',
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
  };

  return (
    <div className=" w-full bg-green-500">
      <PaystackButton {...config} />
    </div>
  );
};

export default Paystack;
