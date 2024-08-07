import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { obfuscator } from 'rollup-obfuscator';
import { alias, proxy } from './vite.config.util';
import { DIST_WEBSITE_DIR } from '../config/dirs';
import { defineVars } from '../config/structure';

import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import reactPlugin from '@vitejs/plugin-react';

import * as path from 'path';

export default defineConfig((configEnv): UserConfig => ({
  root: __dirname,
  resolve: {
    alias
  },
  define: defineVars(configEnv),
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [postcssPresetEnv(), autoprefixer()]
      }
    }
  },
  plugins: [
    reactPlugin()
  ],
  build: {
    chunkSizeWarningLimit: 2000,
    assetsDir: 'static',
    manifest: false,
    outDir: DIST_WEBSITE_DIR,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      plugins: [

      ],
      onwarn(warnning, warn) {
        if (warnning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warnning);
      }
    },

  },
  server: {
    hmr: true,
    host: '0.0.0.0',
    proxy: proxy(configEnv.mode)
  }
}));
