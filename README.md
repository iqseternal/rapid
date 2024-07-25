# Rapid⚡

基于 `Electron`, `Electron-Vite`, `pnpm` `monorepo` 建立的桌面端应用程序。

🌟🌟🌟当前还在开发, 如果需要一个示例版本, 可切换分支到 `pre-main-vue`.

🌟🌟🌟主进程采用了 `Typescript` 建立 `Ipc` 通道以及打造日志系统，建立了异常自动捕捉处理机制。渲染进程采用了 `react`作为开发框架，编写页面展示 Web。

本项目开发是为编写一套快速迭代桌面应用程序的示例，编写项目快速启动编写的框架。但因为对开发实际情况的多样性的欠缺，所以开发了一款流程图绘制(2D)程序作为开发过程思路的提供。

本项目可供模板支持，开发基础和思路支持，但请勿直接使用。

## Introduce

本项目中含有两个可以运行的项目，其中包括桌面应用程序外还包括桌面应用程序的下载官网，但目前都还在构建当中...

如果有需要快速开发桌面应用程序，可以尝试 clone 本项目，并对其代码进行修改，可以达到帮助快速开发构建的作用。

本项目当中采用了 `monorepo` 进行项目的编写，其中

🌱`/package/config` 为两个项目的配置(包含构建配置以及运行时配置，以及一些构建常量，例如当前环境，IS_DEV，当前构建平台，IS_WINDOWS等等)，看过代码之后，就可以随意的编写你想要的配置常量，添加想要的构建平台和一些选项。这些常量选项，IS_XXX，通常会在编译时确定，因此，通过 Vite 做到树摇，可以利用此方案可以构建 Web `OEM` 方案。

🌱`/package/desktop-node`则是对应 `Electron` 程序的主进程。

🌱`/package/desktop-web`则是对应 `Electron` 程序的渲染进程。基于 `react` 编写，具有多入口(正在考虑是否保留)。

🌱`/package/website`则是基于 `react`编写的下载网站，使用了 `styled-components`，`scss module`，行内样式，虽然都采用了但是为其分了使用类别，`styled-components`建立基本元素容器，`scss module`编写页面组件级样式，行内样式则是为了覆盖元素容器原有样式，又或者样式简短。由于受到 `Vue`开发的影响，`useState` 的 手动`set`已经不能满足于我，于是编写了一个类似 `Vue`开发的自动 `set` 的 `hook`，具体阐述自行查看 `hooks`文件夹。

👋👋关于更多详细，后续完善开发之后会建立 `Vitepress`介绍文档对其进行详细介绍，以让开发者能够快速了解开发基本。

后续会部署在 https://www.oupro.cn

## Preface

想要了解本项目, 并具有改造和修正和扩展能力, 你应该具有如下基本概念：

- pnpm monorepo 依赖安装和管理

- Nodejs 对本地文件的基本操作能力

- Pako 的基本认知

- Javascript 类编程

- Electron 基本知识概念

- Typescript 类型运算基本能力

- 装饰器集成以及 Reflect-metadata 基本概念

- React Vite 构建 Web， 以及 Vite 树摇的形成，变量注入

## Project Setup

### Install

```bash
$ pnpm install
```

如果安装过程中出现错误，请首先请检查你的源是否为官方源，不建议使用其他源。

如果你存在与 npm 仓库连接不稳定的问题，例如：`pnpm will retry in 10 seconds 2 retries left`

那么你可能需要如下软件地址。

[Clash](https://clashvergerev.com/)

[Proxifier - The Most Advanced Proxy Client](https://www.proxifier.com/)

当你配置完成你的代理之后，再重试。

### Development

```bash
$ pnpm dev
$ pnpm website:dev
$ pnpm scripts:dev
```

### Build

```bash
# For windows
$ pnpm build:win
$ pnpm build:win:only # 如果不需要执行类型检查和一些额外的命令，那么直接构建

# For macOS
# 未适配
$ pnpm build:mac

# For Linux
# 未适配
$ pnpm build:linux
```

# More

TypeScript 遵循编写规范

```typescript
// 0,
import './xxx';
// 1，先引入具名导入, 如果引入类型则添加 type 引入
import { name, Name } from 'xxx';
import type { Name } from 'xxx';
import { type Name } from 'xxx';
// 2，引入默认导入，如果默认导出是一个类，那么对于大驼峰
import name from 'xxx';
import Name from 'xxx';
// 3，最后引入 import * 类型
import * as xxx from 'xxx';

// 类型书写采用大驼峰
type Name = number;
interface Name {

}

// 函数书写采用小驼峰
// 尽可能地利用 TS 类型推导，而不是直接书写类型注释(如果有这种切实需求)
const fn = () => {};
function fn<T>(arg: T) {}

if () {
  xxx;
}
else if () {
  xxx;
}
else {
  xxx;
}

// 如果语句简洁，那么一行书写完整，保持整体代码块简洁明了
// 尽量避免 if () { xxx; } 这种语句(一行)地编写。
if () xxx;
else if () xxxx;
else xxx;

// 避免此情况地产生，如果需要就使用 as 断言
// 避免使用 @ts-ignore 等忽略错误
// 当然，这是一个不应该存在的错误示例
const a: number = '1' as unknown as number;
```
