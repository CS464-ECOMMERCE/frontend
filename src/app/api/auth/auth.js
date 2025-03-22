"use server";
import { getServerSession } from "next-auth";
import { config } from "./[...nextauth]/route";

export async function auth(...args) {
  return getServerSession(...args, config);
}

export async function registerUser(email, password, business_name, taxId) {
  const EMAIL_EXIST = "email already exists";
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
