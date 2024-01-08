import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const fetchedUser = await (await fetch("http://localhost/auth/profile", {
        headers: {
          Authorization: `Token ${(token.user as any).token}`, // Type assertion to 'any'
        },
      })).json();

      if (!fetchedUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: fetchedUser.id,
        name: fetchedUser.username,
        email: fetchedUser.email,
        picture: fetchedUser.image,
      }
    },
  },
}
