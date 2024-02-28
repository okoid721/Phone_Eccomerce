import React from 'react';
import { MdDeliveryDining } from 'react-icons/md';

const Delivery = () => {
  return (
    <div>
      <h1 className=" font-semi-bold text-black border-b p-2">
        Delivery & Return
      </h1>
      <div className="  border-b p-2">
        <h1 className="font-semi-bold text-black flex flex-row items-center gap-1 ">
          {' '}
          <MdDeliveryDining /> Delivery{' '}
        </h1>
      </div>
    </div>
  );
};

export default Delivery;
