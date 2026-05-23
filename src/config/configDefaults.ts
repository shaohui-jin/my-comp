import type { ResolvedLibConfig } from "./configTypes";

/**
 * 组件库全量默认值
 * 色值与 Element Plus 默认主题对齐
 */
export const defaultLibConfig: ResolvedLibConfig = {
  theme: {
    colorPrimary: "#409eff",
    colorSuccess: "#67c23a",
    colorWarning: "#e6a23c",

    textHeading: "#1d2129",
    textPrimary: "#303133",
    textRegular: "#606266",
    textSecondary: "#909399",

    bgPage: "#f5f7fa",
    bgCard: "#ffffff",
    bgSubtle: "#fafbfc",
    bgMuted: "#f4f4f5",

    borderColor: "#ebeef5",
    borderMedium: "#dcdfe6",

    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSizeBase: 14,
    fontSizeSm: 13,

    radiusSm: 3,
    radiusMd: 6,
  },

  table: {
    rowHeight: 36,
    headerHeight: 40,
    fontSizeCell: 13,
    fontSizeEmpty: 14,
    headerFontWeight: 600,
    cellFontWeight: 400,
    minColumnWidth: 64,
    defaultColumnWidth: 120,
  },
};
