import { cookies } from "next/headers";

export function setTokenCookie(token, expiresAt) {
  cookies().set("token", token, {
    httpOnly: true,
    expires: new Date(expiresAt),
    domain: process.env.DOMAIN_NAME,
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeTokenCookie() {
  cookies().set("token", "", {
    httpOnly: true,
    domain: process.env.DOMAIN_NAME,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}
