<script setup lang="ts">
import { ElLink } from "element-plus";
import type { TextLinkProps, TextLinkEmits } from "./types";

defineOptions({ name: "TextLink" });

withDefaults(defineProps<TextLinkProps>(), {
  disabled: false,
  underline: false,
});

const emit = defineEmits<TextLinkEmits>();

function onClick(e: MouseEvent) {
  emit("click", e);
}
</script>

<template>
  <ElLink
    class="text-link"
    type="primary"
    :disabled="disabled"
    :underline="underline"
    @click="onClick"
  >
    {{ text }}
  </ElLink>
</template>

<style scoped lang="scss">
.text-link {
  font-size: inherit;
}
</style>
