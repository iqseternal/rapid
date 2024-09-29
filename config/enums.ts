/**
 * =======================================================================================
 * 此文件在 node 或者 web 中都会使用到, 仅在此文件导出枚举
 * =======================================================================================
 */


// =======================================================================================
// 运行时声明

/** 当前构建平台, 值为 number, 并且 PLATFORMS 不能重复 */
export enum PLATFORMS_ON_DESKTOP { WINDOWS = 0, LINUX = 1, MAC = 2 }

export enum PLATFORMS_ON_MOBILE {}
export enum PLATFORMS_ON_BROWSER {}

export enum RUNTIME_PLATFORMS { DESKTOP, MOBILE, BROWSER }

/** 当前构建环境 */
export enum ENV { DEV, PROD }


// =======================================================================================
// 构建命令

/** 当前构建模式 */
export enum CONFIG_ENV_NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

/** 当前构建指令 */
export enum CONFIG_ENV_COMMAND {
  DEV = 'dev',
  BUILD = 'build',
  PREVIEW = 'preview'
}
