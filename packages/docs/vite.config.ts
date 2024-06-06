import { defineConfig } from 'vite';
import type { ConfigEnv } from '../config/structure';
import { DIST_DIR } from '../config/dirs';
import { defineVars } from '../config/structure';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig((configEnv: ConfigEnv) => ({
  define: defineVars(configEnv),
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),


    vueJsx()
  ]
}))
