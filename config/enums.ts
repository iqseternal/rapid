/**
 * =======================================================================================
 * 此文件在 node 或者 web 中都会使用到, 仅在此文件导出枚举
 *
 * =======================================================================================
 */


/** 当前构建平台 */
export enum PLATFORMS {
  WINDOWS,
  LINUX,
  MAC,
  WEB
}

/** 当前构建环境 */
export enum ENV {
  DEV,
  PROD
}

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

