import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { obfuscator } from 'rollup-obfuscator';
import { alias, proxy } from './vite.config.util';

import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }): UserConfig => ({
  root: __dirname,
  resolve: {
    alias
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [postcssPresetEnv()]
      }
    }
  },
  plugins: [

  ],
  build: {
    chunkSizeWarningLimit: 2000,
    assetsDir: 'static',
    minify: 'terser',
    manifest: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      plugins: [

      ]
    }
  },
  server: {
    hmr: true,
    host: '0.0.0.0',
    proxy: proxy(mode)
  }
}));
