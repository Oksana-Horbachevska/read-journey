import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { parse } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await api.post("/users/signin", body);
    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }
      return NextResponse.json(apiRes.data);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
