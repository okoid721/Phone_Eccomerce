import React, { useState } from 'react';
import Script from 'next/script';
import { handlePayment } from './paystackInterface';

const FormControl = () => {
  const [data, setData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment(data.email, parseFloat(data.amount));
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" />
      <div>
        <h3>Pay with Paystack</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
            <br />
          </div>
          <div>
            <label htmlFor="amount">Amount: </label>
            <input
              type="text"
              id="amount"
              name="amount"
              required
              onChange={handleChange}
            />
            <br />
          </div>

          <button type="submit">Make Payment</button>
        </form>
      </div>
    </>
  );
};

export default FormControl;
