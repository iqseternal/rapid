import { defineElectronRendererConfig, resolveAlias } from '../config/structure';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { join } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import components from 'unplugin-vue-components/vite';
import eslintPlugin from 'vite-plugin-eslint';

import tsConfigJson from './tsconfig.json';

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
      input: {
        index: join(__dirname, './index.html'),
        setting: join(__dirname, '/setting.html'),
        dialog: join(__dirname, './dialog.html')
      }
    },
  }
}))

