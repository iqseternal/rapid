import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { ECMAVersion } from '@rsdoctor/utils/ruleUtils';
import { join } from 'path';

import { defineVars , CONFIG_ENV_COMMAND } from '../../config';

import { DIST_WEB_DIR, DEV_DESKTOP_WEB_DIR } from '../../config/dirs';

export default defineConfig(({ env, command }) => ({
  source: {
    include: [

    ],
    entry: {
      index: './src/index.tsx'
    },
    define: defineVars(),
  },
  plugins: [
    pluginStyledComponents(),
    pluginSass(),
    pluginLess(),
    pluginTypedCSSModules(),
    pluginReact(),
  ],
  server: {
    port: 3000,
    strictPort: true
  },
  output: {
    distPath: {
      root: DIST_WEB_DIR,
    },
    cleanDistPath: true
  },
  tools: {
    rspack: {

      plugins: [
        // new RsdoctorRspackPlugin({
        //   features: [
        //     'resolver',
        //     'treeShaking'
        //   ],
        //   linter: {
        //     level: 'Error',
        //     extends: [],
        //     rules: {
        //       'default-import-check': 'off',
        //       'duplicate-package': [
        //         'Warn',
        //         {
        //           checkVersion: 'minor',
        //           ignore: [
        //             '@bable/runtime'
        //           ]
        //         }
        //       ],
        //       'ecma-version-check': [
        //         'off',
        //         {
        //           highestVersion: ECMAVersion.ES7P,
        //           ignore: []
        //         }
        //       ]
        //     }
        //   }
        // })
      ]
    }
  }
}));

