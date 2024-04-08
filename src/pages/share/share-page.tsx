import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { toast } from "@/components/ui/use-toast";
import { extractErrorMessage } from "@/lib/utils";
import { shareVideo } from "@/services/video.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  url: z.string().trim().min(1, "Please enter url").url("Invalid url"),
});

type ShareFormValue = z.infer<typeof validationSchema>;

const SharePage = () => {
  const { mutateAsync: shareVideoFn, isPending } = useMutation({
    mutationFn: (url: string) => shareVideo(url),
  });

  const form = useForm<ShareFormValue>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = (value: ShareFormValue) => {
    shareVideoFn(value.url)
      .then(() => {
        console.log(value.url);
        toast({
          variant: "success",
          description: "Successfully",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: extractErrorMessage(err, "Error"),
        });
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-24 grid w-full place-items-center"
      >
        <Card className="py-18 w-6/12">
          <CardHeader className="mb-4">
            <CardTitle>Share a Youtube movie</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex flex-row space-x-4">
                  <FormLabel className="mt-4">Youtube URL:</FormLabel>
                  <div className="flex-1 space-y-8">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <Button className="w-full" disabled={isPending}>
                      {isPending && <Loading className="mr-2" />}Share
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
export default SharePage;
