<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ElIcon, ElInput } from "element-plus";
import type { SearchBarProps, SearchBarEmits } from "./types";

defineOptions({ name: "SearchBar" });

withDefaults(defineProps<SearchBarProps>(), {
  placeholder: "请输入关键词",
  clearable: true,
});

const model = defineModel<string>({ default: "" });

const emit = defineEmits<SearchBarEmits>();

function onClear() {
  model.value = "";
  emit("search", "");
}

function onEnter() {
  emit("search", model.value);
}
</script>

<template>
  <div class="search-bar">
    <ElInput
      v-model="model"
      class="search-bar__input"
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="onClear"
      @keyup.enter="onEnter"
    >
      <template #prefix>
        <ElIcon class="search-bar__icon">
          <Search />
        </ElIcon>
      </template>
    </ElInput>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  width: 100%;
  max-width: 360px;
}

.search-bar__input {
  width: 100%;
}

.search-bar__icon {
  color: var(--el-text-color-placeholder);
}
</style>
