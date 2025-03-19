import { defineConfig } from '@rsbuild/core';
import { join } from 'path';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

import tailwindcss from 'tailwindcss';
import tsconfigJson from './tsconfig.web.json';

const rootDir = join(__dirname, '../../');
const distPath = join(rootDir, './dist/website');

const defineAlias = (basePath: string, paths: Record<string, string[]>) => {
  const alias: Record<string, string> = {};

  const aliasMaps: [string, string][] = Object.keys(paths).filter((key) => paths[key].length > 0).map((key) => {
    return [key.replace(/\/\*$/, ''), join(basePath, paths[key][0].replace('/*', ''))] as const;
  });

  aliasMaps.forEach(([aliasKey, aliasPath]) => {
    alias[aliasKey] = aliasPath;
  })
  return alias;
}

export default defineConfig(({ env, command, envMode }) => {

  const IS_PROD = (env === 'production');

  return {
    source: {
      entry: {
        index: join(__dirname, './src/index.tsx')
      },
      alias: defineAlias(__dirname, tsconfigJson.compilerOptions.paths)
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
    },
    tools: {
      postcss: {
        postcssOptions: {
          plugins: [
            tailwindcss({
              content: [
                join(__dirname, `/src/**/*.{html,js,ts,jsx,tsx}`)
              ],
            }),
          ],
        },
      },
    },
  }
})
