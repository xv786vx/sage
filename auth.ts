import NextAuth from "next-auth";
import { db } from "@/lib/db";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "../sage-new/src/lib/encrypter";
import type { User } from "next-auth";
import { getCookie, setCookie } from "cookies-next";
import { getSessionId, initializeSessionId } from "@/lib/sessiontracker";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);

        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              email,
              hashedPassword: hash,
            },
          });
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword,
          );
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        }
        // setCookie("sessionID", initializeSessionId(), {
        //   path: "/",
        //   secure: false,
        // });
        localStorage.setItem("sessionID", initializeSessionId());
        console.log(
          "retrieved cookie w local storage: " +
            localStorage.getItem("sessionID"),
        );
        console.log(getSessionId());

        return user as User; // probably a bad idea to cast the type lol
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
