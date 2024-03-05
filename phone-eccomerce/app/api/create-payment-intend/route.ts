import Paystack from 'paystack';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY as string);

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized ' }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  if (payment_intent_id) {
    //update payment
    const transaction = await paystack.transaction.verify(payment_intent_id);

    if (transaction) {
      const update_intent = await paystack.transaction.updatePaymentIntent(
        payment_intent_id,
        { amount: total }
      );
    }

    if (transaction.data) {
      //update the order
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: payment_intent_id },
      });

      if (existing_order) {
        await prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        });
        if (!existing_order) {
          return NextResponse.json(
            {
              error: 'Invalid Payment Intent',
            },
            { status: 400 }
          );
        }
      }

      return NextResponse.json({ paymentIntent: transaction.data });
    }
  } else {
    // create the intent
    const transaction = await paystack.transaction.initialize({
      amount: total * 100, // Convert to kobo, the Nigerian currency unit
      email: currentUser.email,
      callback_url: `${process.env.NEXTAUTH_URL}/api/paystack/callback`,
    });

    //create the order
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: 'NGN',
      status: 'pending',
      deliveryStatusId: 'pending',
      paymentIntentId: transaction.data.reference,
      products: items,
    };

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({
      transactionReference: transaction.data.reference,
    });
  }
}
