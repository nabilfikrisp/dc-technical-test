import { parseApiError } from "@/lib/utils";

type ErrorUIProps = {
  error: unknown;
};
export default function ErrorUI({ error }: ErrorUIProps) {
  const errorMessage = parseApiError({
    error,
    fallback: "An unexpected error occurred",
  });
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="mb-4 text-5xl text-red-400">⚠️</div>
      <p className="mb-2 text-lg font-semibold text-red-500">
        Error loading articles
      </p>
      <p className="mb-4 text-gray-500">{errorMessage}</p>
    </div>
  );
}
