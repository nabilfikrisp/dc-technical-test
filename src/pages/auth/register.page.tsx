import RegisterForm from "@/components/forms/register.form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="from-background to-muted flex flex-1 items-center justify-center bg-gradient-to-br">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join TravelTalk and start your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <RegisterForm />
          <div className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
