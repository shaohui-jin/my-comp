import type { App } from "vue";
import {
  BaseTable,
  EmptyPlaceholder,
  HelloButton,
  SearchBar,
  StatusTag,
  TextLink,
} from "./components";

export { BaseTable, EmptyPlaceholder, HelloButton, SearchBar, StatusTag, TextLink };

export type { HelloButtonProps } from "./components/hello-button/types";
export type { EmptyPlaceholderProps } from "./components/empty-placeholder/types";
export type { SearchBarProps } from "./components/search-bar/types";
export type { StatusTagProps, StatusTagType } from "./components/status-tag/types";
export type { TextLinkProps } from "./components/text-link/types";
export type { BaseTableColumn, BaseTableMode, BaseTableProps } from "./components/crud/base-table/types";
export { tableLayoutDefaults } from "./components/crud/base-table/theme/tableSurface";

const components = [HelloButton, StatusTag, EmptyPlaceholder, TextLink, SearchBar, BaseTable];

export default {
  install(app: App) {
    components.forEach((c) => {
      app.component(c.name ?? "AnonymousComponent", c);
    });
  },
};
