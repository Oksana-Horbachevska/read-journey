import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { logErrorResponse } from "../../_utils/utils";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("accessToken")?.value;
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId") || "";
    const readingId = searchParams.get("readingId") || "";

    const res = await api.delete("/books/reading", {
      params: { bookId, readingId },

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
