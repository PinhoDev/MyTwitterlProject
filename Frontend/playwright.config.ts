import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e",
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173",
    headless: false,
    video: "on",
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 1000,
    },
  },
});
