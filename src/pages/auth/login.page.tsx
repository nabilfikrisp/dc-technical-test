import LoginForm from "@/components/forms/login.form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="from-background to-muted flex flex-1 items-center justify-center bg-gradient-to-br">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-3xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground mb-4">
            Sign in to your TravelTalk account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <LoginForm />
          <div className="text-muted-foreground text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
