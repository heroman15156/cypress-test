import {
  beforeEach,
  describe,
  vi,
  it,
  afterAll,
  expect,
  beforeAll,
} from "vitest";
import { server } from "@/tests/mocks/server.ts";
import { act, renderHook } from "@testing-library/react";
import useAuthStore from "@/store/useAuthStore.ts";
import useAuth from "@/hooks/auth/useAuth.ts";
import { createTestWrapper } from "@/tests/setup/testUtil.tsx";

import { mockLoginRequest, mockUser } from "@/tests/fixtures/auth.fixtures.ts";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { returnPath: "/dashboard" } }),
    // BrowserRouter는 children을 그대로 반환하는 컴포넌트로 대체
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  };
});

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...(actual as any),
    create: () => ({
      ...(actual as any).create(),
      interceptors: {
        request: { use: vi.fn(), eject: vi.fn() },
        response: { use: vi.fn(), eject: vi.fn() },
      },
    }),
  };
});
describe("useAuth", () => {
  beforeAll(() => {
    // 테스트 시작 전 MSW 서버 시작
    server.listen();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    server.resetHandlers();
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAccessToken(null);
      result.current.setUser(null);
    });
  });

  afterAll(() => {
    server.close();
  });

  describe("로그인 프로세스", () => {
    it("성공적인 로그인 후 상태가 올바르게 업데이트되어야 함", async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createTestWrapper(),
      });

      await act(async () => {
        await result.current.loginMutation.mutateAsync(mockLoginRequest);
      });

      expect(result.current.isLogin).toBe(true);
      expect(result.current.userInfo).toEqual(mockUser);
    });
  });
});
