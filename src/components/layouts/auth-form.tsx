import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const AuthForm = () => {
  const loginValidationSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .trim()
          .min(1, "Please enter email")
          .email("Email invalid"),
        password: z.string().min(1, "Please enter password"),
      }),
    []
  );

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
    console.log("🚀 ~ onSubmit ~ values:", values);
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
        <Button type="submit">Sign in / Sign up</Button>
      </form>
    </Form>
  );
};
export { AuthForm };
