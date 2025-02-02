import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { ECMAVersion } from '@rsdoctor/utils/ruleUtils';
import { join } from 'path';

import { EnvBuilder, DIRS } from '../../config/node';

const envBuilder = new EnvBuilder({
  checker: false
});

export default defineConfig(({ env, command }) => ({
  source: {
    include: [

    ],
    entry: {
      index: './src/index.tsx'
    },
    define: envBuilder.defineVars(),
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
      root: DIRS.DIST_WEB_DIR,
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

