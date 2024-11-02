import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  Token,
} from "@/apis/auth/types.ts";
import axiosInstance from "@/apis/common/axiosInstance.ts";
import { ApiResponse } from "@/apis/common/types.ts";

export const authAPI = {
  signIn: async (data: LoginRequest): Promise<LoginResponse> =>
    await axiosInstance
      .post<LoginResponse>("/auth/login", data)
      .then((resp) => resp.data),

  signUp: async (data: SignupRequest): Promise<SignupResponse> =>
    await axiosInstance
      .post<SignupResponse>("/auth/signup", data)
      .then((resp) => resp.data),

  logout: async (): Promise<{ success: boolean }> =>
    await axiosInstance
      .post<{ success: boolean }>("/auth/logout")
      .then((resp) => resp.data),

  getAccessToken: async () =>
    await axiosInstance.post<ApiResponse<Token>>("/auth/refresh"),
};
