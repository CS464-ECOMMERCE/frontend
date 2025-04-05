import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });
          const data = await res.json();

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          if (!data?.token) {
            throw new Error("Token missing in response");
          }

          const tokenExpire = 60 * 60 * 24;
          cookies().set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: tokenExpire,
          });

          return { token: data.token, user: { email: credentials.email } };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // If the user just signed in, add the token and expiration
      if (user) {
        token.accessToken = user.token;
      }

      // If the token has expired, remove it
      if (Date.now() > token.accessTokenExpires) {
        console.log("Token expired, removing session");
        cookies().delete("token"); // Remove the token from cookies
        return null; // Invalidate the session
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        return null;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signOut() {
      cookies().delete("token");
    },
  },
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
