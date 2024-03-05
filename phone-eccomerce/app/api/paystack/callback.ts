// api/paystack/callback
import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function POST(request: Request) {
  const payload = await request.json();

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

  return NextResponse.json({ success: true });
}
