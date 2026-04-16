<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BaseTable,
  EmptyPlaceholder,
  HelloButton,
  SearchBar,
  StatusTag,
  TextLink,
  type BaseTableColumn,
  type BaseTableMode,
} from "comp-vue-lib";

const keyword = ref("");
const lastEvent = ref("");

function onSearch(v: string) {
  lastEvent.value = v || "（清空）";
}

function onLinkClick() {
  lastEvent.value = "text-link 点击";
}

const tableMode = ref<BaseTableMode>("element");

const modes: { label: string; value: BaseTableMode }[] = [
  { label: "Element 表格封装", value: "element" },
  { label: "虚拟滚动 (Table-V2)", value: "virtual" },
  { label: "Canvas 2D", value: "canvas" },
  { label: "Canvas + 整表预渲染瓦片", value: "canvas-tile" },
  { label: "Skia + WASM (CanvasKit)", value: "skia-wasm" },
];

const rows = 500;
const tableData = computed(() =>
  Array.from({ length: rows }, (_, i) => ({
    id: i + 1,
    name: `项 ${i + 1}`,
    amount: (Math.random() * 10000).toFixed(2),
    remark: i % 7 === 0 ? "备注较长用于测试截断" : "正常",
    /** 供 status-custom 列 colorMap 取灯色 */
    "status-custom": i % 5,
  })),
);

const columns: BaseTableColumn[] = [
  { key: "selection", type: "selection", width: 36 },
  { key: "index", type: "index", width: 36 },
  { key: "id", label: "ID", width: 72 },
  { key: "name", label: "名称", width: 140 },
  { key: "formatter", label: "formatter字段", width: 120, formatter: (row) => String(1212) },
  {
    key: "status-custom",
    label: "status-custom字段",
    type: "status-custom",
    width: 160,
    colorMap: {
      0: "rgba(0, 85, 255, 1)",
      1: "rgba(103, 194, 58, 1)",
      2: "rgba(0, 85, 255, 1)",
      3: "rgba(103, 194, 58, 1)",
      4: "rgba(103, 194, 58, 1)",
    },
  },
   {
    key: 'textures',
    label: '花色',
    width: 120,
    type: 'tableSlot',
    filterPlaceholder: '请输入花色编码/名称',
    filter: (str, item) =>
      item.textureCode.includes(str.trim()) || item.textureName.includes(str.trim()),
    columns: [
      { key: 'index', type: 'index', label: '序号', width: '60' },
      { key: 'textureImg', type: 'image', label: '预览图', width: '80' },
      { key: 'textureCode', label: '花色编码', width: '80' },
      { key: 'textureName', label: '花色名称', width: '100' },
      {
        key: 'status',
        label: '状态',
        width: '80',
        formatter: row => {
          const map = {
            1: '启用',
            2: '禁用'
          }
          return map[row.status] || ''
        }
      }
    ]
  },
  { key: "amount", label: "金额", width: 100, align: "right" },
  { key: "remark", label: "备注", minWidth: 160 },
];
</script>

<template>
  <div class="demo">
    <h1>组件库本地调试</h1>

    <section class="demo__section demo__section--table">
      <h2>CRUD BaseTable 多模式</h2>
      <div class="demo__toolbar">
        <el-select v-model="tableMode" style="width: 260px">
          <el-option v-for="m in modes" :key="m.value" :label="m.label" :value="m.value" />
        </el-select>
        <span class="demo__hint-inline">当前 {{ rows }} 行 · 滚轮平移 · Shift+滚轮横向</span>
      </div>
      <div class="demo__table-wrap">
        <BaseTable
          :mode="tableMode"
          :table-data="tableData"
          :columns="columns"
          height="360px"
          :loading="false"
        />
      </div>
    </section>

    <section class="demo__section">
      <h2>HelloButton</h2>
      <HelloButton label="基于 Element Plus 的按钮" />
    </section>

    <section class="demo__section">
      <h2>StatusTag</h2>
      <div class="demo__row">
        <StatusTag label="成功" type="success" />
        <StatusTag label="警告" type="warning" />
        <StatusTag label="信息" type="info" />
        <StatusTag label="危险" type="danger" />
      </div>
    </section>

    <section class="demo__section">
      <h2>SearchBar</h2>
      <SearchBar v-model="keyword" placeholder="搜索…" @search="onSearch" />
      <p class="demo__hint">关键词：{{ keyword || "（空）" }}；最近事件：{{ lastEvent || "—" }}</p>
    </section>

    <section class="demo__section">
      <h2>TextLink</h2>
      <TextLink text="查看详情" @click="onLinkClick" />
    </section>

    <section class="demo__section">
      <h2>EmptyPlaceholder</h2>
      <EmptyPlaceholder description="列表为空" subtext="请调整筛选条件后重试" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.demo {
  padding: 24px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;

  h1 {
    margin: 0 0 24px;
    font-size: 20px;
    font-weight: 600;
  }
}

.demo__section {
  margin-bottom: 28px;

  h2 {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--el-text-color-regular);
  }
}

.demo__section--table {
  .demo__table-wrap {
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    overflow: hidden;
  }
}

.demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.demo__hint-inline {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.demo__hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
