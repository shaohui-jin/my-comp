// ============================================================
// 基础组件类型声明
// ============================================================

// --- Tag ---
export type TagType = "success" | "warning" | "info" | "danger";

export interface TagProps {
  /** 标签文案 */
  label: string;
  /** 视觉类型 */
  type?: TagType;
}

// --- Dot ---
export interface DotProps {
  /** 圆点颜色，任意 CSS 颜色值 */
  color?: string;
  /** 显示文本 */
  text?: string;
}

// --- Image3D ---
export interface Image3DProps {
  /** 图片地址 */
  src: string;
}

// --- ImageCarousel ---
export interface ImageCarouselProps {
  /** 图片地址列表 */
  imageUrls: string[];
  /** 当前选中下标（v-model:index） */
  index?: number;
  /** 默认选中下标（非受控模式） */
  defaultIndex?: number;
  /** 首尾循环 */
  loop?: boolean;
  /** 自动轮播 */
  autoplay?: boolean;
  /** 自动轮播间隔（ms） */
  interval?: number;
  /** 显示左右箭头 */
  showArrows?: boolean;
}

export interface ImageCarouselEmits {
  /** 当前下标变化 */
  (e: "change", index: number): void;
  /** 更新 v-model:index */
  (e: "update:index", index: number): void;
  /** 点击图片 */
  (e: "click-item", index: number): void;
}

export interface ImageCarouselExpose {
  /** 上一张 */
  prev: () => void;
  /** 下一张 */
  next: () => void;
  /** 跳转到指定下标 */
  goTo: (index: number) => void;
}

// --- ImagePointer ---
export interface ImagePointerProps {
  /** 图片地址列表 */
  imageUrls: string[];
  /** 当前高亮下标（v-model:index） */
  index?: number;
  /** 图片间距（px） */
  gap?: number;
  /** 指针边框颜色 */
  pointerColor?: string;
}

export interface ImagePointerEmits {
  /** 鼠标悬停某张图 */
  (e: "hover", index: number): void;
  /** 点击图片 */
  (e: "click", index: number): void;
  /** 鼠标离开容器 */
  (e: "leave"): void;
  /** 更新 v-model:index */
  (e: "update:index", index: number): void;
}

// --- TextEraseArea ---
export interface TextEraseAreaProps {
  /** 文本内容 */
  content: string;
  /** 动画时长（秒） */
  duration?: number;
  /** 延迟开始（秒） */
  delay?: number;
  /** 是否自动播放 */
  autoStart?: boolean;
}

export interface TextEraseAreaEmits {
  /** 动画开始 */
  (e: "start"): void;
  /** 动画结束 */
  (e: "end"): void;
}

export interface TextEraseAreaExpose {
  /** 开始/重播动画 */
  play: () => void;
  /** 重置动画 */
  reset: () => void;
}

// --- TextOverflowArea ---
export interface TextOverflowAreaProps {
  /** 容器高度（px） */
  height?: number;
  /** 内边距（px） */
  padding?: number;
  /** 文本内容 */
  content: string;
}

// --- CanvasTime ---
export interface CanvasTimeProps {
  /** 粒子颜色 */
  color?: string;
  /** 画布背景色 */
  bgColor?: string;
}

// --- CodeBlock ---
export interface CodeBlockProps {
  /** 需要复制的原始代码文本 */
  code: string;
  /** 经 highlight 处理后的 HTML（若不传则直接展示 code） */
  highlighted?: string;
}

// --- WidgetTabs ---
export interface WidgetTabsProps {
  /** 代码 Tab 展示的源代码文本 */
  code: string;
  /** 经 highlight 处理后的代码 HTML */
  highlighted: string;
  /** 预览区是否贴边（默认 true） */
  flush?: boolean;
}
