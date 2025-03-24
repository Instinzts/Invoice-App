import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../lib/db";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        const firstName = profile.given_name || profile.name?.split(" ")[0] || "";
        const lastName = profile.family_name || profile.name?.split(" ").slice(1).join(" ") || "";
        // Map the Google profile to NextAuth’s expected shape.
        return {
          id: profile.sub,
          email: profile.email,
          name: `${firstName} ${lastName}`.trim(),
          image: profile.picture,
          firstName,
          lastName,
        };
      },
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!profile) return false;

      try {
        // Check if the user exists before updating.
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Attempt to extract firstName and lastName from the profile.
          const firstName = profile.given_name || profile.name?.split(" ")[0] || "";
          const lastName = profile.family_name || profile.name?.split(" ").slice(1).join(" ") || "";

          await prisma.user.update({
            where: { email: user.email! },
            data: {
              firstName,
              lastName,
            },
          });
        } else {
          console.warn("User record not found for email:", user.email);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }

      return true;
    },
    async session({ session, user }) {
      return session;
    },
  },
});

// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import prisma from "./db"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [  
//         Google({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         profile(profile) {
//           // Map the Google profile to NextAuth’s expected shape.
//           return {
//             id: profile.sub,
//             email: profile.email,
//             name: `${profile.given_name} ${profile.family_name}`,
//             image: profile.picture,
//           };
//         };
//       })
//     ],
//     callbacks: {
//       async signIn({ user, account, profile }) {
//         // Guard against an undefined profile.
//         if (!profile) return false;
        
//         // Instead of upserting (which may conflict with the adapter's own user creation),
//         // perform an update only if the user already exists.
//         // The adapter should have already created the user and linked account.
//         try {
//           await prisma.user.update({
//             where: { email: user.email! },
//             data: {
//               firstName: profile.given_name,
//               lastName: profile.family_name,
//             },
//           });
//         } catch (error) {
//           // If the update fails (e.g., user doesn't exist yet), you might choose to log the error.
//           console.error("Error updating user:", error);
//         }
        
//         return true;
//       },
//       async session({ session, user }) {
//         // Optionally attach more user info to the session.
//         return session;
//       },
//     },
// })