import { Loading } from "@/components/ui/loading";
import { useGetVideos } from "@/hooks/query/useGetVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { YoutubeVideo, YoutubeVideoSkeleton } from "./youtube-video";

const HomePage = () => {
  const {
    data: videos,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useGetVideos({ limit: 5 });

  const renderSkeleton = () => {
    return (
      <div className="p-10" data-testid="loading-container">
        {Array(2)
          .fill(null)
          .map((_, index) => {
            return <YoutubeVideoSkeleton key={index} />;
          })}
      </div>
    );
  };

  return (
    <div className="relative mx-auto max-w-screen-xl overflow-hidden">
      {isLoading ? (
        renderSkeleton()
      ) : (
        <InfiniteScroll
          dataLength={videos?.length || 0} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Loading className="mt-4 w-fit" />}
          className="flex flex-col items-center gap-10 p-10"
          refreshFunction={refetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
        >
          {videos?.map((video) => <YoutubeVideo key={video._id} {...video} />)}
        </InfiniteScroll>
      )}
    </div>
  );
};
export default HomePage;
