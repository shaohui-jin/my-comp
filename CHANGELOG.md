# 版本变更记录

## v0.7.0（2026-05-23）

### 组件模块

#### 新增组件
- **ConfigProvider**：运行时主题切换组件，支持嵌套覆盖，CSS 变量自动同步

#### 组件调整
- **BaseTable**：集成 `useLibConfig` 读取全局/局部配置，表格颜色从 Theme 统一配置自动派生
- **StatusDot**：默认颜色引用 `libColorDefaults` 替代硬编码
- **BaseColumnSetting**：硬编码颜色替换为 SCSS 变量（`$lib-*`）
- **BaseSearch / BaseSearchDrawer**：硬编码颜色替换为全局变量
- **BaseTableElement**：遮罩背景色引用 `$lib-mask-light`
- **BaseTableSkiaWasm**：滚动条颜色引用全局变量

### 配置模块

#### 新增配置
- **配置注入系统**：`createCompLib()` 工厂函数，支持全局主题 + 表格布局配置，通过 `provide/inject` + CSS 变量双通道注入
- **localStorage 持久化**：`createCompLib(config, { enabled: true })` 开启配置自动持久化，提供 `resetConfig()` 方法重置
- **useLibConfig**：组件内消费配置的 composable，支持组件级 props 覆盖

#### 配置调整
- **SCSS 变量**：`src/styles/variables.scss` 重构为 CSS 变量消费模式（`var(--comp-*, fallback)`），支持运行时动态覆盖
- **Demo 站样式继承**：`examples/demos/variables.scss` 通过 `@use` 继承组件库变量
- **构建输出**：Demo 站构建产物从 `examples/dist` 移至根目录 `dist-playground`
- **侧边栏菜单**：新增「配置系统」分组，采用方案 C 样式（名称 + tag）

### 工程化

- **命名规范**：`.cursor/rules` 新增文件命名语义化规则
- **文件重命名**：`blank.yml` → `deploy-pages.yml`；`tokens.ts` → `colorDefaults.ts`
- **Token → Config 统一**：所有对外接口中 `token` 命名替换为 `config`（`LibThemeConfig` / `LibTableConfig` / `tableSurfaceConfig` 等）
- **业务型配置移除**：`LibTableConfig` 仅保留 8 项布局字段，颜色自动从 `theme` 派生

## v0.6.0（2026-05-21）

### 组件模块

#### 新增组件
- **ApiTable**：通用 API 文档表格组件，桌面端显示完整五列表格，移动端自动切换为精简展开模式（属性+说明两列，点击展开类型和默认值，必填属性标红色星号）

#### 组件调整
- **ChangelogPanel**：增强视觉层级，操作类型添加彩色圆点标识（新增=绿/调整=蓝/修复=橙/移除=红），条目列表使用圆点引导
- **BaseTable 文档页**：type 扩展字段（switch / status-custom / tableSlot）合并为 Tabs 切换展示，减少页面长度
- **演示站**：移除 HelloButton、SearchBar、TextLink、EmptyPlaceholder 四个 Demo 页面，保留 CRUD 中引用的 StatusTag 和 StatusDot

### 配置模块

#### 配置调整
- **演示站布局**：重构为 flex tree 布局（header 固定高度 + 主区域撑满剩余空间 + 左侧导航固定宽度 + 右侧内容自适应），隐藏滚动条
- **侧边栏菜单**：修复移动端文本过长不显示省略号的问题（添加 `display: block`）
- **API 文档块**：增强 box-shadow 立体感
- **Header 对齐**：右侧 padding 与内容区对齐，变更记录按钮不再视觉偏移
- **body 间距**：移除浏览器默认 body margin

#### 新增配置
- **Cursor 规则**：新增「架构文档维护」章节，维护 CHANGELOG 时须同步更新 `doc/架构设计.md`
- **架构设计文档**：新增 `doc/架构设计.md`，完整梳理项目定位、技术栈、目录结构、核心架构、主题系统、构建分发、三端适配等

## v0.5.0（2026-05-15）

### 组件模块

#### 新增组件
- **BaseSearch**：配置式搜索表单，支持固定字段与可展开字段，覆盖 input / select / date / cascader / tree-select 等类型，通过 `paramOptions` 支持异步选项加载
- **BaseSearchDrawer**：侧边抽屉式高级搜索表单，复用 BaseSearchField 类型，额外支持 textarea / radio-group 类型，移动端抽屉全屏适配
- **BaseColumnSetting**：表格列配置面板，支持原生拖拽排序、显隐切换、冻结列设置（左/无/右），确认时按 fixed 位置自动排列，移动端抽屉全屏适配

#### 组件调整
- **ChangelogPanel**：滚动锁定阈值从移动端扩展到平板端（≤1024px）；使用 `position: fixed` + 记录恢复 scrollY 的方式解决触屏设备背景滚动穿透；平板端新增遮罩层与固定定位面板

### 配置模块

#### 配置调整
- **演示站导航**：BaseTable 移入「CRUD 组件」子菜单与新组件并列；侧边栏二级菜单项超出文本省略号处理

## v0.4.0（2026-05-10）

### 组件模块

#### 组件调整
- **BaseTable**：Virtual 模式补全 border 边框；统一五种模式列宽计算对齐 Element Plus；Canvas 系三种模式 checkbox 样式对齐 Element Plus；新增 `useCanvasCheckboxHover` 组合式支持 hover 交互

#### 新增组件
- **ChangelogPanel**：读取 CHANGELOG.md 解析为时间线面板，集成在顶部栏右侧，支持版本折叠展开、点击外部关闭、三端适配、移动端滚动穿透锁定

### 配置模块

#### 新增配置
- **Cursor 规则**：新增 `.cursor/rules/project-conventions.mdc`，统一语言、代码风格、三端适配、CHANGELOG 维护等项目约定

### 工程化

- **CHANGELOG.md**：基于 git 提交记录生成版本变更文件，按天归组，连续日期合并为同一版本

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
