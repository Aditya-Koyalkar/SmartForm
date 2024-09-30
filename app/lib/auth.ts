import db from "@/db/index";
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
    async signIn({ user, account }: any) {
      if (account.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              image: user.image,
              name: user.name,
            },
          });
        }
      }
      return true;
    },
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
