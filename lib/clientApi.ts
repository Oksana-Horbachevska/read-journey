import {
  AuthResponseLogin,
  AuthResponseRegister,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";
import { nextServer } from "./api";

// === AUTH ===
export const loginUser = async (credentials: LoginCredentials) => {
  const { data } = await nextServer.post<AuthResponseLogin>(
    "/users/signin",
    credentials,
  );
  return data;
};

export const registerUser = async (credentials: RegisterCredentials) => {
  console.log("Sending:", credentials);
  const { data } = await nextServer.post<AuthResponseRegister>(
    "/users/signup",
    credentials,
  );
  return data;
};
