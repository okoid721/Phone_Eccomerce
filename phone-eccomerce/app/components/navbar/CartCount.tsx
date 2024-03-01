'use client';

import { useCart } from '@/app/hooks/useCart';
//import { Router } from 'next/router'
import { useRouter } from 'next/navigation';
import { GiShoppingCart } from 'react-icons/gi';
import React from 'react';

const CartCount = () => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className=" relative cursor-pointer"
      onClick={() => router.push('/cart')}
    >
      <div className=" text-3xl flex flex-row items-center">
        <GiShoppingCart />
        <p className=" text-[20px] text-slate-700 font-semibold">Cart</p>
      </div>
      <span className=" absolute top-[-6px] right-[40px] bg-slate-700 text-white h-4 w-4 rounded-full flex items-center justify-center text-[10px] ">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
