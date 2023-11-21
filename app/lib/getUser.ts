"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface User {
  email: string;
}

export default async function getUser(): Promise<User> {
  try {
    const token = cookies().get("token")?.value || "";
    const secret = new TextEncoder().encode(process.env.SECRET);
    const { payload } = await jwtVerify(token, secret);
    return { email: payload.email } as User;
  } catch (error) {
    throw error;
  }
}
