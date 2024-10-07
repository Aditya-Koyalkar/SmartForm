import db from "@/db/index";
import { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_AUTH_JWT_SECRET || "secret",
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | null;
      account: Account | null;
    }) {
      if (account?.provider === "google" && user) {
        const existingUser = await db.user.findUnique({
          where: { email: user.email as string },
        });
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email as string,
              image: user.image,
              name: user.name as string,
            },
          });
        }
      }
      return true;
    },

    async session({ token, session }: { token: JWT; session: Session }) {
      token.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
