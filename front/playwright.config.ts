import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: process.env.REACT_APP_CLIENT_DOMAIN,
    headless: false,
    launchOptions: {
      slowMo: 700,
    },
  },
});
