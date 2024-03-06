// import React, { useCallback, useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import toast from "react-hot-toast";
// import { useCart } from "../hooks/useCart";
// import PaystackCheckout from "./PaystackCheckout";

// const CheckoutClient = () => {
//   const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     if (cartProducts) {
//       setLoading(true);
//       setError(false);

//       // Send a request to your backend to create a payment intent
//       fetch("/api/create-paystack-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cartProducts,
//           payment_intent_id: paymentIntent,
//         }),
//       })
//         .then((res) => {
//           setLoading(false);
//           if (res.status === 401) {
//             return router.push("/login");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           handleSetPaymentIntent(data.paymentIntent.id);
//         })
//         .catch((error) => {
//           setError(true);
//           console.log("Error", error);
//           toast.error("Something went wrong");
//         });
//     }
//   }, [cartProducts, paymentIntent]);

//   const handlePaymentSuccess = useCallback(() => {
//     setPaymentSuccess(true);
//   }, []);

//   return (
//     <>
//       <div className="w-full">
//         {cartProducts && (
//           <PaystackCheckout
//             cartProducts={cartProducts}
//             paymentSuccess={paymentSuccess}
//             handlePaymentSuccess={handlePaymentSuccess}
//           />
//         )}
//         {loading && <div className="text-center">Loading Checkout....</div>}
//         {error && (
//           <div className="text-center text-red-500">Something went wrong</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CheckoutClient;
