<script setup lang="ts">
import { ElImage, ElSwitch, ElTable, ElTableColumn } from "element-plus";
import type { BaseTableColumn } from "../types";
import { tableLayoutDefaults } from "../theme/tableSurface";
import { formatCell, getTableColumnBinds, statusCustomLampColor, visibleColumns } from "../utils/column";

defineOptions({ name: "BaseTableElement" });

defineProps<{
  tableData: Record<string, unknown>[];
  columns: BaseTableColumn[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
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
  <div class="crud-base-table__element">
    <ElTable
      :data="tableData"
      height="100%"
      border
      stripe
      :row-key="rowKey"
      :empty-text="emptyText"
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
          <ElSwitch
            :model-value="scope.row[col.key]"
            :active-value="(col.activeValue as string | number | boolean) ?? true"
            :inactive-value="(col.inactiveValue as string | number | boolean) ?? false"
            :disabled="Boolean(col.disabled)"
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
          <div class="crud-base-table__status-custom">
            <div
              class="crud-base-table__status-custom-lamp"
              :style="{ backgroundColor: statusCustomLampColor(col, scope.row) }"
            />
            <div class="crud-base-table__status-custom-content">
              <div class="crud-base-table__status-custom-text">
                {{ formatCell(col, scope.row, scope.$index) }}
              </div>
            </div>
          </div>
        </ElTableColumn>
        <ElTableColumn
          v-else-if="col.formatter"
          v-bind="getTableColumnBinds(col)"
          :formatter="columnFormatter(col)"
          :show-overflow-tooltip="(col.showOverflowTooltip as boolean) !== false"
        />
        <ElTableColumn
          v-else
          v-bind="getTableColumnBinds(col)"
          :show-overflow-tooltip="(col.showOverflowTooltip as boolean) !== false"
          #default="scope"
        >
          {{ formatCell(col, scope.row, scope.$index) }}
        </ElTableColumn>
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
}

.crud-base-table__element-mask {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgb(255 255 255 / 55%);
  pointer-events: none;
}

/** 与历史 BaseTable `status-custom` 一致：圆点 + 文案 */
.crud-base-table__status-custom {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: auto;
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
