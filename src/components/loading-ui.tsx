type LoadingUIProps = {
  message?: string;
};
export default function LoadingUI({ message = "Loading..." }: LoadingUIProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
