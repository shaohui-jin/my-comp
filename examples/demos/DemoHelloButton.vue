<script setup lang="ts">
import { HelloButton, type HelloButtonProps } from "comp-vue-lib";
import type { ComponentApi } from "./types";

const api: ComponentApi = {
  props: [
    { name: "label", type: "string", default: '"Hello Element Plus"', required: false, desc: "按钮文案" },
  ],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>HelloButton</h2>
    <p>基于 Element Plus 的按钮封装</p>
  </div>
  <div class="widget-card widget-card--full">
    <div class="widget-card__head">
      <span class="widget-card__title">演示</span>
    </div>
    <div class="widget-card__body">
      <div class="widget-row">
        <HelloButton />
        <HelloButton label="自定义文案" />
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
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./demo";
</style>
