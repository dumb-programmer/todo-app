import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import getUser from "./app/lib/getUser";

export async function middleware(request: NextRequest) {
  const token = cookies().get("token");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const secret = new TextEncoder().encode(process.env.SECRET);
    await jwtVerify(token.value, secret);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
};
