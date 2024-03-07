import crypto from 'crypto';

export const verifyWebhook = (payload: string, signature: string) => {
  const secretKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  if (!secretKey) {
    throw new Error('Paystack secret key not found in environment variables.');
  }

  const expectedSignature = crypto
    .createHmac('sha512', secretKey)
    .update(payload)
    .digest('hex');

  return expectedSignature === signature;
};
