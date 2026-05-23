/**
 * 组件库配置系统类型定义
 */

/** 全局主题配置 —— 控制颜色、字体、圆角等基础视觉 */
export interface LibThemeConfig {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;

  textHeading: string;
  textPrimary: string;
  textRegular: string;
  textSecondary: string;

  bgPage: string;
  bgCard: string;
  bgSubtle: string;
  bgMuted: string;

  borderColor: string;
  borderMedium: string;

  fontFamily: string;
  /** 基础字号（px） */
  fontSizeBase: number;
  /** 小号字（px） */
  fontSizeSm: number;

  radiusSm: number;
  radiusMd: number;
}

/** BaseTable 组件级布局配置（仅布局与字号，颜色从 theme 自动派生） */
export interface LibTableConfig {
  rowHeight: number;
  headerHeight: number;
  fontSizeCell: number;
  fontSizeEmpty: number;
  headerFontWeight: number;
  cellFontWeight: number;
  minColumnWidth: number;
  defaultColumnWidth: number;
}

/** 消费者传入的完整配置（所有字段均为可选） */
export interface LibConfig {
  theme?: Partial<LibThemeConfig>;
  table?: Partial<LibTableConfig>;
}

/** 内部使用的完整已解析配置（所有字段均已填充默认值） */
export interface ResolvedLibConfig {
  theme: LibThemeConfig;
  table: LibTableConfig;
}
