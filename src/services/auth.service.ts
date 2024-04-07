import { request } from "@/lib/request";
import { LoginRequest, LoginResponse } from "@/model/auth.model";
import { UserModel } from "@/model/user.model";

export const loginOrRegister = (loginRequest: LoginRequest) => {
  return request.post<LoginResponse, LoginResponse>("/auth", loginRequest);
};

export const getMe = () => {
  return request.get<UserModel, UserModel>("/users/me");
};
