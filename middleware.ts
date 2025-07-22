import createIntlMiddleware from "next-intl/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { routing } from "@/src/i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Create intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Function to check if user is admin and redirect
async function checkAdminAndRedirect(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip admin check for admin pages, login, register, and public pages
  if (
    pathname.includes("/admin") ||
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/vi" ||
    pathname === "/en/login" ||
    pathname === "/vi/login" ||
    pathname === "/vi/register" ||
    pathname === "/en/register" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  // Get token from request - this works in middleware context
  const token = await getToken({ req });

  if (token?.role === "admin") {
    // Redirect admin to admin dashboard
    const locale = pathname.startsWith("/vi") ? "vi" : "en";
    const adminUrl = new URL(`/${locale}/admin`, req.url);
    return NextResponse.redirect(adminUrl);
  }

  return null;
}

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

  // Public pages that don't need authentication
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

  // For authenticated routes, check if user is admin

  const adminRedirect = await checkAdminAndRedirect(req);
  if (adminRedirect) {
    return adminRedirect;
  }

  return authMiddlewares(req as NextRequestWithAuth, event);
};

export default middlewares;

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
