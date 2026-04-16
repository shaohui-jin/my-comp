<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRef, watch } from "vue";
import type { Canvas, CanvasKit, Font, Paint, Surface, Typeface } from "canvaskit-wasm";
import type { BaseTableColumn } from "../types";
import { cssRgbOrRgbaToRgb, hexToRgb, tableLayoutDefaults, tableSurfaceTokens } from "../theme/tableSurface";
import { canvaskitLocateFile } from "../utils/canvaskitLocate";
import { formatCell, headerText, layoutColumnWidths, statusCustomLampColor, visibleColumns } from "../utils/column";
import { keyString, rowKeyValue } from "../utils/selectionKeys";
import { hitTestTable } from "../utils/tableHitTest";
import { resolveSkiaTypeface } from "../utils/skiaTypeface";
import { useBaseTableSelection } from "../utils/useBaseTableSelection";

defineOptions({ name: "BaseTableSkiaWasm" });

const t = tableSurfaceTokens;

const props = withDefaults(
  defineProps<{
    tableData: Record<string, unknown>[];
    columns: BaseTableColumn[];
    rowHeight: number;
    headerHeight: number;
    emptyText: string;
    /** 与 ElTable row-key 一致 */
    rowKey: string;
    /** 覆盖 CanvasKit WASM 根路径；默认使用本地 node_modules（Vite 解析），不访问 CDN */
    skiaWasmBaseUrl?: string;
  }>(),
  {
    rowKey: "id",
    skiaWasmBaseUrl: undefined,
  },
);

const emit = defineEmits<{
  selectionChange: [rows: Record<string, unknown>[]];
}>();

const tableDataRef = toRef(props, "tableData");
const selection = useBaseTableSelection(props.rowKey, tableDataRef);

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const loadError = ref("");
/** 与 WASM 加载失败区分：仅 Surface 创建失败 */
const surfaceError = ref("");
const scrollX = ref(0);
const scrollY = ref(0);
const cssW = ref(400);
const cssH = ref(300);

let ck: CanvasKit | null = null;
/** null 时勿用 Font(null)，否则 drawText 不显示 */
let skTypeface: Typeface | null = null;
let paintFont: Font | null = null;
let paintFontEmpty: Font | null = null;
let paintFontHeader: Font | null = null;
let surface: Surface | null = null;
let ro: ResizeObserver | null = null;
let raf = 0;
/** 避免每帧改 canvas 尺寸导致 WebGL 上下文丢失、MakeCanvasSurface 返回 null */
let lastPixelW = 0;
let lastPixelH = 0;

const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

const colWidths = () => layoutColumnWidths(props.columns, cssW.value);
const totalWidth = () => colWidths().reduce((a, b) => a + b, 0);
const totalHeight = () => props.headerHeight + props.tableData.length * props.rowHeight;

function clampScroll() {
  const maxX = Math.max(0, totalWidth() - cssW.value);
  const maxY = Math.max(0, totalHeight() - cssH.value);
  scrollX.value = Math.min(maxX, Math.max(0, scrollX.value));
  scrollY.value = Math.min(maxY, Math.max(0, scrollY.value));
}

/** CanvasKit 的 Color 第四参为 alpha（0–1），不能传 0–255 */
function skColor(rgb: { r: number; g: number; b: number }, a = 1) {
  return ck!.Color(rgb.r, rgb.g, rgb.b, a);
}

function selectionAllState(
  data: Record<string, unknown>[],
  rowKey: string,
  selected: Set<string>,
): { all: boolean; indeterminate: boolean } {
  if (data.length === 0) {
    return { all: false, indeterminate: false };
  }
  let n = 0;
  for (const r of data) {
    if (selected.has(keyString(rowKeyValue(r, rowKey)))) {
      n++;
    }
  }
  return {
    all: n === data.length,
    indeterminate: n > 0 && n < data.length,
  };
}

/** 与 canvasDraw `drawCheckbox2D` 对齐（14px 框 + 勾选/半选） */
function drawSkiaCheckbox(
  skCanvas: Canvas,
  centerX: number,
  centerY: number,
  checked: boolean,
  indeterminate: boolean,
  strokePaint: Paint,
  fillPaint: Paint,
  checkStroke: Paint,
) {
  const CB = 14 * dpr;
  const x = centerX - CB / 2;
  const y = centerY - CB / 2;
  skCanvas.drawRect(ck!.LTRBRect(x, y, x + CB, y + CB), strokePaint);
  if (indeterminate) {
    fillPaint.setColor(skColor(hexToRgb(t.textPrimary)));
    const barH = 2 * dpr;
    const barW = CB - 6 * dpr;
    skCanvas.drawRect(
      ck!.LTRBRect(x + 3 * dpr, y + CB / 2 - barH / 2, x + 3 * dpr + barW, y + CB / 2 + barH / 2),
      fillPaint,
    );
  } else if (checked) {
    checkStroke.setStrokeWidth(1.5 * dpr);
    skCanvas.drawLine(x + 3 * dpr, y + CB / 2, x + CB / 2 - 0.5 * dpr, y + CB - 4 * dpr, checkStroke);
    skCanvas.drawLine(x + CB / 2 - 0.5 * dpr, y + CB - 4 * dpr, x + CB - 3 * dpr, y + 3 * dpr, checkStroke);
  }
}

async function loadCanvasKit() {
  loadError.value = "";
  try {
    const mod = await import("canvaskit-wasm");
    const init = mod.default;
    ck = await init({
      locateFile: (file: string) => canvaskitLocateFile(file, props.skiaWasmBaseUrl),
    });
    try {
      skTypeface = await resolveSkiaTypeface(ck);
    } catch {
      skTypeface = ck.Typeface.GetDefault();
    }
  } catch {
    loadError.value =
      "CanvasKit（Skia WASM）加载失败：请安装依赖 canvaskit-wasm，或配置可用的 skiaWasmBaseUrl。";
    ck = null;
    skTypeface = null;
  }
}

function disposePaintFonts() {
  paintFont?.delete?.();
  paintFontEmpty?.delete?.();
  paintFontHeader?.delete?.();
  paintFont = null;
  paintFontEmpty = null;
  paintFontHeader = null;
}

function ensurePaintFonts(): { cell: Font; empty: Font; header: Font } {
  const face = skTypeface ?? ck!.Typeface.GetDefault();
  const cellSize = t.fontSizeCell * dpr;
  const emptySize = t.fontSizeEmpty * dpr;
  if (!paintFont || !paintFontEmpty || !paintFontHeader) {
    disposePaintFonts();
    paintFont = new ck!.Font(face, cellSize);
    paintFontEmpty = new ck!.Font(face, emptySize);
    paintFontHeader = new ck!.Font(face, cellSize);
    paintFontHeader.setEmbolden(true);
  } else {
    paintFont.setTypeface(face);
    paintFont.setSize(cellSize);
    paintFontEmpty.setTypeface(face);
    paintFontEmpty.setSize(emptySize);
    paintFontHeader.setTypeface(face);
    paintFontHeader.setSize(cellSize);
    paintFontHeader.setEmbolden(true);
  }
  return { cell: paintFont, empty: paintFontEmpty, header: paintFontHeader };
}

function disposeSurface() {
  surface?.delete?.();
  surface = null;
}

function ensureCanvasSurface(canvas: HTMLCanvasElement, cssWidth: number, cssHeight: number): Surface | null {
  if (!ck) {
    return null;
  }
  const w = Math.max(1, Math.floor(cssWidth * dpr));
  const h = Math.max(1, Math.floor(cssHeight * dpr));
  if (surface && w === lastPixelW && h === lastPixelH) {
    return surface;
  }
  disposeSurface();
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  lastPixelW = w;
  lastPixelH = h;
  const s =
    ck.MakeWebGLCanvasSurface(canvas) ?? ck.MakeSWCanvasSurface(canvas) ?? ck.MakeCanvasSurface(canvas);
  surface = s;
  return s;
}

function paintSkia() {
  if (!ck || !canvasRef.value) {
    return;
  }
  const canvas = canvasRef.value;
  const widths = colWidths();
  const tw = totalWidth();
  const vis = visibleColumns(props.columns);
  const selectedKeys = selection.selectedKeys.value;
  const { all: headerAll, indeterminate: headerIndeterminate } = selectionAllState(
    props.tableData,
    props.rowKey,
    selectedKeys,
  );

  const surf = ensureCanvasSurface(canvas, cssW.value, cssH.value);
  if (!surf) {
    surfaceError.value = "CanvasKit 无法创建绘图 Surface（请检查 WebGL/Canvas 是否可用）。";
    return;
  }
  surfaceError.value = "";
  const skCanvas = surf.getCanvas();
  const surfaceRgb = hexToRgb(t.surfaceBg);
  skCanvas.clear(skColor(surfaceRgb));

  const borderRgb = hexToRgb(t.borderColor);
  const strokePaint = new ck.Paint();
  strokePaint.setStyle(ck.PaintStyle.Stroke);
  strokePaint.setStrokeWidth(1);
  strokePaint.setAntiAlias(true);
  strokePaint.setColor(skColor(borderRgb));

  const fillPaint = new ck.Paint();
  fillPaint.setStyle(ck.PaintStyle.Fill);
  fillPaint.setAntiAlias(true);

  const checkStroke = new ck.Paint();
  checkStroke.setStyle(ck.PaintStyle.Stroke);
  checkStroke.setStrokeWidth(1);
  checkStroke.setAntiAlias(true);
  checkStroke.setColor(skColor(hexToRgb(t.textPrimary)));

  const { cell: fontCell, empty: fontEmpty, header: fontHeader } = ensurePaintFonts();

  const wPx = cssW.value * dpr;
  const hPx = cssH.value * dpr;

  if (vis.length === 0) {
    const emptyPaint = new ck.Paint();
    emptyPaint.setAntiAlias(true);
    emptyPaint.setColor(skColor(hexToRgb(t.textEmpty)));
    const txt = props.emptyText;
    const approxHalf = txt.length * t.fontSizeEmpty * dpr * 0.32;
    skCanvas.drawText(txt, wPx / 2 - approxHalf, hPx / 2 + t.fontSizeEmpty * dpr * 0.35, emptyPaint, fontEmpty);
    strokePaint.setColor(skColor(borderRgb));
    skCanvas.drawRect(ck.LTRBRect(0.5, 0.5, wPx - 0.5, hPx - 0.5), strokePaint);
    surf.flush();
    return;
  }

  skCanvas.save();
  skCanvas.translate(-scrollX.value * dpr, -scrollY.value * dpr);

  const headerRgb = hexToRgb(t.headerBg);
  fillPaint.setColor(skColor(headerRgb));
  skCanvas.drawRect(ck.LTRBRect(0, 0, tw * dpr, props.headerHeight * dpr), fillPaint);

  const headerTextPaint = new ck.Paint();
  headerTextPaint.setAntiAlias(true);
  headerTextPaint.setColor(skColor(hexToRgb(t.textHeader)));

  let hx = 0;
  for (let i = 0; i < vis.length; i++) {
    const col = vis[i]!;
    const cw = (widths[i] ?? tableLayoutDefaults.defaultColumnWidth) * dpr;
    skCanvas.drawRect(ck.LTRBRect(hx, 0, hx + cw, props.headerHeight * dpr), strokePaint);
    if (col.type === "selection") {
      drawSkiaCheckbox(
        skCanvas,
        hx + cw / 2,
        (props.headerHeight / 2) * dpr,
        headerAll,
        headerIndeterminate,
        strokePaint,
        fillPaint,
        checkStroke,
      );
    } else {
      const ht = headerText(col);
      if (ht) {
        skCanvas.drawText(ht, hx + 8 * dpr, (props.headerHeight / 2 + 5) * dpr, headerTextPaint, fontHeader);
      }
    }
    hx += cw;
  }

  const cellTextPaint = new ck.Paint();
  cellTextPaint.setAntiAlias(true);
  cellTextPaint.setColor(skColor(hexToRgb(t.textPrimary)));

  const lampFillPaint = new ck.Paint();
  lampFillPaint.setStyle(ck.PaintStyle.Fill);
  lampFillPaint.setAntiAlias(true);

  if (props.tableData.length === 0) {
    const emptyPaint = new ck.Paint();
    emptyPaint.setAntiAlias(true);
    emptyPaint.setColor(skColor(hexToRgb(t.textEmpty)));
    const txt = props.emptyText;
    const approxHalf = txt.length * t.fontSizeEmpty * dpr * 0.32;
    const ey = (props.headerHeight + Math.max(0, (cssH.value - props.headerHeight) / 2)) * dpr;
    skCanvas.drawText(txt, (cssW.value / 2) * dpr - approxHalf, ey + t.fontSizeEmpty * dpr * 0.35, emptyPaint, fontEmpty);
    skCanvas.restore();
    strokePaint.setColor(skColor(borderRgb));
    skCanvas.drawRect(ck.LTRBRect(0.5, 0.5, wPx - 0.5, hPx - 0.5), strokePaint);
    surf.flush();
    return;
  }

  const stripeRgb = hexToRgb(t.rowStripe);
  const baseRgb = hexToRgb(t.rowBase);

  const startRow = Math.max(0, Math.floor((scrollY.value - props.headerHeight) / props.rowHeight));
  const endRow = Math.min(
    props.tableData.length - 1,
    Math.ceil((scrollY.value + cssH.value - props.headerHeight) / props.rowHeight),
  );

  const approxCharW = t.fontSizeCell * dpr * 0.52;

  for (let r = startRow; r <= endRow; r++) {
    const row = props.tableData[r]!;
    const y = props.headerHeight + r * props.rowHeight;
    const yd = y * dpr;
    const rh = props.rowHeight * dpr;
    const rowBg = r % 2 === 1 ? stripeRgb : baseRgb;
    fillPaint.setColor(skColor(rowBg));
    skCanvas.drawRect(ck.LTRBRect(0, yd, tw * dpr, yd + rh), fillPaint);

    let cx = 0;
    for (let c = 0; c < vis.length; c++) {
      const col = vis[c]!;
      const cellW = (widths[c] ?? tableLayoutDefaults.defaultColumnWidth) * dpr;
      skCanvas.drawRect(ck.LTRBRect(cx, yd, cx + cellW, yd + rh), strokePaint);
      const midY = (y + props.rowHeight / 2 + 5) * dpr;
      if (col.type === "selection") {
        const checked = selectedKeys.has(keyString(rowKeyValue(row, props.rowKey)));
        drawSkiaCheckbox(skCanvas, cx + cellW / 2, y * dpr + rh / 2, checked, false, strokePaint, fillPaint, checkStroke);
      } else if (col.type === "status-custom") {
        const text = formatCell(col, row, r);
        lampFillPaint.setColor(skColor(cssRgbOrRgbaToRgb(statusCustomLampColor(col, row))));
        skCanvas.drawCircle(cx + 8 * dpr + 4 * dpr, y * dpr + rh / 2, 4 * dpr, lampFillPaint);
        const tx = cx + 8 * dpr + 8 * dpr + 8 * dpr;
        const maxTw = Math.max(4 * dpr, cellW - (tx - cx) - 8 * dpr);
        const maxChars = Math.max(1, Math.floor(maxTw / approxCharW));
        const shown =
          text.length <= maxChars ? text : `${text.slice(0, Math.max(0, maxChars - 1))}…`;
        skCanvas.drawText(shown, tx, midY, cellTextPaint, fontCell);
      } else {
        const text = formatCell(col, row, r);
        const align =
          col.type === "index"
            ? "center"
            : col.align === "center"
              ? "center"
              : col.align === "right"
                ? "right"
                : "left";
        let tx: number;
        const textW = text.length * approxCharW;
        if (align === "center") {
          tx = cx + cellW / 2 - textW / 2;
        } else if (align === "right") {
          tx = cx + cellW - 8 * dpr - textW;
        } else {
          tx = cx + 8 * dpr;
        }
        skCanvas.drawText(text, tx, midY, cellTextPaint, fontCell);
      }
      cx += cellW;
    }
  }

  skCanvas.restore();

  strokePaint.setColor(skColor(borderRgb));
  skCanvas.drawRect(ck.LTRBRect(0.5, 0.5, wPx - 0.5, hPx - 0.5), strokePaint);

  surf.flush();
}

function schedulePaint() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    clampScroll();
    paintSkia();
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
    colWidths(),
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

onMounted(async () => {
  await loadCanvasKit();
  const el = containerRef.value;
  if (el) {
    ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr) {
        cssW.value = Math.floor(cr.width);
        cssH.value = Math.floor(cr.height);
        schedulePaint();
      }
    });
    ro.observe(el);
  }
  schedulePaint();
});

onUnmounted(() => {
  ro?.disconnect();
  cancelAnimationFrame(raf);
  disposeSurface();
  disposePaintFonts();
  lastPixelW = 0;
  lastPixelH = 0;
  skTypeface = null;
  ck = null;
});

watch(
  () => [props.tableData, props.columns, props.emptyText, props.rowHeight, props.headerHeight, props.rowKey],
  () => schedulePaint(),
  { deep: true },
);

watch(selection.selectedKeys, () => schedulePaint());
</script>

<template>
  <div ref="containerRef" class="crud-base-table__skia" tabindex="0" @wheel="onWheel">
    <div v-if="loadError" class="crud-base-table__skia-message">{{ loadError }}</div>
    <div v-else-if="surfaceError" class="crud-base-table__skia-message">{{ surfaceError }}</div>
    <canvas v-show="!loadError" ref="canvasRef" class="crud-base-table__skia-surface" @click="onCanvasClick" />
  </div>
</template>

<style scoped lang="scss">
.crud-base-table__skia {
  position: relative;
  height: 100%;
  min-height: 120px;
  outline: none;
  overflow: hidden;
}

.crud-base-table__skia-message {
  padding: 12px;
  font-size: 13px;
  color: var(--el-color-danger);
}

.crud-base-table__skia-surface {
  display: block;
  vertical-align: top;
}
</style>
