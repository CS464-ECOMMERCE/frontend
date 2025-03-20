import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Need to import and pass this
// to `NextAuth` in `app/api/auth[...nextauth]/route.js`
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
          const res = await fetch("http://localhost/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) throw new Error("Invalid credentials");

          const data = await res.json();

          if (!data?.token) throw new Error("Token missing in response");

          return { token: data.token, user: { email: credentials.email } };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export function auth(...args) {
  return getServerSession(...args, config);
}
