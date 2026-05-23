<script setup lang="ts">
import { ref, computed, reactive, inject, watch } from "vue";
import { ConfigProvider, BaseTable, StatusDot } from "../../src";
import type { LibConfig } from "../../src/config/configTypes";
import { defaultLibConfig } from "../../src/config/configDefaults";
import type { BaseTableColumn } from "../../src/components/crud/base-table/types";

// --- 获取 lib 实例（含 updateConfig / resetConfig） ---
const lib = inject<{ updateConfig: (c: LibConfig) => void; resetConfig: () => void; config: any }>("compLib")!;

// --- Theme 配置 ---
const themeForm = reactive({
  colorPrimary: lib.config.theme.colorPrimary,
  colorSuccess: lib.config.theme.colorSuccess,
  colorWarning: lib.config.theme.colorWarning,
  textHeading: lib.config.theme.textHeading,
  textPrimary: lib.config.theme.textPrimary,
  textRegular: lib.config.theme.textRegular,
  textSecondary: lib.config.theme.textSecondary,
  bgPage: lib.config.theme.bgPage,
  bgCard: lib.config.theme.bgCard,
  bgSubtle: lib.config.theme.bgSubtle,
  bgMuted: lib.config.theme.bgMuted,
  borderColor: lib.config.theme.borderColor,
  borderMedium: lib.config.theme.borderMedium,
  fontSizeBase: lib.config.theme.fontSizeBase,
  fontSizeSm: lib.config.theme.fontSizeSm,
  radiusSm: lib.config.theme.radiusSm,
  radiusMd: lib.config.theme.radiusMd,
});

// --- Table 布局配置 ---
const tableForm = reactive({
  rowHeight: lib.config.table.rowHeight,
  headerHeight: lib.config.table.headerHeight,
  fontSizeCell: lib.config.table.fontSizeCell,
  fontSizeEmpty: lib.config.table.fontSizeEmpty,
  headerFontWeight: lib.config.table.headerFontWeight,
  cellFontWeight: lib.config.table.cellFontWeight,
  minColumnWidth: lib.config.table.minColumnWidth,
  defaultColumnWidth: lib.config.table.defaultColumnWidth,
});

// --- 监听表单变化，自动调用 updateConfig 触发持久化 ---
watch(
  [() => ({ ...themeForm }), () => ({ ...tableForm })],
  ([theme, table]) => {
    lib.updateConfig({ theme, table });
  },
  { deep: true },
);

// --- 配置 JSON 实时预览 ---
const configJson = computed(() => JSON.stringify({ theme: { ...themeForm }, table: { ...tableForm } }, null, 2));

// --- 重置 ---
function handleReset() {
  lib.resetConfig();
  Object.assign(themeForm, lib.config.theme);
  Object.assign(tableForm, lib.config.table);
}

// --- 预设方案 ---
function applyPreset(preset: Partial<typeof themeForm>, tablePatch?: Partial<typeof tableForm>) {
  Object.assign(themeForm, preset);
  if (tablePatch) Object.assign(tableForm, tablePatch);
}

const presets = {
  default: () => {
    Object.assign(themeForm, defaultLibConfig.theme);
    Object.assign(tableForm, defaultLibConfig.table);
  },
  purple: () => applyPreset({
    colorPrimary: "#6366f1", colorSuccess: "#10b981", colorWarning: "#f59e0b",
    textHeading: "#1e1b4b", textPrimary: "#312e81", textRegular: "#4338ca", textSecondary: "#6366f1",
    bgPage: "#f5f3ff", bgCard: "#ffffff", bgSubtle: "#eef2ff", bgMuted: "#e0e7ff",
    borderColor: "#e0e7ff", borderMedium: "#c7d2fe",
    fontSizeBase: 14, fontSizeSm: 13, radiusSm: 4, radiusMd: 8,
  }),
  green: () => applyPreset({
    colorPrimary: "#10b981", colorSuccess: "#059669", colorWarning: "#d97706",
    textHeading: "#064e3b", textPrimary: "#065f46", textRegular: "#047857", textSecondary: "#6ee7b7",
    bgPage: "#f0fdf4", bgCard: "#ffffff", bgSubtle: "#ecfdf5", bgMuted: "#d1fae5",
    borderColor: "#d1fae5", borderMedium: "#a7f3d0",
    fontSizeBase: 14, fontSizeSm: 13, radiusSm: 3, radiusMd: 6,
  }),
  dark: () => applyPreset({
    colorPrimary: "#818cf8", colorSuccess: "#34d399", colorWarning: "#fbbf24",
    textHeading: "#f1f5f9", textPrimary: "#e2e8f0", textRegular: "#cbd5e1", textSecondary: "#94a3b8",
    bgPage: "#0f172a", bgCard: "#1e293b", bgSubtle: "#1e293b", bgMuted: "#334155",
    borderColor: "#334155", borderMedium: "#475569",
    fontSizeBase: 14, fontSizeSm: 13, radiusSm: 4, radiusMd: 8,
  }),
};

// --- 当前激活面板 ---
const activeTab = ref<"theme" | "table">("theme");

// --- 表格示例数据 ---
const columns: BaseTableColumn[] = [
  { key: "id", label: "ID", width: 60 },
  { key: "name", label: "姓名", width: 120 },
  { key: "status", label: "状态", type: "status-custom", width: 100,
    colorMap: { active: "#67c23a", inactive: "#909399" } },
  { key: "email", label: "邮箱" },
  { key: "dept", label: "部门", width: 100 },
];

const tableData = [
  { id: 1, name: "张三", status: "active", email: "zhangsan@example.com", dept: "技术部" },
  { id: 2, name: "李四", status: "inactive", email: "lisi@example.com", dept: "产品部" },
  { id: 3, name: "王五", status: "active", email: "wangwu@example.com", dept: "设计部" },
  { id: 4, name: "赵六", status: "active", email: "zhaoliu@example.com", dept: "运营部" },
  { id: 5, name: "钱七", status: "inactive", email: "qianqi@example.com", dept: "市场部" },
  { id: 6, name: "孙八", status: "active", email: "sunba@example.com", dept: "研发部" },
];

// --- 配置字段分组 ---
const themeColorFields = [
  { key: "colorPrimary", label: "主色" },
  { key: "colorSuccess", label: "成功色" },
  { key: "colorWarning", label: "警告色" },
] as const;

const themeTextFields = [
  { key: "textHeading", label: "标题文字" },
  { key: "textPrimary", label: "主要文字" },
  { key: "textRegular", label: "常规文字" },
  { key: "textSecondary", label: "次要文字" },
] as const;

const themeBgFields = [
  { key: "bgPage", label: "页面背景" },
  { key: "bgCard", label: "卡片背景" },
  { key: "bgSubtle", label: "浅色背景" },
  { key: "bgMuted", label: "灰底背景" },
] as const;

const themeBorderFields = [
  { key: "borderColor", label: "边框色" },
  { key: "borderMedium", label: "深边框色" },
] as const;

const themeNumericFields = [
  { key: "fontSizeBase", label: "基础字号", min: 12, max: 20, unit: "px" },
  { key: "fontSizeSm", label: "小号字", min: 10, max: 16, unit: "px" },
  { key: "radiusSm", label: "小圆角", min: 0, max: 12, unit: "px" },
  { key: "radiusMd", label: "中圆角", min: 0, max: 16, unit: "px" },
] as const;

const tableNumericFields = [
  { key: "rowHeight", label: "行高", min: 28, max: 60, unit: "px" },
  { key: "headerHeight", label: "表头高度", min: 28, max: 60, unit: "px" },
  { key: "fontSizeCell", label: "单元格字号", min: 11, max: 18, unit: "px" },
  { key: "fontSizeEmpty", label: "空态字号", min: 12, max: 20, unit: "px" },
  { key: "headerFontWeight", label: "表头字重", min: 400, max: 800, unit: "" },
  { key: "cellFontWeight", label: "单元格字重", min: 300, max: 700, unit: "" },
  { key: "minColumnWidth", label: "最小列宽", min: 40, max: 120, unit: "px" },
  { key: "defaultColumnWidth", label: "默认列宽", min: 80, max: 200, unit: "px" },
] as const;

const showJson = ref(false);
</script>

<template>
  <div class="demo-config">
    <header class="demo-config__header">
      <h2>配置注入系统演示</h2>
      <p>修改后自动持久化到 localStorage，刷新页面保留上次配置。</p>
    </header>

    <div class="demo-config__layout">
      <!-- 左侧控制面板 -->
      <aside class="demo-config__panel">
        <!-- 预设 + 重置 -->
        <div class="demo-config__presets">
          <button
            v-for="(fn, key) in presets"
            :key="key"
            class="demo-config__preset-btn"
            @click="fn()"
          >
            {{ key }}
          </button>
          <button class="demo-config__preset-btn demo-config__preset-btn--reset" @click="handleReset">
            重置
          </button>
        </div>

        <!-- 标签切换 -->
        <div class="demo-config__tabs">
          <button
            :class="['demo-config__tab', { active: activeTab === 'theme' }]"
            @click="activeTab = 'theme'"
          >
            Theme 主题
          </button>
          <button
            :class="['demo-config__tab', { active: activeTab === 'table' }]"
            @click="activeTab = 'table'"
          >
            Table 布局
          </button>
        </div>

        <!-- Theme 面板 -->
        <div v-show="activeTab === 'theme'" class="demo-config__form">
          <h4>品牌色</h4>
          <div class="demo-config__color-group">
            <label v-for="f in themeColorFields" :key="f.key" class="demo-config__color-field">
              <input v-model="themeForm[f.key]" type="color" />
              <span class="demo-config__color-info">
                <span class="demo-config__color-label">{{ f.label }}</span>
                <code>{{ themeForm[f.key] }}</code>
              </span>
            </label>
          </div>

          <h4>文字色</h4>
          <div class="demo-config__color-group">
            <label v-for="f in themeTextFields" :key="f.key" class="demo-config__color-field">
              <input v-model="themeForm[f.key]" type="color" />
              <span class="demo-config__color-info">
                <span class="demo-config__color-label">{{ f.label }}</span>
                <code>{{ themeForm[f.key] }}</code>
              </span>
            </label>
          </div>

          <h4>背景色</h4>
          <div class="demo-config__color-group">
            <label v-for="f in themeBgFields" :key="f.key" class="demo-config__color-field">
              <input v-model="themeForm[f.key]" type="color" />
              <span class="demo-config__color-info">
                <span class="demo-config__color-label">{{ f.label }}</span>
                <code>{{ themeForm[f.key] }}</code>
              </span>
            </label>
          </div>

          <h4>边框色</h4>
          <div class="demo-config__color-group">
            <label v-for="f in themeBorderFields" :key="f.key" class="demo-config__color-field">
              <input v-model="themeForm[f.key]" type="color" />
              <span class="demo-config__color-info">
                <span class="demo-config__color-label">{{ f.label }}</span>
                <code>{{ themeForm[f.key] }}</code>
              </span>
            </label>
          </div>

          <h4>数值</h4>
          <div class="demo-config__slider-group">
            <label v-for="f in themeNumericFields" :key="f.key" class="demo-config__slider-field">
              <span class="demo-config__slider-label">
                {{ f.label }}
                <code>{{ themeForm[f.key] }}{{ f.unit }}</code>
              </span>
              <input
                v-model.number="themeForm[f.key]"
                type="range"
                :min="f.min"
                :max="f.max"
              />
            </label>
          </div>
        </div>

        <!-- Table 布局面板 -->
        <div v-show="activeTab === 'table'" class="demo-config__form">
          <h4>布局与字号</h4>
          <div class="demo-config__slider-group">
            <label v-for="f in tableNumericFields" :key="f.key" class="demo-config__slider-field">
              <span class="demo-config__slider-label">
                {{ f.label }}
                <code>{{ tableForm[f.key] }}{{ f.unit }}</code>
              </span>
              <input
                v-model.number="tableForm[f.key]"
                type="range"
                :min="f.min"
                :max="f.max"
              />
            </label>
          </div>
          <p class="demo-config__note">表格颜色从 Theme 统一配置自动派生，无需单独设置。</p>
        </div>
      </aside>

      <!-- 右侧预览区域 -->
      <section class="demo-config__main">
        <ConfigProvider :theme="{ ...themeForm }" :table="{ ...tableForm }">
          <div class="demo-config__preview" :style="{ background: themeForm.bgPage }">
            <div class="demo-config__card" :style="{ background: themeForm.bgCard, borderColor: themeForm.borderColor }">
              <h4 :style="{ color: themeForm.textHeading }">BaseTable 预览</h4>
              <BaseTable
                mode="element"
                :table-data="tableData"
                :columns="columns"
                height="240px"
              />
            </div>

            <div class="demo-config__card" :style="{ background: themeForm.bgCard, borderColor: themeForm.borderColor }">
              <h4 :style="{ color: themeForm.textHeading }">StatusDot 组件</h4>
              <div class="demo-config__dots">
                <StatusDot :color="themeForm.colorSuccess" text="在线" />
                <StatusDot :color="themeForm.textSecondary" text="离线" />
                <StatusDot :color="themeForm.colorWarning" text="忙碌" />
                <StatusDot :color="themeForm.colorPrimary" text="会议中" />
                <StatusDot text="默认" />
              </div>
            </div>

            <div class="demo-config__card" :style="{ background: themeForm.bgCard, borderColor: themeForm.borderColor }">
              <h4 :style="{ color: themeForm.textHeading }">文字层级预览</h4>
              <p :style="{ color: themeForm.textHeading, fontSize: themeForm.fontSizeBase + 'px', fontWeight: 600 }">
                标题文字 (textHeading)
              </p>
              <p :style="{ color: themeForm.textPrimary, fontSize: themeForm.fontSizeBase + 'px' }">
                主要文字 (textPrimary) — 用于正文内容
              </p>
              <p :style="{ color: themeForm.textRegular, fontSize: themeForm.fontSizeSm + 'px' }">
                常规文字 (textRegular) — 用于辅助信息
              </p>
              <p :style="{ color: themeForm.textSecondary, fontSize: themeForm.fontSizeSm + 'px' }">
                次要文字 (textSecondary) — 用于最弱信息
              </p>
            </div>
          </div>
        </ConfigProvider>

        <!-- 配置 JSON 输出 -->
        <div class="demo-config__json-section">
          <button class="demo-config__json-toggle" @click="showJson = !showJson">
            {{ showJson ? "收起" : "展开" }}配置 JSON（可直接复制到 createCompLib 使用）
          </button>
          <pre v-show="showJson" class="demo-config__json">{{ configJson }}</pre>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "./variables" as *;

.demo-config__header {
  margin-bottom: $doc-sp-lg;

  h2 { margin: 0 0 4px; font-size: $doc-fs-xl; font-weight: 600; color: $doc-text-heading; }
  p { margin: 0; font-size: $doc-fs-sm; color: $doc-text-secondary; }
}

.demo-config__layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: $doc-sp-lg;
  align-items: start;
}

.demo-config__panel {
  position: sticky;
  top: 16px;
  background: $doc-bg-card;
  border: 1px solid $doc-border-color;
  border-radius: $doc-radius-lg;
  padding: $doc-sp-md;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}

.demo-config__presets {
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: $doc-sp-md;
}

.demo-config__preset-btn {
  flex: 1;
  min-width: 50px;
  padding: 5px 0;
  font-size: $doc-fs-xs;
  border: 1px solid $doc-border-color;
  border-radius: $doc-radius-sm;
  background: $doc-bg-card;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.15s;

  &:hover { border-color: $doc-color-primary; color: $doc-color-primary; }

  &--reset {
    border-color: $doc-color-warning;
    color: $doc-color-warning;
    &:hover { background: $doc-color-warning; color: #fff; }
  }
}

.demo-config__tabs {
  display: flex;
  border-bottom: 1px solid $doc-border-color;
  margin-bottom: $doc-sp-md;
}

.demo-config__tab {
  flex: 1;
  padding: 6px 0;
  border: none;
  background: none;
  font-size: $doc-fs-sm;
  font-weight: 500;
  color: $doc-text-secondary;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;

  &.active { color: $doc-color-primary; border-bottom-color: $doc-color-primary; }
  &:hover:not(.active) { color: $doc-text-primary; }
}

.demo-config__form {
  h4 {
    margin: $doc-sp-sm 0 6px;
    font-size: $doc-fs-xs;
    font-weight: 600;
    color: $doc-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.demo-config__color-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.demo-config__color-field {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  border-radius: $doc-radius-sm;
  cursor: pointer;
  transition: background 0.1s;

  &:hover { background: $doc-bg-subtle; }

  input[type="color"] {
    width: 24px; height: 24px;
    border: 1px solid $doc-border-color;
    border-radius: $doc-radius-sm;
    padding: 0;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.demo-config__color-info {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.demo-config__color-label {
  font-size: $doc-fs-xs;
  color: $doc-text-regular;
  white-space: nowrap;
}

.demo-config__color-info code {
  font-size: 11px;
  color: $doc-text-secondary;
  font-family: $doc-font-mono;
  margin-left: auto;
}

.demo-config__slider-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.demo-config__slider-field {
  display: flex;
  flex-direction: column;
  gap: 2px;

  input[type="range"] { width: 100%; height: 16px; cursor: pointer; }
}

.demo-config__slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $doc-fs-xs;
  color: $doc-text-regular;

  code {
    font-size: 11px;
    color: $doc-text-secondary;
    font-family: $doc-font-mono;
  }
}

.demo-config__note {
  margin: $doc-sp-md 0 0;
  padding: $doc-sp-sm $doc-sp-md;
  background: $doc-bg-subtle;
  border-radius: $doc-radius-sm;
  font-size: $doc-fs-xs;
  color: $doc-text-secondary;
  line-height: 1.5;
}

// --- 预览区域 ---
.demo-config__main {
  display: flex;
  flex-direction: column;
  gap: $doc-sp-md;
}

.demo-config__preview {
  padding: $doc-sp-lg;
  border-radius: $doc-radius-lg;
  border: 1px solid $doc-border-color;
  display: flex;
  flex-direction: column;
  gap: $doc-sp-md;
  transition: background 0.3s;
}

.demo-config__card {
  padding: $doc-sp-md;
  border: 1px solid;
  border-radius: $doc-radius-md;
  transition: all 0.3s;

  h4 { margin: 0 0 $doc-sp-sm; font-size: $doc-fs-base; font-weight: 600; }
  p { margin: 4px 0; line-height: 1.6; }
}

.demo-config__dots {
  display: flex; gap: 16px; align-items: center; flex-wrap: wrap;
}

// --- JSON ---
.demo-config__json-section {
  border: 1px solid $doc-border-color;
  border-radius: $doc-radius-md;
  overflow: hidden;
}

.demo-config__json-toggle {
  width: 100%;
  padding: 8px 12px;
  background: $doc-bg-subtle;
  border: none;
  font-size: $doc-fs-sm;
  color: $doc-text-regular;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: background 0.15s;

  &:hover { background: $doc-bg-muted; }
}

.demo-config__json {
  padding: $doc-sp-md;
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  font-family: $doc-font-mono;
  color: $doc-text-regular;
  background: $doc-bg-card;
  overflow-x: auto;
  border-top: 1px solid $doc-border-color;
  max-height: 400px;
  overflow-y: auto;
}

// --- 响应式 ---
@media (max-width: $doc-bp-tablet) {
  .demo-config__layout { grid-template-columns: 1fr; }
  .demo-config__panel { position: static; max-height: none; }
}

@media (max-width: $doc-bp-mobile) {
  .demo-config__panel { padding: $doc-sp-sm; }
  .demo-config__preview { padding: $doc-sp-sm; }
}
</style>
