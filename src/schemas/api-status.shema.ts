export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;
export type ApiStatus = (typeof API_STATUS)[keyof typeof API_STATUS];
