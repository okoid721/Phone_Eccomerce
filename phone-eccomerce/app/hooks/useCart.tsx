import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

import { CartProductType } from '../product/[productId]/ProductDetails';

type CartContextType = {
  cartTotalAmount: number;
  cartTotalQty: number;
  isLoggedIn: boolean;
  cartproduct: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handlesetIsLoggedIn: () => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [PropName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially false

  const [cartproduct, setCartproduct] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem('kingsMobile');
    const cproduct: CartProductType[] | null = JSON.parse(cartItems);
    const kingsMobilePaymentIntent: any = localStorage.getItem(
      'kingsMobilePaymentIntent'
    );
    const paymentIntent: string | null = JSON.parse(kingsMobilePaymentIntent);

    setCartproduct(cproduct);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartproduct) {
        const { total, qty } = cartproduct?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.qauntity;
            acc.total += itemTotal;
            acc.qty += item.qauntity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartproduct]);

  const handlesetIsLoggedIn = () => {
    if (isLoggedIn === false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartproduct((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success('You have successfully added a new product from your cart');
      localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      //let updatedCart;
      if (cartproduct) {
        const filteredproduct = cartproduct.filter((item) => {
          return item.id !== product.id;
        });

        setCartproduct(filteredproduct);
        toast.success('You have successfully removed a product from your cart');
        localStorage.setItem('kingsMobile', JSON.stringify(filteredproduct));
      }
    },
    [cartproduct]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.qauntity === 99) {
        return toast.error('Ooop Maximum Reached');
      }
      if (cartproduct) {
        updatedCart = [...cartproduct];

        const existingIndex = cartproduct.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qauntity = ++updatedCart[existingIndex]
            .qauntity;
        }
        setCartproduct(updatedCart);
        localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
      }
    },
    [cartproduct]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.qauntity === 1) {
        return toast.error('Ooop Maximum Reached');
      }
      if (cartproduct) {
        updatedCart = [...cartproduct];

        const existingIndex = cartproduct.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].qauntity = --updatedCart[existingIndex]
            .qauntity;
        }
        setCartproduct(updatedCart);
        localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
      }
    },
    [cartproduct]
  );

  const handleClearCart = useCallback(() => {
    setCartproduct(null);
    setCartTotalQty(0);
    toast.success('Your cart has been cleared successfully');
    localStorage.setItem('kinsMobile', JSON.stringify(null));
  }, [cartproduct]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem('kingsMobilePaymentIntent', JSON.stringify(val));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartproduct,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handlesetIsLoggedIn,
    isLoggedIn,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};

//import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import { toast } from 'react-hot-toast';

// import { CartProductType } from '../product/[productId]/ProductDetails';

// type CartContextType = {
//   cartTotalAmount: number;
//   cartTotalQty: number;
//   cartproduct: CartProductType[] | null;
//   handleAddProductToCart: (product: CartProductType) => void;
//   handleRemoveProductFromCart: (product: CartProductType) => void;
//   handleCartQtyIncrease: (product: CartProductType) => void;
//   handleCartQtyDecrease: (product: CartProductType) => void;
//   handleClearCart: () => void;
//   isLoggedIn: boolean;
//   handlesetIsLoggedIn: () => void;
// };

// export const CartContext = createContext<CartContextType | null>(null);

// interface Props {
//   [PropName: string]: any;
// }

// export const CartContextProvider = (props: Props) => {
//   const [cartTotalQty, setCartTotalQty] = useState(0);
//   const [cartTotalAmount, setCartTotalAmount] = useState(0);
//   const [cartproduct, setCartproduct] = useState<CartProductType[] | null>(
//     null
//   );
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially false

//   console.log('qty', cartTotalQty);
//   console.log('amount', cartTotalAmount);

//   useEffect(() => {
//     const cartItems: any = localStorage.getItem('kingsMobile');
//     const cproduct: CartProductType[] | null = JSON.parse(cartItems);

//     setCartproduct(cproduct);
//   }, []);

//   useEffect(() => {
//     const getTotals = () => {
//       if (cartproduct) {
//         const { total, qty } = cartproduct?.reduce(
//           (acc, item) => {
//             const itemTotal = item.price * item.qauntity;
//             acc.total += itemTotal;
//             acc.qty += item.qauntity;

//             return acc;
//           },
//           {
//             total: 0,
//             qty: 0,
//           }
//         );

//         setCartTotalQty(qty);
//         setCartTotalAmount(total);
//       }
//     };
//     getTotals();
//   }, [cartproduct]);

//   const handlesetIsLoggedIn = () => {
//     if (isLoggedIn === false) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   };

//   const handleAddProductToCart = useCallback((product: CartProductType) => {
//     setCartproduct((prev) => {
//       let updatedCart;
//       if (prev) {
//         updatedCart = [...prev, product];
//       } else {
//         updatedCart = [product];
//       }

//       toast.success('Product Added');
//       localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   }, []);

//   const handleRemoveProductFromCart = useCallback(
//     (product: CartProductType) => {
//       //let updatedCart;
//       if (cartproduct) {
//         const filteredproduct = cartproduct.filter((item) => {
//           return item.id !== product.id;
//         });

//         setCartproduct(filteredproduct);
//         toast.success('Product Removed');
//         localStorage.setItem('kingsMobile', JSON.stringify(filteredproduct));
//       }
//     },
//     [cartproduct]
//   );

//   const handlesetIsLoggedIn = () => {
//     if (isLoggedIn === false) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   };

//   const handleCartQtyIncrease = useCallback(
//     (product: CartProductType) => {
//       let updatedCart;

//       if (product.qauntity === 99) {
//         return toast.error('Ooop Maximum Reached');
//       }
//       if (cartproduct) {
//         updatedCart = [...cartproduct];

//         const existingIndex = cartproduct.findIndex(
//           (item) => item.id === product.id
//         );

//         if (existingIndex > -1) {
//           updatedCart[existingIndex].qauntity = ++updatedCart[existingIndex]
//             .qauntity;
//         }
//         setCartproduct(updatedCart);
//         localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
//       }
//     },
//     [cartproduct]
//   );

//   const handleCartQtyDecrease = useCallback(
//     (product: CartProductType) => {
//       let updatedCart;

//       if (product.qauntity === 1) {
//         return toast.error('Ooop Maximum Reached');
//       }
//       if (cartproduct) {
//         updatedCart = [...cartproduct];

//         const existingIndex = cartproduct.findIndex(
//           (item) => item.id === product.id
//         );

//         if (existingIndex > -1) {
//           updatedCart[existingIndex].qauntity = --updatedCart[existingIndex]
//             .qauntity;
//         }
//         setCartproduct(updatedCart);
//         localStorage.setItem('kingsMobile', JSON.stringify(updatedCart));
//       }
//     },
//     [cartproduct]
//   );

//   const handleClearCart = useCallback(() => {
//     setCartproduct(null);
//     setCartTotalQty(0);
//     localStorage.setItem('kingsMobile', JSON.stringify(null));
//   }, [cartproduct]);

//   const value = {
//     cartTotalQty,
//     cartTotalAmount,
//     cartproduct,
//     handleAddProductToCart,
//     handleRemoveProductFromCart,
//     handleCartQtyIncrease,
//     handleCartQtyDecrease,
//     handleClearCart,

//   };

//   return <CartContext.Provider value={value} {...props} />;
// };

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (context === null) {
//     throw new Error('useCart must be used within the CartContextProvider');
//   }
//   return context;
// };
