import { resolve, join } from 'path';
import { OUT_DESKTOP_MAIN_DIR, DEV_DESKTOP_WEB_DIR, DEV_DESKTOP_NODE_DIR } from '../packages/config/dirs';
import { PLATFORMS, ENV, CONFIG_ENV_MODE } from '../target.config';
import { mode, command, IS_DEV, IS_PROD } from './env';

import type { RspackOptions } from '@rspack/core';
import { Compiler } from '@rspack/core';
import rspack from '@rspack/core';
import type { RsbuildConfig, RsbuildPlugin } from '@rsbuild/core';
import rsbuild from '@rsbuild/core';

export { mode, command, IS_DEV, IS_PROD };

export { bin, startElectron, closeElectron, restartElectron } from './bin';

export { PluginWidthStartElectron } from './plugins';

export { rules } from './rules';

export { resolveAlias, defineVars } from './utils';