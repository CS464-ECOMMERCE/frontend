import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers';
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
          cookies().set("token", data.token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            domain: process.env.DOMAIN_NAME,
          })

          return {
            id: data.user?.id || "",
            email: credentials.email,
            token: data.token,
          };
        } catch (error) {
          console.log(error)
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
      if (user) {
        token.accessToken = user.token; // Use the backend token
      }
      return token;
    },
    async session({ session, token }) {
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
  events: {
    async signOut (message) {
      cookies().delete('token')
    }
  },
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };
