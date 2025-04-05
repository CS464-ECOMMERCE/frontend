import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "token",
    raw: true,
  });

  const pathname = req.nextUrl.pathname;

  const errorPaths = ["/oh_no"];
  if (errorPaths.some((path) => pathname.startsWith(path))) {
    // If user is authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/shop", req.url));
    }
  }

  // If not authenticated, navigate to protected paths
  const protectedPaths = ["/admin"];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // If user is NOT authenticated, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If authenticated, prevent access to auth paths
  const authPaths = ["/login", "/register", "/shop", "/cart"];
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
    "/oh_no",
  ],
};
