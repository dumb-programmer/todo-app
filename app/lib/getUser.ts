"use server";

import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export default async function getUser(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const secret = new TextEncoder().encode(process.env.SECRET);
    const { payload } = await jwtVerify(token, secret);
    return { email: payload.email };
  } catch (error) {
    throw error;
  }
}
