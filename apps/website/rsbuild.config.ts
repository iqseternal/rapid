import { defineConfig } from '@rsbuild/core';
import { join } from 'path';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

const rootDir = join(__dirname, '../../');
const distPath = join(rootDir, './dist/website');

export default defineConfig(({ env, command, envMode }) => {

  const IS_PROD = (env === 'production');

  return {
    source: {
      entry: {
        index: join(__dirname, './src/index.tsx')
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
        root: distPath,
      },
      cleanDistPath: true,
    }
  }
})
