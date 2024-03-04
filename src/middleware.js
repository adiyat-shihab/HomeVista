import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await request.cookies.get("token");
  if (!token && !token?.value) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-property",
    "/properties/((?!$).*)",
    "/dashboard/:path*",
  ],
};
