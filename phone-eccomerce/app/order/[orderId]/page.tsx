import React from 'react';
import OrderDetails from './OrderDetails';
import getOrderById from '@/actions/getOrderById';
import NullData from '@/app/components/NullData';
import Containers from '@/app/components/Containers';

interface IPrams {
  orderId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
  console.log('params', params);
  const order = await getOrderById(params);

  if (!order) return <NullData title="No order"></NullData>;
  return (
    <div className="text-[#0F1111] select-none pt-8">
      <Containers>
        <OrderDetails order={order} />
      </Containers>
    </div>
  );
};

export default Order;
