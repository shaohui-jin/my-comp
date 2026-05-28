<script setup lang="ts">
import { computed, type Component, ref, watch } from "vue";
import DemoBaseTable from "./demos/DemoBaseTable.vue";
import DemoBaseSearch from "./demos/DemoBaseSearch.vue";
import DemoBaseSearchField from "./demos/DemoBaseSearchField.vue";
import DemoBaseSearchDrawer from "./demos/DemoBaseSearchDrawer.vue";
import DemoBaseColumnSetting from "./demos/DemoBaseColumnSetting.vue";
import DemoBaseCrud from "./demos/DemoBaseCrud.vue";
import DemoStatusTag from "./demos/DemoStatusTag.vue";
import DemoStatusDot from "./demos/DemoStatusDot.vue";
import DemoConfigProvider from "./demos/DemoConfigProvider.vue";
import ChangelogPanel from "./demos/ChangelogPanel.vue";

type TopTab = "docs" | "config" | "changelog";

const pageMap: Record<string, Component> = {
  tables: DemoBaseTable,
  "base-search": DemoBaseSearch,
  "base-search-field": DemoBaseSearchField,
  "base-search-drawer": DemoBaseSearchDrawer,
  "base-column-setting": DemoBaseColumnSetting,
  "base-crud": DemoBaseCrud,
  "status-tag": DemoStatusTag,
  "status-dot": DemoStatusDot,
};

const FIRST_LEAF_KEY = "tables";

const topTab = ref<TopTab>("docs");
const activeName = ref(FIRST_LEAF_KEY);
const activePage = computed(() => pageMap[activeName.value] ?? DemoBaseTable);

const navOpen = ref(false);
const compListOpen = ref(false);

function handleSelect(key: string) {
  activeName.value = key;
  navOpen.value = false;
  compListOpen.value = false;
}

function switchTopTab(tab: TopTab) {
  topTab.value = tab;
  navOpen.value = false;
  compListOpen.value = false;
  if (tab === "docs") {
    activeName.value = FIRST_LEAF_KEY;
  }
}

function handleBottomTab(tab: TopTab) {
  if (tab === "docs") {
    if (topTab.value === "docs") {
      compListOpen.value = !compListOpen.value;
    } else {
      topTab.value = "docs";
      compListOpen.value = true;
    }
  } else {
    topTab.value = tab;
    compListOpen.value = false;
  }
}

watch(topTab, () => {
  navOpen.value = false;
});
</script>

<template>
  <div class="doc">
    <header class="doc-header">
      <div class="doc-header__inner">
        <button class="doc-header__menu-btn" @click="navOpen = !navOpen">
          <span class="menu-icon" :class="{ 'menu-icon--open': navOpen }" />
        </button>
        <h1 class="doc-header__title">comp lib</h1>
        <nav class="doc-header__tabs">
          <button
            :class="['doc-header__tab', { active: topTab === 'docs' }]"
            @click="switchTopTab('docs')"
          >
            组件文档
          </button>
          <button
            :class="['doc-header__tab', { active: topTab === 'config' }]"
            @click="switchTopTab('config')"
          >
            配置系统
          </button>
          <button
            :class="['doc-header__tab', { active: topTab === 'changelog' }]"
            @click="switchTopTab('changelog')"
          >
            变更记录
          </button>
        </nav>
      </div>
    </header>

    <main class="doc-main">
      <template v-if="topTab === 'docs'">
        <div class="doc-nav-backdrop" :class="{ visible: navOpen }" @click="navOpen = false" />
        <el-menu
          :default-active="activeName"
          class="doc-nav"
          :class="{ 'doc-nav--open': navOpen }"
          :default-openeds="['crud', 'basic']"
          @select="handleSelect"
        >
          <el-sub-menu index="crud">
            <template #title>
              <el-icon><i class="nav-icon nav-icon--crud" /></el-icon>
              <span>CRUD 组件</span>
            </template>
            <el-menu-item index="tables">
              <span class="nav-item__name">BaseTable</span>
              <span class="nav-item__tag">表格</span>
            </el-menu-item>
            <el-menu-item index="base-search">
              <span class="nav-item__name">BaseSearch</span>
              <span class="nav-item__tag">搜索</span>
            </el-menu-item>
            <el-menu-item index="base-search-field">
              <span class="nav-item__name">BaseSearchField</span>
              <span class="nav-item__tag">字段</span>
            </el-menu-item>
            <el-menu-item index="base-search-drawer">
              <span class="nav-item__name">BaseSearchDrawer</span>
              <span class="nav-item__tag">抽屉</span>
            </el-menu-item>
            <el-menu-item index="base-column-setting">
              <span class="nav-item__name">BaseColumnSetting</span>
              <span class="nav-item__tag">列设置</span>
            </el-menu-item>
            <el-menu-item index="base-crud">
              <span class="nav-item__name">BaseCrud</span>
              <span class="nav-item__tag">联动</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="basic">
            <template #title>
              <el-icon><i class="nav-icon nav-icon--widget" /></el-icon>
              <span>基础组件</span>
            </template>
            <el-menu-item index="status-tag">
              <span class="nav-item__name">StatusTag</span>
              <span class="nav-item__tag">标签</span>
            </el-menu-item>
            <el-menu-item index="status-dot">
              <span class="nav-item__name">StatusDot</span>
              <span class="nav-item__tag">圆点</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>

        <div class="doc-content">
          <component :is="activePage" />
        </div>
      </template>

      <template v-else-if="topTab === 'config'">
        <div class="doc-content doc-content--full">
          <div class="doc-panel">
            <DemoConfigProvider />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="doc-content doc-content--full">
          <div class="doc-panel">
            <ChangelogPanel />
          </div>
        </div>
      </template>
    </main>

    <!-- 底部 Tab 栏（平板/移动端） -->
    <nav class="doc-bottom-bar">
      <button
        :class="['doc-bottom-tab', { active: topTab === 'docs' }]"
        @click="handleBottomTab('docs')"
      >
        <svg class="doc-bottom-tab__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>组件</span>
      </button>
      <button
        :class="['doc-bottom-tab', { active: topTab === 'config' }]"
        @click="handleBottomTab('config')"
      >
        <svg class="doc-bottom-tab__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>配置</span>
      </button>
      <button
        :class="['doc-bottom-tab', { active: topTab === 'changelog' }]"
        @click="handleBottomTab('changelog')"
      >
        <svg class="doc-bottom-tab__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span>变更</span>
      </button>
    </nav>

    <!-- 组件列表面板（平板端：侧边浮层 / 移动端：底部弹出） -->
    <Transition name="doc-complist">
      <div
        v-if="compListOpen && topTab === 'docs'"
        class="doc-complist"
      >
        <div class="doc-complist__header">
          <span>选择组件</span>
          <button class="doc-complist__close" @click="compListOpen = false">✕</button>
        </div>
        <div class="doc-complist__body">
          <div class="doc-complist__group-title">CRUD 组件</div>
          <button
            v-for="item in [
              { key: 'tables', name: 'BaseTable', tag: '表格' },
              { key: 'base-search', name: 'BaseSearch', tag: '搜索' },
              { key: 'base-search-field', name: 'BaseSearchField', tag: '字段' },
              { key: 'base-search-drawer', name: 'BaseSearchDrawer', tag: '抽屉' },
              { key: 'base-column-setting', name: 'BaseColumnSetting', tag: '列设置' },
              { key: 'base-crud', name: 'BaseCrud', tag: '联动' },
            ]"
            :key="item.key"
            :class="['doc-complist__item', { active: activeName === item.key }]"
            @click="handleSelect(item.key)"
          >
            <span class="doc-complist__name">{{ item.name }}</span>
            <span class="doc-complist__tag">{{ item.tag }}</span>
          </button>
          <div class="doc-complist__group-title">基础组件</div>
          <button
            v-for="item in [
              { key: 'status-tag', name: 'StatusTag', tag: '标签' },
              { key: 'status-dot', name: 'StatusDot', tag: '圆点' },
            ]"
            :key="item.key"
            :class="['doc-complist__item', { active: activeName === item.key }]"
            @click="handleSelect(item.key)"
          >
            <span class="doc-complist__name">{{ item.name }}</span>
            <span class="doc-complist__tag">{{ item.tag }}</span>
          </button>
        </div>
      </div>
    </Transition>
    <Transition name="doc-complist-backdrop">
      <div
        v-if="compListOpen && topTab === 'docs'"
        class="doc-complist-backdrop"
        @click="compListOpen = false"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use "./demos/variables" as *;
@use "./demos/el-overrides" as *;

.doc {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: $doc-bg-page;
  font-family: $doc-font-family;
  color: $doc-text-primary;
}

// ============================================================
// Header
// ============================================================
.doc-header {
  flex: none;
  z-index: 100;
  height: 56px;
  background: $doc-bg-card;
  border-bottom: 1px solid $doc-border-color;
  box-shadow: $doc-shadow-sm;
}

.doc-header__inner {
  padding: 0 32px;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0;
}

.doc-header__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: $doc-radius-md;
  margin-right: $doc-sp-sm;

  &:hover {
    background: $doc-bg-muted;
  }
}

.menu-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 2px;
  background: $doc-text-primary;
  border-radius: 1px;
  transition: background 0.2s;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: $doc-text-primary;
    border-radius: 1px;
    transition: transform 0.2s;
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }

  &--open {
    background: transparent;

    &::before {
      top: 0;
      transform: rotate(45deg);
    }

    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
}

.doc-header__title {
  margin: 0;
  margin-right: $doc-sp-2xl;
  font-size: $doc-fs-lg;
  font-weight: 700;
  color: $doc-color-primary;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

// ============================================================
// 顶部 Tab 导航
// ============================================================
.doc-header__tabs {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 4px;
}

.doc-header__tab {
  position: relative;
  height: 100%;
  padding: 0 16px;
  border: none;
  background: none;
  font-size: $doc-fs-sm;
  font-weight: 500;
  color: $doc-text-secondary;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s;

  &:hover {
    color: $doc-text-primary;
  }

  &.active {
    color: $doc-color-primary;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 16px;
      right: 16px;
      height: 2px;
      background: $doc-color-primary;
      border-radius: 1px 1px 0 0;
    }
  }
}

// ============================================================
// Main
// ============================================================
.doc-main {
  flex: 1 1 0;
  display: flex;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.doc-nav-backdrop {
  display: none;
}

.doc-nav {
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid $doc-border-color;
  background: $doc-bg-card;
  padding-top: $doc-sp-sm;
  overflow-y: auto;
  scrollbar-width: none;
  transition: transform 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }

  @include el-menu-nav;
}

.nav-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: $doc-radius-sm;

  &--crud {
    background: $doc-color-warning;
  }

  &--widget {
    background: $doc-color-success;
  }
}

.nav-item__name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: $doc-font-mono;
  font-size: $doc-fs-sm;
}

.nav-item__tag {
  flex-shrink: 0;
  margin-left: $doc-sp-xs;
  font-size: 11px;
  line-height: 1;
  color: $doc-text-secondary;
  background: $doc-bg-muted;
  padding: 3px 6px;
  border-radius: $doc-radius-sm;
}

.doc-content {
  flex: 1 1 0;
  min-width: 0;
  padding: 28px 32px 48px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &--full {
    max-width: 100%;
  }
}

.doc-panel {
  background: $doc-bg-card;
  border-radius: $doc-radius-lg;
  padding: $doc-sp-2xl 32px;
}

// ============================================================
// 底部 Tab 栏（平板/移动端专用，PC 端隐藏）
// ============================================================
$bottom-bar-height: 52px;

.doc-bottom-bar {
  display: none;
}

.doc-bottom-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 0 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: $doc-text-secondary;
  font-size: 11px;
  font-weight: 500;
  transition: color 0.15s;

  &.active {
    color: $doc-color-primary;
  }
}

.doc-bottom-tab__icon {
  width: 20px;
  height: 20px;
}

// ============================================================
// 组件列表面板（平板/移动端专用）
// ============================================================
.doc-complist {
  display: none;
}

.doc-complist-backdrop {
  display: none;
}

.doc-complist__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  font-size: $doc-fs-base;
  font-weight: 600;
  color: $doc-text-heading;
  border-bottom: 1px solid $doc-border-color;
}

.doc-complist__close {
  width: 28px;
  height: 28px;
  border: none;
  background: $doc-bg-muted;
  border-radius: 50%;
  font-size: 13px;
  cursor: pointer;
  color: $doc-text-regular;
  display: flex;
  align-items: center;
  justify-content: center;
}

.doc-complist__body {
  overflow-y: auto;
  padding: 4px 0;
}

.doc-complist__group-title {
  padding: 12px 16px 4px;
  font-size: 11px;
  font-weight: 600;
  color: $doc-text-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.doc-complist__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: $doc-fs-sm;
  color: $doc-text-primary;
  min-height: 44px;
  transition: background 0.1s;

  &:active {
    background: $doc-bg-subtle;
  }

  &.active {
    color: $doc-color-primary;
    font-weight: 600;
    background: color-mix(in srgb, $doc-color-primary 6%, transparent);
  }
}

.doc-complist__name {
  font-family: $doc-font-mono;
}

.doc-complist__tag {
  font-size: 11px;
  color: $doc-text-secondary;
  background: $doc-bg-muted;
  padding: 2px 6px;
  border-radius: $doc-radius-sm;
}

// ============================================================
// 平板端 (768px ~ 1024px)
// ============================================================
@media (max-width: $doc-bp-tablet) {
  .doc-header__inner {
    padding: 0 20px;
  }

  .doc-header__title {
    margin-right: $doc-sp-lg;
  }

  .doc-header__tabs {
    display: none;
  }

  .doc-nav {
    display: none !important;
  }

  .doc-content {
    padding: 24px 24px 16px;
  }

  .doc-panel {
    padding: $doc-sp-xl $doc-sp-2xl;
  }

  .doc-bottom-bar {
    display: flex;
    flex-shrink: 0;
    background: $doc-bg-card;
    border-top: 1px solid $doc-border-color;
    z-index: 100;
  }

  .doc-complist {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 56px;
    left: 0;
    bottom: $bottom-bar-height;
    width: 260px;
    background: $doc-bg-card;
    border-right: 1px solid $doc-border-color;
    box-shadow: 2px 0 12px rgb(0 0 0 / 8%);
    z-index: 101;
  }

  .doc-complist-backdrop {
    display: block;
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: $bottom-bar-height;
    background: rgb(0 0 0 / 20%);
    z-index: 100;
  }

  .doc-complist-enter-active,
  .doc-complist-leave-active {
    transition: transform 0.3s ease;
  }

  .doc-complist-enter-from,
  .doc-complist-leave-to {
    transform: translateX(-100%);
  }

  .doc-complist-backdrop-enter-active,
  .doc-complist-backdrop-leave-active {
    transition: opacity 0.3s;
  }

  .doc-complist-backdrop-enter-from,
  .doc-complist-backdrop-leave-to {
    opacity: 0;
  }
}

// ============================================================
// 移动端 (< 768px)
// ============================================================
@media (max-width: $doc-bp-mobile) {
  .doc-header {
    height: 48px;
  }

  .doc-header__inner {
    padding: 0 $doc-sp-lg;
  }

  .doc-header__menu-btn {
    display: none;
  }

  .doc-header__title {
    font-size: $doc-fs-md;
    margin-right: auto;
  }

  .doc-header__tabs {
    display: none;
  }

  .doc-nav {
    display: none !important;
  }

  .doc-nav-backdrop {
    display: none;
  }

  .doc-content {
    padding: 16px $doc-sp-lg 16px;
  }

  .doc-panel {
    padding: $doc-sp-lg;
    border-radius: $doc-radius-md;
  }

  .doc-bottom-bar {
    display: flex;
    flex-shrink: 0;
    background: $doc-bg-card;
    border-top: 1px solid $doc-border-color;
    z-index: 100;
  }

  .doc-complist {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: auto;
    left: 0;
    right: 0;
    bottom: $bottom-bar-height;
    width: auto;
    max-height: 55vh;
    background: $doc-bg-card;
    border-radius: 16px 16px 0 0;
    border-right: none;
    box-shadow: 0 -4px 20px rgb(0 0 0 / 10%);
    z-index: 101;
  }

  .doc-complist-backdrop {
    display: block;
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    bottom: $bottom-bar-height;
    background: rgb(0 0 0 / 20%);
    z-index: 100;
  }

  .doc-complist-enter-active,
  .doc-complist-leave-active {
    transition: transform 0.3s ease;
  }

  .doc-complist-enter-from,
  .doc-complist-leave-to {
    transform: translateY(100%);
  }

  .doc-complist-backdrop-enter-active,
  .doc-complist-backdrop-leave-active {
    transition: opacity 0.3s;
  }

  .doc-complist-backdrop-enter-from,
  .doc-complist-backdrop-leave-to {
    opacity: 0;
  }
}
</style>
