import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { addTokenCookie, removeTokenCookies } from "../authCookie";

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
          const data = await res.json();

          if (!res.ok) {
            throw new Error("Invalid credentials");
          }

          if (!data?.token) {
            throw new Error("Token missing in response");
          }

          addTokenCookie(data.token);

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
  events: {
    async signOut() {
      removeTokenCookies();
    },
  },
};

export function auth(...args) {
  return getServerSession(...args, config);
}

const EMAIL_EXIST = "email already exists";
export async function registerUser(email, password, business_name, taxId) {
  try {
    const res = await fetch("http://localhost/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        business_name,
        taxId,
        role: "merchant",
      }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return { status: 200, data };
  } catch (error) {
    if (error.message === EMAIL_EXIST) {
      return { status: 400, error: "Email already exists!" };
    } else {
      return { status: 400, error: "Login failed. Something went wrong!" };
    }
  }
}
