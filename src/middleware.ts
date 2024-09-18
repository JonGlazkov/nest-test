import { getUrl } from "@/lib/get-url";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL(getUrl("/admin")));
  }

  if (pathname.includes("/admin") && !token) {
    return NextResponse.redirect(new URL(getUrl("/")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
