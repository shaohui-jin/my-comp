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

const activeName = ref("tables");

const modes: { label: string; value: BaseTableMode; desc: string; rows: number }[] = [
  { label: "Element Plus", value: "element", desc: "el-table 封装，能力最全，适合常规数据量", rows: 50 },
  { label: "Virtual Scroll", value: "virtual", desc: "el-table-v2 虚拟滚动，适合万级行", rows: 10_000 },
  { label: "Canvas 2D", value: "canvas", desc: "单 Canvas 视口重绘，适合超大数据", rows: 100_000 },
  { label: "Canvas Tile", value: "canvas-tile", desc: "整表预渲染 + 视口裁切，小数据集更流畅", rows: 5_000 },
  { label: "Skia WASM", value: "skia-wasm", desc: "CanvasKit (Skia) 渲染，GPU 加速", rows: 100_000 },
];

const activeMode = ref<BaseTableMode>("element");

function generateRows(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `项 ${i + 1}`,
    amount: (Math.random() * 1000000).toFixed(2),
    remark: i % 7 === 0 ? "备注较长用于测试截断" : "正常",
    status: i % 3 === 0 ? 1 : 2,
    "status-custom": i % 5,
    tableSlot: Array.from({ length: 2 + (i % 4) }, (_, j) => ({
      img: `https://picsum.photos/seed/${i * 10 + j}/60/60`,
      code: `TC-${String(i + 1).padStart(3, "0")}-${j + 1}`,
      name: `花色${["红", "蓝", "绿", "白"][j % 4]}`,
    })),
  }));
}

const tableDataMap = computed(() =>
  Object.fromEntries(modes.map((m) => [m.value, generateRows(m.rows)])),
);

const columns: BaseTableColumn[] = [
  { key: "selection", type: "selection", width: 36 },
  { key: "index", type: "index", width: 36 },
  { key: "id", label: "默认", width: 72 },
  { key: "amount", label: "超长", width: 70 },
  { key: "name", label: "名称", width: 140 },
  { key: "formatter", label: "formatter字段", width: 120, formatter: () => String(1212) },
  {
    key: "status",
    label: "switch状态",
    type: "switch",
    width: 100,
    activeValue: 1,
    inactiveValue: 2,
    beforeChange: () => window.confirm("确认切换？"),
  },
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
    key: "tableSlot",
    label: "tableSlot字段",
    width: 120,
    type: "tableSlot",
    filterPlaceholder: "请输入编码/名称",
    filter: (str: string, item: Record<string, unknown>) =>
      String(item.Code ?? "").includes(str.trim()) || String(item.Name ?? "").includes(str.trim()),
    columns: [
      { key: "index", type: "index", label: "序号", width: 60 },
      { key: "img", type: "image", label: "预览图", width: 80 },
      { key: "code", label: "编码", width: 80 },
      { key: "name", label: "名称", minWidth: 100 },
    ],
  },
  { key: "remark", label: "备注" },
];
</script>

<template>
  <div class="doc">
    <!-- Header -->
    <header class="doc-header">
      <div class="doc-header__inner">
        <h1 class="doc-header__title">Comp Vue Lib</h1>
        <span class="doc-header__badge">组件文档 &amp; 演练场</span>
      </div>
    </header>

    <main class="doc-main">
      <!-- Sidebar nav -->
      <el-menu
        :default-active="activeName"
        class="doc-nav"
        @select="(key: string) => activeName = key"
      >
        <el-menu-item index="tables">
          <el-icon><i class="nav-icon nav-icon--table" /></el-icon>
          <span>BaseTable 多模式</span>
        </el-menu-item>
        <el-menu-item index="basic">
          <el-icon><i class="nav-icon nav-icon--widget" /></el-icon>
          <span>基础组件</span>
        </el-menu-item>
      </el-menu>

      <!-- Content area -->
      <div class="doc-content">
        <!-- ============ BaseTable Section ============ -->
        <template v-if="activeName === 'tables'">
          <div class="doc-content__header">
            <h2>BaseTable 多模式表格</h2>
            <p>同一套列配置，按引擎适配数据量。滚轮纵向 · Shift+滚轮横向</p>
          </div>

          <!-- Mode tabs -->
          <el-tabs v-model="activeMode" type="border-card" class="doc-tabs">
            <el-tab-pane
              v-for="m in modes"
              :key="m.value"
              :label="m.label"
              :name="m.value"
              lazy
            >
              <div class="mode-pane">
                <div class="mode-pane__meta">
                  <el-tag type="info" size="small" effect="plain">{{ m.value }}</el-tag>
                  <el-tag size="small" effect="plain">{{ m.rows.toLocaleString() }} 行</el-tag>
                  <span class="mode-pane__desc">{{ m.desc }}</span>
                </div>
                <div class="mode-pane__table">
                  <BaseTable
                    :mode="m.value"
                    :table-data="tableDataMap[m.value]"
                    :columns="columns"
                    height="420px"
                    :loading="false"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </template>

        <!-- ============ Basic Components Section ============ -->
        <template v-if="activeName === 'basic'">
          <div class="doc-content__header">
            <h2>基础组件</h2>
            <p>通用 UI 组件集合</p>
          </div>

          <div class="widget-grid">
            <!-- HelloButton -->
            <div class="widget-card">
              <div class="widget-card__head">
                <span class="widget-card__title">HelloButton</span>
                <el-tag size="small" effect="plain">按钮</el-tag>
              </div>
              <div class="widget-card__body">
                <HelloButton label="基于 Element Plus 的按钮" />
              </div>
            </div>

            <!-- StatusTag -->
            <div class="widget-card">
              <div class="widget-card__head">
                <span class="widget-card__title">StatusTag</span>
                <el-tag size="small" effect="plain">状态标签</el-tag>
              </div>
              <div class="widget-card__body">
                <div class="widget-row">
                  <StatusTag label="成功" type="success" />
                  <StatusTag label="警告" type="warning" />
                  <StatusTag label="信息" type="info" />
                  <StatusTag label="危险" type="danger" />
                </div>
              </div>
            </div>

            <!-- SearchBar -->
            <div class="widget-card">
              <div class="widget-card__head">
                <span class="widget-card__title">SearchBar</span>
                <el-tag size="small" effect="plain">搜索栏</el-tag>
              </div>
              <div class="widget-card__body">
                <SearchBar v-model="keyword" placeholder="搜索…" @search="onSearch" />
                <p class="widget-hint">关键词：{{ keyword || "（空）" }}；最近事件：{{ lastEvent || "—" }}</p>
              </div>
            </div>

            <!-- TextLink -->
            <div class="widget-card">
              <div class="widget-card__head">
                <span class="widget-card__title">TextLink</span>
                <el-tag size="small" effect="plain">文字链接</el-tag>
              </div>
              <div class="widget-card__body">
                <TextLink text="查看详情" @click="onLinkClick" />
              </div>
            </div>

            <!-- EmptyPlaceholder -->
            <div class="widget-card widget-card--wide">
              <div class="widget-card__head">
                <span class="widget-card__title">EmptyPlaceholder</span>
                <el-tag size="small" effect="plain">空状态</el-tag>
              </div>
              <div class="widget-card__body">
                <EmptyPlaceholder description="列表为空" subtext="请调整筛选条件后重试" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
/* ---- Layout ---- */
.doc {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  color: #303133;
}

/* ---- Header ---- */
.doc-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 4px rgb(0 0 0 / 4%);
}

.doc-header__inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 12px;
}

.doc-header__title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.doc-header__badge {
  font-size: 12px;
  color: #909399;
  padding: 2px 8px;
  background: #f4f4f5;
  border-radius: 10px;
}

/* ---- Main (sidebar + content) ---- */
.doc-main {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - 56px);
}

/* ---- Sidebar nav ---- */
.doc-nav {
  width: 200px;
  flex-shrink: 0;
  border-right: 1px solid #ebeef5;
  background: #fff;
  padding-top: 8px;

  :deep(.el-menu-item) {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
  }
}

.nav-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;

  &--table { background: #409eff; }
  &--widget { background: #67c23a; }
}

/* ---- Content area ---- */
.doc-content {
  flex: 1;
  min-width: 0;
  padding: 28px 32px 48px;
}

.doc-content__header {
  margin-bottom: 20px;

  h2 {
    margin: 0 0 6px;
    font-size: 20px;
    font-weight: 600;
    color: #1d2129;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #909399;
  }
}

/* ---- Tabs (table modes) ---- */
.doc-tabs {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgb(0 0 0 / 5%);

  :deep(.el-tabs__header) {
    background: #fff;
    margin: 0;
  }

  :deep(.el-tabs__content) {
    padding: 0;
  }
}

.mode-pane {
  background: #fff;
  padding: 16px;
}

.mode-pane__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.mode-pane__desc {
  font-size: 13px;
  color: #909399;
}

.mode-pane__table {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  overflow: hidden;
}

/* ---- Widget grid (basic components) ---- */
.widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.widget-card {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgb(0 0 0 / 4%);

  &--wide {
    grid-column: 1 / -1;
  }
}

.widget-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f2f5;
  background: #fafbfc;
}

.widget-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.widget-card__body {
  padding: 20px 16px;
}

.widget-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.widget-hint {
  margin: 12px 0 0;
  font-size: 13px;
  color: #909399;
}
</style>
