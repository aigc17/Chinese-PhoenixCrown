# Chinese Phoenix Crown - 可拨动的数字凤冠文字帘
Next.js 16 + React 19 + TypeScript 5.7 + Canvas 2D + Tailwind CSS 4

## 目录结构
- `app/` - App Router 页面、布局与全局样式
- `components/` - 场景、画廊、文字帘及 UI 组件
- `docs/` - README 使用的演示截图与视频
- `lib/` - 凤冠数据、音效与视图过渡工具
- `public/` - 站点图标、占位资源与凤冠图片

## 配置文件
- `components.json` - shadcn/ui 组件生成配置
- `next.config.mjs` - Next.js 构建配置
- `package.json` - 依赖与开发命令
- `pnpm-lock.yaml` - pnpm 锁定依赖版本
- `postcss.config.mjs` - Tailwind CSS PostCSS 配置
- `tsconfig.json` - TypeScript 编译配置

## 架构决策
交互逻辑留在组件层，凤冠数据与浏览器能力封装在 `lib/`；README 演示资源集中放入 `docs/`，避免污染运行时静态资源。

## 开发规范
结构、职责或文件成员变化时同步对应目录的 `CLAUDE.md`；代码文件需维护 INPUT/OUTPUT/POS 契约。

## 变更日志
- 2026-07-14：建立 GEB 项目地图，并将 README 演示资源归入 `docs/`。

**⚠️ 自指声明**：项目模块、技术栈或顶层职责变化时立即更新本文档。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
