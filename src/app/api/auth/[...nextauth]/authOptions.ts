import { createClient } from "@/lib/supabase/supabaseServer";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        async profile(_, tokens): Promise<any>{
          const supabase = createClient(cookies());
          const { data, error } = await supabase.auth.signInWithIdToken({
            token: tokens.id_token!,
            access_token: tokens.access_token!,
            provider: "google",
          });
  
          if (error) {
            throw new Error(error.message || "Invalid email or password");
          }
  
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user?.user_metadata?.name,
            access_token: data.session.access_token,
          };
        },
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials): Promise<any> => {
          const supabase = createClient(cookies());
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials?.email!,
            password: credentials?.password!,
          });
          if (error) {
            throw new Error(error.message || "Invalid email or password");
          }
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user?.user_metadata?.name,
            access_token: data.session.access_token,
          };
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.access_token = user.access_token;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.access_token = token.access_token;
        }
        return session;
      },
    },
  };