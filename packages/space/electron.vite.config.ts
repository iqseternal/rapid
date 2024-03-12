import type { UserConfig, UserConfigFn } from 'electron-vite';
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias, loadLintDevPlugins, defineVars } from './vite.config.util';
import { join } from 'path';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import components from 'unplugin-vue-components/vite';

export type ConfigEnv = Parameters<UserConfigFn>[0];

const mainConfig = (configEnv: ConfigEnv): UserConfig['main'] => ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintDevPlugins(configEnv)
  ],
  resolve: {
    alias: nodeAlias
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
    sourcemap: false
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
    alias: nodeAlias
  }
});

const rendererConfig = (configEnv: ConfigEnv): UserConfig['renderer'] => {
  return {
    resolve: {
      alias: webAlias,
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
          index: join(__dirname, './src/renderer/index.html'),
          setting: join(__dirname, './src/renderer/setting.html'),
          dialog: join(__dirname, './src/renderer/dialog.html')
        }
      },
      outDir: join(__dirname, './out/renderer')
    }
  }
};

export default defineConfig((configEnv) => ({
  main: mainConfig(configEnv),
  preload: preloadConfig(configEnv),
  renderer: rendererConfig(configEnv)
}));
