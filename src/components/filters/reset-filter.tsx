import { useNavigate } from "react-router";
import { Button } from "../ui/button";

type ResetFilterProps = { className?: string };
export default function ResetFilter({ className }: ResetFilterProps) {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      onClick={() => navigate("/articles")}
      className={className}
    >
      Reset
    </Button>
  );
}
