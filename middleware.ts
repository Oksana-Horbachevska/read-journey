import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register"];
const privatePaths = ["/recommended", "/library", "/reading"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Отримуємо куки через req.cookies (це працює в Edge)
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isAuth = !!(accessToken || refreshToken);
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));

  // 1. Якщо шлях приватний і немає ЖОДНОГО токена -> на логін
  if (isPrivatePath && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Якщо шлях публічний (логін/реєстрація), але юзер вже залогінений -> на головну
  if (isPublicPath && isAuth) {
    return NextResponse.redirect(new URL("/recommended", req.url));
  }

  // 3. В усіх інших випадках - просто йдемо далі
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
