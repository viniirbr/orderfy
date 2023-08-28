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
        console.log("AUTH");
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
      console.log("SESSION");
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
      console.log("JWT");
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
