'use client';
import Button from '@/app/components/Button';
import Delivery from '@/app/components/Delivery';
import SetColor from '@/app/components/products/SetColor';
import SetQuantity from '@/app/components/products/SetQuantity';
import { Rating } from '@mui/material';
import React, { useCallback, useState } from 'react';

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 0,
    price: product.price,
  });

  console.log(cartProduct);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return {
          ...prev,
          selectedImg: value,
        };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="  flex flex-col md:flex-row mx-auto  justify-between gap-3 pb-5">
      <div className=" bg-white shadow-smooth border-[10px] p-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:w-[80%] ">
        <div>Images</div>
        <div className=" flex flex-col gap-1 text-slate-500 text-sm">
          <h2 className=" text-3xl font-medium text-slate-700">
            {product?.name}
          </h2>
          <div className=" flex items-center gap-2">
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <Horizontal />
          <div className=" text-justify">{product.description}</div>
          <Horizontal />
          <div>
            <span className=" font-semibold">CATEGORY: </span>
            {product.category}
          </div>
          <div>
            <span className=" font-semibold">Brand: </span>
            {product.brand}
          </div>
          <div className={product.inStock ? 'text-teal-400' : 'text-red-600'}>
            {product.inStock ? 'InStock' : 'Out Of Stock'}{' '}
          </div>
          <Horizontal />
          <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
          />
          <Horizontal />
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />
          <Horizontal />
          <div className=" max-w-32">
            <Button label="Add To Cart" onClick={() => {}} />
          </div>
        </div>
      </div>
      <div className=" h-fit w-[325px] p-[15px]  bg-white shadow-smooth ">
        <Delivery />
      </div>
    </div>
  );
};

export default ProductDetails;
