# AI 智能对话助手

基于 **Vue 3 + TypeScript + Vite** 开发，对接 SiliconFlow 大模型 API，支持流式输出的 AI 聊天机器人。

## 功能

- 流式对话：打字机逐字输出，支持中途停止
- Markdown 渲染：代码语法高亮、表格、列表等
- 多会话管理：新建/删除/切换会话，自动命名
- 数据持久化：localStorage 存储，刷新不丢失
- 设置页：配置 API Key、模型、Temperature 等
- 代理服务器：Node.js + Express 转发，保护 API Key

## 技术栈

| 前端 | 后端代理 |
|------|---------|
| Vue 3 (Composition API) | Node.js + Express |
| Pinia（状态管理） | axios（流式转发） |
| Vue Router（路由） | cors |
| markdown-it + highlight.js | |
| TypeScript | |

## 快速开始

### 1. 安装依赖

```bash
# 前端依赖
npm install

# 后端代理依赖
cd server && npm install && cd ..
```

### 2. 配置 API Key

启动后访问 `http://localhost:5173/settings`，填入 [SiliconFlow API Key](https://cloud.siliconflow.cn/account/ak)。

### 3. 启动

```bash
# 终端 1：后端代理服务器（端口 3001）
npm run dev:server

# 终端 2：前端开发服务器（端口 5173）
npm run dev
```

打开 `http://localhost:5173` 即可使用。

## 项目结构

```
src/
├── components/
│   ├── chat/          # 聊天界面组件
│   ├── sidebar/       # 侧边栏组件
│   ├── settings/      # 设置表单
│   └── layout/        # 布局组件
├── composables/       # 组合式函数（流式请求、自动滚动）
├── stores/            # Pinia 状态管理
├── utils/             # 工具函数（Markdown 渲染）
├── views/             # 页面组件
└── types/             # TypeScript 类型定义
server/
└── index.js           # Express 代理服务器
```
