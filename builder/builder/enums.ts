/**
 * =======================================================================================
 * 此文件在 node 或者 web 中都会使用到, 仅在此文件导出枚举
 * =======================================================================================
 */


// =======================================================================================
// 运行时声明

/** 当前构建平台, 值为 number, 并且 PLATFORMS 不能重复 */
export const enum PlatformsOnDesktop {
  Windows = 0,
  Linux = 1,
  Mac = 2
}

export const enum PlatformsOnMobile {}
export const enum PlatformsOnBrowser {}

export const enum RuntimePlatforms { Desktop, Mobile, Browser }

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
