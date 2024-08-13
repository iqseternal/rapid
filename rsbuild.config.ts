import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSourceBuild, getMonorepoSubProjects } from '@rsbuild/plugin-source-build';
import { resolve } from 'path';

const rootPath = __dirname;
const packagesDir = resolve(__dirname, './packages');

const rsbuildConfig = defineConfig({
  source: {
    include: [
      { and: [rootPath, { not: /[\\/]node_modules[\\/]/ }] },
      { and: [packagesDir] },

      /\.(ts|tsx|jsx|mts|cts)$/
    ],
    entry: {
      index: './apps/desktop-web/src/index.tsx'
    }
  },
  plugins: [
    pluginSass(),
    pluginSourceBuild(),
    pluginReact()
  ],
  tools: {
    rspack: {
      cache: false
    }
  }
})

export default rsbuildConfig;
