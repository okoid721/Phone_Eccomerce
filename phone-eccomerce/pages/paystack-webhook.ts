// pages/api/paystack-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../libs/prismadb';
import { Payment } from '.prisma/client';
import { verifyWebhook } from '@/utils/paystack';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const signature: any = req.headers['x-paystack-signature'];
      const body: any = await verifyWebhook(req.body, signature);

      // Process the webhook payload here
      console.log('Webhook payload:', body);

      // Check if the payment is successful
      if (body.data.status === 'success') {
        const { reference } = body.data;

        // Update the payment status in MongoDB using Prisma
        const payment = await prisma.payment.update({
          where: {
            reference: {
              equals: reference,
            },
          },
          data: {
            status: body.data.status,
          },
        });

        console.log('Payment updated in MongoDB:', payment);
        res.status(200).json({ message: 'Webhook received and processed.' });
      } else {
        console.error('Payment failed or unrecognized status:', body.data);
        res.status(500).json({ message: 'Failed to process webhook.' });
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Failed to process webhook.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
