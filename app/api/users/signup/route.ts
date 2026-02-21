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

        const cookieNames = Object.keys(parsed);
        const mainTokenName = cookieNames[0];
        const tokenValue = parsed[mainTokenName];

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
        };

        if (tokenValue) {
          cookieStore.set(mainTokenName, tokenValue, options);
        }
      }
    }

    return NextResponse.json(apiRes.data);
  } catch (error) {
    const apiError = error as ApiError;
    const errorMessage =
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Unknown error";
    return NextResponse.json(
      { message: errorMessage },
      { status: apiError.response?.status || 500 },
    );
  }
}
