import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "../../../../../prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, user, token }) {
      console.log("SESSION CALLBACK");
      console.log(user);
      return {
        ...session,
        user: {
          ...session.user,
          userRole: token.userRole,
          id: token.id,
        },
      };
    },
    jwt({ token, user }) {
      console.log("JWT CALLBACK");
      const u = user as any;
      if (user) {
        return { ...token, userRole: u.role, id: u.id };
      }

      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
