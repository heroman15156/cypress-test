import { http, HttpResponse } from "msw";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
  Token,
} from "@/apis/auth/types.ts";
import { User } from "@/apis/user/type.ts";
import { API_URL } from "@/apis/common/axiosInstance.ts";

type ErrorResponse = { message: string; code?: string };

export const handlers = [
  http.post<never, LoginRequest, LoginResponse | ErrorResponse>(
    `${API_URL}/auth/login`,
    async ({ request }) => {
      const body = (await request.json()) as LoginRequest;

      if (
        body.email === "test@example.com" &&
        body.password === "password123"
      ) {
        return HttpResponse.json<LoginResponse>(
          {
            tokens: {
              accessToken: "mock-access-token",
              refreshToken: "mock-refresh-token",
            },
            user: {
              id: "1",
              email: body.email,
              name: "Test User",
            },
          },
          { status: 200 },
        );
      }

      return HttpResponse.json<ErrorResponse>(
        {
          message: "Invalid credentials",
          code: "AUTH_INVALID_CREDENTIALS",
        },
        { status: 401 },
      );
    },
  ),

  http.post<never, SignupRequest, SignupResponse | ErrorResponse>(
    `${API_URL}/auth/signup`,
    async ({ request }) => {
      const body = (await request.json()) as SignupRequest;
      const { email, password, name } = body;
      if (!name || !email || !password) {
        return HttpResponse.json<ErrorResponse>(
          {
            message: "Missing required fields",
            code: "VALIDATION_ERROR",
          },
          { status: 400 },
        );
      }
      return HttpResponse.json<SignupResponse>(
        {
          email: body.email,
          name: body.name,
        },
        { status: 201 },
      );
    },
  ),

  http.get<never, never, User | ErrorResponse>(
    `${API_URL}/profile`,
    ({ request }) => {
      const header = request.headers.get("Authorization");

      if (!header || !header.startsWith("Bearer")) {
        return HttpResponse.json<ErrorResponse>(
          {
            message: "Unauthorized",
            code: "AUTH_REQUIRED",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json<User>(
        {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        { status: 200 },
      );
    },
  ),

  http.post<never, never, Token | ErrorResponse>("/api/auth/refresh", () => {
    return HttpResponse.json<Token>(
      {
        accessToken: "new-mock-access-token",
        refreshToken: "new-mock-refresh-token",
      },
      { status: 200 },
    );
  }),

  http.post<never, never, LogoutResponse>("/api/auth/logout", () => {
    return HttpResponse.json<LogoutResponse>(
      { success: true },
      { status: 200 },
    );
  }),
];
