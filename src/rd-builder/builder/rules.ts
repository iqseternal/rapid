import type { RuleSetRule } from '@rspack/core';

/**
 * 支持导入 raw 资源
 */
export const supportImportRaw: RuleSetRule = {
  resourceQuery: /(\?raw$)|(\.(png|jpe?g|gif|ico)$)/,
  exclude: [/node_modules/],
  type: 'asset/resource'
} as const;

/**
 * 支持解析 typescript 资源
 */
export const supportTypescript: RuleSetRule = {
  test: /\.(c)?[tj]sx?$/,
  loader: 'builtin:swc-loader',
  options: {
    jsc: {
      loose: true,
      parser: {
        syntax: 'typescript',
        decorators: true,
      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true
      },
    },
  },
  type: 'javascript/auto',
} as const;
