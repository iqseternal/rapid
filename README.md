<div align="center">

<img src="./apps/app/resources/icon.ico" alt="">

<h1>Rapid⚡</h1>

</div>


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

# More

TypeScript 遵循编写规范

```typescript
// 类型书写采用大驼峰
type Name = number;
interface Name {}

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

// 如果使用了 ts 指令忽略错误, 请添加随后的释义解释
// @ts-ignore: 忽略这个错误
const a: number = '1';

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
