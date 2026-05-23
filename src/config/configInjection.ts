import type { App, InjectionKey } from "vue";
import { reactive, watchEffect } from "vue";
import type { LibConfig, ResolvedLibConfig } from "./configTypes";
import { defaultLibConfig } from "./configDefaults";

/** provide/inject 用的 key */
export const LIB_CONFIG_KEY: InjectionKey<ResolvedLibConfig> = Symbol("comp-lib-config");

/** 持久化选项 */
export interface PersistOptions {
  /** localStorage key，默认 "comp-lib-config" */
  key?: string;
  /** 是否启用持久化 */
  enabled: boolean;
}

// ─── localStorage 工具 ───────────────────────────────────────

const DEFAULT_STORAGE_KEY = "comp-lib-config";

function readFromStorage(key?: string): LibConfig | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(key ?? DEFAULT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function writeToStorage(config: LibConfig, key?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key ?? DEFAULT_STORAGE_KEY, JSON.stringify(config));
  } catch { /* quota exceeded 等异常静默 */ }
}

function clearStorage(key?: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key ?? DEFAULT_STORAGE_KEY);
}

// ─── 核心逻辑 ────────────────────────────────────────────────

/** 深度合并用户配置与默认值 */
function resolveConfig(userConfig?: LibConfig): ResolvedLibConfig {
  const theme = { ...defaultLibConfig.theme, ...userConfig?.theme };
  const table = { ...defaultLibConfig.table, ...userConfig?.table };
  return { theme, table };
}

/** 将 resolved config 映射为 CSS 自定义属性名/值 */
function configToCssVars(config: ResolvedLibConfig): Record<string, string> {
  const { theme, table } = config;
  return {
    "--comp-color-primary": theme.colorPrimary,
    "--comp-color-success": theme.colorSuccess,
    "--comp-color-warning": theme.colorWarning,

    "--comp-text-heading": theme.textHeading,
    "--comp-text-primary": theme.textPrimary,
    "--comp-text-regular": theme.textRegular,
    "--comp-text-secondary": theme.textSecondary,

    "--comp-bg-page": theme.bgPage,
    "--comp-bg-card": theme.bgCard,
    "--comp-bg-subtle": theme.bgSubtle,
    "--comp-bg-muted": theme.bgMuted,

    "--comp-border-color": theme.borderColor,
    "--comp-border-medium": theme.borderMedium,

    "--comp-font-family": theme.fontFamily,
    "--comp-font-size-base": `${theme.fontSizeBase}px`,
    "--comp-font-size-sm": `${theme.fontSizeSm}px`,

    "--comp-radius-sm": `${theme.radiusSm}px`,
    "--comp-radius-md": `${theme.radiusMd}px`,

    "--comp-table-row-height": `${table.rowHeight}px`,
    "--comp-table-header-height": `${table.headerHeight}px`,
    "--comp-table-font-size-cell": `${table.fontSizeCell}px`,
    "--comp-table-font-size-empty": `${table.fontSizeEmpty}px`,
    "--comp-table-header-font-weight": String(table.headerFontWeight),
    "--comp-table-cell-font-weight": String(table.cellFontWeight),
  };
}

/** 将 CSS 变量注入到指定 element（默认 :root） */
function applyCssVars(config: ResolvedLibConfig, el?: HTMLElement): void {
  const target = el ?? document.documentElement;
  const vars = configToCssVars(config);
  Object.entries(vars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
}

/**
 * 创建组件库插件（工厂模式）
 *
 * @param userConfig - 用户初始配置（代码级别，优先级低于 localStorage）
 * @param persist - 持久化选项，启用后配置变更自动存入 localStorage
 *
 * @example
 * ```ts
 * import { createCompLib } from "comp-vue-lib";
 * const lib = createCompLib(
 *   { theme: { colorPrimary: "#6366f1" } },
 *   { enabled: true }
 * );
 * app.use(lib);
 * ```
 */
export function createCompLib(userConfig?: LibConfig, persist?: PersistOptions) {
  const storageKey = persist?.key ?? DEFAULT_STORAGE_KEY;
  const base = resolveConfig(userConfig);

  // 如果启用持久化，从 localStorage 读取覆盖
  const stored = persist?.enabled ? readFromStorage(storageKey) : undefined;
  const initial: ResolvedLibConfig = stored
    ? { theme: { ...base.theme, ...stored.theme }, table: { ...base.table, ...stored.table } }
    : base;

  const resolved = reactive(initial) as ResolvedLibConfig;

  return {
    install(app: App) {
      app.provide(LIB_CONFIG_KEY, resolved);

      if (typeof document !== "undefined") {
        applyCssVars(resolved);
      }

      app.config.globalProperties.$compLibConfig = resolved;
    },

    /** 运行时更新配置（响应式更新 + CSS 变量同步 + 可选持久化） */
    updateConfig(newConfig: LibConfig) {
      if (newConfig.theme) Object.assign(resolved.theme, newConfig.theme);
      if (newConfig.table) Object.assign(resolved.table, newConfig.table);

      if (typeof document !== "undefined") {
        applyCssVars(resolved);
      }

      if (persist?.enabled) {
        writeToStorage(
          { theme: { ...resolved.theme }, table: { ...resolved.table } },
          storageKey,
        );
      }
    },

    /** 重置配置：将默认配置写入 localStorage，还原为 defaults + userConfig */
    resetConfig() {
      Object.assign(resolved.theme, base.theme);
      Object.assign(resolved.table, base.table);

      if (persist?.enabled) {
        writeToStorage({ theme: base.theme, table: base.table }, storageKey);
      }

      if (typeof document !== "undefined") {
        applyCssVars(resolved);
      }
    },

    /** 当前已解析的完整配置（响应式） */
    config: resolved,
  };
}

export { resolveConfig, applyCssVars, configToCssVars };

/** watchEffect 辅助：当 config 变化时自动同步 CSS 变量到目标元素 */
export function useCssVarsSync(config: ResolvedLibConfig, el?: () => HTMLElement | null) {
  watchEffect(() => {
    const target = el?.() ?? (typeof document !== "undefined" ? document.documentElement : null);
    if (!target) return;
    const vars = configToCssVars(config);
    Object.entries(vars).forEach(([key, value]) => {
      target.style.setProperty(key, value);
    });
  });
}
