// import Paystack from 'paystack';
// import { CartProductType, Prisma } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/actions/getCurrentUser';

// const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string);

// const calculateOrderAmount = (items: CartProductType[]) => {
//   const totalPrice = items.reduce((acc, item) => {
//     const itemTotal = item.price * item.quantity;
//     return acc + itemTotal;
//   }, 0);
//   return totalPrice;
// };

// export async function POST(request: Request) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     return NextResponse.json({ error: 'Unauthorized ' }, { status: 401 });
//   }

//   const body = await request.json();
//   const { items, payment_intent_id } = body;
//   const total = calculateOrderAmount(items) * 100;
//   const orderData = {
//     user: { connect: { id: currentUser.id } },
//     amount: total,
//     currency: 'NGN',
//     status: 'pending',
//     deliveryStatusId: 'pending',
//     paymentIntentId: payment_intent_id,
//     products: items,
//   };
// }

// I to add paystack to my eccomerce website and i also want to see the when the client have make payment in my mongodb my paystack dashbord and i wan to see the client id i have already install mongodb db and prisma this is my getCurrentUser.Ts
// ```
// import { authOptions } from "@/pages/api/auth/[...nextauth]"
// import prisma from "@/libs/prismadb"
// import { getServerSession } from "next-auth"

// export async function getSession() {
//      return await getServerSession(authOptions)
// }

// export async function getCurrentUser(){
//    try {
//     const session = await getSession()

//     if (!session?.user?.email) {
//         return null
//     }
//     const currentUser = await prisma.user.findUnique({
//         where:{
//             email: session?.user?.email,
//         }
//     })
//     if(!currentUser){
//         return null
//     }
//     return{
//         ...currentUser,
//         createdAt: currentUser.createdAt.toISOString(),
//         updatedAt: currentUser.updatedAt.toISOString(),
//         emailVerified: currentUser.emailVerified?.toString() || null
//     }
//    } catch (error: any) {
//     return null
//    }
// }
// ```  this is my my nextauth
// ```
// import NextAuth, { AuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/libs/prismadb"
// import bcrypt from 'bcrypt'

// export const authOptions: AuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers:[
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//         CredentialProvider({
//             name: "credentials",
//             credentials: {
//             email: {
//                 label: 'email',
//                 type: 'text',
//             },
//             password: {
//                 label: "password",
//                 type: "password"
//             }
//         },
//         async authorize(credentials){
//             if(!credentials?.email ||  !credentials.password){
//                 throw new Error('Email or Password is required')
//             }

//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: credentials.email
//                 }
//             })

//             if(!user || !user?.hashedPassword){
//                 throw new Error('invalid User')
//             }

//             const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

//             if (!isCorrectPassword) {
//               throw new Error("Incorrect password")
//             }

//             return user;
//         }
//         })

//     ],
//     pages: {
//         signIn: "/login"
//     },
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: 'jwt'
//     },
//     secret: process.env.NEXTAUTH_SECRET
// }

// export default NextAuth(authOptions)

// ```  this is my prisma :
// ```
// import {PrismaClient} from '@prisma/client'

// declare global {
//     var prisma:PrismaClient | undefined
// }

// const client = globalThis.prisma || new PrismaClient()

// if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

// export default client
// ```
