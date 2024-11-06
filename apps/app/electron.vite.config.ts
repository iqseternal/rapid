import { defineConfig, externalizeDepsPlugin, bytecodePlugin, swcPlugin  } from 'electron-vite';
import type { Alias, ConfigEnv, Plugin } from 'vite';
import { mergeConfig } from 'vite';
import { DIRS } from '../../config/node/dirs';
import { join } from 'path';
import { RuntimePlatforms } from '../../config/enums';

import reactPlugin from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

import mainTsConfigJson from './desktop-node/tsconfig.main.json';
import rendererTsConfigJson from './desktop-web/tsconfig.web.json';

import * as path from 'path';

export enum Platforms { Windows, Linux, Mac, Web }

export enum Env { Dev, Prod }

export enum ConfigEnvMode {
  Development = 'development',
  Production = 'production'
}

export enum ConfigEnvCommand {
  Dev = 'dev',
  Build = 'build'
}

export function defineVars({ mode }: { mode: string;command: string; }) {
  const vars = {
    CURRENT_PLATFORM: Platforms.Windows,
    CURRENT_RUNTIME_PLATFORM: RuntimePlatforms.Desktop,
    CURRENT_ENV: Env.Dev
  }

  if (mode === ConfigEnvMode.Development) vars.CURRENT_ENV = Env.Dev;
  else if (mode === ConfigEnvMode.Production) vars.CURRENT_ENV = Env.Prod;

  return vars;
}


const START_OPTIONS = {
  LINT_ON_DEV: false, // dev 模式下启用 lint
  LINT_ON_BUILD: true, // builda 模式下启用 lint
} as const;

function resolveAlias(basePath: string, aliasPath: Record<string, string[]>) {
  if (!aliasPath) return [];
  const alias: Alias[] = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(basePath, aliasPath[key][0].replace('/*', '')) });
  return alias;
}


const mainConfig = (configEnv: ConfigEnv) => mergeConfig({
  resolve: {
    alias: resolveAlias(DIRS.DEV_DESKTOP_MAIN_DIR, mainTsConfigJson.compilerOptions.paths)
  },
  build: {
    lib: {
      entry: path.join(DIRS.DEV_DESKTOP_MAIN_DIR, './src/index.tsx')
    }
  }
}, {
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    swcPlugin()
  ],
  define: defineVars(configEnv),
  build: {
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    terserOptions: {
      compress: {
        // drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    outDir: DIRS.OUT_DESKTOP_MAIN_DIR
  },
  server: {
    open: false
  }
});

const preloadConfig = (configEnv: ConfigEnv) => mergeConfig({
  resolve: {
    alias: resolveAlias(DIRS.DEV_DESKTOP_PRELOAD_DIR, {})
  },
  build: {
    lib: {
      entry: join(DIRS.DEV_DESKTOP_PRELOAD_DIR, './index.tsx')
    }
  }
}, ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin()
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
    outDir: DIRS.OUT_DESKTOP_PRELOAD_DIR
  }
}));

const rendererConfig = (configEnv: ConfigEnv) => mergeConfig({
  root: __dirname,
  resolve: {
    alias: resolveAlias(DIRS.DEV_DESKTOP_WEB_DIR, rendererTsConfigJson.compilerOptions.paths),

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
      input: {
        index: join(DIRS.DEV_DESKTOP_WEB_DIR, './index.html')
      }
    },
  },
  server: {
    strictPort: false
  }
}, {
  root: DIRS.DEV_DESKTOP_WEB_DIR,
  define: defineVars(configEnv),
  plugins: [],
  server: {
    port: 8790,
    hmr: true,
    host: '0.0.0.0',
    open: false,
    sourcemapIgnoreList: (sourcePath: string, sourcemapPath: string) => false
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
    outDir: DIRS.OUT_DESKTOP_RENDERER_DIR
  }
});

const defaultConfig = defineConfig((configEnv) => ({
  main: mainConfig(configEnv),
  preload: preloadConfig(configEnv),
  renderer: rendererConfig(configEnv)
}));


export default defaultConfig;
