import createIntlMiddleware from "next-intl/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { routing } from "@/src/i18n/routing";
import { NextFetchEvent, NextRequest } from "next/server";

// Create intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Combine intl and auth middleware
const authMiddlewares = withAuth(
  // First execute intl middleware
  async function middleware(req) {
    const res = await intlMiddleware(req);
    return res;
  },
  {
    callbacks: {
      // Return true if the token exists
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

const middlewares = async (req: NextRequest, event: NextFetchEvent) => {
  const { pathname } = req.nextUrl;
  if (
    pathname == "/" ||
    pathname == "/en" ||
    pathname == "/vi" ||
    pathname == "/en/login" ||
    pathname == "/vi/login" ||
    pathname == "/vi/register" ||
    pathname == "/en/register" ||
    pathname == "/login" ||
    pathname == "/register"
  ) {
    return intlMiddleware(req);
  }
  return authMiddlewares(req as NextRequestWithAuth, event);
};

export default middlewares;

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
