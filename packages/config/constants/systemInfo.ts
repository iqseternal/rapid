import * as rootPackageJson from '../../../package.json';

export const SystemInformation = {
  // 系统名称
  name: rootPackageJson.name,
  // 系统版本
  version: rootPackageJson.version,

  author: {
    email: rootPackageJson.author.email
  },

  repository: {
    type: rootPackageJson.repository.type,
    url: rootPackageJson.repository.url
  },

  license: rootPackageJson.license,
  packageManager: rootPackageJson.packageManager,


  devDependencies: rootPackageJson.devDependencies,
  dependencies: rootPackageJson.dependencies
} as const;

