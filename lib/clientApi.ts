import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { nextServer } from "./api";
import { User } from "@/types/user";

// === AUTH ===
export const login = async (credentials: LoginCredentials) => {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
};

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await nextServer.post<User>("/auth/register", credentials);
  return data;
};
