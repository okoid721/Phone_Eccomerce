/* eslint-disable react/jsx-key */
'use client';

import {
  CartProductType,
  SelectedImgType,
} from '@/app/product/[productId]/ProductDetails';

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className=" flex gap-4 items-center">
        <span className=" font-semibold">Color:</span>
        <div>
          {images.map((image) => {
            return (
              <div
                className={` h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                  cartProduct.selectedImg.color === image.color
                    ? 'border-[1.5px]'
                    : 'border-none'
                } `}
              >
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
