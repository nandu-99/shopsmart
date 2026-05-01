import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/shopsmart",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.test.{js,jsx}", "src/__tests__/**/*.test.{js,jsx}"],
    exclude: ["node_modules", "tests/e2e/**"],
    reporters: ["default"],
    outputFile: { junit: "./test-results/junit.xml" },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/**/*.test.{js,jsx}",
        "src/__tests__/**",
        "src/setupTests.js",
        "src/main.jsx",
      ],
    },
  },
});
