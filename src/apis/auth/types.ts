import { User } from "@/apis/user/type.ts";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  user: User;

  tokens: Token;
};
export type LogoutResponse = {
  success: boolean;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignupResponse = Omit<SignupRequest, "password">;
