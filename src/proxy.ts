import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const hasSessionCookie = request.cookies.has("chiahsin_admin_session");

  if (!hasSessionCookie && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/articles", request.url));
  }

  return NextResponse.next();
}
