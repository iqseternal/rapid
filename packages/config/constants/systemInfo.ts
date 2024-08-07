import * as rootPackageJson from '../../../package.json';

export const SystemInformation = {
  // 系统名称
  name: rootPackageJson.name,
  // 系统版本
  version: rootPackageJson.version,
  // 作者信息
  author: {
    name: rootPackageJson.author.name,
    email: rootPackageJson.author.email
  },

  // 仓库信息
  repository: {
    type: rootPackageJson.repository.type,
    url: rootPackageJson.repository.url
  },

  // 协议信息
  license: rootPackageJson.license,
  // 包管理工具
  packageManager: rootPackageJson.packageManager,

  // 开发依赖列表
  devDependencies: rootPackageJson.devDependencies,
  // 生产依赖列表
  dependencies: rootPackageJson.dependencies
} as const;