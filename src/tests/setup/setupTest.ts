// src/tests/setup/setupTests.ts
import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@/tests/mocks/server.ts";

// MSW 설정
beforeAll(() => {
  // 모든 요청에 대해 엄격하게 처리
  server.listen({
    onUnhandledRequest: "error", // 처리되지 않은 요청에 대해 에러 발생
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// 네트워크 에러 조용히 처리
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.("Warning: An update to")) return;
  if (args[0]?.includes?.("Error: Request failed with status code")) return;
  originalConsoleError(...args);
};
