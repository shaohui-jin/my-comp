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
  "beforeChange",
  "tableSlot",
  "slotName",
  "click",
  "showOverflowTooltip",
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
  if (col.type === "selection" || col.type === "index") {
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
  if (col.type === "switch") {
    const active = (col.activeValue as string | number | boolean) ?? true;
    return raw === active ? "开" : "关";
  }
  if (col.type === "tableSlot") {
    return "查看";
  }
  if (raw === null || raw === undefined) {
    return "";
  }
  if (typeof raw === "object") {
    return JSON.stringify(raw);
  }
  return String(raw);
}

/**
 * 计算每列像素宽度，与 Element Plus 策略对齐：
 * - 设置了 `width` 的列（含 selection/index 默认宽度）为固定列，宽度不变
 * - 未设置 `width` 的列为弹性列，以 `minWidth` 或 `defaultColumnWidth` 为基准，共享剩余空间
 */
export function layoutColumnWidths(columns: BaseTableColumn[], innerWidth: number): number[] {
  const vis = visibleColumns(columns);
  if (vis.length === 0) {
    return [];
  }
  const minW = tableLayoutDefaults.minColumnWidth;

  const meta = vis.map((c) => {
    if (c.type === "selection") {
      return {
        fixed: true,
        base: Math.max(minW, c.width ?? tableLayoutDefaults.selectionColumnWidth),
      };
    }
    if (c.type === "index") {
      return { fixed: true, base: Math.max(minW, c.width ?? tableLayoutDefaults.indexColumnWidth) };
    }
    if (c.width != null) {
      return { fixed: true, base: Math.max(minW, c.width) };
    }
    return {
      fixed: false,
      base: Math.max(minW, c.minWidth ?? tableLayoutDefaults.defaultColumnWidth),
    };
  });

  const fixedTotal = meta.reduce((s, m) => s + (m.fixed ? m.base : 0), 0);
  const flexItems = meta.filter((m) => !m.fixed);
  const flexBaseTotal = flexItems.reduce((s, m) => s + m.base, 0);
  const remaining = innerWidth - fixedTotal;

  if (flexItems.length === 0) {
    return meta.map((m) => m.base);
  }

  if (remaining >= flexBaseTotal) {
    const extra = remaining - flexBaseTotal;
    const addPerFlex = extra / flexItems.length;
    return meta.map((m) => (m.fixed ? m.base : Math.floor(m.base + addPerFlex)));
  }

  const scale = Math.max(0, remaining / flexBaseTotal);
  return meta.map((m) => (m.fixed ? m.base : Math.max(minW, Math.floor(m.base * scale))));
}

/**
 * switch 列切换：调用 beforeChange 阻断钩子，通过后直接修改 row 数据。
 * 返回切换后的新值；若被阻断则返回 null。
 */
export async function trySwitchToggle(
  row: Record<string, unknown>,
  col: BaseTableColumn,
): Promise<unknown> {
  if (col.disabled) return null;
  const activeVal = (col.activeValue as string | number | boolean) ?? true;
  const inactiveVal = (col.inactiveValue as string | number | boolean) ?? false;
  const newValue = row[col.key] === activeVal ? inactiveVal : activeVal;

  if (col.beforeChange) {
    try {
      const allowed = await col.beforeChange(row, col);
      if (!allowed) return null;
    } catch {
      return null;
    }
  }

  row[col.key] = newValue;
  return newValue;
}
