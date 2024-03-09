import Containers from '@/app/components/Containers';
import ProductDetails from './ProductDetails';
import ListRating from './ListRating';
import { product } from '@/utils/product';

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  console.log('params', params);

  const product = product.find((item) => item.id === params.productId);

  return (
    <div className=" p-0 pt-5">
      <Containers>
        <ProductDetails product={product} />
        <div className=" flex flex-col mt-20 gap-4">
          <div>Add Product Rating</div>
          <ListRating product={product} />
        </div>
      </Containers>
    </div>
  );
};

export default Product;
