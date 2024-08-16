import { resolve, join } from 'path';
import { OUT_DESKTOP_MAIN_DIR, DEV_DESKTOP_WEB_DIR, DEV_DESKTOP_NODE_DIR } from '../packages/config/dirs';
import { mode, command, IS_DEV, IS_PROD } from './env';

import type { RspackOptions } from '@rspack/core';
import { Compiler } from '@rspack/core';
import rspack from '@rspack/core';
import type { RsbuildConfig, RsbuildPlugin } from '@rsbuild/core';
import rsbuild from '@rsbuild/core';

export { mode, command, IS_DEV, IS_PROD };

export { rules } from './rules';

export { resolveAlias, defineVars } from './utils';
