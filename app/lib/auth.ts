import db from "@/db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
          placeholder: "Aditya",
        },
        email: {
          label: "Email",
          placeholder: "Type your Email Here",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Type the password here",
          type: "password",
        },
      },

      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password as string
          );
          if (passwordValidation) {
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              name: credentials.name,
              password: hashedPassword,
              email: credentials.email,
            },
          });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
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
              name: user.name,
              email: user.email,
              image: user.image,
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
};
