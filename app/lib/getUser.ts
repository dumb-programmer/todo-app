"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface User {
  email: string;
}

export default async function getUser() {
  try {
    const token = cookies().get("token")?.value || "";
    if (token) {
      const secret = new TextEncoder().encode(process.env.SECRET);
      const { payload } = await jwtVerify(token, secret);
      return { email: payload.email } as User;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
