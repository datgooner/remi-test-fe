import { useGetVideos } from "@/hooks/query/useGetVideos";
import { render } from "@testing-library/react";
import { Mock } from "vitest";
import HomePage from "./home-page";

const mockVideos = [
  {
    embedUrl: "https://www.youtube.com/embed/123456",
    title: "Test Video",
    description: "This is a test video description.",
    createBy: { email: "test@example.com", _id: "userId" },
    _id: "id",
    url: "url",
    videoId: "videoId",
    createdAt: "",
    updatedAt: "",
  },
  {
    embedUrl: "https://www.youtube.com/embed/123456a",
    title: "Test Video 2",
    description: "This is a test video description. 2",
    createBy: { email: "test@example.com", _id: "userId" },
    _id: "id2",
    url: "url2",
    videoId: "videoId2",
    createdAt: "",
    updatedAt: "",
  },
];

vi.mock("@/hooks/query/useGetVideos", () => ({
  useGetVideos: vi.fn(),
}));

describe("HomePage component", () => {
  it("should render correctly when fetching data", async () => {
    (useGetVideos as Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      refetch: vi.fn(),
      isLoading: true,
    });
    const { findByTestId } = render(<HomePage />);
    expect(await findByTestId("loading-container")).toBeInTheDocument();
  });

  it("should render correctly after getting data", async () => {
    (useGetVideos as Mock).mockReturnValue({
      data: mockVideos,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      refetch: vi.fn(),
      isLoading: false,
    });
    const { findByText } = render(<HomePage />);
    expect(await findByText(mockVideos[0].title)).toBeInTheDocument();
    expect(await findByText(mockVideos[1].title)).toBeInTheDocument();
  });
});
