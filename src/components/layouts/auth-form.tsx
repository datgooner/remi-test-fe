import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import { extractErrorMessage } from "@/lib/utils";
import { LoginRequest } from "@/model/auth.model";
import { loginOrRegister } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().min(1, "Please enter email").email("Email invalid"),
  password: z
    .string()
    .min(1, "Please enter password")
    .min(8, "Password at least 8 characters"),
});

const AuthForm = () => {
  const { mutateAsync: loginOrRegisterFn, isPending } = useMutation({
    mutationFn: (values: LoginRequest) => loginOrRegister(values),
  });
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginValidationSchema>) => {
    const result = loginValidationSchema.safeParse(values);

    if (!result.success) {
      result.error.errors
        .flatMap((err) => err.message)
        .forEach((mess) => {
          toast({
            variant: "destructive",
            description: mess,
          });
        });
      return;
    }
    try {
      const response = await loginOrRegisterFn(values);
      setToken(response.token);
      toast({
        variant: "success",
        description: "Login Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: extractErrorMessage(error, "Error"),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  );
};
export { AuthForm };

const ButtonSubmit = ({ isPending }: { isPending: boolean }) => {
  const { formState } = useFormContext<z.infer<typeof loginValidationSchema>>();

  return (
    <Button
      type="submit"
      disabled={
        isPending ||
        !(formState.dirtyFields.email && formState.dirtyFields.password)
      }
    >
      {isPending && <Loading className="mr-2" />}
      <span className="hidden md:inline">Login / Register</span>
      <span className="inline md:hidden">
        <LogIn width={16} height={16} />
      </span>
    </Button>
  );
};
