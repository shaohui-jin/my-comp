<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import changelogRaw from "../../CHANGELOG.md?raw";

interface ChangeItem {
  label: string;
  text: string;
}

interface VersionBlock {
  version: string;
  date: string;
  section: string;
  items: ChangeItem[];
}

function parseChangelog(raw: string): VersionBlock[] {
  const blocks: VersionBlock[] = [];
  const lines = raw.split("\n");
  let current: VersionBlock | null = null;

  for (const line of lines) {
    const versionMatch = line.match(/^## (v[\d.]+)(?:[（(](.+?)[）)])?/);
    if (versionMatch) {
      current = { version: versionMatch[1], date: versionMatch[2] ?? "", section: "", items: [] };
      blocks.push(current);
      continue;
    }
    if (!current) continue;

    const sectionMatch = line.match(/^### (.+)/);
    if (sectionMatch) {
      current.section = sectionMatch[1];
      continue;
    }

    const itemMatch = line.match(/^- \*\*(.+?)\*\*[：:](.+)/);
    if (itemMatch) {
      current.items.push({ label: itemMatch[1], text: itemMatch[2].trim() });
      continue;
    }

    const plainItem = line.match(/^- (.+)/);
    if (plainItem && !plainItem[1].startsWith("*")) {
      current.items.push({ label: "", text: plainItem[1].trim() });
    }

    const subItem = line.match(/^\s+- (.+)/);
    if (subItem && current.items.length > 0) {
      const last = current.items[current.items.length - 1];
      last.text += `\n  · ${subItem[1]}`;
    }
  }

  return blocks;
}

const versions = computed(() => parseChangelog(changelogRaw));
const visible = ref(false);
const expandedIdx = ref(0);
const rootRef = ref<HTMLElement>();

function toggle() {
  visible.value = !visible.value;
}

function toggleVersion(idx: number) {
  expandedIdx.value = expandedIdx.value === idx ? -1 : idx;
}

function onClickOutside(e: MouseEvent) {
  if (visible.value && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    visible.value = false;
  }
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("mousedown", onClickOutside));
</script>

<template>
  <div ref="rootRef" class="changelog">
    <button class="changelog__trigger" @click="toggle">
      <span class="changelog__trigger-dot" />
      <span>变更记录</span>
      <span class="changelog__trigger-ver">{{ versions[0]?.version }}</span>
      <span class="changelog__trigger-arrow" :class="{ 'is-open': visible }" />
    </button>

    <Transition name="changelog-slide">
      <div v-show="visible" class="changelog__panel">
        <div class="changelog__timeline">
          <div
            v-for="(v, idx) in versions"
            :key="v.version"
            class="changelog__block"
            :class="{ 'is-expanded': expandedIdx === idx }"
          >
            <div class="changelog__block-header" @click="toggleVersion(idx)">
              <span class="changelog__dot" :class="{ 'is-latest': idx === 0 }" />
              <span class="changelog__version">{{ v.version }}</span>
              <span class="changelog__date">{{ v.date }}</span>
              <span class="changelog__section">{{ v.section }}</span>
              <span class="changelog__expand-icon" :class="{ 'is-open': expandedIdx === idx }" />
            </div>
            <Transition name="changelog-expand">
              <ul v-show="expandedIdx === idx" class="changelog__items">
                <li v-for="(item, i) in v.items" :key="i" class="changelog__item">
                  <code v-if="item.label" class="changelog__label">{{ item.label }}</code>
                  <span class="changelog__text">{{ item.text }}</span>
                </li>
              </ul>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use "./variables" as *;

.changelog {
  position: relative;
}

.changelog__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: $doc-fs-xs;
  color: $doc-text-secondary;
  background: transparent;
  border: 1px solid $doc-border-color;
  border-radius: $doc-radius-pill;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;

  &:hover {
    color: $doc-color-primary;
    border-color: $doc-color-primary;
  }
}

.changelog__trigger-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $doc-color-primary;
}

.changelog__trigger-ver {
  font-family: $doc-font-mono;
  font-size: $doc-fs-xs;
  color: $doc-color-primary;
  background: rgba($doc-color-primary, 0.08);
  padding: 1px 6px;
  border-radius: $doc-radius-sm;
}

.changelog__trigger-arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  transition: transform 0.25s;
  margin-left: 2px;

  &.is-open {
    transform: rotate(180deg);
  }
}

.changelog__panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 200;
  width: 520px;
  padding: 20px 24px;
  background: $doc-bg-card;
  border: 1px solid $doc-border-color;
  border-radius: $doc-radius-lg;
  box-shadow: 0 6px 24px rgb(0 0 0 / 10%);
  max-height: min(480px, calc(100vh - 80px));
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 3px;
  }
}

.changelog__timeline {
  position: relative;
  padding-left: 18px;

  &::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 10px;
    bottom: 10px;
    width: 1px;
    background: $doc-border-color;
  }
}

.changelog__block {
  position: relative;
  margin-bottom: $doc-sp-lg;

  &:last-child {
    margin-bottom: 0;
  }
}

.changelog__block-header {
  display: flex;
  align-items: center;
  gap: $doc-sp-sm;
  cursor: pointer;
  padding: 4px 0;
  user-select: none;

  &:hover .changelog__version {
    color: $doc-color-primary;
  }
}

.changelog__dot {
  position: absolute;
  left: -18px;
  top: 10px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: $doc-border-color;
  border: 2px solid $doc-bg-card;
  z-index: 1;

  &.is-latest {
    background: $doc-color-primary;
    box-shadow: 0 0 0 3px rgba($doc-color-primary, 0.15);
  }
}

.changelog__version {
  font-family: $doc-font-mono;
  font-size: $doc-fs-base;
  font-weight: 600;
  color: $doc-text-heading;
  transition: color 0.2s;
}

.changelog__date {
  font-size: $doc-fs-xs;
  color: $doc-text-secondary;
  background: $doc-bg-muted;
  padding: 1px 8px;
  border-radius: $doc-radius-sm;
}

.changelog__section {
  font-size: $doc-fs-sm;
  color: $doc-text-regular;
  margin-left: auto;
}

.changelog__expand-icon {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid $doc-text-secondary;
  transition: transform 0.25s;

  &.is-open {
    transform: rotate(180deg);
  }
}

.changelog__items {
  list-style: none;
  margin: $doc-sp-sm 0 0;
  padding: 0;
}

.changelog__item {
  display: flex;
  align-items: baseline;
  gap: $doc-sp-sm;
  padding: 4px 0;
  font-size: $doc-fs-sm;
  line-height: 1.6;
  color: $doc-text-regular;

  &::before {
    content: "";
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: $doc-border-color;
    margin-top: 8px;
  }
}

.changelog__label {
  flex-shrink: 0;
  font-family: $doc-font-mono;
  font-size: $doc-fs-xs;
  color: $doc-color-primary;
  background: rgba($doc-color-primary, 0.06);
  padding: 1px 6px;
  border-radius: $doc-radius-sm;
  white-space: nowrap;
}

.changelog__text {
  white-space: pre-line;
}

// --- Transitions ---

.changelog-slide-enter-active,
.changelog-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.changelog-slide-enter-from,
.changelog-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.changelog-expand-enter-active,
.changelog-expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.changelog-expand-enter-from,
.changelog-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
