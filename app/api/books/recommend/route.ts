export const dynamic = "force-dynamic";

import { isAxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const title = searchParams.get("title") || "";
    const author = searchParams.get("author") || "";

    const token = req.cookies.get("accessToken")?.value;

    const res = await api.get("/books/recommend", {
      params: {
        page,
        limit,
        title,
        author,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
