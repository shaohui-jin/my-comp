/**
 * 渲染模式
 * - element：Element Plus `el-table` 封装（能力最全，适合常规数据量）
 * - virtual：`el-table-v2` 虚拟滚动（适合万级行 DOM 仍可控）
 * - canvas：单 Canvas 2D，视口内重绘（适合超大数据、结构简单）
 * - canvas-tile：Canvas + 整表预渲染，滚动裁切视口
 * - skia-wasm：CanvasKit（Skia WASM）渲染，需加载 wasm
 */
export type BaseTableMode = "element" | "virtual" | "canvas" | "canvas-tile" | "skia-wasm";

/** 列配置（高性能模式仅使用其中一部分字段） */
export interface BaseTableColumn {
  key: string;
  /** 表头文案，兼容 Table-V2 的 title */
  label?: string;
  title?: string;
  width?: number;
  minWidth?: number;
  align?: "left" | "center" | "right";
  /** 为 false 时隐藏 */
  show?: boolean;
  /** 列类型（element 模式支持较多；canvas 系仅文本化展示） */
  type?:
    | "default"
    | "index"
    | "selection"
    | "formatter"
    | "switch"
    | "image"
    | "status"
    | "status-custom"
    | string;
  formatter?: (row: Record<string, unknown>, column: BaseTableColumn, cellValue: unknown) => string;
  /**
   * `type === 'status-custom'` 时按单元格值取灯色：`colorMap[row[key]]`
   *（与历史项目 BaseTable 一致；键可为数字或字符串）
   */
  colorMap?: Record<string, string>;
  /** 透传给 el-table-column / el-table-v2 Column 的额外属性（经 omit 过滤业务字段后） */
  [key: string]: unknown;
}

export interface BaseTableProps {
  mode: BaseTableMode;
  tableData: Record<string, unknown>[];
  columns: BaseTableColumn[];
  /** 容器高度，如 400px、60vh、100% */
  height?: string;
  rowKey?: string;
  loading?: boolean;
  emptyText?: string;
  rowHeight?: number;
  headerHeight?: number;
  tileSize?: number;
  skiaWasmBaseUrl?: string;
}
