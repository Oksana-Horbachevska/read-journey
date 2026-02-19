import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { parse } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await api.post("users/signup", body);
    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        // Витягуємо назву куки та її значення
        // Об'єкт після parse виглядає так: { [cookieName]: value, Path: '/', Expires: '...' }
        const cookieNames = Object.keys(parsed);
        // Перший ключ - це завжди назва самої куки (напр. "token" або "accessToken")
        const mainTokenName = cookieNames[0];
        const tokenValue = parsed[mainTokenName];

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || "/", // Ставимо корінь, якщо Path порожній
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: true, // Безпека!
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
        };

        if (tokenValue) {
          cookieStore.set(mainTokenName, tokenValue, options);
        }
      }
    }

    // Повертаємо дані успішної реєстрації
    return NextResponse.json(apiRes.data);
  } catch (error) {
    const apiError = error as ApiError;
    return NextResponse.json(
      {
        error:
          apiError.response?.data?.error || apiError.message || "Unknown error",
      },
      { status: apiError.response?.status || 500 },
    );
  }
}
