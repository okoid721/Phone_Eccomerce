// import { prisma } from '@/lib/prisma';

// export async function createPayment(paymentId: any) {
//     try {
//         const { email, name, phone } = componentProps;
//         const payment = await prisma.payment.create({
//             data: {
//                 userId: 'user_id', // get the user id from the session
//                 amount: amount,
//                 currency: 'NGN',
//                 status: 'success',
//                 paymentMethod: 'Paystack',
//                 email,
//                 name,
//                 phone,
//                 paystackId: paymentId,
//             }
//         });
//         return payment;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
