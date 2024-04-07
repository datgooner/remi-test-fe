import { request } from "@/lib/request";
import { GetVideosParams, GetVideosResponse } from "@/model/video.model";

export const shareVideo = (url: string) => {
  return request.post("/videos/youtube", { url });
};

export const getVideos = (params: GetVideosParams) => {
  return request.get<GetVideosResponse, GetVideosResponse>("/videos", {
    params,
  });
};
