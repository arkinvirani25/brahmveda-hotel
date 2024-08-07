// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      access_token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    access_token: string;
  }
}
