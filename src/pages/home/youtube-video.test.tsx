import { render } from "@testing-library/react";
import { YoutubeVideo, YoutubeVideoSkeleton } from "./youtube-video";

const mockVideo = {
  embedUrl: "https://www.youtube.com/embed/123456",
  title: "Test Video",
  description: "This is a test video description.",
  createBy: { email: "test@example.com", _id: "userId" },
  _id: "id",
  url: "url",
  videoId: "videoId",
  createdAt: "",
  updatedAt: "",
};

describe("YoutubeVideo component", () => {
  it("to match snapshot", () => {
    const tree = render(<YoutubeVideo {...mockVideo} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders youtube video details correctly", () => {
    const { getByText, getByTestId } = render(<YoutubeVideo {...mockVideo} />);

    // Check if title, email, and description are rendered
    expect(getByText(mockVideo.title)).toBeInTheDocument();
    expect(getByText(`${mockVideo.createBy.email}`)).toBeInTheDocument();
    expect(getByText(mockVideo.description)).toBeInTheDocument();

    // Check if the iframe is rendered with correct attributes
    const iframe = getByTestId("video-iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toBe(mockVideo.embedUrl);
    expect(iframe.getAttribute("title")).toBe(mockVideo.title);
    expect(iframe.getAttribute("frameBorder")).toBe("0");
    expect(iframe.getAttribute("allow")).toBe(
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    expect(iframe.getAttribute("referrerPolicy")).toBe(
      "strict-origin-when-cross-origin"
    );
    expect(iframe.getAttribute("allowFullScreen")).toBe("");
    expect(iframe.getAttribute("class")).toContain("h-full w-full");
    expect(iframe.getAttribute("loading")).toBe("lazy");
  });
});

describe("YoutubeVideoSkeleton component", () => {
  it("to match snapshot", () => {
    const tree = render(<YoutubeVideoSkeleton />);
    expect(tree).toMatchSnapshot();
  });
});
