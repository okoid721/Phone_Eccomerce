import React from 'react';

import getproduct from '@/actions/getProduct';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';
import ManageproductClient from './ManageProuctClient';
import Containers from '@/app/components/Containers';

const Manageproduct = async () => {
  const product = await getproduct({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="p-8 bg-white text-[#0F1111] select-none ">
      <Containers>
        <ManageproductClient product={product} />
      </Containers>
    </div>
  );
};

export default Manageproduct;
