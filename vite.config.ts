/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // reactRefresh({
    //   excludeExports: ["mapStateToProps", "mapDispatchToProps"],
    // }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__test__/setup.js",
  },
});
