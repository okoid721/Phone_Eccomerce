'use client';
import { useCart } from '../hooks/useCart';

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  return <div></div>;
};

export default CheckoutClient;
