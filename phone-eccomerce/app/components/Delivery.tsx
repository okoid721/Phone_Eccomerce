import React from 'react';
import { MdDeliveryDining } from 'react-icons/md';
import { RiRefund2Line } from 'react-icons/ri';
import { AiOutlineFileProtect } from 'react-icons/ai';

const Delivery = () => {
  return (
    <div>
      <h1 className=" font-semi-bold text-black border-b p-2">
        Delivery & Return
      </h1>
      <div className="  border-b p-2  text-black ">
        <h1 className="font-semi-bold text-black flex flex-row items-center gap-1 ">
          {' '}
          <MdDeliveryDining size={20} /> Delivery{' '}
        </h1>
        <p className=" text-[10px] text-slate-400 mt-1 ">
          Estimated delivery time 1-9 business days
        </p>
        <h3 className=" text-sm text-slate-600 font-semibold mt-2 ">
          Express Delivery Available
        </h3>
        <p className=" text-[9px] text-slate-400 mt-2 ">
          Same day delivery: Order before 11AM and get it today
        </p>
        <p className=" text-[9px] text-slate-400 mt-2 ">
          Next day delivery: Order after 11AM and get it tomorrow
        </p>
        <p className=" text-[9px] text-slate-400 mt-2 ">
          Note: Subject to availability in your location
        </p>
      </div>
      <div className="  border-b p-2  text-black ">
        <h1 className=" flex flex-row items-center mt-2 gap-2">
          <RiRefund2Line size={20} /> Refund Policy
        </h1>
        <h1 className=" text-xl font-bold text-slate-700">
          7 Day Return Guarantee
        </h1>
        <p className=" text-slate-500 text-[10px] mt-2">
          For more information on the return shipping options, go to Kings
          Return Policy
        </p>
      </div>
      <div>
        <h1 className="  flex flex-row items-center mt-2 gap-2">
          {' '}
          <AiOutlineFileProtect size={20} /> Warranty
        </h1>
      </div>
    </div>
  );
};

export default Delivery;
