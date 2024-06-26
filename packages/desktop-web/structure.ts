import { defineElectronRendererConfig, resolveAlias } from '../config/structure';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { join } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import components from 'unplugin-vue-components/vite';
import eslintPlugin from 'vite-plugin-eslint';

import tsConfigJson from './tsconfig.json';

export const inputHtmlPosition = {
  index: join(__dirname, './src/pages/', 'index/index.html'),
  setting: join(__dirname, './src/pages/', 'setting/setting.html'),
  dialog: join(__dirname, './src/pages/', 'dialog/dialog.html'),
  reportBugs: join(__dirname, './src/pages/', 'reportBugs/reportBugs.html')
}

export default defineElectronRendererConfig(({ mode }) => ({
  root: __dirname,
  resolve: {
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths)
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
    })
  ],
  build: {
    rollupOptions: {
      input: inputHtmlPosition
    },
  },
  server: {
    strictPort: false
  }
}))

