import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{
  error: string;
  message?: string;
}>;

export const api = axios.create({
  baseURL: process.env.NODE_BACKEND_URL,
  withCredentials: true,
});
