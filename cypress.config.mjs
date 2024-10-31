import { defineConfig } from "cypress";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // 플러그인 및 이벤트 설정
    },
  },
  video: false,
  env: {
    apiUrl: "http://localhost:8080/api", // API 엔드포인트 설정
  },
});
