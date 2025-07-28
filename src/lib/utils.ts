import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseApiError({
  error,
  fallback = "Something went wrong",
}: {
  error: unknown;
  fallback?: string;
}): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const strapiError = error.response?.data?.error;
  if (!strapiError) {
    return error.response?.data?.message || fallback;
  }

  const firstValidationError = strapiError.details?.errors?.[0];
  if (firstValidationError) {
    return firstValidationError.path
      ? `${firstValidationError.path.join(".")}: ${firstValidationError.message}`
      : firstValidationError.message;
  }

  return strapiError.message || fallback;
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

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
