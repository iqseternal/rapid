
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginLess } from '@rsbuild/plugin-less';
import { join } from 'path';
import { defineVars, CONFIG_ENV_COMMAND, CONFIG_ENV_MODE } from './../../target.config';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx'
    },
    define: defineVars({ mode: CONFIG_ENV_MODE.PRODUCTION, command: CONFIG_ENV_COMMAND.DEV })
  },
  plugins: [
    pluginSass(),
    pluginLess(),
    pluginReact(),
  ],
});

