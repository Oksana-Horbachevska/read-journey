import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    // 1. Send registration request to the API
    const apiRes = await api.post("/users/signup", body);

    // 2. Extract tokens from the response body (matching login logic)
    const { token, refreshToken } = apiRes.data;

    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // 3. Set cookies using names expected by the Middleware
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

    // Return user data to the client
    return NextResponse.json(apiRes.data);
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage =
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Registration failed";

    return NextResponse.json(
      { message: errorMessage },
      { status: apiError.response?.status || 500 },
    );
  }
}
