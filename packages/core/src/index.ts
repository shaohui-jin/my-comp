export { createCompLib } from "./config/configInjection";
export { default as ConfigProvider } from "./config/ConfigProvider.vue";
export { elementPlusLocale } from "./config/elementPlusLocale";
export { useLibConfig } from "./config/useLibConfig";
export { defaultLibConfig } from "./config/configDefaults";
export type {
  LibConfig,
  LibThemeConfig,
  LibTableConfig,
  ResolvedLibConfig,
} from "./config/configTypes";
export type { PersistOptions } from "./config/configInjection";
export { libColorDefaults } from "./style/colorDefaults";
