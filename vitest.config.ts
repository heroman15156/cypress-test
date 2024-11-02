import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./src/tests/setup/setupTest.ts",
      "./src/tests/setup/testUtil.tsx",
    ],
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
