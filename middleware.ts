import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }
  console.log(request.url);
  console.log("Middleware triggered for /auth/login route");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả trừ các route: /api/*, /_next/*, /favicon.ico, /login, /register
     */
    "/((?!placeholder.svg|_next|favicon.ico|login|register).*)",
  ],
};
