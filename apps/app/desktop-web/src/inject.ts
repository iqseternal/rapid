import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@rapid/extensions';

// @ts-ignore
window.cssVars = cssVars;





const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Rapid.Metadata.MetadataEntries>();

const rApp: RApp = {
  extension: extensionManager,

  metadata: metadataManager,

  RdSKin: RdSKin
} as const;


// @ts-ignore
window.rApp = rApp;
