import { defineElectronRendererConfig, resolveAlias } from '../../packages/config/structure';
import { join, resolve } from 'path';

import reactPlugin from '@vitejs/plugin-react';
import tsConfigJson from './tsconfig.json';


export const inputHtmlPosition = {
  index: resolve(__dirname, './index.html')
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

