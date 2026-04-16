/**
 * 表格类组件共用的列配置（宽松结构，便于业务扩展字段）。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableColumn = Record<string, any> & { key: string };
