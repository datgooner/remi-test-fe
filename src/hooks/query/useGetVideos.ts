import { getVideos } from "@/services/video.service";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseGetVideosProps {
  limit: number;
}
const useGetVideos = ({ limit = 10 }: UseGetVideosProps) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["getVideos", limit],
    queryFn: async ({ pageParam }) =>
      await getVideos({ limit, skip: limit * pageParam }),
    getNextPageParam(lastPage, _, lastPageParam) {
      if (lastPageParam + 1 < lastPage.totalPage) {
        return lastPageParam + 1;
      }
    },
    select(data) {
      return data?.pages?.flatMap((page) => page.items);
    },
  });
};
export { useGetVideos };
