import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.rewrite(new URL("/register", request.url));
  } else {
    return NextResponse.rewrite(new URL(request.url));
  }
}

export const config = {
  matcher: "/add-property",
};
