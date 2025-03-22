"use client";
const { cookies } = require("next/headers");

function addTokenCookie(token) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });
}

function removeTokenCookies() {
  cookies().delete("token");
}

export { addTokenCookie, removeTokenCookies };
