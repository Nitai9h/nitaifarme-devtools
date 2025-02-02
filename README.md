# nitaifarme-devtools / 拟态框架开发工具

![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0-blue)
[![npm version](https://badge.fury.io/js/nitaifarme-devtools.svg)](https://www.npmjs.com/package/nitaifarme-devtools)

## 📦 功能特性 / Features

### 核心功能 / Core Features

- **一键资源打包** - 将任意静态资源转换为可直接引用的JS模块**One-Click Bundle** - Convert static assets to importable JS modules
- **开发服务器** - 快速开启调试服务，快速预览打包结果
  **Dev Server** - Quickly start the debugging service and preview the packaging results

### 进阶特性 / Advanced

- 🆔 自动生成唯一ID文件Auto-generated unique ID file
- 📜 可配置的清单文件生成
  Configurable manifest generation

## 🛠 安装 / Installation

```bash
# 全局安装依赖 / Global install (CLI)
npm install -g commander http-server

# 全局安装（命令行使用） / Global install (CLI)
npm install -g nitaifarme-devtools

# 安装项目依赖 / Install project dependencies
npm install commander http-server

# 或作为项目依赖 / Or as project dependency
npm install nitaifarme-devtools
```

## 🚀 快速开始 / Quick Start

### 基础用法 / Basic Usage

```bash
# 打包src目录到build文件夹 / Bundle src to build
nitaidev build

# 启动开发服务器（默认端口11150） / Start dev server(default port 11150)
nitaidev dev
```

### 完整工作流 / Full Workflow

```bash
# 1. 初始化项目
mkdir my-project && cd my-project
npm init -y

# 2. 安装工具
npm install nitaifarme-devtools

# 3. 创建示例资源
mkdir src
echo "<h1>Hello World</h1>" > src/index.html

# 4. 打包资源
npx nitaidev build

# 5. 启动服务
npx nitaidev dev

#后续只需要重复执行4、5步即可
#You only need to repeat the 4 and 5 steps in the future
```

## ⚙️ 命令详解 / Command Reference

### 构建命令 / Build Command

```bash
nitaidev build [选项/options]

选项/Options:
  -i, --input <dir>    输入目录 (默认: "./src")
  -o, --output <file>  输出文件 (默认: "./build/index.js")
  --no-id              跳过ID生成
  --no-manifest        跳过清单文件生成
```

### 开发服务器 / Dev Server

```bash
nitaidev dev [选项/options]

选项/Options:
  -p, --port <number>  设置端口号 (默认: 11150)
  -d, --dir <path>  设置目录 (默认: "./build")

特性/Features:
  • 自动 CORS 配置
  • 实时日志输出
```

## 🧩 技术细节 / Technical Details

### 文件处理规则 / File Processing

| 文件类型                        | 处理方式 |
| ------------------------------- |
| .js/.css/.html                  | 字符串转义 |
| 图片/字体/媒体                  | Base64编码 |
| .json                           | 直接转换为JS对象 |
| 其他文本文件                    | UTF-8编码 |

### 生成文件结构 / Output Structure

```bash
build/
├── index.js       # 主文件
├── id.npem        # 唯一标识符
└── manifest.json  # 应用清单
```

## 📝 注意事项 / Considerations

**大文件警告**
超过5MB的文件建议使用CDN加载
**Large Files**
Files over 5MB should use CDN

**路径建议**
开发服务器建议使用./build目录
**Path Lock**
Dev server strictly should use ./build

## 📜 许可证 / License

### MIT © Nitai9h(nitai@nitai.us.kg)
