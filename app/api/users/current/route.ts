import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    try {
      const apiRes = await api.get("/users/current", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return NextResponse.json({ success: true, user: apiRes.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status !== 401) {
        return NextResponse.json({ success: false }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
