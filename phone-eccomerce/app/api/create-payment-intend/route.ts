// import prisma from '@/libs/prismadb';
// import { NextResponse } from 'next/server';
// import { CartProductType } from '@/app/product/[productId]/ProductDetails';
// import Paystack from 'paystack';

// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY as string);

// const calculateOrderAmount = (items: CartProductType[]) => {
//   const totalPrice = items.reduce((acc, item) => {
//     const itemTotal = item.price * item.quantity;
//     return acc + itemTotal;
//   }, 0);

//   const price: any = Math.floor(totalPrice);

//   return price;
// };

// export async function POST(request: Request) {
//   const body = await request.json()
//     const {userId, deliveryStatus ,amount, paystackId, products} = body

//     const order = await prisma.order.create({
//       data:{
//         userId, deliveryStatus, amount, paystackId, products
//       }
//   })
//   return NextResponse.json(order)
// }
