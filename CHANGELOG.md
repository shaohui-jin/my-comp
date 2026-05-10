# 版本变更记录

## v0.4.0（2026-05-10）

### BaseTable 多模式 UI 一致性

- **el-table-v2 支持 border**：Virtual 模式（ElTableV2）补全外边框和列间竖线边框，与其他四种模式保持一致
- **五种模式列宽统一**：修复 `layoutColumnWidths` 中对显式 `width` 列强制最小宽度的问题，现在直接使用原值，与 Element 模式的 `el-table` 列宽计算对齐
- **Selection checkbox 样式统一**：Canvas / Canvas-Tile / Skia 三种模式的 checkbox 从灰色方框改为与 Element Plus ElCheckbox 一致的视觉——未选时灰色圆角边框、选中时蓝色背景白色勾、半选时蓝色背景白色横杠
- **Selection checkbox hover 交互**：新增 `useCanvasCheckboxHover` 组合式，Canvas 系三种模式悬停 checkbox 时边框变蓝 + 鼠标变为手型指针，与 Element 模式行为一致

---

## v0.3.0（2026-05-03 ~ 2026-05-05）

### 架构重构 & 多端适配

- **组件与样式抽离**：将 Demo 页拆分为独立组件（DemoBaseTable、DemoSearchBar、DemoStatusDot 等），抽离公共样式变量、Element 覆盖样式、类型声明，提升可维护性
- **新增组件**：StatusDot 状态圆点组件、CellSwitch / CellStatusCustom / TableSlotPopup 单元格子组件独立封装
- **三端 UI 适配**：Demo 页适配桌面端、平板端、移动端布局
- **移动端 Canvas 触摸滚动**：Canvas / Canvas-Tile / Skia 三种模式支持触摸滑动，包括惯性与方向判断
- **show-overflow-tooltip 优化**：Element / Virtual / Skia 模式的超长文本省略 tooltip 逻辑调整，支持列级控制
- **CanvasKit 构建修复**：调整 Skia WASM 资源定位与字体加载逻辑，修复 Vite 构建环境下的异常
- **打包配置更新**：CI 工作流与 Vite 构建配置调整

---

## v0.2.0（2026-04-24）

### BaseTable 多模式第三版

- **Canvas 滚动体验优化**：改进滚轮滚动、Shift+滚轮横向滚动，新增自定义滚动条（`useCanvasScrollbar`）
- **超出宽度省略**：Canvas 系模式支持文本截断省略，新增 `useCanvasTooltip` 悬停显示完整内容
- **Skia 模式增强**：checkbox 勾选/半选绘制、switch 开关绘制、status-custom 状态灯绘制等全量对齐
- **Demo 案例优化**：丰富演示页面，新增 API 文档表格
- **CLAUDE.md 编码准则**：新增 LLM 编码行为准则文件
- **CI 与构建**：新增 GitHub Actions 工作流、移除 lock 文件、修复构建异常

---

## v0.1.0（2026-04-16）

### 项目初始化 & BaseTable 多模式

- **项目脚手架**：基于 Vue 3 + TypeScript + Vite 搭建组件库，配置 ESLint / Prettier / Stylelint / EditorConfig
- **BaseTable 五种渲染模式**：
  - `element`：Element Plus el-table 封装，能力最全
  - `virtual`：el-table-v2 虚拟滚动，适合万级行
  - `canvas`：Canvas 2D 视口重绘，适合超大数据
  - `canvas-tile`：Canvas 整表预渲染 + 视口裁切
  - `skia-wasm`：CanvasKit（Skia WASM）GPU 加速渲染
- **统一主题系统**：`tableSurfaceTokens` + CSS 变量实现五种模式视觉统一
- **列类型支持**：switch 开关、tableSlot 弹窗子表格、status-custom 状态灯、image 图片预览、index 序号、selection 多选
- **基础组件**：HelloButton、SearchBar、StatusTag、TextLink、EmptyPlaceholder
- **构建配置**：Vite 库模式打包，支持 ESM / CJS 双格式输出
