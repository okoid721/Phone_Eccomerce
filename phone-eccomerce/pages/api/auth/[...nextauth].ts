import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import bcrypt from 'bcrypt'



// export { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     Google,
//   ],
// })

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
            email: {
                label: 'email',
                type: 'text',
            },
            password: {
                label: "password",
                type: "password"
            }
        },
        async authorize(credentials){
            if(!credentials?.email ||  !credentials.password){
                throw new Error('Email or Password is required')
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })
            if(!user || !user?.hashedPassword){
                throw new Error('invalid User')
            }

            const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
            
            if (!isCorrectPassword) {
              throw new Error("Incorrect password")
            }
          
            return user;
        }
        })
    ],
    pages: {
        signIn: "/login"
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
})