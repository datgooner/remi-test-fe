import { getVideos } from "@/services/video.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react";
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
  {
    embedUrl: "https://www.youtube.com/embed/123456a",
    title: "Test Video 3",
    description: "This is a test video description. 2",
    createBy: { email: "test@example.com", _id: "userId" },
    _id: "id3",
    url: "url2",
    videoId: "videoId2",
    createdAt: "",
    updatedAt: "",
  },
  {
    embedUrl: "https://www.youtube.com/embed/123456a",
    title: "Test Video 4",
    description: "This is a test video description. 2",
    createBy: { email: "test@example.com", _id: "userId" },
    _id: "id4",
    url: "url2",
    videoId: "videoId2",
    createdAt: "",
    updatedAt: "",
  },
];
vi.mock("@/services/video.service", () => ({
  getVideos: vi.fn(),
}));

describe("HomePage component", () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = new QueryClient();
  });
  it("should render correctly when fetching data", async () => {
    const queryClient = new QueryClient();

    (getVideos as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() =>
            resolve({ items: mockVideos, totalPage: 2, totalCount: 4 })
          )
        )
    );
    const { findByTestId, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );
    // loading state
    expect(await findByTestId("loading-container")).toBeInTheDocument();
    // end loading
    expect(await findByTestId("loading-container")).not.toBeInTheDocument();
    // render movies
    expect(await findByText(mockVideos[0].title)).toBeInTheDocument();
    expect(await findByText(mockVideos[1].title)).toBeInTheDocument();
  });

  it("should load more movies after scrolling to end", async () => {
    (getVideos as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() =>
            resolve({
              items: mockVideos.slice(0, 2),
              totalPage: 2,
              totalCount: 4,
            })
          )
        )
    );
    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );
    // rendered movies
    expect(await findByText(mockVideos[0].title)).toBeInTheDocument();
    expect(await findByText(mockVideos[1].title)).toBeInTheDocument();

    (getVideos as Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() =>
            resolve({
              items: mockVideos.slice(2, 4),
              totalPage: 2,
              totalCount: 4,
            })
          )
        )
    );
    fireEvent.scroll(window, { target: { scrollY: 200000 } });
    expect(await findByText(mockVideos[2].title)).toBeInTheDocument();
    expect(await findByText(mockVideos[3].title)).toBeInTheDocument();
  });
});
