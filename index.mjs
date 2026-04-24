import { defineComponent as Ve, openBlock as H, createElementBlock as E, createVNode as ue, unref as r, withCtx as ye, createTextVNode as Tt, toDisplayString as ot, createBlock as A, createSlots as Sl, createElementVNode as ee, useModel as gl, withKeys as Dt, mergeModels as il, ref as Y, computed as B, reactive as Ll, onMounted as Lt, onUnmounted as pt, nextTick as wl, normalizeStyle as te, withModifiers as at, createCommentVNode as fe, normalizeClass as vt, mergeProps as $e, Fragment as cl, renderList as Nl, watch as Re, toRef as wt, onActivated as Rt, onDeactivated as It, withDirectives as Ol, vShow as Ml, h as Ue, shallowRef as Jl, renderSlot as Yl, KeepAlive as Fl } from "vue";
import { ElButton as bl, ElTag as Kl, ElEmpty as jl, ElLink as Ul, ElInput as Ct, ElIcon as Dl, ElPopover as hl, ElTable as Rl, ElTableColumn as nt, ElSwitch as yl, ElImage as Il, ElTooltip as Nt, ElAutoResizer as Cl, ElTableV2 as Gl, ElCheckbox as sl } from "element-plus";
import { Search as Gt } from "@element-plus/icons-vue";
import { omit as Ql } from "lodash-es";
const Al = { class: "hello-button" }, El = /* @__PURE__ */ Ve({
  name: "HelloButton",
  __name: "HelloButton",
  props: {
    label: { default: "Hello Element Plus" }
  },
  setup(e) {
    return (n, t) => (H(), E("div", Al, [
      ue(r(bl), { type: "primary" }, {
        default: ye(() => [
          Tt(ot(e.label), 1)
        ]),
        _: 1
      })
    ]));
  }
}), Je = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [l, u] of n)
    t[l] = u;
  return t;
}, Bl = /* @__PURE__ */ Je(El, [["__scopeId", "data-v-362f9152"]]), $l = /* @__PURE__ */ Ve({
  name: "StatusTag",
  __name: "StatusTag",
  props: {
    label: {},
    type: { default: "info" }
  },
  setup(e) {
    return (n, t) => (H(), A(r(Kl), {
      class: "status-tag",
      type: e.type,
      effect: "light",
      round: ""
    }, {
      default: ye(() => [
        Tt(ot(e.label), 1)
      ]),
      _: 1
    }, 8, ["type"]));
  }
}), _l = /* @__PURE__ */ Je($l, [["__scopeId", "data-v-d2936541"]]), en = { class: "empty-placeholder" }, tn = { class: "empty-placeholder__sub" }, ln = /* @__PURE__ */ Ve({
  name: "EmptyPlaceholder",
  __name: "EmptyPlaceholder",
  props: {
    description: { default: "暂无数据" },
    subtext: { default: "" }
  },
  setup(e) {
    return (n, t) => (H(), E("div", en, [
      ue(r(jl), { description: e.description }, Sl({ _: 2 }, [
        e.subtext ? {
          name: "default",
          fn: ye(() => [
            ee("p", tn, ot(e.subtext), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["description"])
    ]));
  }
}), nn = /* @__PURE__ */ Je(ln, [["__scopeId", "data-v-96dc27dd"]]), rn = /* @__PURE__ */ Ve({
  name: "TextLink",
  __name: "TextLink",
  props: {
    text: {},
    disabled: { type: Boolean, default: !1 },
    underline: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: n }) {
    const t = n;
    function l(u) {
      t("click", u);
    }
    return (u, d) => (H(), A(r(Ul), {
      class: "text-link",
      type: "primary",
      disabled: e.disabled,
      underline: e.underline,
      onClick: l
    }, {
      default: ye(() => [
        Tt(ot(e.text), 1)
      ]),
      _: 1
    }, 8, ["disabled", "underline"]));
  }
}), an = /* @__PURE__ */ Je(rn, [["__scopeId", "data-v-b6649cca"]]), un = { class: "search-bar" }, fn = /* @__PURE__ */ Ve({
  name: "SearchBar",
  __name: "SearchBar",
  props: /* @__PURE__ */ il({
    placeholder: { default: "请输入关键词" },
    clearable: { type: Boolean, default: !0 }
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ il(["search"], ["update:modelValue"]),
  setup(e, { emit: n }) {
    const t = gl(e, "modelValue"), l = n;
    function u() {
      t.value = "", l("search", "");
    }
    function d() {
      l("search", t.value);
    }
    return (a, c) => (H(), E("div", un, [
      ue(r(Ct), {
        modelValue: t.value,
        "onUpdate:modelValue": c[0] || (c[0] = (f) => t.value = f),
        class: "search-bar__input",
        placeholder: e.placeholder,
        clearable: e.clearable,
        onClear: u,
        onKeyup: Dt(d, ["enter"])
      }, {
        prefix: ye(() => [
          ue(r(Dl), { class: "search-bar__icon" }, {
            default: ye(() => [
              ue(r(Gt))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "placeholder", "clearable"])
    ]));
  }
}), cn = /* @__PURE__ */ Je(fn, [["__scopeId", "data-v-8b9a9000"]]), Ht = "crud-base-table-tooltip", ze = {
  rowHeight: 36,
  headerHeight: 40,
  minColumnWidth: 64,
  defaultColumnWidth: 120,
  /** 与 Element 模式 `type="selection"` 默认列宽一致 */
  selectionColumnWidth: 40,
  /** 与 Element 模式 `type="index"` 默认列宽一致 */
  indexColumnWidth: 52
}, ft = {
  /** 表体、画布底色 */
  surfaceBg: "#ffffff",
  /** 表头背景（对齐 Element 常见工作台表头） */
  headerBg: "#f2f6fc",
  /** 边框线 */
  borderColor: "#ebeef5",
  /** 单元格正文 */
  textPrimary: "#606266",
  /** 表头文字 */
  textHeader: "#303133",
  /** 空状态提示 */
  textEmpty: "#606266",
  /** 斑马纹行（与 ElTable stripe：奇数 displayIndex） */
  rowStripe: "#fafafa",
  /** 非斑马行底 */
  rowBase: "#ffffff",
  /** 行 hover（与 EP 常用浅灰接近） */
  rowHoverBg: "#f5f7fa",
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  /** 表头字重（与 Table-V2 / 覆盖后的 ElTable 一致） */
  headerFontWeight: 600,
  /** 单元格字重 */
  cellFontWeight: 400,
  /** 与默认 rowHeight 搭配的单元格字号 */
  fontSizeCell: 13,
  fontSizeEmpty: 14
};
function qe(e) {
  const n = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(e.trim());
  return n ? {
    r: parseInt(n[1], 16),
    g: parseInt(n[2], 16),
    b: parseInt(n[3], 16)
  } : { r: 0, g: 0, b: 0 };
}
function sn(e) {
  const n = e.trim(), t = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(n);
  return t ? { r: +t[1], g: +t[2], b: +t[3] } : n.startsWith("#") ? qe(n) : { r: 203, g: 206, b: 212 };
}
function Qt(e = ze.rowHeight, n = ze.headerHeight) {
  const t = ft;
  return {
    "--crud-bt-surface-bg": t.surfaceBg,
    "--crud-bt-header-bg": t.headerBg,
    "--crud-bt-border": t.borderColor,
    "--crud-bt-text": t.textPrimary,
    "--crud-bt-header-text": t.textHeader,
    "--crud-bt-text-empty": t.textEmpty,
    "--crud-bt-row-stripe": t.rowStripe,
    "--crud-bt-row-base": t.rowBase,
    "--crud-bt-row-hover": t.rowHoverBg,
    "--crud-bt-font-size": `${t.fontSizeCell}px`,
    "--crud-bt-row-height": `${e}px`,
    "--crud-bt-header-height": `${n}px`,
    "--crud-bt-header-font-weight": String(t.headerFontWeight),
    "--crud-bt-cell-font-weight": String(t.cellFontWeight),
    "--el-table-border-color": t.borderColor,
    "--el-table-text-color": t.textPrimary,
    "--el-table-header-text-color": t.textHeader,
    "--el-table-header-bg-color": t.headerBg,
    "--el-table-bg-color": t.surfaceBg,
    "--el-table-tr-bg-color": t.rowBase,
    "--el-table-row-hover-bg-color": t.rowHoverBg
  };
}
function St(e = ft) {
  return `${e.cellFontWeight} ${e.fontSizeCell}px ${e.fontFamily}`;
}
function on(e = ft) {
  return `${e.headerFontWeight} ${e.fontSizeCell}px ${e.fontFamily}`;
}
function ol(e = ft) {
  return `${e.cellFontWeight} ${e.fontSizeEmpty}px ${e.fontFamily}`;
}
const vn = [
  "key",
  "label",
  "title",
  "type",
  "formatter",
  "show",
  "groupItems",
  "children",
  "onclick",
  "successText",
  "failText",
  "isSuccess",
  "desc",
  "activeValue",
  "inactiveValue",
  "disabled",
  "colorMap",
  "columns",
  "popoverWidth",
  "filter",
  "filterPlaceholder",
  "objectSpanMethod",
  "beforeChange",
  "tableSlot",
  "slotName",
  "click",
  "showOverflowTooltip"
];
function rt(e) {
  return {
    ...Ql(e, vn),
    label: gt(e),
    prop: e.key
  };
}
function Ie(e) {
  return e.filter((n) => n.show !== !1);
}
function gt(e) {
  return e.type === "selection" || e.type === "index" ? "" : String(e.label ?? e.title ?? e.key);
}
const qt = "rgba(203, 206, 212, 1)";
function Ot(e, n) {
  if (e.type !== "status-custom")
    return qt;
  const t = e.colorMap;
  if (!t)
    return qt;
  const l = n[e.key];
  if (l == null)
    return qt;
  const u = t[String(l)];
  return typeof u == "string" ? u : qt;
}
function ut(e, n, t) {
  const l = n, u = l[e.key];
  if (e.formatter)
    return e.formatter(l, e, u);
  if (e.type === "index")
    return String(t + 1);
  if (e.type === "selection")
    return "";
  if (e.type === "switch") {
    const d = e.activeValue ?? !0;
    return u === d ? "开" : "关";
  }
  return e.type === "tableSlot" ? "查看" : u == null ? "" : typeof u == "object" ? JSON.stringify(u) : String(u);
}
function Mt(e, n) {
  const t = Ie(e);
  if (t.length === 0)
    return [];
  const l = ze.minColumnWidth, u = t.map((i) => i.type === "selection" ? {
    fixed: !0,
    base: Math.max(l, i.width ?? ze.selectionColumnWidth)
  } : i.type === "index" ? { fixed: !0, base: Math.max(l, i.width ?? ze.indexColumnWidth) } : i.width != null ? { fixed: !0, base: Math.max(l, i.width) } : {
    fixed: !1,
    base: Math.max(l, i.minWidth ?? ze.defaultColumnWidth)
  }), d = u.reduce((i, x) => i + (x.fixed ? x.base : 0), 0), a = u.filter((i) => !i.fixed), c = a.reduce((i, x) => i + x.base, 0), f = n - d;
  if (a.length === 0)
    return u.map((i) => i.base);
  if (f >= c) {
    const x = (f - c) / a.length;
    return u.map((w) => w.fixed ? w.base : Math.floor(w.base + x));
  }
  const m = Math.max(0, f / c);
  return u.map((i) => i.fixed ? i.base : Math.max(l, Math.floor(i.base * m)));
}
async function At(e, n) {
  if (n.disabled) return null;
  const t = n.activeValue ?? !0, l = n.inactiveValue ?? !1, u = e[n.key] === t ? l : t;
  if (n.beforeChange)
    try {
      if (!await n.beforeChange(e, n)) return null;
    } catch {
      return null;
    }
  return e[n.key] = u, u;
}
function we(e, n) {
  return e[n];
}
function Ne(e) {
  if (e == null)
    return "\0__null__";
  if (typeof e == "object")
    try {
      return JSON.stringify(e);
    } catch {
      return String(e);
    }
  return String(e);
}
const he = ft, De = 14;
function vl(e, n, t, l, u) {
  const d = n - De / 2, a = t - De / 2;
  e.save(), e.strokeStyle = he.borderColor, e.fillStyle = he.textPrimary, e.lineWidth = 1, e.strokeRect(d, a, De, De), u ? e.fillRect(d + 3, a + De / 2 - 1, De - 6, 2) : l && (e.beginPath(), e.strokeStyle = he.textPrimary, e.lineWidth = 1.5, e.moveTo(d + 3, a + De / 2), e.lineTo(d + De / 2 - 0.5, a + De - 4), e.lineTo(d + De - 3, a + 3), e.stroke()), e.restore();
}
function dn(e, n, t, l, u, d) {
  e.beginPath(), e.moveTo(n + d, t), e.arcTo(n + l, t, n + l, t + u, d), e.arcTo(n + l, t + u, n, t + u, d), e.arcTo(n, t + u, n, t, d), e.arcTo(n, t, n + l, t, d), e.closePath(), e.fill();
}
function mn(e, n, t, l, u) {
  const m = n - 20, i = t - 20 / 2;
  e.save(), e.fillStyle = u ? "#a8abb2" : l ? "#409eff" : "#dcdfe6", dn(e, m, i, 40, 20, 20 / 2);
  const x = l ? m + 40 - 3 - 7 : m + 3 + 7;
  e.beginPath(), e.arc(x, t, 7, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.restore();
}
function bn(e, n, t, l, u, d, a, c) {
  const f = ut(d, a, c), m = t + u / 2;
  e.save(), e.beginPath(), e.arc(n + 8 + 4, m, 4, 0, Math.PI * 2), e.fillStyle = Ot(d, a), e.fill(), e.fillStyle = he.textPrimary, e.textAlign = "left", e.font = St();
  const i = n + 8 + 8 + 8, x = Math.max(0, l - (i - n) - 8);
  e.beginPath(), e.rect(n + 1, t + 1, l - 2, u - 2), e.clip(), e.fillText(zl(e, f, x), i, m), e.restore();
}
function hn(e, n, t) {
  if (e.length === 0)
    return { all: !1, indeterminate: !1 };
  let l = 0;
  for (const u of e)
    t.has(Ne(we(u, n))) && l++;
  return {
    all: l === e.length,
    indeterminate: l > 0 && l < e.length
  };
}
function Ut(e) {
  const {
    ctx: n,
    width: t,
    height: l,
    scrollX: u,
    scrollY: d,
    headerHeight: a,
    rowHeight: c,
    columns: f,
    data: m,
    colWidths: i,
    dpr: x,
    emptyText: w,
    rowKey: V,
    selectedKeys: g
  } = e, N = Ie(f);
  n.save(), n.scale(x, x);
  const s = t / x, R = l / x;
  n.clearRect(0, 0, s, R), n.fillStyle = he.surfaceBg, n.fillRect(0, 0, s, R);
  const F = i.reduce((X, Z) => X + Z, 0);
  if (N.length === 0) {
    n.fillStyle = he.textEmpty, n.font = ol(), n.textAlign = "center", n.textBaseline = "middle", n.fillText(w, s / 2, R / 2), n.restore();
    return;
  }
  const { all: D, indeterminate: K } = hn(
    m,
    V,
    g
  );
  function W() {
    n.fillStyle = he.headerBg, n.fillRect(0, 0, Math.min(s, F - u), a), n.strokeStyle = he.borderColor, n.lineWidth = 1;
    let X = -u;
    for (let Z = 0; Z < N.length; Z++) {
      const M = N[Z], j = i[Z] ?? ze.defaultColumnWidth, U = X;
      if (U + j > 0 && U < s)
        if (n.strokeRect(U, 0, j, a), M.type === "selection")
          vl(n, U + j / 2, a / 2, D, K);
        else {
          n.font = on(), n.fillStyle = he.textHeader, n.textAlign = "left";
          const I = gt(M);
          I && n.fillText(I, Math.max(8, U + 8), a / 2);
        }
      X += j;
    }
  }
  if (m.length === 0) {
    W(), n.fillStyle = he.textEmpty, n.font = ol(), n.textAlign = "center", n.textBaseline = "middle", n.fillText(w, s / 2, a + Math.max(0, (R - a) / 2)), n.strokeStyle = he.borderColor, n.strokeRect(0, 0, s, R), n.restore();
    return;
  }
  const k = -u;
  n.textBaseline = "middle", n.font = St();
  const p = Math.max(0, Math.floor((d - a) / c)), b = Math.min(m.length - 1, Math.ceil((d + R - a) / c));
  n.save(), n.beginPath(), n.rect(0, a, s, R - a), n.clip();
  for (let X = p; X <= b; X++) {
    const Z = m[X], M = a + X * c - d;
    if (M + c < a || M > R)
      continue;
    n.fillStyle = X % 2 === 1 ? he.rowStripe : he.rowBase, n.fillRect(0, M, Math.min(s, F - u), c);
    let j = k;
    for (let U = 0; U < N.length; U++) {
      const I = N[U], $ = i[U] ?? ze.defaultColumnWidth, G = j;
      if (G + $ > 0 && G < s)
        if (n.strokeStyle = he.borderColor, n.strokeRect(G, M, $, c), I.type === "selection") {
          const Xe = g.has(Ne(we(Z, V)));
          vl(n, G + $ / 2, M + c / 2, Xe, !1);
        } else if (I.type === "switch") {
          const Xe = I.activeValue ?? !0;
          mn(
            n,
            G + $ / 2,
            M + c / 2,
            Z[I.key] === Xe,
            !!I.disabled
          );
        } else if (I.type === "status-custom")
          bn(n, G, M, $, c, I, Z, X);
        else {
          const Xe = ut(I, Z, X);
          n.fillStyle = he.textPrimary;
          const We = I.type === "index" || I.align === "center" ? "center" : I.align === "right" ? "right" : "left";
          n.textAlign = We;
          const Ye = We === "center" ? G + $ / 2 : We === "right" ? G + $ - 8 : G + 8, _e = $ - 16;
          n.save(), n.beginPath(), n.rect(G + 1, M + 1, $ - 2, c - 2), n.clip(), n.font = St(), n.fillText(zl(n, Xe, _e), Ye, M + c / 2), n.restore();
        }
      j += $;
    }
  }
  n.restore(), W(), n.strokeStyle = he.borderColor, n.strokeRect(0, 0, s, R), n.restore();
}
function zl(e, n, t) {
  if (e.measureText(n).width <= t)
    return n;
  let l = n.length;
  for (; l > 0 && e.measureText(`${n.slice(0, l)}…`).width > t; )
    l--;
  return `${n.slice(0, l)}…`;
}
function Jt(e, n, t, l, u, d) {
  if (e < 0 || n < 0)
    return null;
  let a = 0, c = -1;
  for (let m = 0; m < u.length; m++) {
    const i = u[m] ?? 0;
    if (e < a + i) {
      c = m;
      break;
    }
    a += i;
  }
  if (c < 0)
    return null;
  if (n < t)
    return { kind: "header", colIndex: c };
  const f = Math.floor((n - t) / l);
  return f < 0 || f >= d ? null : { kind: "body", colIndex: c, rowIndex: f };
}
function Yt(e, n) {
  const t = Y(/* @__PURE__ */ new Set());
  function l() {
    return n.value.filter((i) => t.value.has(Ne(we(i, e))));
  }
  const u = B(() => {
    const i = n.value;
    return i.length === 0 ? !1 : i.every((x) => t.value.has(Ne(we(x, e))));
  }), d = B(() => {
    const i = n.value;
    if (i.length === 0)
      return !1;
    const x = i.filter((w) => t.value.has(Ne(we(w, e)))).length;
    return x > 0 && x < i.length;
  });
  function a(i) {
    return t.value.has(Ne(we(i, e)));
  }
  function c(i) {
    t.value = i;
  }
  function f(i) {
    const x = Ne(we(i, e)), w = new Set(t.value);
    return w.has(x) ? w.delete(x) : w.add(x), t.value = w, l();
  }
  function m() {
    const i = n.value, x = new Set(t.value);
    return i.length === 0 || (i.every((V) => x.has(Ne(we(V, e)))) ? i.forEach((V) => x.delete(Ne(we(V, e)))) : i.forEach((V) => x.add(Ne(we(V, e)))), t.value = x), l();
  }
  return {
    selectedKeys: t,
    isAllSelected: u,
    isIndeterminate: d,
    isRowSelected: a,
    toggleRow: f,
    toggleAll: m,
    selectedRows: l,
    setSelected: c
  };
}
function Et(e, n, t, l, u, d, a) {
  let c = 0;
  for (let g = 0; g < l; g++)
    c += t[g];
  const f = t[l] ?? 0, m = 40, i = 20, x = c + f / 2, V = u + a * d + d / 2;
  return e >= x - m / 2 && e <= x + m / 2 && n >= V - i / 2 && n <= V + i / 2;
}
function Bt(e, n, t) {
  let l = 0;
  for (let c = 0; c < t; c++)
    l += n[c];
  const u = 8, a = 2 * ft.fontSizeCell + 6;
  return e >= l + u - 2 && e <= l + u + a;
}
function $t(e) {
  const n = Y(), t = Ll({
    visible: !1,
    row: null,
    column: null,
    x: 0,
    y: 0
  });
  function l(a, c, f, m) {
    t.row = a, t.column = c, t.x = f, t.y = m, t.visible = !0;
  }
  function u() {
    t.visible = !1;
  }
  function d(a) {
    var c, f, m;
    t.visible && ((c = e.value) != null && c.contains(a.target) || (m = (f = a.target) == null ? void 0 : f.closest) != null && m.call(f, ".table-slot-popover") || (t.visible = !1));
  }
  return Lt(() => {
    document.addEventListener("mousedown", d);
  }), pt(() => {
    document.removeEventListener("mousedown", d);
  }), { slotTriggerRef: n, slotPopup: t, openSlotPopup: l, closeSlotPopup: u };
}
const yn = /* @__PURE__ */ new Set(["selection", "switch", "image", "tableSlot"]);
function zn(e, n) {
  return e.type === "status-custom" ? Math.max(0, n - 32) : Math.max(0, n - 16);
}
function _t(e, n) {
  const t = Y(), l = Y(!1), u = Y("");
  let d = -1, a = -1, c = 0;
  function f(w) {
    const V = e.value;
    if (!V) return;
    const g = V.getBoundingClientRect(), N = n.scrollX(), s = n.scrollY(), R = w.clientX - g.left + N, F = w.clientY - g.top + s, D = Ie(n.columns()), K = n.colWidths(), W = n.data(), k = Jt(
      R,
      F,
      n.headerHeight(),
      n.rowHeight(),
      K,
      W.length
    );
    if (!k || k.kind === "header") {
      l.value = !1, d = -1, a = -1;
      return;
    }
    const { colIndex: p, rowIndex: b } = k;
    if (p === d && b === a)
      return;
    const X = d !== -1 || a !== -1;
    d = p, a = b;
    const Z = D[p];
    if (!Z || Z.showOverflowTooltip === !1 || yn.has(Z.type ?? "")) {
      l.value = !1;
      return;
    }
    const M = W[b];
    if (!M) {
      l.value = !1;
      return;
    }
    const j = ut(Z, M, b);
    if (!j) {
      l.value = !1;
      return;
    }
    const U = K[p] ?? 0, I = zn(Z, U);
    if (n.measureTextWidth(j) <= I) {
      l.value = !1;
      return;
    }
    let G = 0;
    for (let We = 0; We < p; We++)
      G += K[We] ?? 0;
    const Xe = n.headerHeight() + b * n.rowHeight();
    u.value = j, X && l.value ? (l.value = !1, wl(() => {
      t.value && (t.value.style.left = `${G + U / 2 - N}px`, t.value.style.top = `${Xe - s}px`), l.value = !0;
    })) : (t.value && (t.value.style.left = `${G + U / 2 - N}px`, t.value.style.top = `${Xe - s}px`), l.value = !0);
  }
  function m(w) {
    cancelAnimationFrame(c), c = requestAnimationFrame(() => f(w));
  }
  function i() {
    cancelAnimationFrame(c), l.value = !1, d = -1, a = -1;
  }
  function x() {
    l.value = !1, d = -1, a = -1;
  }
  return {
    tooltipAnchorRef: t,
    tooltipVisible: l,
    tooltipContent: u,
    onContainerMousemove: m,
    onContainerMouseleave: i,
    hideTooltip: x
  };
}
let kt = null;
function Pl(e) {
  if (!kt) {
    const n = document.createElement("canvas");
    n.width = 1, n.height = 1, kt = n.getContext("2d");
  }
  return kt.font = St(), kt.measureText(e).width;
}
const dl = 6, Xt = 2, ml = 20;
function el(e) {
  const n = Y(!1), t = Y(!1);
  let l = !1;
  const u = B(() => e.totalHeight() > e.cssH.value), d = B(() => e.totalWidth() > e.cssW.value), a = B(() => {
    const b = e.headerHeight(), X = d.value ? dl + Xt : 0;
    return Math.max(0, e.cssH.value - b - Xt * 2 - X);
  }), c = B(() => {
    const b = u.value ? dl + Xt : 0;
    return Math.max(0, e.cssW.value - Xt * 2 - b);
  }), f = B(() => {
    const b = e.totalHeight(), X = e.cssH.value;
    return b <= X ? 0 : Math.max(ml, X / b * a.value);
  }), m = B(() => {
    const b = e.totalWidth(), X = e.cssW.value;
    return b <= X ? 0 : Math.max(ml, X / b * c.value);
  }), i = B(() => {
    const b = Math.max(1, e.totalHeight() - e.cssH.value);
    return e.scrollY.value / b * (a.value - f.value);
  }), x = B(() => {
    const b = Math.max(1, e.totalWidth() - e.cssW.value);
    return e.scrollX.value / b * (c.value - m.value);
  });
  function w() {
    n.value = !0, l = !0;
  }
  function V() {
    l = !1, !t.value && (n.value = !1);
  }
  let g = "v", N = 0, s = 0;
  function R(b) {
    if (t.value) {
      if (g === "v") {
        const X = a.value - f.value;
        if (X <= 0) return;
        const Z = Math.max(0, e.totalHeight() - e.cssH.value), M = b.clientY - N;
        e.scrollY.value = Math.max(0, Math.min(Z, s + M / X * Z));
      } else {
        const X = c.value - m.value;
        if (X <= 0) return;
        const Z = Math.max(0, e.totalWidth() - e.cssW.value), M = b.clientX - N;
        e.scrollX.value = Math.max(0, Math.min(Z, s + M / X * Z));
      }
      e.onScroll();
    }
  }
  function F() {
    t.value = !1, window.removeEventListener("mousemove", R, !0), window.removeEventListener("mouseup", F, !0), l || (n.value = !1);
  }
  function D(b, X) {
    X.preventDefault(), X.stopPropagation(), t.value = !0, g = b, N = b === "v" ? X.clientY : X.clientX, s = b === "v" ? e.scrollY.value : e.scrollX.value, window.addEventListener("mousemove", R, !0), window.addEventListener("mouseup", F, !0);
  }
  function K(b) {
    D("v", b);
  }
  function W(b) {
    D("h", b);
  }
  function k(b) {
    if (b.target.classList.contains("canvas-scrollbar__thumb")) return;
    b.preventDefault(), b.stopPropagation();
    const Z = b.currentTarget.getBoundingClientRect(), M = (b.clientY - Z.top) / a.value, j = Math.max(0, e.totalHeight() - e.cssH.value);
    e.scrollY.value = Math.max(0, Math.min(j, M * j)), e.onScroll();
  }
  function p(b) {
    if (b.target.classList.contains("canvas-scrollbar__thumb")) return;
    b.preventDefault(), b.stopPropagation();
    const Z = b.currentTarget.getBoundingClientRect(), M = (b.clientX - Z.left) / c.value, j = Math.max(0, e.totalWidth() - e.cssW.value);
    e.scrollX.value = Math.max(0, Math.min(j, M * j)), e.onScroll();
  }
  return pt(() => {
    window.removeEventListener("mousemove", R, !0), window.removeEventListener("mouseup", F, !0);
  }), {
    scrollbarVisible: n,
    dragging: t,
    hasVBar: u,
    hasHBar: d,
    showScrollbar: w,
    hideScrollbar: V,
    vTrackStyle: B(() => ({
      top: `${e.headerHeight() + Xt}px`,
      height: `${a.value}px`
    })),
    vThumbStyle: B(() => ({
      height: `${f.value}px`,
      transform: `translateY(${i.value}px)`
    })),
    hTrackStyle: B(() => ({
      width: `${c.value}px`
    })),
    hThumbStyle: B(() => ({
      width: `${m.value}px`,
      transform: `translateX(${x.value}px)`
    })),
    onVThumbMousedown: K,
    onHThumbMousedown: W,
    onVTrackClick: k,
    onHTrackClick: p
  };
}
const Pn = {
  key: 0,
  class: "table-slot-popover__filter"
}, xl = /* @__PURE__ */ Ve({
  name: "TableSlotPopover",
  __name: "TableSlotPopover",
  props: {
    row: {},
    column: {}
  },
  setup(e) {
    const n = e, t = Y(""), l = Qt();
    function u() {
      const d = n.row[n.column.key];
      return Array.isArray(d) ? !n.column.filter || !t.value ? d : d.filter(
        (a) => n.column.filter(t.value, a)
      ) : [];
    }
    return (d, a) => (H(), A(r(hl), {
      placement: "bottom",
      width: e.column.popoverWidth || 430,
      trigger: "click",
      teleported: !0,
      "popper-class": "table-slot-popover",
      onBeforeEnter: a[2] || (a[2] = (c) => t.value = "")
    }, {
      reference: ye(() => [
        ue(r(bl), {
          type: "primary",
          link: ""
        }, {
          default: ye(() => [...a[3] || (a[3] = [
            Tt("查看", -1)
          ])]),
          _: 1
        })
      ]),
      default: ye(() => [
        ee("div", {
          class: "table-slot-popover__body",
          style: te(r(l))
        }, [
          e.column.filter ? (H(), E("div", Pn, [
            ue(r(Ct), {
              modelValue: t.value,
              "onUpdate:modelValue": a[0] || (a[0] = (c) => t.value = c),
              "prefix-icon": r(Gt),
              placeholder: e.column.filterPlaceholder || "请输入",
              onKeydown: a[1] || (a[1] = Dt(at(() => {
              }, ["prevent"]), ["enter"]))
            }, null, 8, ["modelValue", "prefix-icon", "placeholder"])
          ])) : fe("", !0),
          ue(tl, {
            "table-data": u(),
            columns: e.column.columns ?? [],
            "table-max-height": 310
          }, null, 8, ["table-data", "columns"])
        ], 4)
      ]),
      _: 1
    }, 8, ["width"]));
  }
}), xn = {
  key: 0,
  class: "crud-base-table__element-mask"
}, Xn = /* @__PURE__ */ Ve({
  name: "BaseTableElement",
  __name: "BaseTableElement",
  props: {
    tableData: {},
    columns: {},
    rowKey: {},
    emptyText: {},
    loading: { type: Boolean },
    tableMaxHeight: {}
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = { popperClass: Ht }, l = n;
    function u(a) {
      l("selectionChange", a);
    }
    function d(a) {
      return (c, f, m) => a.formatter(c, a, m);
    }
    return (a, c) => (H(), E("div", {
      class: vt(["crud-base-table__element", { "crud-base-table__element--nested": e.tableMaxHeight != null }])
    }, [
      ue(r(Rl), $e({ data: e.tableData }, e.tableMaxHeight != null ? { "max-height": e.tableMaxHeight } : { height: "100%" }, {
        border: "",
        stripe: "",
        "row-key": e.rowKey,
        "empty-text": e.emptyText,
        "tooltip-options": t,
        onSelectionChange: u
      }), {
        default: ye(() => [
          (H(!0), E(cl, null, Nl(r(Ie)(e.columns), (f, m) => (H(), E(cl, {
            key: `${f.key}-${m}`
          }, [
            f.type === "selection" ? (H(), A(r(nt), $e({
              key: 0,
              type: "selection",
              width: r(ze).selectionColumnWidth
            }, { ref_for: !0 }, r(rt)(f)), null, 16, ["width"])) : f.type === "index" ? (H(), A(r(nt), $e({
              key: 1,
              type: "index",
              width: r(ze).indexColumnWidth
            }, { ref_for: !0 }, r(rt)(f)), null, 16, ["width"])) : f.type === "switch" ? (H(), A(r(nt), $e({
              key: 2,
              ref_for: !0
            }, r(rt)(f)), {
              default: ye((i) => [
                ue(r(yl), {
                  modelValue: i.row[f.key],
                  "onUpdate:modelValue": (x) => i.row[f.key] = x,
                  "active-value": f.activeValue ?? !0,
                  "inactive-value": f.inactiveValue ?? !1,
                  disabled: !!f.disabled,
                  "before-change": f.beforeChange ? () => f.beforeChange(i.row, f) : void 0
                }, null, 8, ["modelValue", "onUpdate:modelValue", "active-value", "inactive-value", "disabled", "before-change"])
              ]),
              _: 2
            }, 1040)) : f.type === "image" ? (H(), A(r(nt), $e({
              key: 3,
              ref_for: !0
            }, r(rt)(f)), {
              default: ye((i) => [
                ue(r(Il), {
                  src: String(i.row[f.key] ?? ""),
                  fit: "cover",
                  style: { width: "30px", height: "30px" },
                  lazy: "",
                  "preview-src-list": [String(i.row[f.key] ?? "")],
                  "preview-teleported": ""
                }, null, 8, ["src", "preview-src-list"])
              ]),
              _: 2
            }, 1040)) : f.type === "status-custom" ? (H(), A(r(nt), $e({
              key: 4,
              ref_for: !0
            }, r(rt)(f), { "class-name": "crud-base-table__cell--text" }), {
              default: ye((i) => [
                ee("i", {
                  class: "crud-base-table__status-lamp",
                  style: te({ backgroundColor: r(Ot)(f, i.row) })
                }, null, 4),
                Tt(ot(r(ut)(f, i.row, i.$index)), 1)
              ]),
              _: 2
            }, 1040)) : f.type === "tableSlot" ? (H(), A(r(nt), $e({
              key: 5,
              ref_for: !0
            }, r(rt)(f)), {
              default: ye((i) => [
                ue(xl, {
                  row: i.row,
                  column: f
                }, null, 8, ["row", "column"])
              ]),
              _: 2
            }, 1040)) : f.formatter ? (H(), A(r(nt), $e({
              key: 6,
              ref_for: !0
            }, r(rt)(f), {
              formatter: d(f),
              "class-name": "crud-base-table__cell--text"
            }), null, 16, ["formatter"])) : (H(), A(r(nt), $e({
              key: 7,
              ref_for: !0
            }, r(rt)(f), {
              prop: f.key,
              "class-name": "crud-base-table__cell--text"
            }), null, 16, ["prop"]))
          ], 64))), 128))
        ]),
        _: 1
      }, 16, ["data", "row-key", "empty-text"]),
      e.loading ? (H(), E("div", xn)) : fe("", !0)
    ], 2));
  }
}), tl = /* @__PURE__ */ Je(Xn, [["__scopeId", "data-v-bd176d7d"]]), Tn = {
  key: 0,
  class: "table-slot-popover__filter"
}, ll = /* @__PURE__ */ Ve({
  name: "TableSlotOverlay",
  __name: "TableSlotOverlay",
  props: {
    visible: { type: Boolean },
    row: {},
    column: {},
    triggerRef: {}
  },
  emits: ["update:visible"],
  setup(e, { emit: n }) {
    const t = e, l = n, u = Y(""), d = Qt();
    Re(
      () => t.visible,
      (f) => {
        f && (u.value = "");
      }
    );
    function a() {
      if (!t.row || !t.column) return [];
      const f = t.row[t.column.key];
      return Array.isArray(f) ? !t.column.filter || !u.value ? f : f.filter(
        (m) => t.column.filter(u.value, m)
      ) : [];
    }
    function c() {
      l("update:visible", !1);
    }
    return (f, m) => e.column && e.triggerRef ? (H(), A(r(hl), {
      key: 0,
      "virtual-ref": e.triggerRef,
      "virtual-triggering": "",
      visible: e.visible,
      placement: "bottom-start",
      width: e.column.popoverWidth || 430,
      teleported: !0,
      "popper-class": "table-slot-popover",
      onHide: c
    }, {
      default: ye(() => [
        ee("div", {
          class: "table-slot-popover__body",
          style: te(r(d))
        }, [
          e.column.filter ? (H(), E("div", Tn, [
            ue(r(Ct), {
              modelValue: u.value,
              "onUpdate:modelValue": m[0] || (m[0] = (i) => u.value = i),
              "prefix-icon": r(Gt),
              placeholder: e.column.filterPlaceholder || "请输入",
              onKeydown: m[1] || (m[1] = Dt(at(() => {
              }, ["prevent"]), ["enter"]))
            }, null, 8, ["modelValue", "prefix-icon", "placeholder"])
          ])) : fe("", !0),
          ue(tl, {
            "table-data": a(),
            columns: e.column.columns ?? [],
            "table-max-height": 310
          }, null, 8, ["table-data", "columns"])
        ], 4)
      ]),
      _: 1
    }, 8, ["virtual-ref", "visible", "width"])) : fe("", !0);
  }
}), pn = /* @__PURE__ */ Ve({
  name: "BaseTableCanvas",
  __name: "BaseTableCanvas",
  props: {
    tableData: {},
    columns: {},
    rowHeight: {},
    headerHeight: {},
    emptyText: {},
    rowKey: {}
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = e, l = n, u = Y(null), d = Y(null), a = Y(0), c = Y(0), f = Y(400), m = Y(300);
    let i = null, x = 0, w = !0;
    const V = typeof window < "u" && window.devicePixelRatio || 1, g = B(() => Mt(t.columns, f.value)), N = B(() => g.value.reduce((L, S) => L + S, 0)), s = B(() => t.headerHeight + t.tableData.length * t.rowHeight), R = wt(t, "tableData"), F = Yt(t.rowKey, R), { slotTriggerRef: D, slotPopup: K, openSlotPopup: W, closeSlotPopup: k } = $t(u), {
      tooltipAnchorRef: p,
      tooltipVisible: b,
      tooltipContent: X,
      onContainerMousemove: Z,
      onContainerMouseleave: M,
      hideTooltip: j
    } = _t(u, {
      columns: () => t.columns,
      colWidths: () => g.value,
      data: () => t.tableData,
      headerHeight: () => t.headerHeight,
      rowHeight: () => t.rowHeight,
      scrollX: () => a.value,
      scrollY: () => c.value,
      measureTextWidth: Pl
    }), {
      scrollbarVisible: U,
      hasVBar: I,
      hasHBar: $,
      showScrollbar: G,
      hideScrollbar: Xe,
      vTrackStyle: We,
      vThumbStyle: Ye,
      hTrackStyle: _e,
      hThumbStyle: dt,
      onVThumbMousedown: it,
      onHThumbMousedown: T,
      onVTrackClick: Fe,
      onHTrackClick: ie
    } = el({
      scrollX: a,
      scrollY: c,
      cssW: f,
      cssH: m,
      totalWidth: () => N.value,
      totalHeight: () => s.value,
      headerHeight: () => t.headerHeight,
      onScroll: Q
    });
    function ve() {
      const L = Math.max(0, N.value - f.value), S = Math.max(0, s.value - m.value);
      a.value = Math.min(L, Math.max(0, a.value)), c.value = Math.min(S, Math.max(0, c.value));
    }
    function le() {
      const L = d.value, S = Ie(t.columns);
      if (!L || S.length === 0)
        return;
      L.width = f.value * V, L.height = m.value * V, L.style.width = `${f.value}px`, L.style.height = `${m.value}px`;
      const J = L.getContext("2d");
      J && Ut({
        ctx: J,
        width: f.value * V,
        height: m.value * V,
        scrollX: a.value,
        scrollY: c.value,
        headerHeight: t.headerHeight,
        rowHeight: t.rowHeight,
        columns: t.columns,
        data: t.tableData,
        colWidths: g.value,
        dpr: V,
        emptyText: t.emptyText,
        rowKey: t.rowKey,
        selectedKeys: F.selectedKeys.value
      });
    }
    function Q() {
      cancelAnimationFrame(x), w && (x = requestAnimationFrame(() => {
        ve(), le();
      }));
    }
    function Ke(L) {
      L.preventDefault(), j(), G(), L.shiftKey ? a.value += L.deltaY : c.value += L.deltaY, Q();
    }
    function et(L) {
      const S = d.value;
      if (!S)
        return;
      const J = Ie(t.columns), v = S.getBoundingClientRect(), ke = L.clientX - v.left + a.value, ce = L.clientY - v.top + c.value, se = Jt(
        ke,
        ce,
        t.headerHeight,
        t.rowHeight,
        g.value,
        t.tableData.length
      );
      if (!se) {
        k();
        return;
      }
      const P = J[se.colIndex];
      if ((P == null ? void 0 : P.type) === "tableSlot" && se.kind === "body" && Bt(ke, g.value, se.colIndex)) {
        const o = t.tableData[se.rowIndex];
        o && W(o, P, L.clientX - v.left, L.clientY - v.top);
        return;
      }
      if (k(), (P == null ? void 0 : P.type) === "switch" && se.kind === "body") {
        if (Et(ke, ce, g.value, se.colIndex, t.headerHeight, t.rowHeight, se.rowIndex)) {
          const o = t.tableData[se.rowIndex];
          o && At(o, P).then((O) => {
            O !== null && Q();
          });
        }
        return;
      }
      if ((P == null ? void 0 : P.type) === "selection") {
        if (se.kind === "header")
          l("selectionChange", F.toggleAll());
        else if (se.kind === "body") {
          const o = t.tableData[se.rowIndex];
          o && l("selectionChange", F.toggleRow(o));
        }
        Q();
      }
    }
    return Lt(() => {
      const L = u.value;
      L && (i = new ResizeObserver((S) => {
        var v;
        const J = (v = S[0]) == null ? void 0 : v.contentRect;
        J && (f.value = Math.floor(J.width), m.value = Math.floor(J.height), Q());
      }), i.observe(L), Q());
    }), Rt(() => {
      w = !0, Q();
    }), It(() => {
      w = !1, cancelAnimationFrame(x);
    }), pt(() => {
      i == null || i.disconnect(), cancelAnimationFrame(x);
    }), Re(
      () => [t.tableData, t.columns, t.emptyText, t.rowHeight, t.headerHeight, t.rowKey],
      () => Q(),
      { deep: !0 }
    ), Re([a, c, g], () => Q()), Re(F.selectedKeys, () => Q(), { deep: !0 }), (L, S) => (H(), E("div", {
      ref_key: "containerRef",
      ref: u,
      class: "crud-base-table__canvas",
      tabindex: "0",
      onWheel: Ke,
      onMouseenter: S[9] || (S[9] = //@ts-ignore
      (...J) => r(G) && r(G)(...J)),
      onMousemove: S[10] || (S[10] = //@ts-ignore
      (...J) => r(Z) && r(Z)(...J)),
      onMouseleave: S[11] || (S[11] = () => {
        r(M)(), r(Xe)();
      })
    }, [
      ee("canvas", {
        ref_key: "canvasRef",
        ref: d,
        class: "crud-base-table__canvas-surface",
        onClick: et
      }, null, 512),
      r(I) ? (H(), E("div", {
        key: 0,
        class: vt(["canvas-scrollbar is-vertical", { "is-visible": r(U) }]),
        style: te(r(We)),
        onClick: S[1] || (S[1] = //@ts-ignore
        (...J) => r(Fe) && r(Fe)(...J)),
        onMouseenter: S[2] || (S[2] = //@ts-ignore
        (...J) => r(j) && r(j)(...J)),
        onMousemove: S[3] || (S[3] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(Ye)),
          onMousedown: S[0] || (S[0] = //@ts-ignore
          (...J) => r(it) && r(it)(...J))
        }, null, 36)
      ], 38)) : fe("", !0),
      r($) ? (H(), E("div", {
        key: 1,
        class: vt(["canvas-scrollbar is-horizontal", { "is-visible": r(U) }]),
        style: te(r(_e)),
        onClick: S[5] || (S[5] = //@ts-ignore
        (...J) => r(ie) && r(ie)(...J)),
        onMouseenter: S[6] || (S[6] = //@ts-ignore
        (...J) => r(j) && r(j)(...J)),
        onMousemove: S[7] || (S[7] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(dt)),
          onMousedown: S[4] || (S[4] = //@ts-ignore
          (...J) => r(T) && r(T)(...J))
        }, null, 36)
      ], 38)) : fe("", !0),
      ee("span", {
        ref_key: "slotTriggerRef",
        ref: D,
        class: "crud-base-table__slot-anchor",
        style: te({ left: r(K).x + "px", top: r(K).y + "px" })
      }, null, 4),
      ue(ll, {
        visible: r(K).visible,
        "onUpdate:visible": S[8] || (S[8] = (J) => r(K).visible = J),
        row: r(K).row,
        column: r(K).column,
        "trigger-ref": r(D)
      }, null, 8, ["visible", "row", "column", "trigger-ref"]),
      ee("span", {
        ref_key: "tooltipAnchorRef",
        ref: p,
        class: "crud-base-table__tooltip-anchor"
      }, null, 512),
      r(p) ? (H(), A(r(Nt), {
        key: 2,
        "virtual-ref": r(p),
        "virtual-triggering": "",
        visible: r(b),
        content: r(X),
        placement: "top",
        teleported: !0,
        "show-arrow": !0,
        offset: 8,
        enterable: !1,
        "popper-class": r(Ht)
      }, null, 8, ["virtual-ref", "visible", "content", "popper-class"])) : fe("", !0)
    ], 544));
  }
}), Hn = /* @__PURE__ */ Je(pn, [["__scopeId", "data-v-8f1b9653"]]), Vn = /* @__PURE__ */ Ve({
  name: "BaseTableCanvasTile",
  __name: "BaseTableCanvasTile",
  props: {
    tableData: {},
    columns: {},
    rowHeight: {},
    headerHeight: {},
    emptyText: {},
    rowKey: {},
    maxPrerenderPixels: { default: 12e6 }
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = ft, l = e, u = n, d = wt(l, "tableData"), a = Yt(l.rowKey, d), c = Y(null), { slotTriggerRef: f, slotPopup: m, openSlotPopup: i, closeSlotPopup: x } = $t(c), {
      tooltipAnchorRef: w,
      tooltipVisible: V,
      tooltipContent: g,
      onContainerMousemove: N,
      onContainerMouseleave: s,
      hideTooltip: R
    } = _t(c, {
      columns: () => l.columns,
      colWidths: () => U.value,
      data: () => l.tableData,
      headerHeight: () => l.headerHeight,
      rowHeight: () => l.rowHeight,
      scrollX: () => D.value,
      scrollY: () => K.value,
      measureTextWidth: Pl
    }), F = Y(null), D = Y(0), K = Y(0), W = Y(400), k = Y(300), p = typeof window < "u" && window.devicePixelRatio || 1;
    let b = null, X = 0, Z = null, M = !1, j = !0;
    const U = B(() => Mt(l.columns, W.value)), I = B(() => U.value.reduce((P, o) => P + o, 0)), $ = B(() => l.headerHeight + l.tableData.length * l.rowHeight), {
      scrollbarVisible: G,
      hasVBar: Xe,
      hasHBar: We,
      showScrollbar: Ye,
      hideScrollbar: _e,
      vTrackStyle: dt,
      vThumbStyle: it,
      hTrackStyle: T,
      hThumbStyle: Fe,
      onVThumbMousedown: ie,
      onHThumbMousedown: ve,
      onVTrackClick: le,
      onHTrackClick: Q
    } = el({
      scrollX: D,
      scrollY: K,
      cssW: W,
      cssH: k,
      totalWidth: () => I.value,
      totalHeight: () => $.value,
      headerHeight: () => l.headerHeight,
      onScroll: ce
    }), Ke = B(() => {
      const P = I.value * $.value;
      return P > 0 && P <= l.maxPrerenderPixels;
    });
    function et() {
      const P = Math.max(0, I.value - W.value), o = Math.max(0, $.value - k.value);
      D.value = Math.min(P, Math.max(0, D.value)), K.value = Math.min(o, Math.max(0, K.value));
    }
    function L() {
      if (Z == null || Z.remove(), Z = null, !Ke.value || l.tableData.length === 0) {
        M = !1;
        return;
      }
      M = !0;
      const P = document.createElement("canvas"), o = I.value, O = $.value;
      P.width = o * p, P.height = O * p;
      const Pe = P.getContext("2d");
      if (!Pe) {
        M = !1;
        return;
      }
      Ut({
        ctx: Pe,
        width: o * p,
        height: O * p,
        scrollX: 0,
        scrollY: 0,
        headerHeight: l.headerHeight,
        rowHeight: l.rowHeight,
        columns: l.columns,
        data: l.tableData,
        colWidths: U.value,
        dpr: p,
        emptyText: l.emptyText,
        rowKey: l.rowKey,
        selectedKeys: a.selectedKeys.value
      }), Z = P;
    }
    function S() {
      const P = F.value;
      if (!P || !Z)
        return;
      P.width = W.value * p, P.height = k.value * p, P.style.width = `${W.value}px`, P.style.height = `${k.value}px`;
      const o = P.getContext("2d");
      if (!o)
        return;
      o.setTransform(p, 0, 0, p, 0, 0), o.clearRect(0, 0, W.value, k.value), o.fillStyle = t.surfaceBg, o.fillRect(0, 0, W.value, k.value);
      const O = D.value, Pe = K.value, Oe = l.headerHeight, Ce = k.value - Oe;
      Ce > 0 && o.drawImage(
        Z,
        O * p,
        (Oe + Pe) * p,
        W.value * p,
        Ce * p,
        0,
        Oe,
        W.value,
        Ce
      ), o.drawImage(
        Z,
        O * p,
        0,
        W.value * p,
        Oe * p,
        0,
        0,
        W.value,
        Oe
      ), o.strokeStyle = t.borderColor, o.strokeRect(0, 0, W.value, k.value);
    }
    function J() {
      const P = F.value;
      if (!P)
        return;
      P.width = W.value * p, P.height = k.value * p, P.style.width = `${W.value}px`, P.style.height = `${k.value}px`;
      const o = P.getContext("2d");
      o && Ut({
        ctx: o,
        width: W.value * p,
        height: k.value * p,
        scrollX: D.value,
        scrollY: K.value,
        headerHeight: l.headerHeight,
        rowHeight: l.rowHeight,
        columns: l.columns,
        data: l.tableData,
        colWidths: U.value,
        dpr: p,
        emptyText: l.emptyText,
        rowKey: l.rowKey,
        selectedKeys: a.selectedKeys.value
      });
    }
    function v(P) {
      const o = F.value;
      if (!o)
        return;
      const O = Ie(l.columns), Pe = o.getBoundingClientRect(), Oe = P.clientX - Pe.left + D.value, Ce = P.clientY - Pe.top + K.value, Te = Jt(
        Oe,
        Ce,
        l.headerHeight,
        l.rowHeight,
        U.value,
        l.tableData.length
      );
      if (!Te) {
        x();
        return;
      }
      const pe = O[Te.colIndex];
      if ((pe == null ? void 0 : pe.type) === "tableSlot" && Te.kind === "body" && Bt(Oe, U.value, Te.colIndex)) {
        const je = l.tableData[Te.rowIndex];
        je && i(je, pe, P.clientX - Pe.left, P.clientY - Pe.top);
        return;
      }
      if (x(), (pe == null ? void 0 : pe.type) === "switch" && Te.kind === "body") {
        if (Et(Oe, Ce, U.value, Te.colIndex, l.headerHeight, l.rowHeight, Te.rowIndex)) {
          const je = l.tableData[Te.rowIndex];
          je && At(je, pe).then((Ft) => {
            Ft !== null && (L(), ce());
          });
        }
        return;
      }
      if ((pe == null ? void 0 : pe.type) === "selection") {
        if (Te.kind === "header")
          u("selectionChange", a.toggleAll());
        else if (Te.kind === "body") {
          const je = l.tableData[Te.rowIndex];
          je && u("selectionChange", a.toggleRow(je));
        }
        L(), ce();
      }
    }
    function ke() {
      et(), M && Z ? S() : J();
    }
    function ce() {
      cancelAnimationFrame(X), j && (X = requestAnimationFrame(ke));
    }
    function se(P) {
      P.preventDefault(), R(), Ye(), P.shiftKey ? D.value += P.deltaY : K.value += P.deltaY, ce();
    }
    return Lt(() => {
      const P = c.value;
      P && (b = new ResizeObserver((o) => {
        var Pe;
        const O = (Pe = o[0]) == null ? void 0 : Pe.contentRect;
        O && (W.value = Math.floor(O.width), k.value = Math.floor(O.height), ce());
      }), b.observe(P), L(), ce());
    }), Rt(() => {
      j = !0, ce();
    }), It(() => {
      j = !1, cancelAnimationFrame(X);
    }), pt(() => {
      b == null || b.disconnect(), cancelAnimationFrame(X), Z = null;
    }), Re(
      () => [l.tableData, l.columns, l.emptyText, l.rowHeight, l.headerHeight, l.rowKey],
      () => {
        L(), ce();
      },
      { deep: !0 }
    ), Re([Ke, I, $], () => {
      L(), ce();
    }), Re(a.selectedKeys, () => {
      L(), ce();
    }), (P, o) => (H(), E("div", {
      ref_key: "containerRef",
      ref: c,
      class: "crud-base-table__tile",
      tabindex: "0",
      onWheel: se,
      onMouseenter: o[9] || (o[9] = //@ts-ignore
      (...O) => r(Ye) && r(Ye)(...O)),
      onMousemove: o[10] || (o[10] = //@ts-ignore
      (...O) => r(N) && r(N)(...O)),
      onMouseleave: o[11] || (o[11] = () => {
        r(s)(), r(_e)();
      })
    }, [
      ee("canvas", {
        ref_key: "canvasRef",
        ref: F,
        class: "crud-base-table__tile-surface",
        onClick: v
      }, null, 512),
      r(Xe) ? (H(), E("div", {
        key: 0,
        class: vt(["canvas-scrollbar is-vertical", { "is-visible": r(G) }]),
        style: te(r(dt)),
        onClick: o[1] || (o[1] = //@ts-ignore
        (...O) => r(le) && r(le)(...O)),
        onMouseenter: o[2] || (o[2] = //@ts-ignore
        (...O) => r(R) && r(R)(...O)),
        onMousemove: o[3] || (o[3] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(it)),
          onMousedown: o[0] || (o[0] = //@ts-ignore
          (...O) => r(ie) && r(ie)(...O))
        }, null, 36)
      ], 38)) : fe("", !0),
      r(We) ? (H(), E("div", {
        key: 1,
        class: vt(["canvas-scrollbar is-horizontal", { "is-visible": r(G) }]),
        style: te(r(T)),
        onClick: o[5] || (o[5] = //@ts-ignore
        (...O) => r(Q) && r(Q)(...O)),
        onMouseenter: o[6] || (o[6] = //@ts-ignore
        (...O) => r(R) && r(R)(...O)),
        onMousemove: o[7] || (o[7] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(Fe)),
          onMousedown: o[4] || (o[4] = //@ts-ignore
          (...O) => r(ve) && r(ve)(...O))
        }, null, 36)
      ], 38)) : fe("", !0),
      ee("span", {
        ref_key: "slotTriggerRef",
        ref: f,
        class: "crud-base-table__slot-anchor",
        style: te({ left: r(m).x + "px", top: r(m).y + "px" })
      }, null, 4),
      ue(ll, {
        visible: r(m).visible,
        "onUpdate:visible": o[8] || (o[8] = (O) => r(m).visible = O),
        row: r(m).row,
        column: r(m).column,
        "trigger-ref": r(f)
      }, null, 8, ["visible", "row", "column", "trigger-ref"]),
      ee("span", {
        ref_key: "tooltipAnchorRef",
        ref: w,
        class: "crud-base-table__tooltip-anchor"
      }, null, 512),
      r(w) ? (H(), A(r(Nt), {
        key: 2,
        "virtual-ref": r(w),
        "virtual-triggering": "",
        visible: r(V),
        content: r(g),
        placement: "top",
        teleported: !0,
        "show-arrow": !0,
        offset: 8,
        enterable: !1,
        "popper-class": r(Ht)
      }, null, 8, ["virtual-ref", "visible", "content", "popper-class"])) : fe("", !0)
    ], 544));
  }
}), Wn = /* @__PURE__ */ Je(Vn, [["__scopeId", "data-v-af690b9e"]]);
function Zn(e, n) {
  return n ? `${n.replace(/\/$/, "")}/${e}` : new URL("./assets/" + e, import.meta.url).href;
}
async function qn(e) {
  const n = e.Typeface.GetDefault();
  try {
    const t = (
      /* @vite-ignore */
      new URL("./assets/NotoSansSC-400.woff2", import.meta.url).href
    ), l = await fetch(t).then((u) => u.arrayBuffer());
    return e.Typeface.MakeTypefaceFromData(l) ?? n;
  } catch {
    return n;
  }
}
const kn = {
  key: 0,
  class: "crud-base-table__skia-message"
}, Sn = {
  key: 1,
  class: "crud-base-table__skia-message"
}, gn = /* @__PURE__ */ Ve({
  name: "BaseTableSkiaWasm",
  __name: "BaseTableSkiaWasm",
  props: {
    tableData: {},
    columns: {},
    rowHeight: {},
    headerHeight: {},
    emptyText: {},
    rowKey: { default: "id" },
    skiaWasmBaseUrl: { default: void 0 }
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = ft, l = e, u = n, d = wt(l, "tableData"), a = Yt(l.rowKey, d), c = Y(null), { slotTriggerRef: f, slotPopup: m, openSlotPopup: i, closeSlotPopup: x } = $t(c), w = t.fontSizeCell * 0.52, {
      tooltipAnchorRef: V,
      tooltipVisible: g,
      tooltipContent: N,
      onContainerMousemove: s,
      onContainerMouseleave: R,
      hideTooltip: F
    } = _t(c, {
      columns: () => l.columns,
      colWidths: () => ke(),
      data: () => l.tableData,
      headerHeight: () => l.headerHeight,
      rowHeight: () => l.rowHeight,
      scrollX: () => k.value,
      scrollY: () => p.value,
      measureTextWidth: (h) => h.length * w
    }), D = Y(null), K = Y(""), W = Y(""), k = Y(0), p = Y(0), b = Y(400), X = Y(300), {
      scrollbarVisible: Z,
      hasVBar: M,
      hasHBar: j,
      showScrollbar: U,
      hideScrollbar: I,
      vTrackStyle: $,
      vThumbStyle: G,
      hTrackStyle: Xe,
      hThumbStyle: We,
      onVThumbMousedown: Ye,
      onHThumbMousedown: _e,
      onVTrackClick: dt,
      onHTrackClick: it
    } = el({
      scrollX: k,
      scrollY: p,
      cssW: b,
      cssH: X,
      totalWidth: () => ce(),
      totalHeight: () => se(),
      headerHeight: () => l.headerHeight,
      onScroll: Ge
    });
    let T = null, Fe = null, ie = null, ve = null, le = null, Q = null, Ke = null, et = 0, L = !0, S = 0, J = 0;
    const v = typeof window < "u" && window.devicePixelRatio || 1, ke = () => Mt(l.columns, b.value), ce = () => ke().reduce((h, z) => h + z, 0), se = () => l.headerHeight + l.tableData.length * l.rowHeight;
    function P() {
      const h = Math.max(0, ce() - b.value), z = Math.max(0, se() - X.value);
      k.value = Math.min(h, Math.max(0, k.value)), p.value = Math.min(z, Math.max(0, p.value));
    }
    function o(h, z = 1) {
      return T.Color(h.r, h.g, h.b, z);
    }
    function O(h, z, q) {
      if (h.length === 0)
        return { all: !1, indeterminate: !1 };
      let C = 0;
      for (const He of h)
        q.has(Ne(we(He, z))) && C++;
      return {
        all: C === h.length,
        indeterminate: C > 0 && C < h.length
      };
    }
    function Pe(h, z, q, C, He, Qe, oe, _) {
      const y = 14 * v, Se = z - y / 2, Ze = q - y / 2;
      if (h.drawRect(T.LTRBRect(Se, Ze, Se + y, Ze + y), Qe), He) {
        oe.setColor(o(qe(t.textPrimary)));
        const ne = 2 * v, de = y - 6 * v;
        h.drawRect(
          T.LTRBRect(Se + 3 * v, Ze + y / 2 - ne / 2, Se + 3 * v + de, Ze + y / 2 + ne / 2),
          oe
        );
      } else C && (_.setStrokeWidth(1.5 * v), h.drawLine(Se + 3 * v, Ze + y / 2, Se + y / 2 - 0.5 * v, Ze + y - 4 * v, _), h.drawLine(Se + y / 2 - 0.5 * v, Ze + y - 4 * v, Se + y - 3 * v, Ze + 3 * v, _));
    }
    async function Oe() {
      K.value = "";
      try {
        const z = (await import("canvaskit-wasm")).default;
        T = await z({
          locateFile: (q) => Zn(q, l.skiaWasmBaseUrl)
        });
        try {
          Fe = await qn(T);
        } catch {
          Fe = T.Typeface.GetDefault();
        }
      } catch {
        K.value = "CanvasKit（Skia WASM）加载失败：请安装依赖 canvaskit-wasm，或配置可用的 skiaWasmBaseUrl。", T = null, Fe = null;
      }
    }
    function Ce() {
      var h, z, q;
      (h = ie == null ? void 0 : ie.delete) == null || h.call(ie), (z = ve == null ? void 0 : ve.delete) == null || z.call(ve), (q = le == null ? void 0 : le.delete) == null || q.call(le), ie = null, ve = null, le = null;
    }
    function Te() {
      const h = Fe ?? T.Typeface.GetDefault(), z = t.fontSizeCell * v, q = t.fontSizeEmpty * v;
      return !ie || !ve || !le ? (Ce(), ie = new T.Font(h, z), ve = new T.Font(h, q), le = new T.Font(h, z), le.setEmbolden(!0)) : (ie.setTypeface(h), ie.setSize(z), ve.setTypeface(h), ve.setSize(q), le.setTypeface(h), le.setSize(z), le.setEmbolden(!0)), { cell: ie, empty: ve, header: le };
    }
    function pe() {
      var h;
      (h = Q == null ? void 0 : Q.delete) == null || h.call(Q), Q = null;
    }
    function je(h, z, q) {
      if (!T)
        return null;
      const C = Math.max(1, Math.floor(z * v)), He = Math.max(1, Math.floor(q * v));
      if (Q && C === S && He === J)
        return Q;
      pe(), h.width = C, h.height = He, h.style.width = `${z}px`, h.style.height = `${q}px`, S = C, J = He;
      const Qe = T.MakeWebGLCanvasSurface(h) ?? T.MakeSWCanvasSurface(h) ?? T.MakeCanvasSurface(h);
      return Q = Qe, Qe;
    }
    function Ft() {
      if (!T || !D.value)
        return;
      const h = D.value, z = ke(), q = ce(), C = Ie(l.columns), He = a.selectedKeys.value, { all: Qe, indeterminate: oe } = O(
        l.tableData,
        l.rowKey,
        He
      ), _ = je(h, b.value, X.value);
      if (!_) {
        W.value = "CanvasKit 无法创建绘图 Surface（请检查 WebGL/Canvas 是否可用）。";
        return;
      }
      W.value = "";
      const y = _.getCanvas(), Se = qe(t.surfaceBg);
      y.clear(o(Se));
      const Ze = qe(t.borderColor), ne = new T.Paint();
      ne.setStyle(T.PaintStyle.Stroke), ne.setStrokeWidth(1), ne.setAntiAlias(!0), ne.setColor(o(Ze));
      const de = new T.Paint();
      de.setStyle(T.PaintStyle.Fill), de.setAntiAlias(!0);
      const mt = new T.Paint();
      mt.setStyle(T.PaintStyle.Stroke), mt.setStrokeWidth(1), mt.setAntiAlias(!0), mt.setColor(o(qe(t.textPrimary)));
      const { cell: nl, empty: rl, header: al } = Te(), ht = b.value * v, yt = X.value * v;
      if (C.length === 0) {
        const re = new T.Paint();
        re.setAntiAlias(!0), re.setColor(o(qe(t.textEmpty)));
        const me = l.emptyText, be = me.length * t.fontSizeEmpty * v * 0.32;
        y.drawText(me, ht / 2 - be, yt / 2 + t.fontSizeEmpty * v * 0.35, re, rl), ne.setColor(o(Ze)), y.drawRect(T.LTRBRect(0.5, 0.5, ht - 0.5, yt - 0.5), ne), _.flush();
        return;
      }
      const Vt = new T.Paint();
      Vt.setAntiAlias(!0), Vt.setColor(o(qe(t.textPrimary)));
      const Wt = new T.Paint();
      Wt.setStyle(T.PaintStyle.Fill), Wt.setAntiAlias(!0);
      const Zt = new T.Paint();
      Zt.setAntiAlias(!0), Zt.setColor(o(qe(t.textHeader)));
      const zt = l.headerHeight * v;
      if (l.tableData.length === 0) {
        y.save(), y.translate(-k.value * v, 0);
        const re = qe(t.headerBg);
        de.setColor(o(re)), y.drawRect(T.LTRBRect(0, 0, q * v, zt), de);
        let me = 0;
        for (let ae = 0; ae < C.length; ae++) {
          const ct = C[ae], xe = (z[ae] ?? ze.defaultColumnWidth) * v;
          if (y.drawRect(T.LTRBRect(me, 0, me + xe, zt), ne), ct.type !== "selection") {
            const Le = gt(ct);
            Le && y.drawText(Le, me + 8 * v, (l.headerHeight / 2 + 5) * v, Zt, al);
          }
          me += xe;
        }
        y.restore();
        const be = new T.Paint();
        be.setAntiAlias(!0), be.setColor(o(qe(t.textEmpty)));
        const ge = l.emptyText, Ae = ge.length * t.fontSizeEmpty * v * 0.32, jt = (l.headerHeight + Math.max(0, (X.value - l.headerHeight) / 2)) * v;
        y.drawText(ge, b.value / 2 * v - Ae, jt + t.fontSizeEmpty * v * 0.35, be, rl), ne.setColor(o(Ze)), y.drawRect(T.LTRBRect(0.5, 0.5, ht - 0.5, yt - 0.5), ne), _.flush();
        return;
      }
      const pl = qe(t.rowStripe), Hl = qe(t.rowBase), Vl = Math.max(0, Math.floor((p.value - l.headerHeight) / l.rowHeight)), Wl = Math.min(
        l.tableData.length - 1,
        Math.ceil((p.value + X.value - l.headerHeight) / l.rowHeight)
      ), Kt = t.fontSizeCell * v * 0.52;
      y.save(), y.clipRect(T.LTRBRect(0, zt, ht, yt), T.ClipOp.Intersect, !0), y.translate(-k.value * v, -p.value * v);
      for (let re = Vl; re <= Wl; re++) {
        const me = l.tableData[re], be = l.headerHeight + re * l.rowHeight, ge = be * v, Ae = l.rowHeight * v, jt = re % 2 === 1 ? pl : Hl;
        de.setColor(o(jt)), y.drawRect(T.LTRBRect(0, ge, q * v, ge + Ae), de);
        let ae = 0;
        for (let ct = 0; ct < C.length; ct++) {
          const xe = C[ct], Le = (z[ct] ?? ze.defaultColumnWidth) * v;
          y.drawRect(T.LTRBRect(ae, ge, ae + Le, ge + Ae), ne);
          const ul = (be + l.rowHeight / 2 + 5) * v;
          if (xe.type === "selection") {
            const Me = He.has(Ne(we(me, l.rowKey)));
            Pe(y, ae + Le / 2, be * v + Ae / 2, Me, !1, ne, de, mt);
          } else if (xe.type === "switch") {
            const Me = xe.activeValue ?? !0, tt = me[xe.key] === Me, st = !!xe.disabled, lt = 40 * v, Ee = 20 * v, bt = 7 * v, xt = 3 * v, Be = ae + Le / 2 - lt / 2, fl = be * v + Ae / 2 - Ee / 2, ql = st ? { r: 168, g: 171, b: 178 } : tt ? { r: 64, g: 158, b: 255 } : { r: 220, g: 223, b: 230 };
            de.setColor(o(ql)), y.drawRRect(T.RRectXY(T.LTRBRect(Be, fl, Be + lt, fl + Ee), Ee / 2, Ee / 2), de);
            const kl = tt ? Be + lt - xt - bt : Be + xt + bt;
            de.setColor(o({ r: 255, g: 255, b: 255 })), y.drawCircle(kl, be * v + Ae / 2, bt, de);
          } else if (xe.type === "status-custom") {
            const Me = ut(xe, me, re);
            Wt.setColor(o(sn(Ot(xe, me)))), y.drawCircle(ae + 8 * v + 4 * v, be * v + Ae / 2, 4 * v, Wt);
            const tt = ae + 8 * v + 8 * v + 8 * v, st = Math.max(4 * v, Le - (tt - ae) - 8 * v), lt = Math.max(1, Math.floor(st / Kt)), Ee = Me.length <= lt ? Me : `${Me.slice(0, Math.max(0, lt - 1))}…`;
            y.drawText(Ee, tt, ul, Vt, nl);
          } else {
            const Me = ut(xe, me, re), tt = xe.type === "index" || xe.align === "center" ? "center" : xe.align === "right" ? "right" : "left", st = 8 * v, lt = Math.max(4 * v, Le - st * 2), Ee = Math.max(1, Math.floor(lt / Kt)), bt = Me.length <= Ee ? Me : `${Me.slice(0, Math.max(0, Ee - 1))}…`, xt = bt.length * Kt;
            let Be;
            tt === "center" ? Be = ae + Le / 2 - xt / 2 : tt === "right" ? Be = ae + Le - st - xt : Be = ae + st, y.save(), y.clipRect(
              T.LTRBRect(ae + 1, ge + 1, ae + Le - 1, ge + Ae - 1),
              T.ClipOp.Intersect,
              !0
            ), y.drawText(bt, Be, ul, Vt, nl), y.restore();
          }
          ae += Le;
        }
      }
      y.restore(), y.save(), y.translate(-k.value * v, 0);
      const Zl = qe(t.headerBg);
      de.setColor(o(Zl)), y.drawRect(T.LTRBRect(0, 0, q * v, zt), de);
      let Pt = 0;
      for (let re = 0; re < C.length; re++) {
        const me = C[re], be = (z[re] ?? ze.defaultColumnWidth) * v;
        if (y.drawRect(T.LTRBRect(Pt, 0, Pt + be, zt), ne), me.type === "selection")
          Pe(
            y,
            Pt + be / 2,
            l.headerHeight / 2 * v,
            Qe,
            oe,
            ne,
            de,
            mt
          );
        else {
          const ge = gt(me);
          ge && y.drawText(ge, Pt + 8 * v, (l.headerHeight / 2 + 5) * v, Zt, al);
        }
        Pt += be;
      }
      y.restore(), ne.setColor(o(Ze)), y.drawRect(T.LTRBRect(0.5, 0.5, ht - 0.5, yt - 0.5), ne), _.flush();
    }
    function Ge() {
      cancelAnimationFrame(et), L && (et = requestAnimationFrame(() => {
        P(), Ft();
      }));
    }
    function Xl(h) {
      h.preventDefault(), F(), U(), h.shiftKey ? k.value += h.deltaY : p.value += h.deltaY, Ge();
    }
    function Tl(h) {
      const z = D.value;
      if (!z)
        return;
      const q = Ie(l.columns), C = z.getBoundingClientRect(), He = h.clientX - C.left + k.value, Qe = h.clientY - C.top + p.value, oe = Jt(
        He,
        Qe,
        l.headerHeight,
        l.rowHeight,
        ke(),
        l.tableData.length
      );
      if (!oe) {
        x();
        return;
      }
      const _ = q[oe.colIndex];
      if ((_ == null ? void 0 : _.type) === "tableSlot" && oe.kind === "body" && Bt(He, ke(), oe.colIndex)) {
        const y = l.tableData[oe.rowIndex];
        y && i(y, _, h.clientX - C.left, h.clientY - C.top);
        return;
      }
      if (x(), (_ == null ? void 0 : _.type) === "switch" && oe.kind === "body") {
        if (Et(He, Qe, ke(), oe.colIndex, l.headerHeight, l.rowHeight, oe.rowIndex)) {
          const y = l.tableData[oe.rowIndex];
          y && At(y, _).then((Se) => {
            Se !== null && Ge();
          });
        }
        return;
      }
      if ((_ == null ? void 0 : _.type) === "selection") {
        if (oe.kind === "header")
          u("selectionChange", a.toggleAll());
        else if (oe.kind === "body") {
          const y = l.tableData[oe.rowIndex];
          y && u("selectionChange", a.toggleRow(y));
        }
        Ge();
      }
    }
    return Lt(async () => {
      await Oe();
      const h = c.value;
      h && (Ke = new ResizeObserver((z) => {
        var C;
        const q = (C = z[0]) == null ? void 0 : C.contentRect;
        q && (b.value = Math.floor(q.width), X.value = Math.floor(q.height), Ge());
      }), Ke.observe(h)), Ge();
    }), Rt(() => {
      L = !0, Ge();
    }), It(() => {
      L = !1, cancelAnimationFrame(et);
    }), pt(() => {
      Ke == null || Ke.disconnect(), cancelAnimationFrame(et), pe(), Ce(), S = 0, J = 0, Fe = null, T = null;
    }), Re(
      () => [l.tableData, l.columns, l.emptyText, l.rowHeight, l.headerHeight, l.rowKey],
      () => Ge(),
      { deep: !0 }
    ), Re(a.selectedKeys, () => Ge()), (h, z) => (H(), E("div", {
      ref_key: "containerRef",
      ref: c,
      class: "crud-base-table__skia",
      tabindex: "0",
      onWheel: Xl,
      onMouseenter: z[9] || (z[9] = //@ts-ignore
      (...q) => r(U) && r(U)(...q)),
      onMousemove: z[10] || (z[10] = //@ts-ignore
      (...q) => r(s) && r(s)(...q)),
      onMouseleave: z[11] || (z[11] = () => {
        r(R)(), r(I)();
      })
    }, [
      K.value ? (H(), E("div", kn, ot(K.value), 1)) : W.value ? (H(), E("div", Sn, ot(W.value), 1)) : fe("", !0),
      Ol(ee("canvas", {
        ref_key: "canvasRef",
        ref: D,
        class: "crud-base-table__skia-surface",
        onClick: Tl
      }, null, 512), [
        [Ml, !K.value]
      ]),
      r(M) ? (H(), E("div", {
        key: 2,
        class: vt(["canvas-scrollbar is-vertical", { "is-visible": r(Z) }]),
        style: te(r($)),
        onClick: z[1] || (z[1] = //@ts-ignore
        (...q) => r(dt) && r(dt)(...q)),
        onMouseenter: z[2] || (z[2] = //@ts-ignore
        (...q) => r(F) && r(F)(...q)),
        onMousemove: z[3] || (z[3] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(G)),
          onMousedown: z[0] || (z[0] = //@ts-ignore
          (...q) => r(Ye) && r(Ye)(...q))
        }, null, 36)
      ], 38)) : fe("", !0),
      r(j) ? (H(), E("div", {
        key: 3,
        class: vt(["canvas-scrollbar is-horizontal", { "is-visible": r(Z) }]),
        style: te(r(Xe)),
        onClick: z[5] || (z[5] = //@ts-ignore
        (...q) => r(it) && r(it)(...q)),
        onMouseenter: z[6] || (z[6] = //@ts-ignore
        (...q) => r(F) && r(F)(...q)),
        onMousemove: z[7] || (z[7] = at(() => {
        }, ["stop"]))
      }, [
        ee("div", {
          class: "canvas-scrollbar__thumb",
          style: te(r(We)),
          onMousedown: z[4] || (z[4] = //@ts-ignore
          (...q) => r(_e) && r(_e)(...q))
        }, null, 36)
      ], 38)) : fe("", !0),
      ee("span", {
        ref_key: "slotTriggerRef",
        ref: f,
        class: "crud-base-table__slot-anchor",
        style: te({ left: r(m).x + "px", top: r(m).y + "px" })
      }, null, 4),
      ue(ll, {
        visible: r(m).visible,
        "onUpdate:visible": z[8] || (z[8] = (q) => r(m).visible = q),
        row: r(m).row,
        column: r(m).column,
        "trigger-ref": r(f)
      }, null, 8, ["visible", "row", "column", "trigger-ref"]),
      ee("span", {
        ref_key: "tooltipAnchorRef",
        ref: V,
        class: "crud-base-table__tooltip-anchor"
      }, null, 512),
      r(V) ? (H(), A(r(Nt), {
        key: 4,
        "virtual-ref": r(V),
        "virtual-triggering": "",
        visible: r(g),
        content: r(N),
        placement: "top",
        teleported: !0,
        "show-arrow": !0,
        offset: 8,
        enterable: !1,
        "popper-class": r(Ht)
      }, null, 8, ["virtual-ref", "visible", "content", "popper-class"])) : fe("", !0)
    ], 544));
  }
}), Ln = /* @__PURE__ */ Je(gn, [["__scopeId", "data-v-c7656d16"]]), wn = ".crud-base-table__virtual-cell, .crud-base-table__status-custom-text", Nn = /* @__PURE__ */ Ve({
  name: "BaseTableVirtual",
  __name: "BaseTableVirtual",
  props: {
    tableData: {},
    columns: {},
    rowHeight: {},
    headerHeight: {},
    rowKey: {}
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = Ve({
      name: "VirtualSwitchCell",
      props: {
        row: { type: Object, required: !0 },
        colKey: { type: String, required: !0 },
        activeValue: { type: [String, Number, Boolean], default: !0 },
        inactiveValue: { type: [String, Number, Boolean], default: !1 },
        disabled: { type: Boolean, default: !1 },
        beforeChange: { type: Function, default: void 0 }
      },
      setup(V) {
        const g = Y(V.row[V.colKey]);
        return Re(() => V.row[V.colKey], (N) => {
          g.value = N;
        }), () => Ue(yl, {
          modelValue: g.value,
          activeValue: V.activeValue,
          inactiveValue: V.inactiveValue,
          disabled: V.disabled,
          beforeChange: V.beforeChange,
          "onUpdate:modelValue": (N) => {
            g.value = N, V.row[V.colKey] = N;
          }
        });
      }
    }), l = e, u = n, d = wt(l, "tableData"), a = Yt(l.rowKey, d), c = Jl(), f = Y(!1), m = Y("");
    function i(V) {
      var N, s;
      const g = (s = (N = V.target).closest) == null ? void 0 : s.call(N, wn);
      if (!g || g.hasAttribute("data-no-tooltip")) {
        f.value = !1;
        return;
      }
      g === c.value && f.value || (g.scrollWidth > g.clientWidth ? (m.value = g.textContent || "", c.value = g, f.value = !0) : f.value = !1);
    }
    function x() {
      f.value = !1;
    }
    function w(V) {
      const g = Ie(l.columns), N = Mt(l.columns, V);
      return g.map((s, R) => {
        const F = N[R] ?? ze.defaultColumnWidth, D = s.type === "selection" || s.type === "index" ? "center" : s.align ?? "left";
        if (s.type === "selection")
          return {
            key: s.key,
            dataKey: s.key,
            title: "",
            width: F,
            align: D,
            headerCellRenderer: () => Ue(sl, {
              modelValue: a.isAllSelected.value,
              indeterminate: a.isIndeterminate.value,
              onChange: () => u("selectionChange", a.toggleAll())
            }),
            cellRenderer: ({ rowData: W }) => Ue(sl, {
              modelValue: a.isRowSelected(W),
              onChange: () => u("selectionChange", a.toggleRow(W))
            })
          };
        if (s.type === "index")
          return {
            key: s.key,
            dataKey: s.key,
            title: "",
            width: F,
            align: D,
            cellRenderer: ({ rowIndex: W }) => Ue("span", { class: "crud-base-table__virtual-cell" }, String(W + 1))
          };
        if (s.type === "switch")
          return {
            key: s.key,
            dataKey: s.key,
            title: String(s.label ?? s.title ?? s.key),
            width: F,
            align: "center",
            cellRenderer: ({ rowData: W }) => {
              const k = W;
              return Ue(t, {
                row: k,
                colKey: s.key,
                activeValue: s.activeValue ?? !0,
                inactiveValue: s.inactiveValue ?? !1,
                disabled: !!s.disabled,
                beforeChange: s.beforeChange ? () => s.beforeChange(k, s) : void 0
              });
            }
          };
        if (s.type === "tableSlot")
          return {
            key: s.key,
            dataKey: s.key,
            title: String(s.label ?? s.title ?? s.key),
            width: F,
            align: D,
            cellRenderer: ({ rowData: W }) => Ue(xl, {
              row: W,
              column: s
            })
          };
        if (s.type === "status-custom") {
          const W = s.showOverflowTooltip === !1;
          return {
            key: s.key,
            dataKey: s.key,
            title: String(s.label ?? s.title ?? s.key),
            width: F,
            align: "left",
            cellRenderer: ({ rowData: k, rowIndex: p }) => Ue(
              "div",
              {
                class: "crud-base-table__status-custom",
                style: {
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  minWidth: "0"
                }
              },
              [
                Ue("div", {
                  class: "crud-base-table__status-custom-lamp",
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    flexShrink: "0",
                    backgroundColor: Ot(s, k)
                  }
                }),
                Ue(
                  "div",
                  {
                    class: "crud-base-table__status-custom-text",
                    ...W ? { "data-no-tooltip": "" } : {},
                    style: {
                      marginLeft: "8px",
                      fontSize: "14px",
                      color: "var(--crud-bt-text, #606266)",
                      fontWeight: "500",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }
                  },
                  ut(s, k, p)
                )
              ]
            )
          };
        }
        const K = s.showOverflowTooltip === !1;
        return {
          key: s.key,
          dataKey: s.key,
          title: String(s.label ?? s.title ?? s.key),
          width: F,
          align: D,
          cellRenderer: ({ rowData: W, rowIndex: k }) => Ue(
            "span",
            {
              class: "crud-base-table__virtual-cell",
              ...K ? { "data-no-tooltip": "" } : {}
            },
            ut(s, W, k)
          )
        };
      });
    }
    return (V, g) => (H(), E("div", {
      class: "crud-base-table__virtual",
      onMouseover: i,
      onMouseleave: x
    }, [
      ue(r(Cl), null, {
        default: ye(({ height: N, width: s }) => [
          s > 0 && N > 0 ? (H(), A(r(Gl), {
            key: 0,
            columns: w(s),
            data: e.tableData,
            width: s,
            height: N,
            "row-height": l.rowHeight,
            "header-height": l.headerHeight,
            fixed: ""
          }, null, 8, ["columns", "data", "width", "height", "row-height", "header-height"])) : fe("", !0)
        ]),
        _: 1
      }),
      c.value ? (H(), A(r(Nt), {
        key: 0,
        "virtual-ref": c.value,
        "virtual-triggering": "",
        visible: f.value,
        content: m.value,
        placement: "top",
        teleported: !0,
        "show-arrow": !0,
        offset: 8,
        enterable: !1,
        "popper-class": r(Ht)
      }, null, 8, ["virtual-ref", "visible", "content", "popper-class"])) : fe("", !0)
    ], 32));
  }
}), On = /* @__PURE__ */ Je(Nn, [["__scopeId", "data-v-c7c5bc68"]]), Mn = {
  key: 0,
  class: "crud-base-table__toolbar"
}, Jn = { class: "crud-base-table__main" }, Yn = /* @__PURE__ */ Ve({
  name: "BaseTable",
  __name: "BaseTable",
  props: {
    mode: {},
    tableData: {},
    columns: {},
    height: { default: "420px" },
    rowKey: { default: "id" },
    loading: { type: Boolean, default: !1 },
    emptyText: { default: "暂无数据" },
    rowHeight: { default: ze.rowHeight },
    headerHeight: { default: ze.headerHeight },
    maxPrerenderPixels: { default: 12e6 },
    skiaWasmBaseUrl: { default: void 0 }
  },
  emits: ["selectionChange"],
  setup(e, { emit: n }) {
    const t = e, l = n;
    function u(a) {
      l("selectionChange", a);
    }
    const d = B(() => Qt(t.rowHeight, t.headerHeight));
    return (a, c) => (H(), E("div", {
      class: "crud-base-table",
      style: te({ height: e.height, ...d.value })
    }, [
      a.$slots.toolbar ? (H(), E("div", Mn, [
        Yl(a.$slots, "toolbar", {}, void 0, !0)
      ])) : fe("", !0),
      ee("div", Jn, [
        (H(), A(Fl, null, [
          e.mode === "element" ? (H(), A(tl, {
            key: 0,
            "table-data": e.tableData,
            columns: e.columns,
            "row-key": e.rowKey,
            "empty-text": e.emptyText,
            loading: e.loading,
            onSelectionChange: u
          }, null, 8, ["table-data", "columns", "row-key", "empty-text", "loading"])) : e.mode === "virtual" ? (H(), A(On, {
            key: 1,
            "table-data": e.tableData,
            columns: e.columns,
            "row-height": e.rowHeight,
            "header-height": e.headerHeight,
            "row-key": e.rowKey,
            onSelectionChange: u
          }, null, 8, ["table-data", "columns", "row-height", "header-height", "row-key"])) : e.mode === "canvas" ? (H(), A(Hn, {
            key: 2,
            "table-data": e.tableData,
            columns: e.columns,
            "row-height": e.rowHeight,
            "header-height": e.headerHeight,
            "empty-text": e.emptyText,
            "row-key": e.rowKey,
            onSelectionChange: u
          }, null, 8, ["table-data", "columns", "row-height", "header-height", "empty-text", "row-key"])) : e.mode === "canvas-tile" ? (H(), A(Wn, {
            key: 3,
            "table-data": e.tableData,
            columns: e.columns,
            "row-height": e.rowHeight,
            "header-height": e.headerHeight,
            "empty-text": e.emptyText,
            "max-prerender-pixels": e.maxPrerenderPixels,
            "row-key": e.rowKey,
            onSelectionChange: u
          }, null, 8, ["table-data", "columns", "row-height", "header-height", "empty-text", "max-prerender-pixels", "row-key"])) : e.mode === "skia-wasm" ? (H(), A(Ln, {
            key: 4,
            "table-data": e.tableData,
            columns: e.columns,
            "row-height": e.rowHeight,
            "header-height": e.headerHeight,
            "empty-text": e.emptyText,
            "skia-wasm-base-url": e.skiaWasmBaseUrl,
            "row-key": e.rowKey,
            onSelectionChange: u
          }, null, 8, ["table-data", "columns", "row-height", "header-height", "empty-text", "skia-wasm-base-url", "row-key"])) : fe("", !0)
        ], 1024))
      ])
    ], 4));
  }
}), Fn = /* @__PURE__ */ Je(Yn, [["__scopeId", "data-v-5aa79247"]]), Kn = [Bl, _l, nn, an, cn, Fn], In = {
  install(e) {
    Kn.forEach((n) => {
      e.component(n.name ?? "AnonymousComponent", n);
    });
  }
};
export {
  Fn as BaseTable,
  nn as EmptyPlaceholder,
  Bl as HelloButton,
  cn as SearchBar,
  _l as StatusTag,
  an as TextLink,
  In as default,
  ze as tableLayoutDefaults
};
//# sourceMappingURL=index.mjs.map
