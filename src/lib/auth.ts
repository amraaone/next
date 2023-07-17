import prisma from "@/lib/prisma"
import * as bcrypt from "bcrypt"
import { signJwtAccessToken } from "@/lib/jwt"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        })

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null
        }

        const { password, ...fields } = user

        return {
          ...fields,
          accessToken: signJwtAccessToken(fields),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}
