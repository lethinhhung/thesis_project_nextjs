import createIntlMiddleware from "next-intl/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { routing } from "@/src/i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Create intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Function to check if user is admin and redirect
async function checkAdminAndRedirect(req: NextRequest, token: any) {
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

  try {
    // Fetch user profile to get role
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      if (userData.success && userData.data.role === "admin") {
        // Redirect admin to admin dashboard
        const locale = pathname.startsWith("/vi") ? "vi" : "en";
        const adminUrl = new URL(`/${locale}/admin`, req.url);
        return NextResponse.redirect(adminUrl);
      }
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
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
  const token = await getToken({ req });
  if (token) {
    const adminRedirect = await checkAdminAndRedirect(req, token);
    if (adminRedirect) {
      return adminRedirect;
    }
  }

  return authMiddlewares(req as NextRequestWithAuth, event);
};

export default middlewares;

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
