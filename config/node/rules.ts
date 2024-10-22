import type { RspackOptions, RspackPluginInstance, RuleSetRule } from '@rspack/core';

export const supportImportRaw: RuleSetRule = {
  resourceQuery: /(\?raw$)|(\.(png|jpe?g|gif|ico)$)/,
  exclude: [/node_modules/],
  type: 'asset/resource'
}

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
}
