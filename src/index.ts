import type { App } from "vue";
import {
  BaseTable,
  BaseSearch,
  BaseSearchDrawer,
  BaseColumnSetting,
  EmptyPlaceholder,
  HelloButton,
  SearchBar,
  StatusDot,
  StatusTag,
  TextLink,
} from "./components";
import { createCompLib } from "./config/configInjection";
import ConfigProvider from "./config/ConfigProvider.vue";

export {
  BaseTable,
  BaseSearch,
  BaseSearchDrawer,
  BaseColumnSetting,
  EmptyPlaceholder,
  HelloButton,
  SearchBar,
  StatusDot,
  StatusTag,
  TextLink,
};

// 配置系统
export { createCompLib, ConfigProvider };
export { useLibConfig } from "./config/useLibConfig";
export { defaultLibConfig } from "./config/configDefaults";
export type {
  LibConfig,
  LibThemeConfig,
  LibTableConfig,
  ResolvedLibConfig,
} from "./config/configTypes";
export type { PersistOptions } from "./config/configInjection";

export type { HelloButtonProps } from "./components/hello-button/types";
export type { EmptyPlaceholderProps } from "./components/empty-placeholder/types";
export type { SearchBarProps, SearchBarEmits } from "./components/search-bar/types";
export type { StatusDotProps } from "./components/status-dot/types";
export type { StatusTagProps, StatusTagType } from "./components/status-tag/types";
export type { TextLinkProps, TextLinkEmits } from "./components/text-link/types";
export type {
  BaseTableColumn,
  BaseTableColumnType,
  BaseTableMode,
  BaseTableProps,
  BaseTableEmits,
} from "./components/crud/base-table/types";
export type {
  BaseSearchField,
  BaseSearchFieldType,
  BaseSearchFieldOption,
  BaseSearchProps,
  BaseSearchEmits,
} from "./components/crud/base-search/types";
export type {
  BaseSearchDrawerProps,
  BaseSearchDrawerEmits,
} from "./components/crud/base-search-drawer/types";
export type {
  BaseColumnSettingColumn,
  BaseColumnSettingProps,
  BaseColumnSettingEmits,
} from "./components/crud/base-column-setting/types";
/** @deprecated 使用 createCompLib 配置代替 */
export {
  tableLayoutDefaults,
  tableSurfaceConfig,
} from "./components/crud/base-table/theme/tableSurface";
export { columnDefaults, normalizeColumns } from "./components/crud/base-table/utils/column";

const components = [
  HelloButton,
  StatusDot,
  StatusTag,
  EmptyPlaceholder,
  TextLink,
  SearchBar,
  BaseTable,
  BaseSearch,
  BaseSearchDrawer,
  BaseColumnSetting,
];

/**
 * 默认插件（向后兼容），不带自定义配置。
 * 推荐使用 createCompLib() 替代。
 */
export default {
  install(app: App) {
    const lib = createCompLib();
    lib.install(app);
    components.forEach((c) => {
      app.component(c.name ?? "AnonymousComponent", c);
    });
  },
};
