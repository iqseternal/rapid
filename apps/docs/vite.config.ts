import { defineConfig } from 'vite';
import type { ConfigEnv } from '../config/structure';
import { DIST_DIR } from '../config/dirs';
import { defineVars } from '../config/structure';

export default defineConfig((configEnv: ConfigEnv) => ({
  define: defineVars(configEnv),
  plugins: [


  ]
}))
