import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        //check if the user exists
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("No user found");

          return null;
        }
        //check if the password is correct
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("Password does not match");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = auth?.user;
      const isTryingToAccessProtectedRoute =
        request.nextUrl.pathname.includes("/app");

      if (isTryingToAccessProtectedRoute && !isLoggedIn) return false;

      if (isLoggedIn && isTryingToAccessProtectedRoute) return true;

      if (!isTryingToAccessProtectedRoute) return true;
    },
  },
} satisfies NextAuthConfig;
export const { auth, signIn } = NextAuth(config);
