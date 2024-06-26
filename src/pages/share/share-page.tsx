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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const validationSchema = z.object({
  url: z.string().trim().min(1, "Please enter url").url("Invalid url"),
});

type ShareFormValue = z.infer<typeof validationSchema>;

const SharePage = () => {
  const { mutateAsync: shareVideoFn, isPending } = useMutation({
    mutationFn: (url: string) => shareVideo(url),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<ShareFormValue>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = (value: ShareFormValue) => {
    shareVideoFn(value.url)
      .then(() => {
        toast({
          variant: "success",
          description: "Successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["getVideos"] });
        navigate("/");
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
        className="mt-20 flex w-full items-center justify-center marker:sm:mt-40"
      >
        <Card className="py-18 mx-4 w-11/12 sm:w-6/12">
          <CardHeader className="mb-4">
            <CardTitle>Share a Youtube movie</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:space-x-4">
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
