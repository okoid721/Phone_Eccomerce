// pages/api/paystack-payment.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/libs/prismadb';
// import { Payment } from '.prisma/client';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { reference, amount, currency, status } = req.body;

//       if (!reference || !amount || !currency || !status) {
//         return res.status(400).json({ message: 'Missing required fields.' });
//       }

//       // Create a new Payment record in MongoDB using Prisma
//       const payment = await prisma.payment.create({
//         data: {
//           reference,
//           amount,
//           currency,
//           status,
//         },
//       });

//       console.log('Payment saved to MongoDB:', payment);

//       res.status(200).json({ message: 'Payment processed successfully.' });
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       res.status(500).json({ message: 'Failed to process payment.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed.' });
//   }
// }

import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'USER' || 'ADMIN') {
    return NextResponse.error();
  }

  const body = await request.json();
  const { reference, amount, currency, status } = body;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    currency,
    status,
    amount,
  };

  const payment = await prisma.payment.create({
    data: orderData,
  });
  return NextResponse.json(payment);
}
