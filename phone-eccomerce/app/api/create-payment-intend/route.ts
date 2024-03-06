import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Paystack from 'paystack';

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY as string);

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice);

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized ' }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'NGN',
    status: 'pending',
    deliveryStatus: 'pending',
    paystackId: payment_intent_id,
    products: items,
  };
  if (payment_intent_id) {
    //update payment
    const current_intent = await paystack.transactions.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const updated_intent = await paystack.transactions.update(
        payment_intent_id,
        { amount: total }
      );

      //update the order

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paystackId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paystackId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);
      if (!existing_order) {
        return NextResponse.json({ error: 'Invalid intent ' }, { status: 400 });
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create the intent
    const paymentIntent = await paystack.transactions.create({
      amount: total,
      currency: 'NGN',
      automatic_payment_methods: { enabled: true },
    });
    //create the order
    orderData.paystackId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });
    return NextResponse.json({ paymentIntent });
  }
}
