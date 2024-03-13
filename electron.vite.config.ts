import type { UserConfig, UserConfigFn } from 'electron-vite';
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { join } from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { ENV, PLATFORMS, CONFIG_ENV_MODE, CONFIG_ENV_COMMAND } from './target.config';
import type { ProxyOptions, AliasOptions, Alias, Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import components from 'unplugin-vue-components/vite';
import eslintPlugin from 'vite-plugin-eslint';

import mainTsConfigJson from './packages/electron-main/tsconfig.json';
import rendererTsConfigJson from './packages/electron-web/tsconfig.json';

import * as path from 'path';

export type ConfigEnv = Parameters<UserConfigFn>[0];

const START_OPTIONS = {
  LINT_ON_DEV: false, // dev 模式下启用 lint
  LINT_ON_BUILD: true, // build 模式下启用 lint
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

/**
 * 加载lint插件
 * @returns
 */
export function loadLintDevPlugins({ command }: ConfigEnv): Plugin[] {
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
        'src/**/*.vue'
      ],
      overrideConfigFile: './.eslintrc.js',
      useEslintrc: true,
      cache: true,
      fix: false
    })
  ]
}

/**
 * 解析 tsconfig paths 为vite的路径别名，实现自动化
 * @param aliasPath
 * @returns
 */
export function resolveAlias(basePath: string, aliasPath: Record<string, string[]>): AliasOptions {
  if (!aliasPath) return [];
  const alias: Alias[] = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(__dirname, basePath, aliasPath[key][0].replace('/*', '')) });
  return alias;
}

const mainConfig = (configEnv: ConfigEnv): UserConfig['main'] => ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintDevPlugins(configEnv)
  ],
  resolve: {
    alias: resolveAlias('./packages/electron-main', mainTsConfigJson.compilerOptions.paths)
  },
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
    outDir: join(__dirname, './out/main'),
    lib: {
      entry: join(__dirname, './packages/electron-main/src/index.ts')
    }
  }
});

const preloadConfig = (configEnv: ConfigEnv): UserConfig['preload'] => ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintDevPlugins(configEnv)
  ],
  define: defineVars(configEnv),
  resolve: {

  },
  build: {
    outDir: join(__dirname, './out/preload'),
    lib: {
      entry: join(__dirname, './packages/electron-preload/src/index.ts'),
    }
  }
});

const rendererConfig = (configEnv: ConfigEnv): UserConfig['renderer'] => {
  return {
    root: join(__dirname, './packages/electron-web'),
    resolve: {
      alias: resolveAlias('./packages/electron-web', rendererTsConfigJson.compilerOptions.paths),
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      vueJsx(),
      svgLoader({ defaultImport: 'url' }),
      components({
        transformer: 'vue3',
        extensions: ['vue', 'jsx', 'tsx'],
        dirs: [],
        dts: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
            resolveIcons: true,
            cjs: false
          })
        ]
      }),
      ...loadLintDevPlugins(configEnv)
    ],
    define: defineVars(configEnv),
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
      rollupOptions: {
        plugins: [

        ],
        input: {
          index: join(__dirname, './packages/electron-web', './index.html'),
          setting: join(__dirname, './packages/electron-web', '/setting.html'),
          dialog: join(__dirname, './packages/electron-web', './dialog.html')
        }
      },
      outDir: join(__dirname, './out/renderer')
    }
  }
};

const defaultConfig = defineConfig((configEnv) => ({
  main: mainConfig(configEnv),
  preload: preloadConfig(configEnv),
  renderer: rendererConfig(configEnv)
}));

export default defaultConfig;
