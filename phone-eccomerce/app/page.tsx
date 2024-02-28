/* eslint-disable react/jsx-key */
import { products } from '@/utils/products';
import Containers from './components/Containers';
import HomeBanner from './components/HomeBanner';
import { truncate } from 'fs';
import { truncateText } from '@/utils/truncateText';
import ProductCard from './components/products/ProductCard';

export default function Home() {
  return (
    <div className=" p-8">
      <Containers>
        <div>
          <HomeBanner />
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => {
            return (
              <div key={product.id}>
                {' '}
                <ProductCard data={product} />{' '}
              </div>
            );
          })}
        </div>
      </Containers>
    </div>
  );
}
