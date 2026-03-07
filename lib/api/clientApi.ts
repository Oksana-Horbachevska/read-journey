import {
  AuthResponseLogin,
  AuthResponseLogout,
  AuthResponseRegister,
  CheckCurrentUser,
  LoginCredentials,
  RefreshCurrentUser,
  RegisterCredentials,
} from "@/types/auth";
import { nextServer } from "./api";
import { AxiosError } from "axios";
import {
  AddBookCredentials,
  Book,
  RecommendedBooksResponse,
} from "@/types/book";

// === AUTH ===
export const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await nextServer.post<AuthResponseLogin>(
    "/users/signin",
    credentials,
  );
  return data;
};

export const registerUser = async (credentials: RegisterCredentials) => {
  const { data } = await nextServer.post<AuthResponseRegister>(
    "/users/signup",
    credentials,
  );
  return data;
};

export const logoutUser = async (): Promise<AuthResponseLogout> => {
  const { data } = await nextServer.post("/users/signout");
  return data;
};

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

export const fetchBookById = async (id: string): Promise<Book> => {
  const res = await nextServer.get(`/books/${id}`);
  return res.data;
};

export const addBookById = async (id: string): Promise<Book> => {
  const res = await nextServer.post(`/books/add/${id}`);
  return res.data;
};

export const removeBookById = async (id: string): Promise<Book> => {
  const res = await nextServer.delete(`/books/remove/${id}`);
  return res.data;
};

export const addBookManually = async (
  credentials: AddBookCredentials,
): Promise<Book> => {
  const res = await nextServer.post("/books/add", credentials);
  return res.data;
};

export const fetchBooksOwn = async (params: {
  status?: string;
}): Promise<Book[]> => {
  const { data } = await nextServer.get<Book[]>("/books/own", { params });
  return data;
};
