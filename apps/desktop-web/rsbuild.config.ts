import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { resolveAlias } from '@rapid/config/structure';
import { defineVars, CONFIG_ENV_COMMAND, CONFIG_ENV_MODE, ENV } from '../../target.config';
import { OUT_DESKTOP_RENDERER_DIR } from '@rapid/config/dirs';
import tsConfigJson from './tsconfig.json';

const rsbuildConfig = defineConfig(({ env, envMode, command }) => {

  return {
    source: {
      entry: {
        index: 'src/index.tsx'
      },
      define: defineVars({ mode: CONFIG_ENV_MODE.DEVELOPMENT, command: CONFIG_ENV_COMMAND.DEV }),
      alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths)
    },
    plugins: [
      pluginSass(),
      pluginStyledComponents(),
      pluginTypedCSSModules(),
      pluginReact()
    ],
    output: {
      polyfill: 'off',
      distPath: {
        root: OUT_DESKTOP_RENDERER_DIR,
      },
      cleanDistPath: true
    }
  }
})

export default rsbuildConfig;
