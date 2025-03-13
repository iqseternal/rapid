import { defineConfig } from '@rsbuild/core';
import { EnvBuilder } from '../../config/builder';
import { DIRS } from '../../config/builder';
import { join } from 'path';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

const envBuilder = new EnvBuilder({
  checker: true
});

const { IS_PROD } = envBuilder.toEnvs();

export default defineConfig({
  source: {
    entry: {
      index: join(__dirname, './src/index.tsx')
    },
    define: {
      ...envBuilder.defineVars()
    }
  },
  plugins: [
    pluginSass(),
    pluginStyledComponents(),
    pluginTypedCSSModules(),
    pluginReact(),
    IS_PROD && pluginSourceBuild(),
    IS_PROD && pluginTailwindCSS()
  ],
  output: {
    distPath: {
      root: join(DIRS.DIST_DIR, './website'),
    },
    cleanDistPath: true,
  }
})
