import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  try {
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    await api.post("users/signout", null, {
      headers: {
        Authorization: `Bearer ${accessToken} refreshToken=${refreshToken}`,
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Sign out success" });
  } catch {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json({ message: "Sign out success" });
  }
}
