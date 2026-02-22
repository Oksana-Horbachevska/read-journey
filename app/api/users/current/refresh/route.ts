import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../../api";

export async function GET() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    try {
      const refreshRes = await api.get("/users/current/refresh", {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      const { token: newToken, refreshToken: newRefreshToken } =
        refreshRes.data;

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
      };

      cookieStore.set("accessToken", newToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24,
      });
      cookieStore.set("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ success: true, user: refreshRes.data });
    } catch {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    }
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
