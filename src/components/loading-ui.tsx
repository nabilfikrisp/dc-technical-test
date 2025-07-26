import { LoaderCircleIcon } from "lucide-react";

type LoadingUIProps = {
  message?: string;
};
export default function LoadingUI({ message = "Loading..." }: LoadingUIProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1024px] flex-1 items-center justify-center">
      <LoaderCircleIcon className="mr-2 animate-spin" />
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
