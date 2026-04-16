<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRef, watch } from "vue";
import type { BaseTableColumn } from "../types";
import { tableSurfaceTokens } from "../theme/tableSurface";
import { layoutColumnWidths, trySwitchToggle, visibleColumns } from "../utils/column";
import { drawTable2D } from "../utils/canvasDraw";
import { hitTestTable } from "../utils/tableHitTest";
import { useBaseTableSelection } from "../utils/useBaseTableSelection";
import { isClickOnSlotText, isClickOnSwitch, useCanvasSlotPopup } from "../utils/useCanvasSlotPopup";
import TableSlotOverlay from "./TableSlotOverlay.vue";

const t = tableSurfaceTokens;

defineOptions({ name: "BaseTableCanvasTile" });

/**
 * Canvas + 瓦片策略：在「内容面积」低于阈值时，将整张表预渲染到离屏画布，
 * 滚动时仅 drawImage 裁切视口，避免每帧重算布局；超大表自动回退为与 canvas 模式相同的按需绘制。
 */
const props = withDefaults(
  defineProps<{
    tableData: Record<string, unknown>[];
    columns: BaseTableColumn[];
    rowHeight: number;
    headerHeight: number;
    emptyText: string;
    rowKey: string;
    /** 最大预渲染像素面积（宽×高），超出则回退逐帧 drawTable2D */
    maxPrerenderPixels?: number;
  }>(),
  {
    maxPrerenderPixels: 12_000_000,
  },
);

const emit = defineEmits<{
  selectionChange: [rows: Record<string, unknown>[]];
}>();

const tableDataRef = toRef(props, "tableData");
const selection = useBaseTableSelection(props.rowKey, tableDataRef);

const containerRef = ref<HTMLDivElement | null>(null);

const { slotTriggerRef, slotPopup, openSlotPopup, closeSlotPopup } = useCanvasSlotPopup(containerRef);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const scrollX = ref(0);
const scrollY = ref(0);
const cssW = ref(400);
const cssH = ref(300);

const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

let ro: ResizeObserver | null = null;
let raf = 0;
let offscreen: HTMLCanvasElement | null = null;
let usePrerender = false;

const colWidths = computed(() => layoutColumnWidths(props.columns, cssW.value));
const totalWidth = computed(() => colWidths.value.reduce((a, b) => a + b, 0));
const totalHeight = computed(() => props.headerHeight + props.tableData.length * props.rowHeight);

const prerenderOk = computed(() => {
  const area = totalWidth.value * totalHeight.value;
  return area > 0 && area <= props.maxPrerenderPixels;
});

function clampScroll() {
  const maxX = Math.max(0, totalWidth.value - cssW.value);
  const maxY = Math.max(0, totalHeight.value - cssH.value);
  scrollX.value = Math.min(maxX, Math.max(0, scrollX.value));
  scrollY.value = Math.min(maxY, Math.max(0, scrollY.value));
}

function buildOffscreen() {
  offscreen?.remove();
  offscreen = null;
  if (!prerenderOk.value || props.tableData.length === 0) {
    usePrerender = false;
    return;
  }
  usePrerender = true;
  const c = document.createElement("canvas");
  const tw = totalWidth.value;
  const th = totalHeight.value;
  c.width = tw * dpr;
  c.height = th * dpr;
  const ctx = c.getContext("2d");
  if (!ctx) {
    usePrerender = false;
    return;
  }
  drawTable2D({
    ctx,
    width: tw * dpr,
    height: th * dpr,
    scrollX: 0,
    scrollY: 0,
    headerHeight: props.headerHeight,
    rowHeight: props.rowHeight,
    columns: props.columns,
    data: props.tableData,
    colWidths: colWidths.value,
    dpr,
    emptyText: props.emptyText,
    rowKey: props.rowKey,
    selectedKeys: selection.selectedKeys.value,
  });
  offscreen = c;
}

function paintFromOffscreen() {
  const canvas = canvasRef.value;
  if (!canvas || !offscreen) {
    return;
  }
  canvas.width = cssW.value * dpr;
  canvas.height = cssH.value * dpr;
  canvas.style.width = `${cssW.value}px`;
  canvas.style.height = `${cssH.value}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW.value, cssH.value);
  ctx.fillStyle = t.surfaceBg;
  ctx.fillRect(0, 0, cssW.value, cssH.value);
  const sx = scrollX.value;
  const sy = scrollY.value;
  ctx.drawImage(
    offscreen,
    sx * dpr,
    sy * dpr,
    cssW.value * dpr,
    cssH.value * dpr,
    0,
    0,
    cssW.value,
    cssH.value,
  );
  ctx.strokeStyle = t.borderColor;
  ctx.strokeRect(0, 0, cssW.value, cssH.value);
}

function paintLive() {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }
  canvas.width = cssW.value * dpr;
  canvas.height = cssH.value * dpr;
  canvas.style.width = `${cssW.value}px`;
  canvas.style.height = `${cssH.value}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  drawTable2D({
    ctx,
    width: cssW.value * dpr,
    height: cssH.value * dpr,
    scrollX: scrollX.value,
    scrollY: scrollY.value,
    headerHeight: props.headerHeight,
    rowHeight: props.rowHeight,
    columns: props.columns,
    data: props.tableData,
    colWidths: colWidths.value,
    dpr,
    emptyText: props.emptyText,
    rowKey: props.rowKey,
    selectedKeys: selection.selectedKeys.value,
  });
}

function onCanvasClick(e: MouseEvent) {
  const canvas = canvasRef.value;
  if (!canvas) {
    return;
  }
  const vis = visibleColumns(props.columns);
  const rect = canvas.getBoundingClientRect();
  const docX = e.clientX - rect.left + scrollX.value;
  const docY = e.clientY - rect.top + scrollY.value;
  const hit = hitTestTable(
    docX,
    docY,
    props.headerHeight,
    props.rowHeight,
    colWidths.value,
    props.tableData.length,
  );
  if (!hit) {
    closeSlotPopup();
    return;
  }
  const col = vis[hit.colIndex];
  if (col?.type === "tableSlot" && hit.kind === "body") {
    if (isClickOnSlotText(docX, colWidths.value, hit.colIndex)) {
      const row = props.tableData[hit.rowIndex];
      if (row) {
        openSlotPopup(row, col, e.clientX - rect.left, e.clientY - rect.top);
      }
      return;
    }
  }
  closeSlotPopup();
  if (col?.type === "switch" && hit.kind === "body") {
    if (isClickOnSwitch(docX, docY, colWidths.value, hit.colIndex, props.headerHeight, props.rowHeight, hit.rowIndex)) {
      const row = props.tableData[hit.rowIndex];
      if (row) {
        trySwitchToggle(row, col).then((newVal) => {
          if (newVal !== null) {
            buildOffscreen();
            schedulePaint();
          }
        });
      }
    }
    return;
  }
  if (col?.type !== "selection") {
    return;
  }
  if (hit.kind === "header") {
    emit("selectionChange", selection.toggleAll());
  } else if (hit.kind === "body") {
    const row = props.tableData[hit.rowIndex];
    if (row) {
      emit("selectionChange", selection.toggleRow(row));
    }
  }
  buildOffscreen();
  schedulePaint();
}

function paint() {
  clampScroll();
  if (usePrerender && offscreen) {
    paintFromOffscreen();
  } else {
    paintLive();
  }
}

function schedulePaint() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(paint);
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  if (e.shiftKey) {
    scrollX.value += e.deltaY;
  } else {
    scrollY.value += e.deltaY;
  }
  schedulePaint();
}

onMounted(() => {
  const el = containerRef.value;
  if (!el) {
    return;
  }
  ro = new ResizeObserver((entries) => {
    const cr = entries[0]?.contentRect;
    if (cr) {
      cssW.value = Math.floor(cr.width);
      cssH.value = Math.floor(cr.height);
      schedulePaint();
    }
  });
  ro.observe(el);
  buildOffscreen();
  schedulePaint();
});

onUnmounted(() => {
  ro?.disconnect();
  cancelAnimationFrame(raf);
  offscreen = null;
});

watch(
  () => [props.tableData, props.columns, props.emptyText, props.rowHeight, props.headerHeight, props.rowKey],
  () => {
    buildOffscreen();
    schedulePaint();
  },
  { deep: true },
);

watch([prerenderOk, totalWidth, totalHeight], () => {
  buildOffscreen();
  schedulePaint();
});

watch(selection.selectedKeys, () => {
  buildOffscreen();
  schedulePaint();
});
</script>

<template>
  <div ref="containerRef" class="crud-base-table__tile" tabindex="0" @wheel="onWheel">
    <canvas ref="canvasRef" class="crud-base-table__tile-surface" @click="onCanvasClick" />
    <span
      ref="slotTriggerRef"
      class="crud-base-table__slot-anchor"
      :style="{ left: slotPopup.x + 'px', top: slotPopup.y + 'px' }"
    />
    <TableSlotOverlay
      v-model:visible="slotPopup.visible"
      :row="slotPopup.row"
      :column="slotPopup.column"
      :trigger-ref="slotTriggerRef"
    />
  </div>
</template>

<style scoped lang="scss">
.crud-base-table__tile {
  position: relative;
  height: 100%;
  min-height: 120px;
  outline: none;
  overflow: hidden;
}

.crud-base-table__tile-surface {
  display: block;
  vertical-align: top;
}

.crud-base-table__slot-anchor {
  position: absolute;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
</style>
