import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.json",
      outDir: "dist",
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@/style": fileURLToPath(new URL("./src/style", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "type/index": resolve(__dirname, "src/type/index.ts"),
        "type/basic": resolve(__dirname, "src/type/basic.ts"),
        "type/crud": resolve(__dirname, "src/type/crud.ts"),
        "type/interaction": resolve(__dirname, "src/type/interaction.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const ext = format === "es" ? "mjs" : "js";
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: [
        "vue",
        /^vue\//,
        "element-plus",
        /^element-plus\//,
        "@element-plus/icons-vue",
        "lodash-es",
        /^lodash-es\//,
        "canvaskit-wasm",
        "jsh-core",
        /^jsh-core\//,
        "jsh-tool",
        /^jsh-tool\//,
      ],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
