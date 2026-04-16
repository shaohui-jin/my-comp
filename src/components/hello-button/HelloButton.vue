<script setup lang="ts">
import { ElButton } from "element-plus";
import type { HelloButtonProps } from "./types";

defineOptions({ name: "HelloButton" });

withDefaults(defineProps<HelloButtonProps>(), {
  label: "Hello Element Plus",
});
</script>

<template>
  <div class="hello-button">
    <ElButton type="primary">
      {{ label }}
    </ElButton>
  </div>
</template>

<style scoped lang="scss">
.hello-button {
  display: inline-flex;
  align-items: center;
}
</style>
