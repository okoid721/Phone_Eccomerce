import Containers from '@/app/components/Containers';
import { product } from '@/utils/product';
import ProductDetails from './ProductDetails';
import ListRating from './ListRating';

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  console.log('params', params);

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
