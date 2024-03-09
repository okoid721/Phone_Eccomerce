'use client';

import Status from '@/app/components/Status';

import { Order } from '@prisma/client';
import moment from 'moment';
import React from 'react';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import OrderItem from './OrderItem';
import Haeding from '@/app/components/Haeding';
import { formatPrice } from '@/utils/formatPrice';
interface OrderDetailsProps {
  order: Order;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <>
      <div className=" max-w-[1150px] m-auto flex flex-col gap-2">
        <div className=" mt-8">
          <Haeding title="Order Details" />
        </div>
        <div>Order ID: {order.id}</div>
        <div>
          Total Amount:{' '}
          <span className=" font-bold ">{formatPrice(order.amount / 100)}</span>
        </div>
        <div className="flex gap-2 items-center">
          <div>Payment status:</div>
          <div>
            {order.status === 'pending' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : order.status === 'complete' ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>Delivery status:</div>
          <div>
            {order.deliveryStatus === 'pending' ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : order.deliveryStatus === 'delivered' ? (
              <Status
                text="delivered"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>Date: {moment(order.createdDate).fromNow()}</div>
        <div>
          <h2 className=" font-semibold mt-4 mb-2">product ordered</h2>
          <div className="grid grid-cols-5 text-xs gap-4 p-3 items-center bg-white">
            <div className="col-span-2 justify-self-start">PRODUCT</div>
            <div className="justify-self-center">PRICE</div>
            <div className="justify-self-center">QTY</div>
            <div className="justify-self-end">TOTAL</div>
          </div>

          <div className="bg-white">
            {order.products &&
              order.products.map((item) => {
                return (
                  <>
                    <OrderItem key={item.id} item={item}></OrderItem>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
