<script setup lang="ts">
import { ElImage, ElTable, ElTableColumn } from "element-plus";
import type { BaseTableColumn } from "../types";
import { tableLayoutDefaults, TABLE_TOOLTIP_POPPER_CLASS } from "../theme/tableSurface";
import { formatCell, getTableColumnBinds, visibleColumns } from "../utils/column";
import CellSwitch from "./CellSwitch.vue";
import CellStatusCustom from "./CellStatusCustom.vue";
import TableSlotPopup from "./TableSlotPopup.vue";

const tooltipOptions = { popperClass: TABLE_TOOLTIP_POPPER_CLASS };

defineOptions({ name: "BaseTableElement" });

const props = defineProps<{
  tableData: Record<string, unknown>[];
  columns: BaseTableColumn[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  /** 嵌套子表格时使用 max-height 而非 height，使表格高度自适应 */
  tableMaxHeight?: number;
}>();

const emit = defineEmits<{
  selectionChange: [rows: Record<string, unknown>[]];
}>();

function onSelectionChange(val: Record<string, unknown>[]) {
  emit("selectionChange", val);
}

function columnFormatter(col: BaseTableColumn) {
  return (row: unknown, _column: unknown, cellValue: unknown) =>
    col.formatter!(row as Record<string, unknown>, col, cellValue);
}
</script>

<template>
  <div :class="['crud-base-table__element', { 'crud-base-table__element--nested': tableMaxHeight != null }]">
    <ElTable
      :data="tableData"
      v-bind="tableMaxHeight != null ? { 'max-height': tableMaxHeight } : { height: '100%' }"
      border
      stripe
      :row-key="rowKey"
      :empty-text="emptyText"
      :tooltip-options="tooltipOptions"
      @selection-change="onSelectionChange"
    >
      <template v-for="(col, ci) in visibleColumns(columns)" :key="`${col.key}-${ci}`">
        <ElTableColumn
          v-if="col.type === 'selection'"
          type="selection"
          :width="tableLayoutDefaults.selectionColumnWidth"
          v-bind="getTableColumnBinds(col)"
        />
        <ElTableColumn
          v-else-if="col.type === 'index'"
          type="index"
          :width="tableLayoutDefaults.indexColumnWidth"
          v-bind="getTableColumnBinds(col)"
        />
        <ElTableColumn
          v-else-if="col.type === 'switch'"
          v-bind="getTableColumnBinds(col)"
          #default="scope"
        >
          <CellSwitch
            :row="scope.row"
            :col-key="col.key"
            :active-value="(col.activeValue as string | number | boolean)"
            :inactive-value="(col.inactiveValue as string | number | boolean)"
            :disabled="Boolean(col.disabled)"
            :before-change="col.beforeChange ? () => col.beforeChange!(scope.row, col) : undefined"
          />
        </ElTableColumn>
        <ElTableColumn
          v-else-if="col.type === 'image'"
          v-bind="getTableColumnBinds(col)"
          #default="scope"
        >
          <ElImage
            :src="String(scope.row[col.key] ?? '')"
            fit="cover"
            style="width: 30px; height: 30px"
            lazy
            :preview-src-list="[String(scope.row[col.key] ?? '')]"
            preview-teleported
          />
        </ElTableColumn>
        <ElTableColumn
          v-else-if="col.type === 'status-custom'"
          v-bind="getTableColumnBinds(col)"
          #default="scope"
        >
          <CellStatusCustom :column="col" :row="scope.row" :row-index="scope.$index" />
        </ElTableColumn>
        <ElTableColumn
          v-else-if="col.type === 'tableSlot'"
          v-bind="getTableColumnBinds(col)"
          #default="scope"
        >
          <TableSlotPopup :row="scope.row" :column="col" />
        </ElTableColumn>
        <ElTableColumn
          v-else-if="col.formatter"
          v-bind="getTableColumnBinds(col)"
          :formatter="columnFormatter(col)"
          class-name="crud-base-table__cell--text"
        />
        <ElTableColumn
          v-else
          v-bind="getTableColumnBinds(col)"
          :prop="col.key"
          class-name="crud-base-table__cell--text"
        />
      </template>
    </ElTable>
    <div v-if="loading" class="crud-base-table__element-mask" />
  </div>
</template>

<style scoped lang="scss">
.crud-base-table__element {
  position: relative;
  height: 100%;
  min-height: 0;

  &--nested {
    height: auto;
  }
}

.crud-base-table__element-mask {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgb(255 255 255 / 55%);
  pointer-events: none;
}

:deep(.crud-base-table__cell--text .cell) {
  white-space: nowrap;
  word-break: normal;
}
</style>
