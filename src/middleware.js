import {  NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define protected paths (e.g., all routes under /admin)
  const protectedPaths = ["/admin"];

  const pathname = req.nextUrl.pathname;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // If user is NOT authenticated, redirect to login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Continue if authenticated
}

// Apply the middleware ONLY to `/admin/*`
export const config = {
  matcher: "/admin/:path*", // Protects all routes inside /admin/
};
