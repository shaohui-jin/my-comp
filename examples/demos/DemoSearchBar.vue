<script setup lang="ts">
import { ref } from "vue";
import { SearchBar, type SearchBarProps, type SearchBarEmits } from "comp-vue-lib";
import type { ComponentApi } from "./types";

const keyword = ref("");
const lastEvent = ref("");

function onSearch(v: string) {
  lastEvent.value = v || "（清空）";
}

const api: ComponentApi = {
  props: [
    { name: "modelValue / v-model", type: "string", default: '""', required: false, desc: "搜索关键词双向绑定" },
    { name: "placeholder", type: "string", default: '"请输入关键词"', required: false, desc: "输入框占位提示" },
    { name: "clearable", type: "boolean", default: "true", required: false, desc: "是否显示清空按钮" },
  ],
  events: [
    { name: "search", payload: "string", desc: "按回车或清空时触发，参数为当前关键词值" },
  ],
  notes: ["清空输入框时会自动触发 search 事件并传入空字符串"],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>SearchBar</h2>
    <p>带搜索图标的输入框，支持 v-model 双向绑定</p>
  </div>
  <div class="widget-card widget-card--full">
    <div class="widget-card__head">
      <span class="widget-card__title">演示</span>
    </div>
    <div class="widget-card__body">
      <SearchBar v-model="keyword" placeholder="搜索…" @search="onSearch" />
      <p class="widget-hint">关键词：{{ keyword || "（空）" }}；最近事件：{{ lastEvent || "—" }}</p>
    </div>
    <div class="widget-card__api">
      <h4>Props</h4>
      <table class="api-table">
        <thead><tr><th>属性</th><th>类型</th><th>默认值</th><th>必填</th><th>说明</th></tr></thead>
        <tbody>
          <tr v-for="row in api.props" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td><code class="api-type">{{ row.type }}</code></td>
            <td><code v-if="row.default !== '—'">{{ row.default }}</code><span v-else>—</span></td>
            <td>{{ row.required ? "是" : "否" }}</td>
            <td>{{ row.desc }}</td>
          </tr>
        </tbody>
      </table>
      <h4>Events</h4>
      <table class="api-table">
        <thead><tr><th>事件名</th><th>参数</th><th>说明</th></tr></thead>
        <tbody>
          <tr v-for="e in api.events" :key="e.name">
            <td><code>{{ e.name }}</code></td>
            <td><code class="api-type">{{ e.payload }}</code></td>
            <td>{{ e.desc }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="api.notes?.length" class="api-inline-notes">
        <h4>特殊说明</h4>
        <ul>
          <li v-for="(note, idx) in api.notes" :key="idx">{{ note }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./demo";
</style>
