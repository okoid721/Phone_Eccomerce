'use client';
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Haeding from '../components/Haeding';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utils/formatPrice';
import { SafeUser } from '@/types';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
// import CheckoutClient from '../checkout/CheckoutClient';

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const { cartproduct, handleClearCart, cartTotalAmount } = useCart();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  if (!cartproduct || cartproduct.length === 0) {
    return (
      <div className=" flex flex-col items-center">
        <div className=" text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={'/'}
            className=" text-slate-500 flex items-center gap-1 mt-2 "
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E6E6E6] ">
      <Haeding title="Shopping Cart" />

      {/* <div className="bg-[#F89F24] w-fit p-4 my-5 rounded-lg h-fit"> */}
      <Link
        href={'/'}
        className="bg-[#131921] w-fit p-2 my-5 rounded-lg h-fit flex items-center text-white gap-1"
      >
        <FaRegArrowAltCircleLeft />
        <span className="text-[12px]">Continue Shopping</span>
      </Link>
      {/* </div> */}

      <div className="lg:flex block gap-4">
        <div className="w-[100%] lg:w-[90%] bg-[#FFFFFF] p-5">
          <div className="grid grid-cols-5 text-xs gap-4  items-center bg-white p-5 font-semibold">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className=" justify-self-center">PRICE</div>
            <div className=" justify-self-center">qauntity</div>
            <div className="justify-self-end">TOTAL</div>
          </div>

          <div>
            {cartproduct &&
              cartproduct.map((item) => {
                return <ItemContent key={item.id} item={item} />;
              })}
          </div>
        </div>

        <div className=" p-4 pb-0 bg-white flex flex-col justify-between gap-4 h-fit lg:mt-0 mt-5">
          <div className="text-sm flex flex-col gap-1 py-5">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>We accept:</span>
              <img
                src="./mastercard.png"
                className="w-[30px]"
                alt="mastercard"
              />
              <img src="./visa.png" className="w-[30px]" alt="mastercard" />
              <img
                src="./banktransfer.png"
                className="w-[30px]"
                alt="mastercard"
              />
            </div>

            <div className=" text-[12px] flex items-center gap-1">
              <RiSecurePaymentLine className="text-[#F89F24] text-[25px]" />
              <p className="text-[#878282] w-[250px]">
                Transactions are 100% Safe and Secure
              </p>
            </div>
            <Button
              label={currentUser ? 'Continue to Checkout' : 'Login to Checkout'}
              outline={currentUser ? false : true}
              onClick={() => {
                currentUser ? router.push('/paystack') : router.push('/login');
              }}
            />

            <div className="w-[90px] mt-5">
              <Button
                label="Clear Cart"
                onClick={() => {
                  handleClearCart();
                }}
                small
                outline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
