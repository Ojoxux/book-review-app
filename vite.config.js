import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.js",
    include: ["src/**/*.test.jsx"], // テストファイルのパターンを指定
    exclude: ["tests/**/*.spec.js"], // 除外するファイルを指定
  },
});
