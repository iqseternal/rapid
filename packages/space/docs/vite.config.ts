import { join } from 'path';
import { defineConfig } from 'vite';
import type { AliasOptions, Alias } from 'vite';
import { nodeAlias, webAlias } from '../vite.config.util';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  base: './',
  resolve: {
    alias: {

    }
  },
  clearScreen: true,
  plugins: [
    {
      ...vue(),
      apply: (config) => {
        return config.mode === 'test';
      }
    },
    vueJsx()
  ],
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    sourcemap: false
  }
})
