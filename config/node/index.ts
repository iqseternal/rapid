
import { join } from 'path';

export { default as DIRS } from './dirs';

export type { BuilderOptions } from './builder';
export { Builder } from './builder';

export {
  RUNTIME_PLATFORMS,
  PLATFORMS_ON_DESKTOP, PLATFORMS_ON_BROWSER, PLATFORMS_ON_MOBILE,

  ENV,

  CONFIG_ENV_COMMAND, CONFIG_ENV_NODE_ENV
} from '../enums';

export * as rules from './rules';
