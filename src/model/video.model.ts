import { PaginateModel } from "./request.model";
import { UserModel } from "./user.model";

export interface VideoModel {
  _id: string;
  url: string;
  embedUrl: string;
  videoId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createBy: UserModel;
}

export interface GetVideosResponse {
  items: VideoModel[];
  totalPage: number;
  totalCount: number;
}

export interface GetVideosParams extends PaginateModel {}
