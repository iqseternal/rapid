
export { default as DIRS } from './dirs';

export type { BuilderOptions } from './builder';
export { EnvBuilder } from './builder';

export {
  Platforms,

  PlatformsOnDesktop, PlatformsOnBrowser, PlatformsOnMobile,

  Env,

  NodeCommand, NodeEnv
} from './enums';

export * as rules from './rules';
