import axiosInstance from "@/apis/common/axiosInstance.ts";
import { User } from "@/apis/user/type.ts";

export const userAPI = {
  getProfile: async (): Promise<User> =>
    await axiosInstance.get<User>("/profile").then((resp) => resp.data),
};
