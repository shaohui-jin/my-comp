import { App } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
selectionChange: (rows: Record<string, unknown>[]) => any;
}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{
onSelectionChange?: ((rows: Record<string, unknown>[]) => any) | undefined;
}>, {
loading: boolean;
height: string;
headerHeight: number;
rowHeight: number;
emptyText: string;
rowKey: string;
maxPrerenderPixels: number;
skiaWasmBaseUrl: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare type __VLS_Props = {
    mode: BaseTableMode;
    tableData: Record<string, unknown>[];
    columns: BaseTableColumn[];
    height?: string;
    rowKey?: string;
    loading?: boolean;
    emptyText?: string;
    rowHeight?: number;
    headerHeight?: number;
    maxPrerenderPixels?: number;
    skiaWasmBaseUrl?: string;
};

declare type __VLS_Props_2 = {
    placeholder?: string;
    clearable?: boolean;
};

declare type __VLS_PublicProps = {
    modelValue?: string;
} & __VLS_Props_2;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        toolbar?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare const BaseTable: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

/** 列配置（高性能模式仅使用其中一部分字段） */
export declare interface BaseTableColumn {
    key: string;
    /** 表头文案，兼容 Table-V2 的 title */
    label?: string;
    title?: string;
    width?: number;
    minWidth?: number;
    align?: "left" | "center" | "right";
    /** 为 false 时隐藏 */
    show?: boolean;
    /** 列类型（element 模式支持较多；canvas 系仅文本化展示） */
    type?: "default" | "index" | "selection" | "formatter" | "switch" | "image" | "status" | "status-custom" | "tableSlot" | string;
    formatter?: (row: Record<string, unknown>, column: BaseTableColumn, cellValue: unknown) => string;
    /**
     * `type === 'status-custom'` 时按单元格值取灯色：`colorMap[row[key]]`
     *（与历史项目 BaseTable 一致；键可为数字或字符串）
     */
    colorMap?: Record<string, string>;
    /** `type === 'switch'` 激活值，默认 true */
    activeValue?: string | number | boolean;
    /** `type === 'switch'` 非激活值，默认 false */
    inactiveValue?: string | number | boolean;
    /** `type === 'switch'` 是否禁用 */
    disabled?: boolean;
    /**
     * `type === 'switch'` 切换前的阻断钩子，返回 false 或 reject 时阻止切换。
     * 签名与 Element Plus ElSwitch before-change 一致，额外提供 row / col 上下文。
     */
    beforeChange?: (row: Record<string, unknown>, col: BaseTableColumn) => boolean | Promise<boolean>;
    /** `type === 'tableSlot'` 时弹窗内嵌子表格的列配置 */
    columns?: BaseTableColumn[];
    /** `type === 'tableSlot'` 弹窗宽度，默认 430 */
    popoverWidth?: number;
    /** `type === 'tableSlot'` 弹窗内搜索过滤函数 */
    filter?: (keyword: string, item: Record<string, unknown>) => boolean;
    /** `type === 'tableSlot'` 弹窗内搜索框 placeholder */
    filterPlaceholder?: string;
    /** 超长文本省略时是否显示 tooltip，默认 true */
    showOverflowTooltip?: boolean;
    /** 透传给 el-table-column / el-table-v2 Column 的额外属性（经 omit 过滤业务字段后） */
    [key: string]: unknown;
}

/**
 * 渲染模式
 * - element：Element Plus `el-table` 封装（能力最全，适合常规数据量）
 * - virtual：`el-table-v2` 虚拟滚动（适合万级行 DOM 仍可控）
 * - canvas：单 Canvas 2D，视口内重绘（适合超大数据、结构简单）
 * - canvas-tile：Canvas + 整表预渲染，滚动裁切视口
 * - skia-wasm：CanvasKit（Skia WASM）渲染，需加载 wasm
 */
export declare type BaseTableMode = "element" | "virtual" | "canvas" | "canvas-tile" | "skia-wasm";

export declare interface BaseTableProps {
    mode: BaseTableMode;
    tableData: Record<string, unknown>[];
    columns: BaseTableColumn[];
    /** 容器高度，如 400px、60vh、100% */
    height?: string;
    rowKey?: string;
    loading?: boolean;
    emptyText?: string;
    rowHeight?: number;
    headerHeight?: number;
    tileSize?: number;
    skiaWasmBaseUrl?: string;
}

declare const _default: {
    install(app: App): void;
};
export default _default;

export declare const EmptyPlaceholder: DefineComponent<EmptyPlaceholderProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<EmptyPlaceholderProps> & Readonly<{}>, {
description: string;
subtext: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare interface EmptyPlaceholderProps {
    /** 主描述 */
    description?: string;
    /** 副描述 */
    subtext?: string;
}

export declare const HelloButton: DefineComponent<HelloButtonProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<HelloButtonProps> & Readonly<{}>, {
label: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare interface HelloButtonProps {
    /** 按钮文案 */
    label?: string;
}

export declare const SearchBar: DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
search: (value: string) => any;
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
onSearch?: ((value: string) => any) | undefined;
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
placeholder: string;
clearable: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare interface SearchBarProps {
    /** 占位提示 */
    placeholder?: string;
    /** 与 v-model 绑定 */
    modelValue?: string;
    /** 是否可清空 */
    clearable?: boolean;
}

export declare const StatusTag: DefineComponent<StatusTagProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<StatusTagProps> & Readonly<{}>, {
type: StatusTagType;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

export declare interface StatusTagProps {
    /** 标签文案 */
    label: string;
    /** 视觉类型 */
    type?: StatusTagType;
}

export declare type StatusTagType = "success" | "warning" | "info" | "danger";

/**
 * 五种 BaseTable 模式共用的布局默认值（行高、列宽与 BaseTable props 默认一致）。
 */
export declare const tableLayoutDefaults: {
    readonly rowHeight: 36;
    readonly headerHeight: 40;
    readonly minColumnWidth: 64;
    readonly defaultColumnWidth: 120;
    /** 与 Element 模式 `type="selection"` 默认列宽一致 */
    readonly selectionColumnWidth: 40;
    /** 与 Element 模式 `type="index"` 默认列宽一致 */
    readonly indexColumnWidth: 52;
};

export declare const TextLink: DefineComponent<TextLinkProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
click: (event: MouseEvent) => any;
}, string, PublicProps, Readonly<TextLinkProps> & Readonly<{
onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
disabled: boolean;
underline: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

export declare interface TextLinkProps {
    /** 链接文案 */
    text: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 下划线 */
    underline?: boolean;
}

export { }
