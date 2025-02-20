import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@rapid/extensions';
import { inject } from '@rapid/libs/inject';

const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Rapid.Metadata.MetadataEntries>();

const rApp: RApp = Object.freeze({
  extension: extensionManager,

  metadata: metadataManager,

  RdSKin: RdSKin
});

inject(window, 'cssVars', cssVars);
inject(window, 'rApp', rApp);