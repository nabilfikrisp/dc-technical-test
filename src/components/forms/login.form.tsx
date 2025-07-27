import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useLoginMutation } from "@/services/auth/mutations";
import { parseApiError } from "@/lib/utils";

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLoginMutation();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    await login(values, {
      onSuccess: () => {
        toast.success("Login successful");
        form.reset();
        navigate("/articles");
      },
      onError: (error: unknown) => {
        const errorMessage = parseApiError({
          error,
          fallback: "Failed to login",
        });
        toast.error(errorMessage);
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Log In
        </Button>
      </form>
    </Form>
  );
}
