import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await api.post("/users/signin", body);

    const { token, refreshToken } = apiRes.data;

    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    if (token) {
      cookieStore.set("accessToken", token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24, // 24 h
      });
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return NextResponse.json(apiRes.data);
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage =
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Login failed";

    return NextResponse.json(
      { message: errorMessage },
      { status: apiError.response?.status || 500 },
    );
  }
}
