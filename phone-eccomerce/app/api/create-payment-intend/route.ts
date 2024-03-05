import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { Paystack, Transaction, UpdateTransactionParams } from 'paystack';

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY as string);

const calculateOrderAmount = (items: CartProductType[]): number => {
  return (
    items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0) * 100
  );
};

export async function POST(request: Request): Promise<NextResponse> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized ' }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'NGN',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    try {
      // Update payment intent
      const updateParams: UpdateTransactionParams = {
        amount: total,
      };
      const updatedTransaction: Transaction = await paystack.transaction.update(
        payment_intent_id,
        updateParams
      );

      // Update the order
      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      });

      if (!existingOrder) {
        return NextResponse.json({ error: 'Invalid intent ' }, { status: 400 });
      }

      await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          amount: total,
          products: items,
        },
      });

      return NextResponse.json({ paymentIntent: updatedTransaction });
    } catch (error) {
      console.error('Error updating payment intent:', error);
      return NextResponse.json(
        { error: 'Failed to update payment intent' },
        { status: 500 }
      );
    }
  } else {
    try {
      // Create payment intent
      const paymentIntent: Transaction = await paystack.transaction.initialize({
        amount: total,
        email: currentUser.email, // Assuming currentUser has an email property
        callback_url: `${process.env.NEXTAUTH_URL}/api/paystack/callback`,
      });

      // Update order data with payment intent ID
      orderData.paymentIntentId = paymentIntent.reference;

      // Create the order
      await prisma.order.create({
        data: orderData,
      });

      return NextResponse.json({ paymentIntent });
    } catch (error) {
      console.error('Error initializing payment intent:', error);
      return NextResponse.json(
        { error: 'Failed to initialize payment intent' },
        { status: 500 }
      );
    }
  }
}
