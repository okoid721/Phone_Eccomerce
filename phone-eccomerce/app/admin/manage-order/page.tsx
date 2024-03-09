import React from 'react';
import ManageOrdersClient from './ManageOrdersClient';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import getOrders from '@/actions/getOrders';
import Containers from '@/app/components/Containers';

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="p-8 bg-white text-[#0F1111] select-none ">
      <Containers>
        <ManageOrdersClient orders={orders} />
      </Containers>
    </div>
  );
};

export default ManageOrders;
