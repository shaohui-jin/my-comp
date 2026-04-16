<script setup lang="ts">
import { ElEmpty } from "element-plus";
import type { EmptyPlaceholderProps } from "./types";

defineOptions({ name: "EmptyPlaceholder" });

withDefaults(defineProps<EmptyPlaceholderProps>(), {
  description: "暂无数据",
  subtext: "",
});
</script>

<template>
  <div class="empty-placeholder">
    <ElEmpty :description="description">
      <template v-if="subtext" #default>
        <p class="empty-placeholder__sub">{{ subtext }}</p>
      </template>
    </ElEmpty>
  </div>
</template>

<style scoped lang="scss">
.empty-placeholder {
  padding: 16px 0;
}

.empty-placeholder__sub {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
