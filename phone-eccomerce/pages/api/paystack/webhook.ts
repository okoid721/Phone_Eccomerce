// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/libs/prismadb';
// import { verifyWebhookSignature } from 'paystack';
// import { PaystackChargeSuccessEvent } from 'paystack/types';

// interface PaystackWebhookEvent {
//   event: string;
//   data: {
//     id: string;
//     status: string;
//     amount: number;
//     currency: string;
//     gateway_response: string;
//     message: string;
//     charged_authorization: string;
//     created_at: string;
//     last_charge: {
//       id: string;
//       amount: number;
//       status: string;
//       currency: string;
//       gateway_response: string;
//       message: string;
//       charged_authorization: string;
//       created_at: string;
//       authorization: {
//         id: string;
//         authorization_code: string;
//         bin: string;
//         last4: string;
//         exp_month: string;
//         exp_year: string;
//         card_type: string;
//         brand: string;
//         country: string;
//         bank: string;
//         channel: string;
//         ip_address: string;
//         device_fingerprint: string;
//         meta: {
//           mobile: string;
//           toast_id: string;
//         };
//         card: {
//           id: string;
//           name: string;
//           last4: string;
//           exp_month: string;
//           exp_year: string;
//           type: string;
//           bin: string;
//           bank: string;
//           country: string;
//           plan: string;
//           token: string;
//           card_type: string;
//           brand: string;
//           status: string;
//           auth_charge_amount: number;
//           auth_charge_currency: string;
//           expiry: string;
//           first6: string;
//           fingerprint: string;
//           country_code: string;
//           createdAt: string;
//           updatedAt: string;
//         };
//         createdAt: string;
//         updatedAt: string;
//       };
//       recurring: boolean;
//       subscription: {
//         id: string;
//         plan: {
//           id: string;
//           name: string;
//           interval: string;
//           amount: number;
//           currency: string;
//           trial_days: number;
//           createdAt: string;
//           updatedAt: string;
//         };
//         status: string;
//         quantity: number;
//         next_payment_date: string;
//         createdAt: string;
//         updatedAt: string;
//       };
//       createdAt: string;
//       updatedAt: string;
//     };
//     reference: string;
//     domain: string;
//     amount_settled: number;
//     amount_due: number;
//     settled_at: string;
//     created_at: string;
//     transfers: {
//       id: string;
//       amount: number;
//       recipient: string;
//       narration: string;
//       status: string;
//       created_at: string;
//       metadata: {
//         custom_fields: {
//           id: string;
//           key: string;
//           value: string;
//         }[];
//         split_type: string;
//         status: string;
//         transaction_reference: string;
//         createdAt: string;
//         transfer_type: string;
//         updatedAt: string;
//       };
//     }[];
//     fees: number;
//     logo: string;
//     risk_action: string;
//     risk_reason: string;
//     charge_type: string;
//     authorization: {
//       id: string;
//       authorization_code: string;
//       bin: string;
//       last4: string;
//       exp_month: string;
//       exp_year: string;
//       card_type: string;
//       brand: string;
//       country: string;
//       bank: string;
//       channel: string;
//       ip_address: string;
//       device_fingerprint: string;
//       meta: {
//         mobile: string;
//         toast_id: string;
//       };
//     };
//   };
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     const webhookEvent: PaystackWebhookEvent = req.body;

//     // Verify Paystack webhook signature
//     const isValidSignature = verifyWebhookSignature(
//       req.headers['x-paystack-signature'] as string,
//       req.body,
//       process.env.PAYSTACK_WEBHOOK_SECRET
//     );

//     if (!isValidSignature) {
//       res.status(400).json({ error: 'Invalid signature' });
//       return;
//     }

//     // Handle Paystack webhook event
//     try {
//       switch (webhookEvent.event) {
//         case 'charge.success':
//           const chargeEvent = webhookEvent.data as PaystackChargeSuccessEvent;
//           // Handle charge success event
//           // Example: Update database, send email, etc.
//           break;
//         // Add other Paystack webhook event handlers here
//         default:
//           // Ignore unrecognized event types
//           break;
//       }

//       res.status(200).end();
//     } catch (error) {
//       console.error('Error handling Paystack webhook event:', error);
//       res.status(500).json({ error: 'Error handling webhook event' });
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
