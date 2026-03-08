import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { logErrorResponse } from "@/app/api/_utils/utils";
import { api } from "@/app/api/api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.post("/books/reading/finish", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: () => true,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
