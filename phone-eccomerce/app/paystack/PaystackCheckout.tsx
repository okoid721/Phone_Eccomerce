// 'use client';
// import React, { useState } from 'react';
// import { PaystackButton } from 'react-paystack';
// import { formatPrice } from '@/utils/formatPrice';
// import { useCart } from '../hooks/useCart';
// import Input from '../components/inputs/Input';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import prisma from '@/libs/prismadb';

// const PaystackCheckout = () => {
//   const publicKey = 'pk_test_cbdbef83d1ee1286e06785b2dc77986078a65123';
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const { cartProducts, handleClearCart, cartTotalAmount: amount } = useCart();

//   const resetForm = () => {
//     setEmail('');
//     setName('');
//     setPhone('');
//   };
//   const router = useRouter();

//   const componentProps = {
//     email,
//     amount: (amount * 100).toFixed(0),
//     metadata: {
//       name,
//       phone,
//     },
//     publicKey,
//     text: 'Buy Now',
//     onSuccess: () => {
//       toast.success(`Your purchase was successful! `);
//       resetForm();
//       handleClearCart();
//       router.push('/');
//     },
//     onClose: () => {},
//   };
//   const handlePayment = async (paymentId: any) => {
//     const order = await createPayment(paymentId);
//     if (order) {
//       // handle success
//       await prisma.payment.create({
//         data: {
//           userId: 'user_id', // get the user id from the session
//           amount: amount,
//           currency: 'NGN',
//           status: 'success',
//           paymentMethod: 'Paystack',
//           email,
//           name,
//           phone,
//           paystackId: paymentId,
//         },
//       });
//     } else {
//       // handle failure
//       await prisma.payment.create({
//         data: {
//           userId: 'user_id', // get the user id from the session
//           amount: amount,
//           currency: 'NGN',
//           status: 'failed',
//           paymentMethod: 'Paystack',
//           email,
//           name,
//           phone,
//           paystackId: paymentId,
//         },
//       });
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           <p>Coconut Oil</p>
//           <p>{formatPrice(amount)}</p>
//         </div>
//         <div>
//           <div className=" flex gap-2 flex-col">
//             <div className=" w-full relative ">
//               <label className="absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
//               />
//             </div>
//             <div className=" w-full relative ">
//               <label className="absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
//               />
//             </div>
//             <div className="w-full relative ">
//               <label className=" absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="peer w-full p-1 pt-6 outline-none bg-white font-light border-2 rounded-md transition"
//               />
//             </div>
//             <PaystackButton
//               className="paystack-button"
//               {...componentProps}
//               onSuccess={(reference) => handlePayment(reference.trxref)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaystackCheckout;
// function createPayment(
//   paymentId: any
// ): { data: any } | PromiseLike<{ data: any }> {
//   throw new Error('Function not implemented.');
// }
