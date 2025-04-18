import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Các route công khai mà không cần đăng nhập
const publicRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Nếu đã đăng nhập và đang truy cập trang đăng nhập/đăng ký, chuyển hướng về trang chủ
  if (isAuthenticated && (path === "/login" || path === "/auth/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Nếu chưa đăng nhập và không truy cập vào public routes, chuyển hướng đến trang đăng nhập
  if (
    !isAuthenticated &&
    !publicRoutes.some((route) => path === route || path.startsWith("/api/"))
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Chỉ định các path cần áp dụng middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|public|placeholder.svg|favicon.ico|images|.*\\.png$).*)",
  ],
};
