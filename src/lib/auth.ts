import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validations";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //validation
        const parsedCredentials = authSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }
        //get the email and password
        const { email, password } = parsedCredentials.data;
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
      const isLoggedIn = Boolean(auth?.user);

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp && !auth?.user.isSuscribed) {
        return Response.redirect(new URL("/payment", request.nextUrl));
      }

      if (isLoggedIn && isTryingToAccessApp && auth?.user.isSuscribed) {
        return true;
      }

      if (
        isLoggedIn &&
        (request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")) &&
        auth?.user.isSuscribed
      ) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (isLoggedIn && !isTryingToAccessApp && !auth?.user.isSuscribed) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/payment", request.nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      //on sign in
      if (user) {
        token.userId = user.id!;
        token.email = user.email!;
        token.isSuscribed = user.isSuscribed;
      }
      if (trigger === "update") {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        if (user) {
          token.isSuscribed = user.isSuscribed;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId;
      session.user.isSuscribed = token.isSuscribed;

      return session;
    },
  },
} satisfies NextAuthConfig;
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
