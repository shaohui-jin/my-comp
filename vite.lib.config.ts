import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

/** 将 canvaskit.wasm、Noto SC 字重复制到 dist/assets，供打包后使用（与 index 同包分发） */
function copySkiaAssets(): import("vite").Plugin {
  return {
    name: "copy-skia-assets",
    closeBundle() {
      const root = fileURLToPath(new URL(".", import.meta.url));
      const destDir = resolve(root, "dist/assets");
      mkdirSync(destDir, { recursive: true });
      copyFileSync(
        resolve(root, "node_modules/canvaskit-wasm/bin/canvaskit.wasm"),
        resolve(destDir, "canvaskit.wasm"),
      );
      try {
        copyFileSync(
          resolve(
            root,
            "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2",
          ),
          resolve(destDir, "NotoSansSC-400.woff2"),
        );
      } catch {
        /* 未安装 @fontsource/noto-sans-sc 时跳过，运行时使用 Typeface.GetDefault() */
      }
    },
  };
}

export default defineConfig({
  plugins: [
    vue(),
    copySkiaAssets(),
    dts({
      tsconfigPath: "tsconfig.lib.json",
      entryRoot: "src",
      outDir: "dist",
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "CompVueLib",
      fileName: (format) => (format === "es" ? "index.mjs" : "index.js"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "vue",
        "element-plus",
        /^element-plus\//,
        "@element-plus/icons-vue",
        "lodash-es",
        "canvaskit-wasm",
      ],
      output: {
        exports: "named",
        assetFileNames: "style[extname]",
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@element-plus/icons-vue": "ElementPlusIconsVue",
          "lodash-es": "_",
          "canvaskit-wasm": "CanvasKitInit",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
