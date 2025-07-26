type ErrorUIProps = {
  error: string;
};
export default function ErrorUI({ error }: ErrorUIProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="mb-4 text-5xl text-red-400">⚠️</div>
      <p className="mb-2 text-lg font-semibold text-red-500">
        Error loading articles
      </p>
      <p className="mb-4 text-gray-500">{error}</p>
    </div>
  );
}
