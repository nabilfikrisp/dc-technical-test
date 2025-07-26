import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseApiError({
  err,
  fallback = "Something went wrong",
}: {
  err: unknown;
  fallback: string;
}): string {
  if (err instanceof AxiosError) {
    const message = err.response?.data?.error?.message || err.message;

    return message ?? fallback;
  }

  return fallback;
}

export function getLocalStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error(`Error parsing localStorage item "${key}":`, e);
      return null;
    }
  }
  return null;
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting localStorage item "${key}":`, e);
  }
}

export function removeLocalStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing localStorage item "${key}":`, e);
  }
}
