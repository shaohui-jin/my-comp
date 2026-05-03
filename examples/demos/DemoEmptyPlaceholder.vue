<script setup lang="ts">
import { EmptyPlaceholder, type EmptyPlaceholderProps } from "comp-vue-lib";
import type { ComponentApi } from "./types";

const api: ComponentApi = {
  props: [
    { name: "description", type: "string", default: '"暂无数据"', required: false, desc: "主描述文案" },
    { name: "subtext", type: "string", default: '""', required: false, desc: "副描述文案，不传则不显示" },
  ],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>EmptyPlaceholder</h2>
    <p>空状态占位组件，支持主描述和副描述</p>
  </div>
  <div class="widget-card widget-card--full">
    <div class="widget-card__head">
      <span class="widget-card__title">演示</span>
    </div>
    <div class="widget-card__body">
      <div class="widget-row" style="gap: 40px">
        <EmptyPlaceholder />
        <EmptyPlaceholder description="列表为空" subtext="请调整筛选条件后重试" />
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
