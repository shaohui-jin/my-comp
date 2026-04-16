import { omit } from "lodash-es";
import { tableLayoutDefaults } from "../theme/tableSurface";
import type { BaseTableColumn } from "../types";

/** 这些字段不传给 el-table-column 的 bind */
const TABLE_BIND_OMIT = [
  "key",
  "label",
  "title",
  "type",
  "formatter",
  "show",
  "groupItems",
  "children",
  "onclick",
  "successText",
  "failText",
  "isSuccess",
  "desc",
  "activeValue",
  "inactiveValue",
  "disabled",
  "colorMap",
  "columns",
  "popoverWidth",
  "filter",
  "filterPlaceholder",
  "objectSpanMethod",
  "tableSlot",
  "slotName",
  "click",
];

/**
 * 传给 `el-table-column` 的绑定。
 * Element Plus 表头依赖 `label`，行数据依赖 `prop`（本库列配置使用 `key` 字段）。
 */
export function getTableColumnBinds(item: BaseTableColumn): Record<string, unknown> {
  const rest = omit(item as unknown as Record<string, unknown>, TABLE_BIND_OMIT);
  return {
    ...rest,
    label: headerText(item),
    prop: item.key,
  };
}

export function visibleColumns(columns: BaseTableColumn[]): BaseTableColumn[] {
  return columns.filter((c) => c.show !== false);
}

export function headerText(col: BaseTableColumn): string {
  if (col.type === "selection") {
    return "";
  }
  return String(col.label ?? col.title ?? col.key);
}

/** 无匹配或未配置 colorMap 时的圆点底色（与历史 status-custom 样式一致） */
export const statusCustomLampDefaultColor = "rgba(203, 206, 212, 1)";

/** `status-custom` 列：根据 `row[col.key]` 在 colorMap 中取灯色 */
export function statusCustomLampColor(col: BaseTableColumn, row: Record<string, unknown>): string {
  if (col.type !== "status-custom") {
    return statusCustomLampDefaultColor;
  }
  const map = col.colorMap;
  if (!map) {
    return statusCustomLampDefaultColor;
  }
  const raw = row[col.key];
  if (raw === null || raw === undefined) {
    return statusCustomLampDefaultColor;
  }
  const hit = map[String(raw)];
  return typeof hit === "string" ? hit : statusCustomLampDefaultColor;
}

export function formatCell(
  col: BaseTableColumn,
  row: Record<string, unknown> | object,
  index: number,
): string {
  const r = row as Record<string, unknown>;
  const raw = r[col.key];
  if (col.formatter) {
    return col.formatter(r, col, raw);
  }
  if (col.type === "index") {
    return String(index + 1);
  }
  if (col.type === "selection") {
    return "";
  }
  if (raw === null || raw === undefined) {
    return "";
  }
  if (typeof raw === "object") {
    return JSON.stringify(raw);
  }
  return String(raw);
}

/** 计算每列像素宽度 */
export function layoutColumnWidths(columns: BaseTableColumn[], innerWidth: number): number[] {
  const vis = visibleColumns(columns);
  if (vis.length === 0) {
    return [];
  }
  const minW = tableLayoutDefaults.minColumnWidth;
  const requested = vis.map((c) => {
    if (c.type === "selection") {
      return Math.max(minW, c.width ?? tableLayoutDefaults.selectionColumnWidth);
    }
    if (c.type === "index") {
      return Math.max(minW, c.width ?? tableLayoutDefaults.indexColumnWidth);
    }
    return Math.max(minW, c.width ?? c.minWidth ?? tableLayoutDefaults.defaultColumnWidth);
  });
  const sum = requested.reduce((a, b) => a + b, 0);
  if (sum <= innerWidth) {
    const extra = innerWidth - sum;
    const add = extra / vis.length;
    return requested.map((w) => Math.floor(w + add));
  }
  const scale = innerWidth / sum;
  return requested.map((w) => Math.max(minW, Math.floor(w * scale)));
}
