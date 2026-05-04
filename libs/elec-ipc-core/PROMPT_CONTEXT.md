# @rapid/m-ipc-core 项目开发规范与上下文

## 📋 项目概述

这是一个 Electron IPC 核心库，提供类型安全的 IPC 通信管理。采用面向对象设计，支持中间件系统（洋葱模型）。

---

## 🎯 核心设计原则

### 1. **泛型参数顺序规范**

`IpcProcessor` 的泛型参数顺序必须为：**Type, FirstArg, Args, Return**

```typescript
export interface IpcProcessor<
  Type extends IpcType = IpcTypeBoth,    // 1️⃣ 类型（优先）
  FirstArg = unknown,                     // 2️⃣ 第一个参数
  Args extends unknown[] = unknown[],    // 3️⃣ 其余参数
  Return = unknown                        // 4️⃣ 返回值
> { ... }
```

**理由**: Type 是最重要的区分参数（handle/on/both），应该放在最前面。

### 2. **集合属性命名规范**

所有 Map 类型的集合属性，名称必须体现存储的数据类型：

```typescript
// ✅ 正确：明确表示存储的是 Processor
private handleProcessors: Map<string, IpcProcessor<...>>;
private onProcessors: Map<string, IpcProcessor<...>>;
private middlewaresRecords: Map<string, IpcMiddleware>;

// ❌ 错误：不够明确
private handles: Map<...>;
private ons: Map<...>;
```

### 3. **方法访问修饰符规范**

所有方法必须显式声明访问修饰符：

```typescript
public constructor(...) { ... }
public createProcessor<...>(...) { ... }
private deduplicateMiddlewares(...) { ... }
```

### 4. **注释简洁化规范**

- 去除过度解释的注释
- 保持简短明了
- 只说明"做什么"，不解释"为什么"

```typescript
// ✅ 正确：简洁
/**
 * 创建 Processor
 */
public createProcessor<...>() { ... }

// ❌ 错误：冗长
/**
 * 创建 IPC Processor
 * 
 * Processor 是一个未注册的处理器，可以在注册时决定作为 Handle 还是 On
 * 
 * @template FirstArg - 第一个参数的类型（默认为 IpcMainInvokeEvent）
 * @template Type - 类型（默认为 'both'，表示兼容态）
 * ...
 */
```

### 5. **中间件去重规范**

#### 全局中间件使用 Map 结构

```typescript
private middlewares: IpcMiddleware[];              // 数组：保持顺序
private middlewaresRecords: Map<string, IpcMiddleware>;  // Map：快速查找去重

public useGlobalMiddleware(...middlewares: IpcMiddleware[]): this {
  for (const mw of middlewares) {
    if (!this.middlewaresRecords.has(mw.name)) {
      this.middlewaresRecords.set(mw.name, mw);
      this.middlewares.push(mw);
    }
  }
  return this;
}
```

#### Processor 中间件去重

创建 Processor 时：
1. 合并全局和局部中间件
2. 基于 `name` 属性去重
3. 重复时打印警告

```typescript
public createProcessor(channel, middlewares, handler) {
  // 合并全局和局部中间件，并去重
  const allMiddlewares = [...this.middlewares, ...middlewares];
  const uniqueMiddlewares = this.deduplicateMiddlewares(allMiddlewares);
  
  const processor = {
    channel,
    type: 'both' as Type,
    handler,
    middlewares: uniqueMiddlewares,
    useMiddlewares: (...newMiddlewares) => {
      // 动态添加时也去重
      const existingNames = new Set(processor.middlewares.map(mw => mw.name));
      for (const mw of newMiddlewares) {
        if (!existingNames.has(mw.name)) {
          processor.middlewares.push(mw);
          existingNames.add(mw.name);
        } else {
          this.printer.printWarn(`Duplicate middleware "${mw.name}" skipped.`);
        }
      }
      return processor;
    }
  };
  
  return processor;
}

private deduplicateMiddlewares(middlewares: IpcMiddleware[]): IpcMiddleware[] {
  const unique: IpcMiddleware[] = [];
  const seenNames = new Set<string>();
  
  for (const mw of middlewares) {
    if (!seenNames.has(mw.name)) {
      unique.push(mw);
      seenNames.add(mw.name);
    } else {
      this.printer.printWarn(`Duplicate middleware "${mw.name}" skipped.`);
    }
  }
  
  return unique;
}
```

### 6. **可变长参数规范**

中间件相关方法使用可变长参数（rest parameters）：

```typescript
// ✅ 正确：可变长参数
public useGlobalMiddleware(...middlewares: IpcMiddleware[]): this;
processor.useMiddlewares(...middlewares: IpcMiddleware[]): this;

// ❌ 错误：数组参数
public useGlobalMiddleware(middlewares: IpcMiddleware[]): this;
```

### 7. **代码重构提取独立方法**

复杂逻辑应提取为独立的私有方法：

```typescript
// ✅ 正确：提取独立方法
private deduplicateMiddlewares(middlewares: IpcMiddleware[]): IpcMiddleware[] { ... }

public createProcessor(...) {
  const uniqueMiddlewares = this.deduplicateMiddlewares(allMiddlewares);
  ...
}

// ❌ 错误：内联复杂逻辑
public createProcessor(...) {
  const unique: IpcMiddleware[] = [];
  const seenNames = new Set<string>();
  for (const mw of middlewares) { ... }
  ...
}
```

---

## 🏗️ 架构设计

### 目录结构

```
packages/m-ipc-core/src/
├── types/           # 通用类型定义
│   ├── index.ts
│   └── types.ts     # IpcProcessor, IpcMiddleware 等
├── main/            # 主进程代码
│   ├── index.ts
│   └── IpcAbstractReceiver.ts
├── renderer/        # 渲染进程代码
│   ├── index.ts
│   └── IpcCaller.ts
└── index.ts         # 统一入口
```

### 核心类

#### IpcManager（主进程）

```typescript
export class IpcManager {
  // 私有属性
  private middlewares: IpcMiddleware[];
  private middlewaresRecords: Map<string, IpcMiddleware>;
  private handleProcessors: Map<string, IpcProcessor<...>>;
  private onProcessors: Map<string, IpcProcessor<...>>;
  private readonly printer: AbstractPrinter;

  // 构造函数
  public constructor(options?: { middlewares?: IpcMiddleware[]; printer?: AbstractPrinter });

  // 中间件管理
  public useGlobalMiddleware(...middlewares: IpcMiddleware[]): this;
  
  // Processor 创建
  public createProcessor<Type, FirstArg, Args, Return>(channel, middlewares, handler): IpcProcessor;
  public withProcessorType<Type, FirstArg>(): FactoryFunction;
  
  // 注册方法
  public registerHandle(processors): this;
  public registerAsHandle(processors): this;  // 强制转换
  public registerOn(processors): this;
  public registerAsOn(processors): this;      // 强制转换
  public registerHandleOnce(processors): this;
  
  // 查询方法
  public getHandles(): string[];
  public getOns(): string[];
  
  // 移除方法
  public removeHandle(processor): this;
  public removeOn(processor): this;
  
  // 清空方法
  public clearAll(): this;
  
  // 私有工具方法
  private deduplicateMiddlewares(middlewares): IpcMiddleware[];
}
```

#### IpcProcessor（接口）

```typescript
export interface IpcProcessor<Type, FirstArg, Args, Return> {
  readonly channel: string;
  readonly type: Type;
  readonly middlewares: IpcMiddleware[];
  readonly handler: (firstArg: FirstArg, ...args: Args) => Promise<Return> | Return;
  useMiddlewares(...middlewares: IpcMiddleware[]): this;
}
```

---

## 💡 关键决策记录

### 1. 泛型顺序决策

**决策**: Type 放在第一位

**理由**:
- Type 是区分 Handle/On 的关键参数
- 符合"高频优先"原则
- 更清晰的类型推导

### 2. 中间件不自动整合全局中间件

**决策**: IpcProcessor 创建时不自动合并全局中间件

**理由**:
- 避免隐式行为
- 开发者完全控制
- 性能优化（避免不必要的中间件）

**实现**: 在 `createProcessor` 中手动合并：
```typescript
const allMiddlewares = [...this.middlewares, ...middlewares];
```

### 3. 使用 Map 管理全局中间件

**决策**: 使用 `Map<string, IpcMiddleware>` 而非数组

**理由**:
- O(1) 查找性能
- 自动去重
- 统一管理风格（所有集合都用 Map）

### 4. registerAsHandle / registerAsOn 不是别名

**决策**: 这两个方法是强制类型转换，不是简单别名

**理由**:
- `registerHandle`: 只能接受 `'handle' | 'both'` 类型
- `registerAsHandle`: 可以接受任意类型，强制转换为 Handle
- 提供灵活性，适合插件系统等场景

---

## 📝 编码风格

### 泛型定义单行化

如果泛型定义不太长，就放在一行：

```typescript
// ✅ 正确：单行
public createProcessor<Type, FirstArg, Args, Return>(...) { ... }

// ❌ 错误：多行（当不长时）
public createProcessor<
  Type extends IpcType = IpcTypeBoth,
  FirstArg = IpcMainInvokeEvent,
  Args extends any[] = any[],
  Return = any
>(...) { ... }
```

### 类型使用规范

泛型默认值使用类型而非字符串字面量：

```typescript
// ✅ 正确：使用类型
Type extends IpcType = IpcTypeBoth

// ❌ 错误：使用字符串
Type extends IpcType = 'both'
```

### 联合类型拆分

将联合类型拆分为原子类型：

```typescript
export type IpcTypeHandle = 'handle';
export type IpcTypeOn = 'on';
export type IpcTypeBoth = 'both';
export type IpcType = IpcTypeHandle | IpcTypeOn | IpcTypeBoth;
```

---

## ⚠️ 常见陷阱

### 1. 文件操作优先使用内置工具

不要使用终端命令操作文件，使用 `create_file`、`search_replace` 等内置工具。

### 2. Electron 窗口缩放设置

窗口缩放设置需在 `ready-to-show` 事件中执行，而不是在创建窗口时。

---

## 🔧 开发工作流

### 修改类型定义后同步更新

1. 修改 `types/types.ts` 中的接口定义
2. 同步更新 `main/IpcAbstractReceiver.ts` 中的所有引用
3. 检查 TypeScript 错误：`get_problems`

### 代码重构流程

1. 识别重复逻辑
2. 提取为独立私有方法
3. 在原位置调用新方法
4. 验证无错误

---

## 📚 参考示例

### 完整的使用示例

```typescript
import { IpcManager } from '@rapid/m-ipc-core';

const manager = new IpcManager({
  middlewares: [loggerMiddleware, authMiddleware]
});

// 创建 Processor
const processor = manager.createProcessor<'handle', [WindowService]>(
  'window:maximize',
  [validationMiddleware],
  async (windowService) => {
    windowService.window.maximize();
    return { success: true };
  }
);

// 动态添加中间件
processor.useMiddlewares(errorMiddleware);

// 注册
manager.registerHandle([processor]);

// 查询
console.log(manager.getHandles());  // ['window:maximize']
```

---

## 🎯 总结

本项目遵循以下核心原则：

1. **类型优先**: 泛型顺序 Type 第一
2. **命名明确**: 集合属性名体现数据类型
3. **访问控制**: 显式声明 public/private
4. **注释简洁**: 去除冗余解释
5. **中间件去重**: Map 结构 + 独立方法
6. **可变长参数**: 中间件方法使用 rest parameters
7. **代码复用**: 提取独立方法
8. **无隐式行为**: 不自动合并全局中间件

遵循这些规范，确保代码的一致性、可维护性和类型安全性。
