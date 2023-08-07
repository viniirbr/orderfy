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
          return null;
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, user, token }) {
      return {
        ...session,
        user: { ...session.user, userRole: token.userRole },
      };
    },
    jwt({ token, user }) {
      const u = user as any;
      if (user) {
        return { ...token, userRole: u.role };
      }

      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
