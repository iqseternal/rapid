import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { join } from 'path';
import { ENV, PLATFORMS, CONFIG_ENV_MODE, CONFIG_ENV_COMMAND } from './target.config';
import type { Plugin } from 'vite';
import type { ConfigEnv, MainConfig, PreloadConfig, RendererConfig } from './packages/config/structure';
import { mergeConfig } from 'vite';
import { DIRS } from './packages/config/dirs';
import { mainConfigFn, preloadConfigFn } from './packages/desktop-node/sturcture';

import eslintPlugin from 'vite-plugin-eslint';
import rendererConfigFn from './packages/desktop-web/structure';

const START_OPTIONS = {
  LINT_ON_DEV: false, // dev 模式下启用 lint
  LINT_ON_BUILD: true, // build 模式下启用 lint
} as const;

const mainConfig = (configEnv: ConfigEnv): MainConfig => mergeConfig<MainConfig, MainConfig>(mainConfigFn(configEnv), {
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintPlugins(configEnv)
  ],
  define: defineVars(configEnv),
  build: {
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    outDir: DIRS.DESKTOP_OUT_DIRS.MAIN
  }
});

const preloadConfig = (configEnv: ConfigEnv): PreloadConfig => mergeConfig<PreloadConfig, PreloadConfig>(preloadConfigFn(configEnv), ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintPlugins(configEnv)
  ],
  define: defineVars(configEnv),
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    outDir: DIRS.DESKTOP_OUT_DIRS.PRELOAD
  }
}));

const rendererConfig = (configEnv: ConfigEnv): RendererConfig => mergeConfig<RendererConfig, RendererConfig>(rendererConfigFn(configEnv), {
  root: join(__dirname, './packages/desktop-web'),
  define: defineVars(configEnv),
  plugins: [...loadLintPlugins(configEnv)],
  server: {
    port: 8888,
    hmr: true,
    host: '0.0.0.0',
    proxy: {

    }
  },
  build: {
    chunkSizeWarningLimit: 2000,
    assetsDir: 'static',
    minify: 'terser',
    manifest: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    outDir: DIRS.DESKTOP_OUT_DIRS.RENDERER,
  }
});

/**
 * 加载lint插件
 * @returns
 */
export function loadLintPlugins({ command }: ConfigEnv): Plugin[] {
  if (command === CONFIG_ENV_COMMAND.SERVE) {
    if (!START_OPTIONS.LINT_ON_DEV) return [];
  }
  else if (command === CONFIG_ENV_COMMAND.BUILD) {
    if (!START_OPTIONS.LINT_ON_BUILD) return [];
  }

  return [
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.vue'
      ],
      overrideConfigFile: './.eslintrc.js',
      useEslintrc: true,
      cache: true,
      fix: false
    })
  ]
}

export function defineVars({ mode }: ConfigEnv) {
  const vars = {
    CURRENT_PLATFORM: PLATFORMS.WINDOWS,
    CURRENT_ENV: ENV.DEV
  }

  if (mode === CONFIG_ENV_MODE.DEVELOPMENT) vars.CURRENT_ENV = ENV.DEV;
  else if (mode === CONFIG_ENV_MODE.PRODUCTION) vars.CURRENT_ENV = ENV.PROD;

  return vars;
}


const defaultConfig = defineConfig((configEnv) => ({
  main: mainConfig(configEnv),
  preload: preloadConfig(configEnv),
  renderer: rendererConfig(configEnv)
}));


export default defaultConfig;
