import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { removeTokenCookie, setTokenCookie } from "../authCookie";
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(credentials),
            },
          );
          const data = await res.json();

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }
          if (!data?.token) {
            throw new Error("No token received");
          }

          const expiresAt = Date.now() + 60 * 60 * 1000 * 24; // 24 hours

          setTokenCookie(data.token, expiresAt); // Set the token cookie

          return {
            id: data.user?.id || "",
            email: credentials.email,
            token: data.token,
            expiresAt: expiresAt,
          };
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "signOut") {
        return null;
      }

      // Check expiration (24h)
      if (token.expiresAt && token.expiresAt < Date.now()) {
        removeTokenCookie();
        return null;
      }

      if (user) {
        token.accessToken = user.token; // Use the backend token
        token.expiresAt = user.expiresAt; // Set expiration time
      }
      return token;
    },
    async session({ session, token }) {
      if (token.expiresAt && token.expiresAt < Date.now()) {
        removeTokenCookie();
        return null;
      }

      session.user = {
        ...session.user,
        id: token.id,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  events: {
    async signOut() {
      removeTokenCookie();
    },
  },
  cookies: {
    sessionToken: {
      name: `next_token`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  debug: true,
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
