import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import Haeding from '../components/Haeding';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatPrice } from '@/utils/formatPrice';
import CheckoutClient from '../checkout/CheckoutClient';

const CartClient = () => {
  const router = useRouter();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  if (checkoutClicked) {
    return <CheckoutClient />;
  }

  if (!cartProducts || cartProducts.length === 0) {
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
    <div className=" flex flex-col md:flex-row gap-2 justify-between w-full ">
      <div className="bg-white lg:w-[80%] p-4 w-full  ">
        <Haeding title="Shopping Cart" center />
        <div className=" grid grid-cols-5 text-xs gap-4 p-2 items-center mt-8">
          <div className=" col-span-2 justify-start">PRODUCT</div>
          <div className=" justify-center">PRICE</div>
          <div className=" justify-center">QUANTITY</div>
          <div className=" justify-end">TOTAL</div>
        </div>
        <div className=" border-b-2 mb-2 border-slate-200">
          {cartProducts &&
            cartProducts.map((item) => {
              return <ItemContent key={item.id} item={item} />;
            })}
        </div>
        <div className=" w-[100px]">
          <Button
            label=" Clear Cart"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
      </div>
      <div className=" border-t-[1.5px] border-slate-200 py-4 flex  items-center justify-center gap-4 bg-white p-3 ">
        <div className=" text-sm flex flex-col gap-1 items-start  ">
          <div className=" flex justify-between w-full text-base font-semibold  ">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className=" text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          <Button
            label="checkout"
            onClick={() => {
              setCheckoutClicked(true);
            }}
          />
          <Link
            href={'/'}
            className=" text-slate-500 flex items-center gap-1 mt-2 "
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
