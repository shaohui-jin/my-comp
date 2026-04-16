<script setup lang="ts">
import { ref } from "vue";
import { ElButton, ElInput, ElPopover } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { BaseTableColumn } from "../types";
import { tableSurfaceCssVars } from "../theme/tableSurface";
import BaseTableElement from "./BaseTableElement.vue";

defineOptions({ name: "TableSlotPopover" });

const props = defineProps<{
  row: Record<string, unknown>;
  column: BaseTableColumn;
}>();

const filterKeyword = ref("");
const cssVars = tableSurfaceCssVars();

function getFilteredData(): Record<string, unknown>[] {
  const raw = props.row[props.column.key];
  if (!Array.isArray(raw)) return [];
  if (!props.column.filter || !filterKeyword.value) return raw;
  return raw.filter((item: Record<string, unknown>) =>
    props.column.filter!(filterKeyword.value, item),
  );
}
</script>

<template>
  <ElPopover
    placement="bottom"
    :width="(column.popoverWidth as number) || 430"
    trigger="click"
    :teleported="true"
    popper-class="table-slot-popover"
    @before-enter="filterKeyword = ''"
  >
    <template #reference>
      <ElButton type="primary" link>查看</ElButton>
    </template>
    <div class="table-slot-popover__body" :style="cssVars">
      <div v-if="column.filter" class="table-slot-popover__filter">
        <ElInput
          v-model="filterKeyword"
          :prefix-icon="Search"
          :placeholder="(column.filterPlaceholder as string) || '请输入'"
          @keydown.enter.prevent
        />
      </div>
      <BaseTableElement
        :table-data="getFilteredData()"
        :columns="(column.columns as BaseTableColumn[]) ?? []"
        :table-max-height="310"
      />
    </div>
  </ElPopover>
</template>

<style lang="scss">
.table-slot-popover__filter {
  margin-bottom: 12px;
}

.table-slot-popover__body {
  .el-table {
    font-size: var(--crud-bt-font-size);
    color: var(--crud-bt-text);
    background-color: var(--crud-bt-surface-bg);
  }

  .el-table th.el-table__cell {
    color: var(--crud-bt-header-text);
    background-color: var(--crud-bt-header-bg) !important;
    font-weight: var(--crud-bt-header-font-weight);
  }

  .el-table td.el-table__cell {
    color: var(--crud-bt-text);
    font-weight: var(--crud-bt-cell-font-weight);
  }

  .el-table__header .el-table__cell {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-table__header .el-table__cell .cell {
    box-sizing: border-box;
    min-height: var(--crud-bt-header-height);
    line-height: var(--crud-bt-header-height);
    display: flex;
    align-items: center;
  }

  .el-table__body .el-table__cell {
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-table__body .el-table__cell .cell {
    box-sizing: border-box;
    min-height: var(--crud-bt-row-height);
    line-height: var(--crud-bt-row-height);
    display: flex;
    align-items: center;
  }

  .el-table__border-left-patch,
  .el-table__border-bottom-patch {
    background-color: var(--crud-bt-border);
  }

  .el-table__body tr.el-table__row--striped td.el-table__cell {
    background-color: var(--crud-bt-row-stripe) !important;
  }

  .el-table__empty-text {
    color: var(--crud-bt-text-empty);
  }
}
</style>
