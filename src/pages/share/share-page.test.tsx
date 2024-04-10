import { Toaster } from "@/components/ui/toaster";
import { shareVideo } from "@/services/video.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Mock } from "vitest";
import SharePage from "./share-page";

vi.mock("@/services/video.service", () => ({
  shareVideo: vi.fn(),
}));

const queryClient = new QueryClient();

describe("SharePage component", () => {
  it("should render correctly", () => {
    const { getByText, getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
      </QueryClientProvider>
    );

    expect(getByText("Share a Youtube movie")).toBeInTheDocument();
    expect(getByLabelText("Youtube URL:")).toBeInTheDocument();
    expect(getByText("Share")).toBeInTheDocument();
  });

  it("should validate the input value", async () => {
    const { getByText, getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
      </QueryClientProvider>
    );

    const input = getByLabelText("Youtube URL:");
    const shareButton = getByText("Share");

    fireEvent.change(input, { target: { value: "invalidLink" } });

    (shareVideo as Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100))
    );
    fireEvent.click(shareButton);
    await waitFor(() => {
      expect(getByText("Invalid url")).toBeInTheDocument();
    });
  });

  it("should show loading indicator while submitting", async () => {
    const { getByText, getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
      </QueryClientProvider>
    );

    const input = getByLabelText("Youtube URL:");
    const shareButton = getByText("Share");

    fireEvent.change(input, { target: { value: "http://youtube.com/abc" } });

    (shareVideo as Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100))
    );
    fireEvent.click(shareButton);
    await waitFor(() => {
      expect(getByText("Share")).toBeDisabled();
    });
    await waitFor(() => {
      expect(getByText("Share")).not.toBeDisabled();
    });
  });

  it("should show success message after successful submission and refetch video list", async () => {
    const { getByText, getByLabelText, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
        <Toaster />
      </QueryClientProvider>
    );

    const input = getByLabelText("Youtube URL:");
    const shareButton = getByText("Share");
    (shareVideo as Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100))
    );
    fireEvent.change(input, { target: { value: "http://youtube.com/ab" } });
    fireEvent.click(shareButton);

    waitFor(() => {
      expect(vi.spyOn(queryClient, "invalidateQueries")).toHaveBeenCalledWith({
        queryKey: ["getVideos"],
      });
    });

    expect(await findByText("Successfully")).toBeInTheDocument();
  });

  it("should show error message after failing submission", async () => {
    const { getByText, getByLabelText, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <SharePage />
        <Toaster />
      </QueryClientProvider>
    );

    const input = getByLabelText("Youtube URL:");
    const shareButton = getByText("Share");
    const error = "error message";
    (shareVideo as Mock).mockImplementation(
      () =>
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject({
                message: error,
              }),
            100
          )
        )
    );
    fireEvent.change(input, { target: { value: "http://youtube.com/ab" } });
    fireEvent.click(shareButton);

    expect(await findByText(error)).toBeInTheDocument();
  });
});
