'use client';
import React from 'react';
import { CartProductType } from '../product/[productId]/ProductDetails';
import { formatPrice } from '@/utils/formatPrice';
interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  return (
    <div className=" grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center ">
      <div>{formatPrice(item.price)}</div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ItemContent;
