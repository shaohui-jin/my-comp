import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

/** 本地示例应用（开发调试组件库） */
export default defineConfig({
  root: "examples",
  base: '/my-comp',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "comp-vue-lib": fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
