import Containers from '@/app/components/Containers';
import { product } from '@/utils/product';
import ProductDetails from './ProductDetails';

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  console.log('params', params);

  return (
    <div className=" p-0 pt-5">
      <Containers>
        <ProductDetails product={product} />
      </Containers>
    </div>
  );
};

export default Product;
