import { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@email.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;
        return await compare(password, user.password).then((res) => {
          if (res) {
            return {
              id: user.id,
              email: user.email,
              jobTitle: user?.jobTitle,
              username: user?.username
            };
          }
        });
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.jobTitle = user.jobTitle;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.jobTitle = token.jobTitle;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    }
  }
};
