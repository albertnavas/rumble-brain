import { defineConfig, devices } from "@playwright/test";

import fs from "node:fs";

// require('dotenv').config();

const userInfo = fs.readFileSync(
  `./tests/end-to-end/test-userInfo.json`,
  "utf-8"
);

const STORAGE_STATE = {
  cookies: [],
  origins: [
    {
      origin: "http://localhost:5173",
      localStorage: [
        {
          name: "test",
          value: "ola",
        },
        {
          name: "userInfo",
          value: userInfo,
        },
      ],
    },
  ],
};

export default defineConfig({
  testDir: "./tests/end-to-end",
  outputDir: "./tests/end-to-end/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE,
      },
    },
  ],
  webServer: [
    {
      command: "npm run test-end-to-end:server",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev:client",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
