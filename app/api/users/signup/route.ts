import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post("/users/signup", body);

    return NextResponse.json(apiRes.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return NextResponse.json(
      {
        error:
          axiosError.response?.data?.message ??
          axiosError.message ??
          "Something went wrong",
      },
      { status: axiosError.response?.status ?? 500 },
    );
  }
}
