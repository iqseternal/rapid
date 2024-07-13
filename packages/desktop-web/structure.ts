import { defineElectronRendererConfig, resolveAlias } from '../config/structure';
import { join } from 'path';

import reactPlugin from '@vitejs/plugin-react';
import tsConfigJson from './tsconfig.json';

export const inputHtmlPosition = {
  index: join(__dirname, './src/pages/', 'index/index.html'),
  setting: join(__dirname, './src/pages/', 'setting/setting.html'),
  // dialog: join(__dirname, './src/pages/', 'dialog/dialog.html'),
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
    reactPlugin()
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

