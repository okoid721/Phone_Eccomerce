// // api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//     providers: [
//         Providers.Credentials({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: {  label: "Password", type: "password" }
//             },
//             authorize: async (credentials: any) => {
//                 // Check the credentials here
//                 // Return the user object if the credentials are valid
//                 // Otherwise, return null
//                 return { id: 'user_id' };
//             }
//         })
//     ],
//     pages: {
//         signIn: '/login'
//     }
// });
