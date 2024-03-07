// pages/api/paystack-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhook } from '../utils/paystack';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const signature: any = req.headers['x-paystack-signature'];
      const body = await verifyWebhook(req.body, signature);

      // Process the webhook payload here
      console.log('Webhook payload:', body);

      res.status(200).json({ message: 'Webhook received and processed.' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Failed to process webhook.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
