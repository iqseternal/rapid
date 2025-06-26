
export const RdBuilderConfigName = 'rd-builder.config.ts';

export const enum Platforms {
  Windows = 0,
  Linux = 1,
  Mac = 2
}

/** 当前构建环境 */
export const enum Env { Dev, Prod }

// =======================================================================================
// 构建命令 (仅在 node, 构建工具中使用)

/** 当前构建模式 */
export const enum NodeEnv {
  Development = 'development',
  Production = 'production'
}

/** 当前构建指令 */
export const enum NodeCommand {
  Dev = 'dev',
  Build = 'build',
  Preview = 'preview'
}
