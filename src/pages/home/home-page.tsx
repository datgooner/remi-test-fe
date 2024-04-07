import { Loading } from "@/components/ui/loading";
import { useGetVideos } from "@/hooks/query/useGetVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { YoutubeVideo } from "./youtube-video";

const HomePage = () => {
  const {
    data: videos,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetVideos({ limit: 10 });

  return (
    <div className="mx-auto max-w-screen-xl p-10 relative">
      <InfiniteScroll
        dataLength={videos?.length || 0} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loading className="mt-4" />}
        className="flex flex-col items-center gap-10"
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 className="w-40">&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 className="w-40">&#8593; Release to refresh</h3>
        }
      >
        {videos?.map((video) => <YoutubeVideo key={video._id} {...video} />)}
      </InfiniteScroll>
    </div>
  );
};
export default HomePage;
