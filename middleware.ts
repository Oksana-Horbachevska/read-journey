import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register"];
const privatePaths = ["/recommended", "/library", "/reading"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Extract auth tokens from cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isAuth = !!(accessToken || refreshToken);
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));

  // 1. If the path is private and NO tokens are present -> redirect to login
  if (isPrivatePath && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. If the path is public (login/register) but the user is already authenticated -> redirect to home
  if (isPublicPath && isAuth) {
    return NextResponse.redirect(new URL("/recommended", req.url));
  }

  // 3. For all other cases - proceed as usual
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/recommended/:path*",
    "/library/:path*",
    "/reading/:path*",
    "/login",
    "/register",
  ],
};
