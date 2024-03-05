import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const payload = req.body;

    if (payload.data.status === 'success') {
      // Payment succeeded, update the order status
      const order = await prisma.order.findFirst({
        where: { paymentIntentId: payload.data.reference },
      });

      if (order) {
        await prisma.order.update({
          where: { paymentIntentId: payload.data.reference },
          data: {
            status: 'completed',
          },
        });
      }
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
