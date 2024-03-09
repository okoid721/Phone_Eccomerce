import React from 'react';
import FormWrap from '../components/FormWrap';
import CheckoutClient from './CheckoutClient';
import Containers from '../components/Containers';

const Checkout = () => {
  return (
    <>
      <div className="text-[#0F1111] select-none pt-8 bg-white">
        <Containers>
          <FormWrap>
            <CheckoutClient />
          </FormWrap>
        </Containers>
      </div>
    </>
  );
};

export default Checkout;
