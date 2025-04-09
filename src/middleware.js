import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next_token",
  });
  const pathname = req.nextUrl.pathname;

  // If not authenticated, navigate to protected paths
  if (pathname.startsWith("/admin")) {
    // If user is NOT authenticated, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If authenticated, prevent access to auth users
  const authPaths = ["/login", "/register", "/shop", "/cart", "/order"];
  if (authPaths.some((path) => pathname.startsWith(path))) {
    // If user is authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next(); // Continue if authenticated
}

// Apply middleware to specific paths
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
    "/shop/:path*",
    "/cart",
    "/order",
  ],
};
