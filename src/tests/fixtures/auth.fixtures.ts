import { LoginRequest, LoginResponse } from "@/apis/auth/types.ts";
import { User } from "@/apis/user/type.ts";

export const mockUser: User = {
  id: "1",
  email: "test@example.com",
  name: "Test User",
};

export const mockLoginRequest: LoginRequest = {
  email: "test@example.com",
  password: "password123",
};

export const mockLoginResponse: LoginResponse = {
  tokens: {
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  },
  user: mockUser,
};

export const mockErrorResponses = {
  invalidCredentials: {
    message: "Invalid credentials",
    code: "AUTH_INVALID_CREDENTIALS",
  },
  tokenExpired: {
    message: "Token expired",
    code: "AUTH_TOKEN_EXPIRED",
  },
  networkError: {
    message: "Network Error",
    code: "NETWORK_ERROR",
  },
} as const;
