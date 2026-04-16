<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRef, watch } from "vue";
import type { BaseTableColumn } from "../types";
import { layoutColumnWidths, visibleColumns } from "../utils/column";
import { drawTable2D } from "../utils/canvasDraw";
import { hitTestTable } from "../utils/tableHitTest";
import { useBaseTableSelection } from "../utils/useBaseTableSelection";

defineOptions({ name: "BaseTableCanvas" });

const props = defineProps<{
  tableData: Record<string, unknown>[];
  columns: BaseTableColumn[];
  rowHeight: number;
  headerHeight: number;
  emptyText: string;
  rowKey: string;
}>();

const emit = defineEmits<{
  selectionChange: [rows: Record<string, unknown>[]];
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const scrollX = ref(0);
const scrollY = ref(0);
const cssW = ref(400);
const cssH = ref(300);

let ro: ResizeObserver | null = null;
let raf = 0;

const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

const colWidths = computed(() => layoutColumnWidths(props.columns, cssW.value));

const totalWidth = computed(() => colWidths.value.reduce((a, b) => a + b, 0));

const totalHeight = computed(() => props.headerHeight + props.tableData.length * props.rowHeight);

const tableDataRef = toRef(props, "tableData");
const selection = useBaseTableSelection(props.rowKey, tableDataRef);

function clampScroll() {
  const maxX = Math.max(0, totalWidth.value - cssW.value);
  const maxY = Math.max(0, totalHeight.value - cssH.value);
  scrollX.value = Math.min(maxX, Math.max(0, scrollX.value));
  scrollY.value = Math.min(maxY, Math.max(0, scrollY.value));
}

function paint() {
  const canvas = canvasRef.value;
  const vis = visibleColumns(props.columns);
  if (!canvas || vis.length === 0) {
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

function schedulePaint() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    clampScroll();
    paint();
  });
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
    return;
  }
  const col = vis[hit.colIndex];
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
  schedulePaint();
});

onUnmounted(() => {
  ro?.disconnect();
  cancelAnimationFrame(raf);
});

watch(
  () => [props.tableData, props.columns, props.emptyText, props.rowHeight, props.headerHeight, props.rowKey],
  () => schedulePaint(),
  { deep: true },
);

watch([scrollX, scrollY, colWidths], () => schedulePaint());

watch(selection.selectedKeys, () => schedulePaint(), { deep: true });
</script>

<template>
  <div ref="containerRef" class="crud-base-table__canvas" tabindex="0" @wheel="onWheel">
    <canvas ref="canvasRef" class="crud-base-table__canvas-surface" @click="onCanvasClick" />
  </div>
</template>

<style scoped lang="scss">
.crud-base-table__canvas {
  height: 100%;
  min-height: 120px;
  outline: none;
  overflow: hidden;
}

.crud-base-table__canvas-surface {
  display: block;
  vertical-align: top;
  cursor: default;
}
</style>
