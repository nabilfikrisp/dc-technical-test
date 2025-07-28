import { parseApiError } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

type ErrorUIProps = {
  error: unknown;
  message?: string;
};
export default function ErrorUI({ error, message }: ErrorUIProps) {
  const errorMessage = parseApiError({
    error,
    fallback: "An unexpected error occurred",
  });
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="mb-4 text-5xl text-red-400">
        <AlertCircleIcon className="h-10 w-10" />
      </div>
      <p className="mb-2 text-lg font-semibold text-red-500">
        {message || "Error"}
      </p>
      <p className="mb-4 text-gray-500">{errorMessage}</p>
    </div>
  );
}
