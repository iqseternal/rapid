
import type { UserConfig } from 'vite';
import { mergeConfig, defineConfig } from 'vite';
import { defineVars } from '../config/structure';
import { PLATFORMS } from '../../target.config';

import rendererConfig from './structure';

export default defineConfig((configEnv) => {
  const vars = defineVars(configEnv);

  vars.CURRENT_PLATFORM = PLATFORMS.WEB;

  return mergeConfig<UserConfig, UserConfig>(rendererConfig(configEnv), {

    define: vars,

    server: {
      port: 8000
    }
  })
});
