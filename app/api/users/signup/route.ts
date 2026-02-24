import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    // 1. Робимо запит на реєстрацію
    const apiRes = await api.post("/users/signup", body);

    // 2. Беремо токени з тіла відповіді (так само, як у логіні)
    const { token, refreshToken } = apiRes.data;

    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // 3. Явно встановлюємо куки під іменами, які розуміє Middleware
    if (token) {
      cookieStore.set("accessToken", token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24, // 24 години
      });
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7, // 7 днів
      });
    }

    // Повертаємо дані юзера на клієнт
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
