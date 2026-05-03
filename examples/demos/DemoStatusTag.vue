<script setup lang="ts">
import { StatusTag, type StatusTagProps, type StatusTagType } from "comp-vue-lib";
import type { ComponentApi } from "./types";

const demos: { label: string; type: StatusTagType }[] = [
  { label: "成功", type: "success" },
  { label: "警告", type: "warning" },
  { label: "信息", type: "info" },
  { label: "危险", type: "danger" },
];

const api: ComponentApi = {
  props: [
    { name: "label", type: "string", default: "—", required: true, desc: "标签文案" },
    {
      name: "type",
      type: '"success" | "warning" | "info" | "danger"',
      default: '"info"',
      required: false,
      desc: "视觉类型",
    },
  ],
};
</script>

<template>
  <div class="doc-content__header">
    <h2>StatusTag</h2>
    <p>用于显示状态的圆角标签</p>
  </div>
  <div class="widget-card widget-card--full">
    <div class="widget-card__head">
      <span class="widget-card__title">演示</span>
    </div>
    <div class="widget-card__body">
      <div class="widget-row">
        <StatusTag v-for="d in demos" :key="d.type" :label="d.label" :type="d.type" />
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
