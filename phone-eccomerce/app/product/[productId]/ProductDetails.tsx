'use client';
import Button from '@/app/components/Button';
import Delivery from '@/app/components/Delivery';
import { Rating } from '@mui/material';
import { useCart } from '@/app/hooks/useCart';
import React, { useCallback, useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import SetColor from '@/app/components/products/SetColor';
import SetQauntity from '@/app/components/products/SetQuantity';
import ProductImage from '@/app/components/products/ProductImage';

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
  qauntity: number;
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
  const { handleAddProductToCart, cartproduct } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    qauntity: 0,
    price: product.price,
  });

  const router = useRouter();

  console.log(cartproduct);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartproduct) {
      const existingIndex = cartproduct.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartproduct]);

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
    if (cartProduct.qauntity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, qauntity: prev.qauntity + 1 };
    });
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.qauntity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, qauntity: prev.qauntity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="  flex flex-col lg:flex-row mx-auto  justify-between gap-3 pb-5">
      <div className=" bg-white shadow-smooth border-[10px] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:w-[80%] ">
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
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
          {isProductInCart ? (
            <>
              <p className=" mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle size={20} className=" text-teal-100" />
                <span>Product Added success</span>
              </p>
              <div className=" max-w-[300px]">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push('/cart');
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
              <Horizontal />
              <SetQauntity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div className=" max-w-32">
                <Button
                  label="Add To Cart"
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" h-fit w-full lg:w-[325px] p-[15px]  bg-white shadow-smooth ">
        <Delivery />
      </div>
    </div>
  );
};

export default ProductDetails;
