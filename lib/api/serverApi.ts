import { AxiosError } from "axios";
import { nextServer } from "./api";
import { CheckCurrentUser, RefreshCurrentUser } from "@/types/auth";
import { Book, RecommendedBooksResponse } from "@/types/book";

// === AUTH ===

export const checkUser = async () => {
  try {
    const res = await nextServer.get("/users/current");
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      try {
        const refreshData = await refreshUser();

        if (refreshData.success) {
          const retryRes =
            await nextServer.get<CheckCurrentUser>("/users/current");
          return retryRes.data;
        }
      } catch {
        return null;
      }
      return null;
    }
  }
};

export const refreshUser = async () => {
  const res = await nextServer.get<RefreshCurrentUser>(
    "/users/current/refresh",
  );
  return res.data;
};

// === BOOKS ===

export const fetchBooks = async (params: {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}) => {
  const { data } = await nextServer.get<RecommendedBooksResponse>(
    "/books/recommend",
    { params },
  );
  return data;
};

export const fetchBooksOwn = async (params: {
  status?: string;
}): Promise<Book[]> => {
  const { data } = await nextServer.get<Book[]>("/books/own", { params });
  return data;
};
