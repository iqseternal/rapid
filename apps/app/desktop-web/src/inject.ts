import type { RApp } from './declare';
import { cssVars } from './skin';

import { extensionManager, metadataManager } from '@/libs/extensions';


// @ts-ignore
window.cssVars = cssVars;

const rApp: RApp = {
  extension: extensionManager,

  metadata: metadataManager,
} as const;


// @ts-ignore
window.rApp = rApp;
