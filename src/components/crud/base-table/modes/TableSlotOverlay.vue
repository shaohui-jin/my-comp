<script setup lang="ts">
import { ref, watch } from "vue";
import { ElInput, ElPopover } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { BaseTableColumn } from "../types";
import { tableSurfaceCssVars } from "../theme/tableSurface";
import BaseTableElement from "./BaseTableElement.vue";

defineOptions({ name: "TableSlotOverlay" });

const props = defineProps<{
  visible: boolean;
  row: Record<string, unknown> | null;
  column: BaseTableColumn | null;
  triggerRef: HTMLElement | undefined;
}>();

const emit = defineEmits<{
  "update:visible": [val: boolean];
}>();

const filterKeyword = ref("");
const cssVars = tableSurfaceCssVars();

watch(
  () => props.visible,
  (v) => {
    if (v) filterKeyword.value = "";
  },
);

function getFilteredData(): Record<string, unknown>[] {
  if (!props.row || !props.column) return [];
  const raw = props.row[props.column.key];
  if (!Array.isArray(raw)) return [];
  if (!props.column.filter || !filterKeyword.value) return raw;
  return raw.filter((item: Record<string, unknown>) =>
    props.column!.filter!(filterKeyword.value, item),
  );
}

function onHide() {
  emit("update:visible", false);
}
</script>

<template>
  <ElPopover
    v-if="column && triggerRef"
    :virtual-ref="triggerRef"
    virtual-triggering
    :visible="visible"
    placement="bottom-start"
    :width="(column.popoverWidth as number) || 430"
    :teleported="true"
    popper-class="table-slot-popover"
    @hide="onHide"
  >
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
