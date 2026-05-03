<script setup lang="ts">
import { TextLink, type TextLinkProps, type TextLinkEmits } from "comp-vue-lib";
import type { ComponentApi } from "./types";

const api: ComponentApi = {
  props: [
    { name: "text", type: "string", default: "—", required: true, desc: "链接文案" },
    { name: "disabled", type: "boolean", default: "false", required: false, desc: "是否禁用" },
    { name: "underline", type: "boolean", default: "false", required: false, desc: "是否显示下划线" },
  ],
  events: [{ name: "click", payload: "MouseEvent", desc: "点击时触发" }],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>TextLink</h2>
    <p>文字链接组件，支持禁用和下划线</p>
  </div>
  <div class="widget-card widget-card--full">
    <div class="widget-card__head">
      <span class="widget-card__title">演示</span>
    </div>
    <div class="widget-card__body">
      <div class="widget-row">
        <TextLink text="默认链接" />
        <TextLink text="带下划线" :underline="true" />
        <TextLink text="禁用状态" :disabled="true" />
      </div>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./demo";
</style>
