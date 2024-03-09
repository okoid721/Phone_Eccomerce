'use Client';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import React from 'react';

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyle = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQauntity: React.FC<SetQtyProps> = ({
  cartProduct,
  cartCounter,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className=" flex gap-8 items-center ">
      {cartCounter ? null : <div className=" font-semibold">qauntity</div>}
      <div className=" flex gap-4 items-center text-base ">
        <button onClick={handleQtyDecrease} className={btnStyle}>
          -
        </button>
        <div>{cartProduct.qauntity}</div>
        <button onClick={handleQtyIncrease} className={btnStyle}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQauntity;
