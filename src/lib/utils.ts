import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractErrorMessage = (
  error: AxiosError | Error | unknown,
  fallback: string
) => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  if (
    typeof (error as AxiosError<{ message: string }>).response?.data
      ?.message === "string"
  ) {
    return (
      (error as AxiosError<{ message: string }>).response?.data?.message ||
      fallback
    );
  }
  if ((error as Error).message) {
    return (error as Error).message || fallback;
  }
  return fallback;
};
