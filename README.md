# Rapid⚡

本程序是基于 `Electron`, `Electron-Vite`/`Rspack`, `Electron-Builder`, `pnpm` `monorepo`, `React` 建立的桌面端应用程序。

编写一套快速迭代桌面应用程序的示例，编写项目快速启动编写的框架, 本项目可供模板支持，开发基础和思路支持，但请勿直接使用。

你可以根据本程序, 进行快速迭代开发, 让你的生产力进行加速。

## Preface

想要了解本项目, 并具有改造和修正和扩展能力, 你应该具有如下基本概念：

- pnpm monorepo 依赖安装和管理

- Nodejs 对本地文件的基本操作能力

- Pako 的基本认知

- Electron 基本知识概念

- Typescript 类型运算基本能力(推导能力)

- 装饰器集成以及 Reflect-metadata 基本概念

- React Vite 构建 Web， 以及 Vite 树摇的形成，变量注入

## Project Setup

### Install

```bash
$ git clone https://github.com/iqseternal/rapid.git

$ git checkout pre-main-react

$ pnpm install

# 开发
$ pnpm app:dev

# 构建
$ pnpm app:build

# 打包 win 产物
$ pnpm build:win

# 当然也可以 cd 到指定目录
$ cd ./apps/app

$ pnpm dev

$ pnpm build

$ pnpm build:win

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
function fns<T>(arg: T) {}

if (fn) {
  xxx;
}
else if (fn) {
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

// 禁止使用 any 编程(但并非是不能使用 any)
// 如下被禁止
const f = (a: any, b: any, c: any): any => {
  const res = a + b + c;

  return res;
}


// 禁止出现 try catch 不处理错误
try {
  throw new Error(`错误`);
} catch(e) {
  // 必须处理错误
}

// Promise: 除非在逻辑上一定成功或者不影响业务, 否则也需要处理异常。



// 不允许使用 compilerOptions types 选项加载以根为首的类型目录

```

Scss 编写规范

组件中严格使用 scss module 方式引入方式, 不允许使用显式字符串作为 class 类名
