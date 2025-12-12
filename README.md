<div align="center">

<img src="./apps/app/resources/icon.ico" alt="">

<h1>Rapid⚡</h1>

</div>

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/iqseternal/rapid)

## 现状

当前构建了基本架构, 能够创建基本的应用程序。

能够简要使用插件化开发自身项目, 但还未实现文件加载或者远程加载方式。

正在编写插件化开发流【本地文件】、插件化脚手架、独立子插件编写脚手架

## ✨ Features

<a href="http://rapid-doc.oupro.cn/" target="_blank">文档</a>

-🧩 **灵活多样的Hook变用**：涵盖多种调用场景，能够快速完成想要的业务逻辑。

-🔄 **数据流的高效管理**：提供强大的工具来管理数据流，提高开发效率。

-🛡 **完整的TypeScript支持**：使用TypeScript开发，确保强大的类型覆盖率，以改善开发体验和可靠性。

-🎨 **高级主题定制**：支持细粒度样式调整，以满足各种用例和个性化需求。

### 📦 Install

#### 建议安装 fnm (Windows)

```bash
$ winget install Schniz.fnm
```

#### 启动

```bash
$ git clone https://github.com/iqseternal/rapid.git

$ corepack enable

$ pnpm install
# 默认在 .npmrc 中配置了代理地址, 请检查代理地址是否一致.

# 开发
$ pnpm dev

# 构建
$ pnpm builder-win

# 本程序还包括其他项目, 例如 doc, website

$ pnpm docs:dev

$ pnpm website:dev

```

::: info

如果安装过程中出现错误，请首先请检查你的源是否为官方源，不建议使用其他源。

如果你存在与 npm 仓库连接不稳定的问题，例如：`pnpm will retry in 10 seconds 2 retries left`

那么你可能需要如下软件地址。

[Clash](https://clashvergerev.com/)

[Proxifier - The Most Advanced Proxy Client](https://www.proxifier.com/)

当你配置完成你的代理之后，再重试。

:::
