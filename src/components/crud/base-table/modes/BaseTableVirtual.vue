<script setup lang="ts">
import { ElAutoResizer, ElCheckbox, ElSwitch, ElTableV2, ElTooltip } from "element-plus";
import type { Column } from "element-plus";
import { defineComponent, h, ref, shallowRef, toRef, watch, PropType } from "vue";
import type { BaseTableColumn } from "../types";
import { tableLayoutDefaults, TABLE_TOOLTIP_POPPER_CLASS } from "../theme/tableSurface";
import { formatCell, layoutColumnWidths, statusCustomLampColor, visibleColumns } from "../utils/column";
import { useBaseTableSelection } from "../utils/useBaseTableSelection";
import TableSlotPopover from "./TableSlotPopover.vue";

const VirtualSwitchCell = defineComponent({
  name: "VirtualSwitchCell",
  props: {
    row: { type: Object as PropType<Record<string, unknown>>, required: true },
    colKey: { type: String, required: true },
    activeValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },
    inactiveValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },
    disabled: { type: Boolean, default: false },
    beforeChange: { type: Function as PropType<() => boolean | Promise<boolean>>, default: undefined },
  },
  setup(props) {
    const localValue = ref(props.row[props.colKey]);
    watch(() => props.row[props.colKey], (v) => { localValue.value = v; });
    return () =>
      h(ElSwitch, {
        modelValue: localValue.value,
        activeValue: props.activeValue,
        inactiveValue: props.inactiveValue,
        disabled: props.disabled,
        beforeChange: props.beforeChange,
        "onUpdate:modelValue": (val: unknown) => {
          localValue.value = val;
          props.row[props.colKey] = val;
        },
      });
  },
});

defineOptions({ name: "BaseTableVirtual" });

const props = defineProps<{
  tableData: Record<string, unknown>[];
  columns: BaseTableColumn[];
  rowHeight: number;
  headerHeight: number;
  rowKey: string;
}>();

const emit = defineEmits<{
  selectionChange: [rows: Record<string, unknown>[]];
}>();

const tableDataRef = toRef(props, "tableData");
const selection = useBaseTableSelection(props.rowKey, tableDataRef);

const virtualTooltipRef = shallowRef<HTMLElement>();
const tooltipVisible = ref(false);
const tooltipContent = ref("");

const OVERFLOW_SELECTOR = ".crud-base-table__virtual-cell, .crud-base-table__status-custom-text";

function onCellMouseover(e: MouseEvent) {
  const cellText = (e.target as HTMLElement).closest?.(OVERFLOW_SELECTOR) as HTMLElement | null;
  if (!cellText || cellText.hasAttribute("data-no-tooltip")) {
    tooltipVisible.value = false;
    return;
  }
  if (cellText === virtualTooltipRef.value && tooltipVisible.value) {
    return;
  }
  if (cellText.scrollWidth > cellText.clientWidth) {
    tooltipContent.value = cellText.textContent || "";
    virtualTooltipRef.value = cellText;
    tooltipVisible.value = true;
  } else {
    tooltipVisible.value = false;
  }
}

function onContainerMouseleave() {
  tooltipVisible.value = false;
}

/** Table-V2 需固定列宽；与 Canvas 系共用 layoutColumnWidths；selection 列用 ElCheckbox 与 Element 表多选一致 */
function v2columnsAt(innerWidth: number): Column<Record<string, unknown>>[] {
  const vis = visibleColumns(props.columns);
  const widths = layoutColumnWidths(props.columns, innerWidth);
  return vis.map((col, i) => {
    const w = widths[i] ?? tableLayoutDefaults.defaultColumnWidth;
    const align =
      col.type === "selection" ? "center" : col.type === "index" ? "center" : col.align ?? "left";

    if (col.type === "selection") {
      return {
        key: col.key,
        dataKey: col.key,
        title: "",
        width: w,
        align,
        headerCellRenderer: () =>
          h(ElCheckbox, {
            modelValue: selection.isAllSelected.value,
            indeterminate: selection.isIndeterminate.value,
            onChange: () => emit("selectionChange", selection.toggleAll()),
          }),
        cellRenderer: ({ rowData }) =>
          h(ElCheckbox, {
            modelValue: selection.isRowSelected(rowData as Record<string, unknown>),
            onChange: () => emit("selectionChange", selection.toggleRow(rowData as Record<string, unknown>)),
          }),
      };
    }

    if (col.type === "index") {
      return {
        key: col.key,
        dataKey: col.key,
        title: "",
        width: w,
        align,
        cellRenderer: ({ rowIndex }) =>
          h("span", { class: "crud-base-table__virtual-cell" }, String(rowIndex + 1)),
      };
    }

    if (col.type === "switch") {
      return {
        key: col.key,
        dataKey: col.key,
        title: String(col.label ?? col.title ?? col.key),
        width: w,
        align: "center",
        cellRenderer: ({ rowData }) => {
          const row = rowData as Record<string, unknown>;
          return h(VirtualSwitchCell, {
            row,
            colKey: col.key,
            activeValue: (col.activeValue as string | number | boolean) ?? true,
            inactiveValue: (col.inactiveValue as string | number | boolean) ?? false,
            disabled: Boolean(col.disabled),
            beforeChange: col.beforeChange
              ? () => col.beforeChange!(row, col)
              : undefined,
          });
        },
      };
    }

    if (col.type === "tableSlot") {
      return {
        key: col.key,
        dataKey: col.key,
        title: String(col.label ?? col.title ?? col.key),
        width: w,
        align,
        cellRenderer: ({ rowData }) =>
          h(TableSlotPopover, {
            row: rowData as Record<string, unknown>,
            column: col,
          }),
      };
    }

    if (col.type === "status-custom") {
      const noTip = col.showOverflowTooltip === false;
      return {
        key: col.key,
        dataKey: col.key,
        title: String(col.label ?? col.title ?? col.key),
        width: w,
        align: "left",
        cellRenderer: ({ rowData, rowIndex }) =>
          h(
            "div",
            {
              class: "crud-base-table__status-custom",
              style: {
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                minWidth: "0",
              },
            },
            [
              h("div", {
                class: "crud-base-table__status-custom-lamp",
                style: {
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  flexShrink: "0",
                  backgroundColor: statusCustomLampColor(col, rowData as Record<string, unknown>),
                },
              }),
              h(
                "div",
                {
                  class: "crud-base-table__status-custom-text",
                  ...(noTip ? { "data-no-tooltip": "" } : {}),
                  style: {
                    marginLeft: "8px",
                    fontSize: "14px",
                    color: "var(--crud-bt-text, #606266)",
                    fontWeight: "500",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                },
                formatCell(col, rowData as Record<string, unknown>, rowIndex),
              ),
            ],
          ),
      };
    }

    const noTip = col.showOverflowTooltip === false;
    return {
      key: col.key,
      dataKey: col.key,
      title: String(col.label ?? col.title ?? col.key),
      width: w,
      align,
      cellRenderer: ({ rowData, rowIndex }) =>
        h(
          "span",
          {
            class: "crud-base-table__virtual-cell",
            ...(noTip ? { "data-no-tooltip": "" } : {}),
          },
          formatCell(col, rowData as Record<string, unknown>, rowIndex),
        ),
    };
  });
}
</script>

<template>
  <div
    class="crud-base-table__virtual"
    @mouseover="onCellMouseover"
    @mouseleave="onContainerMouseleave"
  >
    <ElAutoResizer>
      <template #default="{ height, width }">
        <ElTableV2
          v-if="width > 0 && height > 0"
          :columns="v2columnsAt(width)"
          :data="tableData"
          :width="width"
          :height="height"
          :row-height="props.rowHeight"
          :header-height="props.headerHeight"
          fixed
        />
      </template>
    </ElAutoResizer>
    <ElTooltip
      v-if="virtualTooltipRef"
      :virtual-ref="virtualTooltipRef"
      virtual-triggering
      :visible="tooltipVisible"
      :content="tooltipContent"
      placement="top"
      :teleported="true"
      :show-arrow="true"
      :offset="8"
      :enterable="false"
      :popper-class="TABLE_TOOLTIP_POPPER_CLASS"
    />
  </div>
</template>

<style scoped lang="scss">
.crud-base-table__virtual {
  height: 100%;
  min-height: 0;
}

:deep(.crud-base-table__virtual-cell) {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.crud-base-table__status-custom {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: auto;
  min-width: 0;
}

.crud-base-table__status-custom-lamp {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.crud-base-table__status-custom-content {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  flex: 1 1 0;
  min-width: 0;
}

.crud-base-table__status-custom-text {
  font-size: 14px;
  color: var(--crud-bt-text, #606266);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
