import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

/** 将 canvaskit.wasm 和字体复制到构建输出的 assets 目录，供 skia-wasm 模式运行时加载 */
function copySkiaAssets(): import("vite").Plugin {
  return {
    name: "copy-skia-assets",
    closeBundle() {
      const root = fileURLToPath(new URL("..", import.meta.url));
      const destDir = resolve(root, "dist-playground/assets");
      mkdirSync(destDir, { recursive: true });
      try {
        copyFileSync(
          resolve(root, "node_modules/canvaskit-wasm/bin/canvaskit.wasm"),
          resolve(destDir, "canvaskit.wasm"),
        );
      } catch {
        /* canvaskit-wasm 未安装时跳过 */
      }
      try {
        copyFileSync(
          resolve(
            root,
            "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff2",
          ),
          resolve(destDir, "NotoSansSC-400.woff2"),
        );
      } catch {
        /* @fontsource/noto-sans-sc 未安装时跳过 */
      }
    },
  };
}

/** 本地示例应用（开发调试组件库） */
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/my-comp",
  build: {
    outDir: "../dist-playground",
    emptyOutDir: true,
  },
  plugins: [vue(), copySkiaAssets()],
  resolve: {
    alias: [
      { find: "@/style", replacement: fileURLToPath(new URL("../packages/comp/src/style", import.meta.url)) },
      { find: "@", replacement: fileURLToPath(new URL("../packages/comp/src", import.meta.url)) },
      { find: "jsh-comp/type", replacement: fileURLToPath(new URL("../packages/comp/src/type/index.ts", import.meta.url)) },
      { find: "jsh-comp", replacement: fileURLToPath(new URL("../packages/comp/src/index.ts", import.meta.url)) },
      { find: "jsh-core", replacement: fileURLToPath(new URL("../packages/core/src/index.ts", import.meta.url)) },
      { find: "jsh-tool/color", replacement: fileURLToPath(new URL("../packages/tool/src/color.ts", import.meta.url)) },
      { find: "jsh-tool/number", replacement: fileURLToPath(new URL("../packages/tool/src/number.ts", import.meta.url)) },
      { find: "jsh-tool", replacement: fileURLToPath(new URL("../packages/tool/src/index.ts", import.meta.url)) },
    ],
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
